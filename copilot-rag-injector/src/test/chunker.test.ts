import * as assert from 'assert';
import { slidingWindowChunk } from '../ragEngine/chunker';

suite('Chunker Tests', () => {
    test('slidingWindowChunk produces correct chunks', () => {
        const lines: string[] = [];
        for (let i = 0; i < 100; i++) {
            lines.push(`const line${i} = ${i}; // some code on line ${i}`);
        }
        const source = lines.join('\n');

        const chunks = slidingWindowChunk(source, 'test.go', 'go', 40, 10);

        // Should produce multiple chunks
        assert.ok(chunks.length > 1, `Expected multiple chunks, got ${chunks.length}`);

        // First chunk starts at line 0
        assert.strictEqual(chunks[0].startLine, 0);
        assert.strictEqual(chunks[0].endLine, 39);

        // All chunks should have the correct filePath
        for (const chunk of chunks) {
            assert.strictEqual(chunk.filePath, 'test.go');
            assert.strictEqual(chunk.language, 'go');
            assert.strictEqual(chunk.nodeType, 'sliding_window');
        }

        // Overlap: second chunk should start at line 30 (40 - 10)
        assert.strictEqual(chunks[1].startLine, 30);
    });

    test('slidingWindowChunk skips empty content', () => {
        const chunks = slidingWindowChunk('', 'empty.txt', 'text');
        assert.strictEqual(chunks.length, 0);
    });

    test('slidingWindowChunk handles small files', () => {
        const source = 'const x = 1;\nconst y = 2;\nconst z = 3;\nfunction foo() { return x + y + z; }\nconsole.log(foo());';
        const chunks = slidingWindowChunk(source, 'small.js', 'javascript', 40, 10);
        assert.strictEqual(chunks.length, 1);
        assert.strictEqual(chunks[0].startLine, 0);
    });

    test('chunk IDs are unique and well-formed', () => {
        const lines = Array.from({ length: 80 }, (_, i) => `line ${i}`).join('\n');
        const chunks = slidingWindowChunk(lines, 'test.py', 'python', 40, 10);
        const ids = new Set(chunks.map(c => c.id));
        assert.strictEqual(ids.size, chunks.length, 'All chunk IDs should be unique');

        for (const chunk of chunks) {
            assert.ok(chunk.id.startsWith('test.py#'), `ID should start with file path: ${chunk.id}`);
        }
    });
});
