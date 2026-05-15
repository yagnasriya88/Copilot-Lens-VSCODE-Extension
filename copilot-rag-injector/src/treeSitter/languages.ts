/** Supported language identifiers for Tree-sitter parsing. */
export type SupportedLanguage = 'javascript' | 'typescript' | 'python' | 'rust';

/** Configuration for a supported language's AST chunking. */
export interface LanguageConfig {
    /** Language identifier. */
    id: SupportedLanguage;
    /** File extensions that map to this language. */
    extensions: string[];
    /** WASM grammar file name (loaded from dist/). */
    wasmFile: string;
    /** AST node types to extract as top-level chunks. */
    chunkNodeTypes: string[];
}

/** All supported language configurations. */
export const LANGUAGE_CONFIGS: LanguageConfig[] = [
    {
        id: 'javascript',
        extensions: ['.js', '.jsx'],
        wasmFile: 'tree-sitter-javascript.wasm',
        chunkNodeTypes: [
            'function_declaration',
            'arrow_function',
            'class_declaration',
            'method_definition',
            'export_statement'
        ]
    },
    {
        id: 'typescript',
        extensions: ['.ts', '.tsx'],
        wasmFile: 'tree-sitter-typescript.wasm',
        chunkNodeTypes: [
            'function_declaration',
            'arrow_function',
            'class_declaration',
            'method_definition',
            'export_statement'
        ]
    },
    {
        id: 'python',
        extensions: ['.py'],
        wasmFile: 'tree-sitter-python.wasm',
        chunkNodeTypes: [
            'function_definition',
            'class_definition',
            'decorated_definition'
        ]
    },
    {
        id: 'rust',
        extensions: ['.rs'],
        wasmFile: 'tree-sitter-rust.wasm',
        chunkNodeTypes: [
            'function_item',
            'impl_item',
            'struct_item',
            'trait_item'
        ]
    }
];

/**
 * Detects the language for a given file path by extension.
 * @param filePath - Absolute or relative file path.
 * @returns The language config, or undefined for unsupported files.
 */
export function detectLanguage(filePath: string): LanguageConfig | undefined {
    const lowerPath = filePath.toLowerCase();
    // Check TypeScript before JavaScript since .ts must not match .js config
    return LANGUAGE_CONFIGS.find(config =>
        config.extensions.some(ext => lowerPath.endsWith(ext))
    );
}

/**
 * Returns all supported file extensions.
 */
export function getSupportedExtensions(): string[] {
    return LANGUAGE_CONFIGS.flatMap(c => c.extensions);
}
