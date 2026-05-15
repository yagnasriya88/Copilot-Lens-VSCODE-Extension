import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as logger from '../utils/logger';

/** Embedding dimension for all-MiniLM-L6-v2. */
export const EMBEDDING_DIM = 384;

// Lazy-loaded pipeline
let pipeline: ((text: string[]) => Promise<Float32Array[]>) | undefined;
let modelLoading: Promise<void> | undefined;

/**
 * Lazily initializes the @xenova/transformers embedding pipeline.
 * Uses Xenova/all-MiniLM-L6-v2 running locally via ONNX Runtime.
 */
async function ensureModel(): Promise<void> {
    if (pipeline) { return; }
    if (modelLoading) {
        await modelLoading;
        return;
    }

    modelLoading = (async () => {
        logger.info('Loading embedding model (all-MiniLM-L6-v2)...');
        try {
            // Dynamic import for @xenova/transformers
            const { pipeline: createPipeline, env } = await import('@xenova/transformers');

            // Disable remote model loading — bundle locally or download on first use
            env.allowRemoteModels = true;
            env.allowLocalModels = true;

            const extractor = await createPipeline(
                'feature-extraction',
                'Xenova/all-MiniLM-L6-v2',
                { quantized: true }
            );

            pipeline = async (texts: string[]): Promise<Float32Array[]> => {
                const results: Float32Array[] = [];
                for (const text of texts) {
                    const output = await extractor(text, {
                        pooling: 'mean',
                        normalize: true
                    });
                    // output.data is a Float32Array of shape [1, 384]
                    results.push(new Float32Array(output.data as ArrayLike<number>));
                }
                return results;
            };

            logger.info('Embedding model loaded successfully');
        } catch (err) {
            logger.error('Failed to load embedding model', err);
            throw err;
        }
    })();

    await modelLoading;
}

/**
 * Generates an embedding vector for a single text string.
 * @param text - The text to embed.
 * @returns A 384-dimensional Float32Array embedding.
 */
export async function embedText(text: string): Promise<Float32Array> {
    await ensureModel();
    if (!pipeline) {
        throw new Error('Embedding model not available');
    }
    const [embedding] = await pipeline([text]);
    return embedding;
}

/**
 * Generates embeddings for multiple texts in batches.
 * Processes in chunks of batchSize to avoid blocking the extension host.
 * @param texts - Array of texts to embed.
 * @param batchSize - Number of texts per batch (default 20).
 * @param token - Cancellation token.
 * @returns Array of Float32Array embeddings in the same order.
 */
export async function embedBatch(
    texts: string[],
    batchSize: number = 20,
    token?: vscode.CancellationToken
): Promise<Float32Array[]> {
    await ensureModel();
    if (!pipeline) {
        throw new Error('Embedding model not available');
    }

    const allEmbeddings: Float32Array[] = [];

    for (let i = 0; i < texts.length; i += batchSize) {
        if (token?.isCancellationRequested) {
            break;
        }

        const batch = texts.slice(i, i + batchSize);
        const embeddings = await pipeline(batch);
        allEmbeddings.push(...embeddings);

        // Yield to event loop between batches
        await new Promise<void>(resolve => setTimeout(resolve, 0));
    }

    return allEmbeddings;
}

/** Serialized cache entry for persistence. */
interface CacheEntry {
    id: string;
    embedding: number[];
}

/**
 * Saves the embedding cache to disk.
 * @param cache - Map of chunk IDs to Float32Array embeddings.
 * @param workspacePath - Root workspace folder path.
 */
export async function saveCache(
    cache: Map<string, Float32Array>,
    workspacePath: string
): Promise<void> {
    const cacheDir = path.join(workspacePath, '.vscode');
    const cachePath = path.join(cacheDir, 'rag-cache.json');

    const entries: CacheEntry[] = [];
    for (const [id, embedding] of cache) {
        entries.push({
            id,
            embedding: Array.from(embedding)
        });
    }

    try {
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        fs.writeFileSync(cachePath, JSON.stringify(entries), 'utf-8');
        logger.info(`Saved embedding cache: ${entries.length} entries`);
    } catch (err) {
        logger.error('Failed to save embedding cache', err);
    }
}

/**
 * Loads the embedding cache from disk.
 * @param workspacePath - Root workspace folder path.
 * @returns Map of chunk IDs to Float32Array embeddings.
 */
export function loadCache(workspacePath: string): Map<string, Float32Array> {
    const cachePath = path.join(workspacePath, '.vscode', 'rag-cache.json');
    const cache = new Map<string, Float32Array>();

    try {
        if (!fs.existsSync(cachePath)) {
            return cache;
        }

        const raw = fs.readFileSync(cachePath, 'utf-8');
        const entries: CacheEntry[] = JSON.parse(raw) as CacheEntry[];

        for (const entry of entries) {
            cache.set(entry.id, new Float32Array(entry.embedding));
        }

        logger.info(`Loaded embedding cache: ${cache.size} entries`);
    } catch (err) {
        logger.error('Failed to load embedding cache', err);
    }

    return cache;
}
