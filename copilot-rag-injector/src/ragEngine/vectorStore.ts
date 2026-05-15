import type { CodeChunk } from './chunker';
import * as logger from '../utils/logger';

/** A code chunk paired with its similarity score. */
export interface ScoredChunk {
    chunk: CodeChunk;
    score: number;
}

interface VectorEntry {
    chunk: CodeChunk;
    embedding: Float32Array;
    magnitude: number;
}

/**
 * Computes the magnitude (L2 norm) of a vector.
 */
function magnitude(vec: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

/**
 * Computes cosine similarity between two vectors.
 * Both vectors must have the same length.
 */
function cosineSimilarity(a: Float32Array, magA: number, b: Float32Array, magB: number): number {
    if (magA === 0 || magB === 0) { return 0; }

    let dotProduct = 0;
    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
    }

    return dotProduct / (magA * magB);
}

/**
 * In-memory vector store using cosine similarity.
 * Stores code chunks with their embedding vectors for fast retrieval.
 */
export class VectorStore {
    private entries: Map<string, VectorEntry> = new Map();

    /**
     * Adds a code chunk and its embedding to the store.
     * @param chunk - The code chunk metadata and content.
     * @param embedding - The embedding vector for the chunk.
     */
    add(chunk: CodeChunk, embedding: Float32Array): void {
        this.entries.set(chunk.id, {
            chunk,
            embedding,
            magnitude: magnitude(embedding)
        });
    }

    /**
     * Searches for the top-K most similar chunks to the query embedding.
     * @param queryEmbedding - The embedding vector of the search query.
     * @param topK - Number of top results to return.
     * @returns Array of scored chunks sorted by descending similarity.
     */
    search(queryEmbedding: Float32Array, topK: number): ScoredChunk[] {
        const queryMag = magnitude(queryEmbedding);
        const results: ScoredChunk[] = [];

        for (const entry of this.entries.values()) {
            const score = cosineSimilarity(
                queryEmbedding, queryMag,
                entry.embedding, entry.magnitude
            );
            results.push({ chunk: entry.chunk, score });
        }

        results.sort((a, b) => b.score - a.score);
        return results.slice(0, topK);
    }

    /**
     * Removes all chunks associated with a given file path.
     * Used for incremental re-indexing when files change.
     * @param filePath - The workspace-relative file path to invalidate.
     */
    invalidate(filePath: string): void {
        const toDelete: string[] = [];
        for (const [id, entry] of this.entries) {
            if (entry.chunk.filePath === filePath) {
                toDelete.push(id);
            }
        }
        for (const id of toDelete) {
            this.entries.delete(id);
        }
        if (toDelete.length > 0) {
            logger.debug(`Invalidated ${toDelete.length} chunks for ${filePath}`);
        }
    }

    /**
     * Returns the total number of chunks in the store.
     */
    get size(): number {
        return this.entries.size;
    }

    /**
     * Returns all chunk IDs in the store.
     */
    getAllChunkIds(): string[] {
        return Array.from(this.entries.keys());
    }

    /**
     * Returns all chunks and their embeddings for cache persistence.
     */
    getAllEntries(): Map<string, Float32Array> {
        const result = new Map<string, Float32Array>();
        for (const [id, entry] of this.entries) {
            result.set(id, entry.embedding);
        }
        return result;
    }

    /**
     * Clears all entries from the store.
     */
    clear(): void {
        this.entries.clear();
    }
}
