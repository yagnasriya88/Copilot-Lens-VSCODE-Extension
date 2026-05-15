import * as assert from 'assert';
import { VectorStore } from '../ragEngine/vectorStore';
import type { CodeChunk } from '../ragEngine/chunker';

function makeChunk(id: string, filePath: string, code: string): CodeChunk {
    return {
        id,
        filePath,
        language: 'typescript',
        nodeType: 'function_declaration',
        code,
        startLine: 0,
        endLine: 5
    };
}

function makeEmbedding(values: number[]): Float32Array {
    const arr = new Float32Array(384);
    for (let i = 0; i < values.length && i < 384; i++) {
        arr[i] = values[i];
    }
    return arr;
}

suite('VectorStore Tests', () => {
    let store: VectorStore;

    setup(() => {
        store = new VectorStore();
    });

    test('add and search returns correct results', () => {
        // Create 10 chunks with distinct embeddings
        for (let i = 0; i < 10; i++) {
            const chunk = makeChunk(`chunk-${i}`, `file${i}.ts`, `function f${i}() {}`);
            const emb = makeEmbedding([i / 10, (10 - i) / 10, 0.5]);
            store.add(chunk, emb);
        }

        assert.strictEqual(store.size, 10);

        // Query with embedding close to chunk-9
        const queryEmb = makeEmbedding([0.9, 0.1, 0.5]);
        const results = store.search(queryEmb, 1);

        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].chunk.id, 'chunk-9');
    });

    test('search returns top-K sorted by score descending', () => {
        for (let i = 0; i < 10; i++) {
            const chunk = makeChunk(`chunk-${i}`, `file${i}.ts`, `code ${i}`);
            const emb = makeEmbedding([i * 0.1]);
            store.add(chunk, emb);
        }

        const queryEmb = makeEmbedding([1.0]);
        const results = store.search(queryEmb, 3);

        assert.strictEqual(results.length, 3);
        // Scores should be descending
        assert.ok(results[0].score >= results[1].score);
        assert.ok(results[1].score >= results[2].score);
    });

    test('invalidate removes chunks by filePath', () => {
        store.add(makeChunk('c1', 'file1.ts', 'code1'), makeEmbedding([1, 0]));
        store.add(makeChunk('c2', 'file1.ts', 'code2'), makeEmbedding([0, 1]));
        store.add(makeChunk('c3', 'file2.ts', 'code3'), makeEmbedding([0.5, 0.5]));

        assert.strictEqual(store.size, 3);

        store.invalidate('file1.ts');

        assert.strictEqual(store.size, 1);
        const ids = store.getAllChunkIds();
        assert.ok(ids.includes('c3'));
        assert.ok(!ids.includes('c1'));
        assert.ok(!ids.includes('c2'));
    });

    test('clear removes all entries', () => {
        store.add(makeChunk('c1', 'a.ts', 'x'), makeEmbedding([1]));
        store.add(makeChunk('c2', 'b.ts', 'y'), makeEmbedding([0]));

        store.clear();
        assert.strictEqual(store.size, 0);
    });

    test('search on empty store returns empty array', () => {
        const results = store.search(makeEmbedding([1, 0, 0]), 5);
        assert.strictEqual(results.length, 0);
    });

    test('getAllEntries returns all embeddings for caching', () => {
        const emb1 = makeEmbedding([1, 0]);
        const emb2 = makeEmbedding([0, 1]);
        store.add(makeChunk('c1', 'a.ts', 'x'), emb1);
        store.add(makeChunk('c2', 'b.ts', 'y'), emb2);

        const entries = store.getAllEntries();
        assert.strictEqual(entries.size, 2);
        assert.ok(entries.has('c1'));
        assert.ok(entries.has('c2'));
    });
});
