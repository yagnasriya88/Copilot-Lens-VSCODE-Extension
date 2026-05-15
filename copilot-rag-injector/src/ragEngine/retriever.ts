import * as vscode from 'vscode';
import { VectorStore, type ScoredChunk } from './vectorStore';
import { embedText } from './embedder';
import * as logger from '../utils/logger';

/**
 * Top-K retrieval engine with deduplication and re-ranking.
 */
export class Retriever {
    constructor(private readonly vectorStore: VectorStore) {}

    /**
     * Retrieves the most relevant code chunks for a given query.
     *
     * Pipeline:
     * 1. Embed the query string
     * 2. Over-fetch from vector store (topK * 3)
     * 3. Deduplicate by file path (max 2 chunks per file)
     * 4. Re-rank: boost chunks whose file matches the active editor (+0.1)
     * 5. Return final top-K results
     *
     * @param query - The user's search query.
     * @param topK - Number of chunks to return (default from config or 5).
     * @returns Array of scored chunks sorted by relevance.
     */
    async retrieve(query: string, topK?: number): Promise<ScoredChunk[]> {
        const config = vscode.workspace.getConfiguration('copilot-rag-injector');
        const k = topK ?? config.get<number>('topK', 5);

        if (this.vectorStore.size === 0) {
            logger.warn('Vector store is empty — no chunks to retrieve');
            return [];
        }

        // Step 1: Embed the query
        const queryEmbedding = await embedText(query);

        // Step 2: Over-fetch
        const overFetchK = k * 3;
        const candidates = this.vectorStore.search(queryEmbedding, overFetchK);

        // Step 3: Deduplicate — max 2 chunks per file
        const fileCount = new Map<string, number>();
        const deduplicated: ScoredChunk[] = [];

        for (const candidate of candidates) {
            const fp = candidate.chunk.filePath;
            const count = fileCount.get(fp) ?? 0;
            if (count >= 2) { continue; }
            fileCount.set(fp, count + 1);
            deduplicated.push(candidate);
        }

        // Step 4: Re-rank — boost active editor file
        const activeFilePath = this.getActiveEditorRelativePath();
        const reranked = deduplicated.map(sc => {
            let boostedScore = sc.score;
            if (activeFilePath && sc.chunk.filePath === activeFilePath) {
                boostedScore += 0.1;
            }
            return { chunk: sc.chunk, score: boostedScore };
        });

        // Sort by boosted score
        reranked.sort((a, b) => b.score - a.score);

        // Step 5: Return top-K
        const results = reranked.slice(0, k);
        logger.debug(`Retrieved ${results.length} chunks for query: "${query.slice(0, 50)}..."`);
        return results;
    }

    /**
     * Gets the workspace-relative path of the currently active editor.
     */
    private getActiveEditorRelativePath(): string | undefined {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return undefined; }
        return vscode.workspace.asRelativePath(editor.document.uri);
    }
}
