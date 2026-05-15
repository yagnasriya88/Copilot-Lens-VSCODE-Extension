import * as vscode from 'vscode';
import { detectLanguage, type LanguageConfig } from '../treeSitter/languages';
import { parseCode, type TreeSitterNode } from '../treeSitter/parser';
import * as logger from '../utils/logger';

/** A semantic code chunk extracted from a source file. */
export interface CodeChunk {
    /** Unique identifier: filePath#startLine-endLine */
    id: string;
    /** Workspace-relative file path. */
    filePath: string;
    /** Language of the source file. */
    language: string;
    /** AST node type that produced this chunk. */
    nodeType: string;
    /** Source code text of the chunk. */
    code: string;
    /** Start line (0-based). */
    startLine: number;
    /** End line (0-based). */
    endLine: number;
}

/**
 * Rough token count approximation (words + punctuation tokens).
 * Uses a simple whitespace + symbol split.
 */
function estimateTokens(text: string): number {
    return text.split(/[\s]+/).filter(t => t.length > 0).length;
}

/**
 * Creates a chunk ID from file path and line range.
 */
function makeChunkId(filePath: string, startLine: number, endLine: number): string {
    return `${filePath}#${startLine}-${endLine}`;
}

/**
 * Recursively extracts code chunks from a Tree-sitter AST node.
 * Only considers top-level chunk node types defined by the language config.
 * Splits chunks that exceed maxTokens.
 *
 * @param node - The current AST node to examine.
 * @param filePath - The workspace-relative file path.
 * @param config - The language configuration.
 * @param sourceCode - The full source text.
 * @param maxTokens - Maximum tokens per chunk (default 512).
 * @returns Array of code chunks extracted from this subtree.
 */
function extractChunksFromNode(
    node: TreeSitterNode,
    filePath: string,
    config: LanguageConfig,
    sourceCode: string,
    maxTokens: number
): CodeChunk[] {
    const chunks: CodeChunk[] = [];

    if (config.chunkNodeTypes.includes(node.type)) {
        const code = node.text;
        const tokens = estimateTokens(code);

        if (tokens < 10) {
            // Skip trivial/empty nodes
            return chunks;
        }

        if (tokens <= maxTokens) {
            chunks.push({
                id: makeChunkId(filePath, node.startPosition.row, node.endPosition.row),
                filePath,
                language: config.id,
                nodeType: node.type,
                code,
                startLine: node.startPosition.row,
                endLine: node.endPosition.row
            });
        } else {
            // Split by child nodes recursively
            const childChunks = splitLargeNode(node, filePath, config, sourceCode, maxTokens);
            chunks.push(...childChunks);
        }

        return chunks;
    }

    // Recurse into children
    for (const child of node.namedChildren) {
        chunks.push(...extractChunksFromNode(child, filePath, config, sourceCode, maxTokens));
    }

    return chunks;
}

/**
 * Splits a large AST node by its children into smaller chunks.
 */
function splitLargeNode(
    node: TreeSitterNode,
    filePath: string,
    config: LanguageConfig,
    _sourceCode: string,
    maxTokens: number
): CodeChunk[] {
    const chunks: CodeChunk[] = [];

    if (node.namedChildCount === 0) {
        // Leaf node that's too big — create it anyway
        chunks.push({
            id: makeChunkId(filePath, node.startPosition.row, node.endPosition.row),
            filePath,
            language: config.id,
            nodeType: node.type,
            code: node.text,
            startLine: node.startPosition.row,
            endLine: node.endPosition.row
        });
        return chunks;
    }

    for (const child of node.namedChildren) {
        const childCode = child.text;
        const tokens = estimateTokens(childCode);

        if (tokens < 10) { continue; }

        if (tokens <= maxTokens) {
            chunks.push({
                id: makeChunkId(filePath, child.startPosition.row, child.endPosition.row),
                filePath,
                language: config.id,
                nodeType: child.type,
                code: childCode,
                startLine: child.startPosition.row,
                endLine: child.endPosition.row
            });
        } else {
            chunks.push(...splitLargeNode(child, filePath, config, _sourceCode, maxTokens));
        }
    }

    return chunks;
}

/**
 * Performs sliding-window line-based chunking for unsupported languages.
 *
 * @param sourceCode - The full source text.
 * @param filePath - The workspace-relative file path.
 * @param language - Language identifier string.
 * @param windowSize - Number of lines per chunk (default 40).
 * @param overlap - Line overlap between consecutive chunks (default 10).
 * @returns Array of line-based code chunks.
 */
export function slidingWindowChunk(
    sourceCode: string,
    filePath: string,
    language: string,
    windowSize: number = 40,
    overlap: number = 10
): CodeChunk[] {
    const lines = sourceCode.split('\n');
    const chunks: CodeChunk[] = [];
    const step = windowSize - overlap;

    for (let i = 0; i < lines.length; i += step) {
        const end = Math.min(i + windowSize, lines.length);
        const chunkLines = lines.slice(i, end);
        const code = chunkLines.join('\n');
        const tokens = estimateTokens(code);

        if (tokens < 10) { continue; }

        chunks.push({
            id: makeChunkId(filePath, i, end - 1),
            filePath,
            language,
            nodeType: 'sliding_window',
            code,
            startLine: i,
            endLine: end - 1
        });

        if (end >= lines.length) { break; }
    }

    return chunks;
}

/**
 * Chunks a source file using Tree-sitter AST parsing for supported languages,
 * or falls back to sliding-window chunking.
 *
 * @param sourceCode - Full source code of the file.
 * @param filePath - Workspace-relative file path.
 * @param extensionPath - Root path of the extension (for WASM loading).
 * @param token - Cancellation token.
 * @returns Array of code chunks.
 */
export async function chunkFile(
    sourceCode: string,
    filePath: string,
    extensionPath: string,
    token?: vscode.CancellationToken
): Promise<CodeChunk[]> {
    if (token?.isCancellationRequested) { return []; }

    const config = vscode.workspace.getConfiguration('copilot-rag-injector');
    const maxTokens = config.get<number>('maxTokensPerChunk', 512);

    const langConfig = detectLanguage(filePath);

    if (!langConfig) {
        // Unsupported language — use fallback
        const ext = filePath.split('.').pop() ?? 'unknown';
        logger.debug(`No Tree-sitter grammar for .${ext}, using sliding window`);
        return slidingWindowChunk(sourceCode, filePath, ext);
    }

    const rootNode = await parseCode(sourceCode, langConfig, extensionPath);
    if (!rootNode) {
        logger.warn(`Failed to parse ${filePath}, falling back to sliding window`);
        return slidingWindowChunk(sourceCode, filePath, langConfig.id);
    }

    const chunks = extractChunksFromNode(rootNode, filePath, langConfig, sourceCode, maxTokens);

    if (chunks.length === 0) {
        // File parsed but no matching nodes found — use fallback
        return slidingWindowChunk(sourceCode, filePath, langConfig.id);
    }

    logger.debug(`Chunked ${filePath}: ${chunks.length} chunks`);
    return chunks;
}
