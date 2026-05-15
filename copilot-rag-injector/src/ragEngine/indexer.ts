import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { chunkFile, type CodeChunk } from './chunker';
import { embedBatch, loadCache, saveCache } from './embedder';
import { VectorStore } from './vectorStore';
import { initTreeSitter } from '../treeSitter/parser';
import * as logger from '../utils/logger';

/** File extensions supported for indexing. */
const SUPPORTED_EXTENSIONS = new Set([
    '.ts', '.tsx', '.js', '.jsx', '.py', '.rs', '.go', '.java', '.cpp', '.c'
]);

/** Maximum file size to index (500 KB). */
const MAX_FILE_SIZE = 500 * 1024;

/**
 * Workspace indexer: walks the workspace, chunks files, embeds them, and
 * populates the vector store.
 */
export class Indexer {
    constructor(
        private readonly vectorStore: VectorStore,
        private readonly extensionPath: string
    ) {}

    /**
     * Indexes the entire workspace, populating the vector store.
     * Respects .gitignore and user-configured exclude patterns.
     *
     * @param token - Cancellation token.
     * @param progress - Progress reporter for the UI.
     */
    async indexWorkspace(
        token?: vscode.CancellationToken,
        progress?: vscode.Progress<{ message?: string; increment?: number }>
    ): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            logger.warn('No workspace folder open — skipping indexing');
            return;
        }

        // Initialize Tree-sitter
        await initTreeSitter(this.extensionPath);

        // Try loading cached embeddings
        const cachedEmbeddings = loadCache(workspaceFolders[0].uri.fsPath);

        // Find all files
        progress?.report({ message: 'Discovering files...' });
        const files = await this.discoverFiles(token);

        if (token?.isCancellationRequested) { return; }

        logger.info(`Discovered ${files.length} files for indexing`);
        progress?.report({ message: `Indexing ${files.length} files...` });

        // Process files in batches of 20
        const batchSize = 20;
        let processedFiles = 0;
        let totalChunks = 0;

        for (let i = 0; i < files.length; i += batchSize) {
            if (token?.isCancellationRequested) { break; }

            const batch = files.slice(i, i + batchSize);
            const batchChunks: CodeChunk[] = [];

            // Chunk all files in this batch
            for (const fileUri of batch) {
                if (token?.isCancellationRequested) { break; }

                try {
                    const relativePath = vscode.workspace.asRelativePath(fileUri);
                    const content = await this.readFileContent(fileUri);
                    if (!content) { continue; }

                    const chunks = await chunkFile(content, relativePath, this.extensionPath, token);
                    batchChunks.push(...chunks);
                } catch (err) {
                    logger.error(`Error chunking file: ${fileUri.fsPath}`, err);
                }
            }

            if (batchChunks.length === 0) {
                processedFiles += batch.length;
                continue;
            }

            // Check cache for existing embeddings
            const uncachedChunks: CodeChunk[] = [];
            const uncachedTexts: string[] = [];

            for (const chunk of batchChunks) {
                const cached = cachedEmbeddings.get(chunk.id);
                if (cached) {
                    this.vectorStore.add(chunk, cached);
                } else {
                    uncachedChunks.push(chunk);
                    uncachedTexts.push(chunk.code);
                }
            }

            // Embed uncached chunks
            if (uncachedTexts.length > 0) {
                try {
                    const embeddings = await embedBatch(uncachedTexts, 20, token);
                    for (let j = 0; j < uncachedChunks.length; j++) {
                        this.vectorStore.add(uncachedChunks[j], embeddings[j]);
                    }
                } catch (err) {
                    logger.error('Embedding batch failed', err);
                }
            }

            processedFiles += batch.length;
            totalChunks += batchChunks.length;

            const pct = Math.round((processedFiles / files.length) * 100);
            progress?.report({
                message: `Indexed ${processedFiles}/${files.length} files (${totalChunks} chunks)`,
                increment: (batch.length / files.length) * 100
            });
        }

        logger.info(`Indexing complete: ${totalChunks} chunks from ${processedFiles} files`);
    }

    /**
     * Re-indexes specific files (incremental update).
     * Removes old chunks for the changed files, then re-chunks and re-embeds.
     *
     * @param uris - File URIs that changed.
     * @param token - Cancellation token.
     */
    async reindexFiles(uris: vscode.Uri[], token?: vscode.CancellationToken): Promise<void> {
        await initTreeSitter(this.extensionPath);

        for (const uri of uris) {
            if (token?.isCancellationRequested) { break; }

            const relativePath = vscode.workspace.asRelativePath(uri);
            this.vectorStore.invalidate(relativePath);

            // Check if file still exists (might have been deleted)
            if (!fs.existsSync(uri.fsPath)) {
                logger.debug(`File deleted, removed chunks: ${relativePath}`);
                continue;
            }

            try {
                const content = await this.readFileContent(uri);
                if (!content) { continue; }

                const chunks = await chunkFile(content, relativePath, this.extensionPath, token);
                if (chunks.length === 0) { continue; }

                const texts = chunks.map(c => c.code);
                const embeddings = await embedBatch(texts, 20, token);

                for (let i = 0; i < chunks.length; i++) {
                    this.vectorStore.add(chunks[i], embeddings[i]);
                }

                logger.debug(`Re-indexed ${relativePath}: ${chunks.length} chunks`);
            } catch (err) {
                logger.error(`Error re-indexing ${relativePath}`, err);
            }
        }
    }

    /**
     * Persists the current embedding cache to disk.
     */
    async persistCache(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) { return; }

        const cacheData = this.vectorStore.getAllEntries();
        await saveCache(cacheData, workspaceFolders[0].uri.fsPath);
    }

    /**
     * Discovers all indexable files in the workspace.
     */
    private async discoverFiles(token?: vscode.CancellationToken): Promise<vscode.Uri[]> {
        const config = vscode.workspace.getConfiguration('copilot-rag-injector');
        const excludePatterns: string[] = config.get('excludePatterns', [
            '**/node_modules/**', '**/dist/**', '**/.git/**', '**/build/**', '**/*.min.js'
        ]);

        // Build exclude glob
        const excludeGlob = `{${excludePatterns.join(',')}}`;

        // Build include glob for supported extensions
        const extGlob = `**/*.{${Array.from(SUPPORTED_EXTENSIONS).map(e => e.slice(1)).join(',')}}`;

        const files = await vscode.workspace.findFiles(extGlob, excludeGlob, undefined, token);

        // Filter by file size
        return files.filter(uri => {
            try {
                const stat = fs.statSync(uri.fsPath);
                return stat.size <= MAX_FILE_SIZE;
            } catch {
                return false;
            }
        });
    }

    /**
     * Reads file content as a string, returning undefined on failure.
     */
    private async readFileContent(uri: vscode.Uri): Promise<string | undefined> {
        try {
            const bytes = await vscode.workspace.fs.readFile(uri);
            return Buffer.from(bytes).toString('utf-8');
        } catch (err) {
            logger.error(`Failed to read file: ${uri.fsPath}`, err);
            return undefined;
        }
    }
}
