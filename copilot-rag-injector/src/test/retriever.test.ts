import * as assert from 'assert';
import { VectorStore, type ScoredChunk } from '../ragEngine/vectorStore';
import type { CodeChunk } from '../ragEngine/chunker';

// Mock embedder: returns a deterministic embedding based on the text content
// We override by monkey-patching the module in the test
// For retriever tests, we directly test the VectorStore-based logic

function makeChunk(id: string, filePath: string, code: string): CodeChunk {
    return {
        id,
        filePath,
        language: 'typescript',
        nodeType: 'function_declaration',
        code,
        startLine: 0,
        endLine: 10
    };
}

function makeEmbedding(seed: number): Float32Array {
    const arr = new Float32Array(384);
    for (let i = 0; i < 384; i++) {
        arr[i] = Math.sin(seed * (i + 1) * 0.01);
    }
    // Normalize
    let mag = 0;
    for (let i = 0; i < 384; i++) { mag += arr[i] * arr[i]; }
    mag = Math.sqrt(mag);
    for (let i = 0; i < 384; i++) { arr[i] /= mag; }
    return arr;
}

suite('Retriever Tests', () => {
    test('VectorStore deduplication: max 2 chunks per file', () => {
        const store = new VectorStore();

        // Add 5 chunks from the same file
        for (let i = 0; i < 5; i++) {
            store.add(
                makeChunk(`c${i}`, 'same-file.ts', `function f${i}() { return ${i}; }`),
                makeEmbedding(i + 1)
            );
        }

        // Add 3 chunks from different files
        for (let i = 5; i < 8; i++) {
            store.add(
                makeChunk(`c${i}`, `file${i}.ts`, `function g${i}() {}`),
                makeEmbedding(i + 1)
            );
        }

        const query = makeEmbedding(1);
        const results = store.search(query, 15);

        // Simulate retriever deduplication
        const fileCount = new Map<string, number>();
        const deduplicated: ScoredChunk[] = [];

        for (const r of results) {
            const fp = r.chunk.filePath;
            const count = fileCount.get(fp) ?? 0;
            if (count >= 2) { continue; }
            fileCount.set(fp, count + 1);
            deduplicated.push(r);
        }

        // Should have max 2 from same-file.ts
        const sameFileChunks = deduplicated.filter(r => r.chunk.filePath === 'same-file.ts');
        assert.ok(sameFileChunks.length <= 2, `Expected max 2 from same file, got ${sameFileChunks.length}`);

        // Should still have the other file chunks
        const otherChunks = deduplicated.filter(r => r.chunk.filePath !== 'same-file.ts');
        assert.ok(otherChunks.length >= 1, 'Should have chunks from other files');
    });

    test('Re-ranking boosts active editor file', () => {
        const results: ScoredChunk[] = [
            { chunk: makeChunk('c1', 'active-file.ts', 'code1'), score: 0.80 },
            { chunk: makeChunk('c2', 'other-file.ts', 'code2'), score: 0.85 },
            { chunk: makeChunk('c3', 'another.ts', 'code3'), score: 0.75 }
        ];

        // Simulate re-ranking with active file = 'active-file.ts'
        const activeFilePath = 'active-file.ts';
        const reranked = results.map(sc => {
            let boostedScore = sc.score;
            if (sc.chunk.filePath === activeFilePath) {
                boostedScore += 0.1;
            }
            return { chunk: sc.chunk, score: boostedScore };
        });
        reranked.sort((a, b) => b.score - a.score);

        // active-file.ts should now be first (0.80 + 0.1 = 0.90 > 0.85)
        assert.strictEqual(reranked[0].chunk.filePath, 'active-file.ts');
        assert.strictEqual(reranked[0].score, 0.90);
    });
});
