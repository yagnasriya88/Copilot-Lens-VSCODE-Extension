import type { ScoredChunk } from './ragEngine/vectorStore';

/** Maximum tokens allowed in the context prefix. */
const MAX_PREFIX_TOKENS = 3000;

/**
 * Rough token count estimate (whitespace + symbol split).
 */
function estimateTokens(text: string): number {
    return text.split(/[\s]+/).filter(t => t.length > 0).length;
}

/**
 * Maps a language identifier to a markdown code fence language tag.
 */
function languageTag(language: string): string {
    const map: Record<string, string> = {
        javascript: 'javascript',
        typescript: 'typescript',
        python: 'python',
        rust: 'rust',
        go: 'go',
        java: 'java',
        cpp: 'cpp',
        c: 'c'
    };
    return map[language] ?? language;
}

/**
 * Builds the context prefix string to prepend to the user's query.
 * Formats retrieved code chunks as numbered, fenced code blocks with metadata.
 * Trims lowest-scored chunks if the total exceeds 3000 tokens.
 *
 * @param chunks - Scored code chunks from the retriever.
 * @returns Formatted markdown string for prompt injection.
 */
export function buildPrefix(chunks: ScoredChunk[]): string {
    if (chunks.length === 0) {
        return '';
    }

    const header = `<codebase_context>
The following code snippets from this repository are semantically relevant to your query.
Use them to inform your response.

`;

    const footer = `</codebase_context>`;

    let totalTokens = estimateTokens(header) + estimateTokens(footer);
    const includedBlocks: string[] = [];

    // Chunks are already sorted desc by score; we add from best to worst
    for (let i = 0; i < chunks.length; i++) {
        const sc = chunks[i];
        const lang = languageTag(sc.chunk.language);
        const label = `[${i + 1}] ${sc.chunk.filePath} — ${sc.chunk.nodeType} (score: ${sc.score.toFixed(2)})`;

        const block = `${label}
\`\`\`${lang}
${sc.chunk.code}
\`\`\`
`;

        const blockTokens = estimateTokens(block);
        if (totalTokens + blockTokens > MAX_PREFIX_TOKENS) {
            // Skip this and remaining lower-scored chunks
            break;
        }

        totalTokens += blockTokens;
        includedBlocks.push(block);
    }

    if (includedBlocks.length === 0) {
        return '';
    }

    return header + includedBlocks.join('\n') + '\n' + footer;
}

/**
 * Builds the full enriched prompt by combining context prefix and user query.
 *
 * @param chunks - Scored code chunks from the retriever.
 * @param userQuery - The original user query.
 * @returns The complete prompt string with injected context.
 */
export function buildEnrichedPrompt(chunks: ScoredChunk[], userQuery: string): string {
    const prefix = buildPrefix(chunks);
    if (!prefix) {
        return userQuery;
    }
    return `${prefix}\n\nUser query: ${userQuery}`;
}

/**
 * Builds a short summary of injected context for display in the chat.
 *
 * @param chunks - Scored code chunks that were injected.
 * @returns A markdown string summarizing the injected files.
 */
export function buildContextSummary(chunks: ScoredChunk[]): string {
    if (chunks.length === 0) {
        return '📎 No relevant context found in the codebase.';
    }

    const lines = chunks.map((sc, i) =>
        `${i + 1}. \`${sc.chunk.filePath}\` — ${sc.chunk.nodeType} (L${sc.chunk.startLine + 1}–L${sc.chunk.endLine + 1}, score: ${sc.score.toFixed(2)})`
    );

    return `📎 **Context injected** (${chunks.length} snippets):\n${lines.join('\n')}`;
}
