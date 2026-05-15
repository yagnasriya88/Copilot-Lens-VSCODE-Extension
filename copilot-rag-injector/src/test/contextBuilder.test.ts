import * as assert from 'assert';
import { buildPrefix, buildEnrichedPrompt, buildContextSummary } from '../contextBuilder';
import type { ScoredChunk } from '../ragEngine/vectorStore';
import type { CodeChunk } from '../ragEngine/chunker';

function makeChunk(filePath: string, nodeType: string, code: string, startLine = 0): CodeChunk {
    return {
        id: `${filePath}#${startLine}-${startLine + 5}`,
        filePath,
        language: 'typescript',
        nodeType,
        code,
        startLine,
        endLine: startLine + 5
    };
}

function makeScoredChunk(filePath: string, nodeType: string, code: string, score: number): ScoredChunk {
    return {
        chunk: makeChunk(filePath, nodeType, code),
        score
    };
}

suite('ContextBuilder Tests', () => {
    test('buildPrefix formats chunks correctly', () => {
        const chunks: ScoredChunk[] = [
            makeScoredChunk('src/auth/login.ts', 'function_declaration', 'function handleLogin() { return true; }', 0.91),
            makeScoredChunk('src/utils/token.ts', 'function_declaration', 'function parseJWT(t: string) { return t; }', 0.87)
        ];

        const prefix = buildPrefix(chunks);

        assert.ok(prefix.includes('<codebase_context>'));
        assert.ok(prefix.includes('</codebase_context>'));
        assert.ok(prefix.includes('[1] src/auth/login.ts'));
        assert.ok(prefix.includes('[2] src/utils/token.ts'));
        assert.ok(prefix.includes('score: 0.91'));
        assert.ok(prefix.includes('score: 0.87'));
        assert.ok(prefix.includes('```typescript'));
        assert.ok(prefix.includes('handleLogin'));
        assert.ok(prefix.includes('parseJWT'));
    });

    test('buildPrefix returns empty for no chunks', () => {
        const prefix = buildPrefix([]);
        assert.strictEqual(prefix, '');
    });

    test('buildPrefix respects 3000 token limit', () => {
        // Generate large chunks
        const chunks: ScoredChunk[] = [];
        for (let i = 0; i < 20; i++) {
            const code = Array.from({ length: 300 }, (_, j) =>
                `const variable${i}_${j} = ${j}; // some padding text to inflate token count`
            ).join('\n');
            chunks.push(makeScoredChunk(`file${i}.ts`, 'function_declaration', code, 0.9 - i * 0.01));
        }

        const prefix = buildPrefix(chunks);

        // Rough token count
        const tokenCount = prefix.split(/[\s]+/).filter(t => t.length > 0).length;
        assert.ok(
            tokenCount <= 3200, // Allow small margin for formatting overhead
            `Prefix should be capped near 3000 tokens, got ${tokenCount}`
        );
    });

    test('buildEnrichedPrompt combines prefix and query', () => {
        const chunks: ScoredChunk[] = [
            makeScoredChunk('src/foo.ts', 'function_declaration', 'function foo() {}', 0.95)
        ];

        const prompt = buildEnrichedPrompt(chunks, 'How does foo work?');
        assert.ok(prompt.includes('<codebase_context>'));
        assert.ok(prompt.includes('User query: How does foo work?'));
    });

    test('buildEnrichedPrompt returns raw query when no chunks', () => {
        const prompt = buildEnrichedPrompt([], 'What is this project?');
        assert.strictEqual(prompt, 'What is this project?');
    });

    test('buildContextSummary formats correctly', () => {
        const chunks: ScoredChunk[] = [
            makeScoredChunk('src/a.ts', 'function_declaration', 'code', 0.92)
        ];

        const summary = buildContextSummary(chunks);
        assert.ok(summary.includes('📎'));
        assert.ok(summary.includes('Context injected'));
        assert.ok(summary.includes('src/a.ts'));
        assert.ok(summary.includes('0.92'));
    });

    test('buildContextSummary handles empty chunks', () => {
        const summary = buildContextSummary([]);
        assert.ok(summary.includes('No relevant context found'));
    });
});
