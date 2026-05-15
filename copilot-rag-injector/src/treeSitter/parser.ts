import * as path from 'path';
import type { SupportedLanguage, LanguageConfig } from './languages';
import * as logger from '../utils/logger';

// web-tree-sitter types
interface TreeSitterParser {
    parse(input: string): TreeSitterTree;
    delete(): void;
}

interface TreeSitterTree {
    rootNode: TreeSitterNode;
    delete(): void;
}

export interface TreeSitterNode {
    type: string;
    text: string;
    startPosition: { row: number; column: number };
    endPosition: { row: number; column: number };
    childCount: number;
    children: TreeSitterNode[];
    namedChildCount: number;
    namedChildren: TreeSitterNode[];
}

interface TreeSitterLanguage {
    // opaque handle
}

interface TreeSitterModule {
    init(wasmPath?: string): Promise<void>;
    Language: {
        load(wasmPath: string): Promise<TreeSitterLanguage>;
    };
    new(): TreeSitterParser;
    prototype: {
        setLanguage(lang: TreeSitterLanguage): void;
    };
}

let treeSitterModule: TreeSitterModule | undefined;
const loadedLanguages = new Map<SupportedLanguage, TreeSitterLanguage>();
let initialized = false;

/**
 * Resolves the directory containing WASM files.
 * In bundled mode, WASM files are in the dist/ folder next to extension.js.
 * @param extensionPath - The root path of the extension.
 */
function getWasmDir(extensionPath: string): string {
    return path.join(extensionPath, 'dist');
}

/**
 * Initializes the Tree-sitter module. Must be called once before parsing.
 * @param extensionPath - The root path of the extension.
 */
export async function initTreeSitter(extensionPath: string): Promise<void> {
    if (initialized) { return; }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const TreeSitter = require('web-tree-sitter') as TreeSitterModule;
    const wasmDir = getWasmDir(extensionPath);
    const treeSitterWasm = path.join(wasmDir, 'tree-sitter.wasm');

    await TreeSitter.init({
        locateFile: () => treeSitterWasm
    } as unknown as string);

    treeSitterModule = TreeSitter;
    initialized = true;
    logger.info('Tree-sitter initialized');
}

/**
 * Loads a language grammar WASM and caches it.
 * @param language - The language configuration.
 * @param extensionPath - The root path of the extension.
 */
async function loadLanguage(language: LanguageConfig, extensionPath: string): Promise<TreeSitterLanguage | undefined> {
    if (loadedLanguages.has(language.id)) {
        return loadedLanguages.get(language.id);
    }

    if (!treeSitterModule) {
        logger.error('Tree-sitter not initialized');
        return undefined;
    }

    const wasmPath = path.join(getWasmDir(extensionPath), language.wasmFile);
    try {
        const lang = await treeSitterModule.Language.load(wasmPath);
        loadedLanguages.set(language.id, lang);
        logger.info(`Loaded Tree-sitter grammar: ${language.id}`);
        return lang;
    } catch (err) {
        logger.error(`Failed to load grammar for ${language.id}`, err);
        return undefined;
    }
}

/**
 * Parses source code with the appropriate Tree-sitter grammar.
 * @param code - The source code string to parse.
 * @param language - The language config for the file.
 * @param extensionPath - The root path of the extension.
 * @returns The root AST node, or undefined on failure.
 */
export async function parseCode(
    code: string,
    language: LanguageConfig,
    extensionPath: string
): Promise<TreeSitterNode | undefined> {
    if (!treeSitterModule) {
        logger.error('Tree-sitter not initialized');
        return undefined;
    }

    const lang = await loadLanguage(language, extensionPath);
    if (!lang) { return undefined; }

    const parser = new treeSitterModule();
    (parser as unknown as { setLanguage(l: TreeSitterLanguage): void }).setLanguage(lang);

    try {
        const tree = parser.parse(code);
        const rootNode = tree.rootNode;
        return rootNode;
    } catch (err) {
        logger.error(`Parse error for ${language.id}`, err);
        return undefined;
    }
}

/**
 * Returns whether Tree-sitter has been initialized.
 */
export function isInitialized(): boolean {
    return initialized;
}

/**
 * Returns the set of currently loaded language IDs.
 */
export function getLoadedLanguages(): SupportedLanguage[] {
    return Array.from(loadedLanguages.keys());
}
