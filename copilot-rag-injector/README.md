# Copilot RAG Context Injector

Enhances GitHub Copilot Chat with **Cursor-style codebase awareness** by injecting AST-parsed RAG context at query time. When you ask `@RAG` a question, it searches your entire codebase for semantically relevant code and injects it into the prompt — giving Copilot deep project understanding.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      VS Code Extension Host                     │
│                                                                 │
│  ┌──────────────┐     ┌────────────────────────────────────┐    │
│  │ File Watcher │────>│           Indexer                   │    │
│  │ (on save)    │     │  1. Walk workspace (respect .git-   │    │
│  └──────────────┘     │     ignore + exclude patterns)      │    │
│                       │  2. Read supported files             │    │
│                       │  3. Chunk via Tree-sitter AST        │    │
│                       │  4. Embed via all-MiniLM-L6-v2       │    │
│                       │  5. Store in VectorStore              │    │
│                       └──────────────┬─────────────────────┘    │
│                                      │                          │
│                                      v                          │
│                       ┌────────────────────────────────────┐    │
│                       │         VectorStore                 │    │
│                       │  Map<chunkId, {chunk, embedding}>   │    │
│                       │  Cosine similarity search            │    │
│                       └──────────────┬─────────────────────┘    │
│                                      │                          │
│  ┌──────────────┐                    │                          │
│  │   @RAG Chat  │     ┌─────────────v──────────────────────┐   │
│  │  Participant │────>│          Retriever                   │   │
│  │  (user query)│     │  1. Embed query                      │   │
│  └──────┬───────┘     │  2. Over-fetch (topK × 3)            │   │
│         │             │  3. Dedupe (max 2 per file)           │   │
│         │             │  4. Re-rank (boost active file)       │   │
│         │             │  5. Return top-K                      │   │
│         │             └──────────────┬─────────────────────┘   │
│         │                            │                          │
│         │             ┌──────────────v─────────────────────┐    │
│         │             │       Context Builder               │    │
│         │             │  Format chunks as markdown prefix    │    │
│         │             │  Cap at 3000 tokens                  │    │
│         │             └──────────────┬─────────────────────┘    │
│         │                            │                          │
│         v                            v                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                  Copilot LLM (GPT-4o)                    │    │
│  │  Receives: <codebase_context> + User query               │    │
│  │  Streams response back to chat                            │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## RAG Pipeline (End-to-End)

### Indexing Phase (on activation + file save)
1. **File Discovery** — Walks the workspace using `vscode.workspace.findFiles()`, respecting `.gitignore` and configured exclude patterns. Skips `node_modules`, `.git`, `dist`, `build`, `*.min.js`, and files > 500KB.
2. **AST Chunking** — Each supported file is parsed with **Tree-sitter** (WASM-based). The AST is walked and only semantically meaningful nodes are extracted: functions, classes, methods, exports (language-specific). Unsupported languages fall back to sliding-window line chunking.
3. **Embedding** — Each chunk's source code is embedded using **all-MiniLM-L6-v2** via `@xenova/transformers` (ONNX Runtime, fully local). Produces 384-dim normalized vectors. Processed in batches of 20.
4. **Storage** — Chunk + embedding pairs are stored in an in-memory `VectorStore`. Embeddings are cached to `.vscode/rag-cache.json` for fast reload.

### Query Phase (on @RAG invocation)
1. **Query Embedding** — The user's chat message is embedded with the same model.
2. **Vector Search** — Cosine similarity search over all chunks, over-fetching 3× the requested top-K.
3. **Deduplication** — Max 2 chunks per file to ensure diversity.
4. **Re-ranking** — Chunks from the active editor file get a +0.1 score boost.
5. **Context Building** — Top-K chunks are formatted as numbered, fenced code blocks with metadata, capped at 3000 tokens.
6. **LLM Streaming** — The enriched prompt (context + query) is sent to Copilot's GPT-4o model, and the response is streamed back to chat.

## Setup

### Prerequisites
- VS Code 1.90+
- GitHub Copilot Chat extension installed
- Node.js 18+

### Install & Build

```bash
cd copilot-rag-injector
npm install
npm run compile
```

### Development

```bash
# Watch mode (auto-rebuild on changes)
npm run watch

# Press F5 in VS Code to launch Extension Development Host
```

### Production Build

```bash
npm run build
```

## Usage

1. Open a workspace in VS Code
2. The extension auto-indexes on activation (status bar shows progress)
3. Open Copilot Chat and type `@RAG <your question>`
4. The extension searches your codebase, injects relevant context, and streams an answer

### Commands

| Command | Description |
|---------|-------------|
| `RAG: Re-index Workspace` | Manually triggers a full workspace re-index |

### Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `copilot-rag-injector.topK` | `5` | Number of code chunks to inject |
| `copilot-rag-injector.maxTokensPerChunk` | `512` | Max tokens per chunk before splitting |
| `copilot-rag-injector.excludePatterns` | `["**/node_modules/**", ...]` | Glob patterns to exclude |
| `copilot-rag-injector.embeddingModel` | `"local"` | `"local"` (ONNX) or `"openai"` |
| `copilot-rag-injector.autoReindex` | `true` | Re-index on file save |

## Supported Languages

| Language | AST Chunking | Node Types |
|----------|-------------|------------|
| TypeScript/JavaScript | Tree-sitter | functions, classes, methods, exports |
| Python | Tree-sitter | functions, classes, decorated definitions |
| Rust | Tree-sitter | functions, impls, structs, traits |
| Go, Java, C, C++ | Sliding window | 40-line windows with 10-line overlap |

## Project Structure

```
copilot-rag-injector/
├── package.json                    # Extension manifest
├── tsconfig.json                   # TypeScript config
├── esbuild.js                      # Bundle build script
├── .vscodeignore                   # Packaging exclusions
├── src/
│   ├── extension.ts               # Activation entry point
│   ├── chatParticipant.ts         # @RAG chat participant
│   ├── contextBuilder.ts          # Prompt prefix formatter
│   ├── ragEngine/
│   │   ├── indexer.ts             # Workspace file walker + orchestrator
│   │   ├── chunker.ts            # Tree-sitter AST chunker
│   │   ├── embedder.ts           # Local ONNX embeddings
│   │   ├── vectorStore.ts        # In-memory cosine similarity store
│   │   └── retriever.ts          # Top-K retrieval + re-ranking
│   ├── treeSitter/
│   │   ├── parser.ts             # Tree-sitter WASM initialization
│   │   └── languages.ts          # Language configs + detection
│   ├── utils/
│   │   ├── fileWatcher.ts        # Incremental re-indexing on save
│   │   └── logger.ts             # Output channel logger
│   └── test/
│       ├── chunker.test.ts
│       ├── vectorStore.test.ts
│       ├── retriever.test.ts
│       └── contextBuilder.test.ts
└── dist/                           # Built output (esbuild bundle + WASMs)
```

## Known Limitations

1. **First-run model download** — `@xenova/transformers` downloads the ONNX model (~23MB) on first use. Subsequent loads are cached.
2. **In-memory vector store** — All embeddings live in memory. For very large codebases (>10k files), this can consume significant RAM.
3. **No BM25 hybrid search** — Currently pure vector search. Combining with BM25 (keyword) search would improve retrieval for exact identifier matches.
4. **Limited language support** — Only JS/TS, Python, and Rust get AST-based chunking. Other languages use basic sliding window.
5. **Single workspace folder** — Cache persistence only uses the first workspace folder.

## Suggested Improvements

- **BM25 Hybrid Search** — Add a keyword-based BM25 index and combine scores with vector search for better retrieval accuracy.
- **Persistent SQLite Store** — Replace in-memory `Map` with `better-sqlite3` or `sql.js` for persistence and reduced memory usage.
- **OpenAI Embeddings** — Support `text-embedding-3-small` for higher-quality embeddings (requires API key).
- **Incremental AST Diff** — Only re-chunk changed AST nodes instead of re-processing entire files.
- **Cross-file Reference Graphs** — Use import/export analysis to boost chunks that are dependency-related to the active file.
- **Configurable Chunking Strategies** — Let users choose between AST, sliding window, or hybrid chunking per language.

## License

MIT
