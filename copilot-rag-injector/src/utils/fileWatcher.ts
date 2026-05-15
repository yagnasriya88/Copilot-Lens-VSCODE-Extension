import * as vscode from 'vscode';
import * as logger from './logger';

/** Callback invoked when files change that need re-indexing. */
export type FileChangeHandler = (uris: vscode.Uri[]) => Promise<void>;

/**
 * Creates a file system watcher that triggers re-indexing on file changes.
 * Respects the autoReindex configuration setting.
 * @param context - The VS Code extension context.
 * @param onFilesChanged - Handler called with changed file URIs.
 * @returns A disposable for the watcher.
 */
export function createFileWatcher(
    context: vscode.ExtensionContext,
    onFilesChanged: FileChangeHandler
): vscode.Disposable {
    const disposables: vscode.Disposable[] = [];
    const pendingChanges = new Map<string, vscode.Uri>();
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;

    const supportedExtensions = [
        '.ts', '.tsx', '.js', '.jsx', '.py', '.rs', '.go', '.java', '.cpp', '.c'
    ];

    const watcher = vscode.workspace.createFileSystemWatcher('**/*');
    disposables.push(watcher);

    function isSupportedFile(uri: vscode.Uri): boolean {
        return supportedExtensions.some(ext => uri.fsPath.endsWith(ext));
    }

    function isExcluded(uri: vscode.Uri): boolean {
        const config = vscode.workspace.getConfiguration('copilot-rag-injector');
        const excludePatterns: string[] = config.get('excludePatterns', [
            '**/node_modules/**', '**/dist/**', '**/.git/**', '**/build/**', '**/*.min.js'
        ]);
        const relativePath = vscode.workspace.asRelativePath(uri);
        return excludePatterns.some(pattern => {
            const regex = globToRegex(pattern);
            return regex.test(relativePath);
        });
    }

    function scheduleReindex(): void {
        const config = vscode.workspace.getConfiguration('copilot-rag-injector');
        const autoReindex = config.get<boolean>('autoReindex', true);
        if (!autoReindex) { return; }

        if (debounceTimer !== undefined) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
            const uris = Array.from(pendingChanges.values());
            pendingChanges.clear();
            if (uris.length > 0) {
                logger.info(`File watcher: re-indexing ${uris.length} changed file(s)`);
                try {
                    await onFilesChanged(uris);
                } catch (err) {
                    logger.error('File watcher: re-index failed', err);
                }
            }
        }, 1500);
    }

    function handleChange(uri: vscode.Uri): void {
        if (!isSupportedFile(uri) || isExcluded(uri)) { return; }
        pendingChanges.set(uri.fsPath, uri);
        scheduleReindex();
    }

    watcher.onDidChange(handleChange);
    watcher.onDidCreate(handleChange);
    watcher.onDidDelete((uri) => {
        if (!isSupportedFile(uri)) { return; }
        pendingChanges.set(uri.fsPath, uri);
        scheduleReindex();
    });

    const disposable = vscode.Disposable.from(...disposables, {
        dispose() {
            if (debounceTimer !== undefined) {
                clearTimeout(debounceTimer);
            }
        }
    });

    context.subscriptions.push(disposable);
    return disposable;
}

/**
 * Converts a simple glob pattern to a regex.
 * Handles `**`, `*`, and `?`.
 */
function globToRegex(glob: string): RegExp {
    let regex = glob
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*\*/g, '<<<GLOBSTAR>>>')
        .replace(/\*/g, '[^/]*')
        .replace(/<<<GLOBSTAR>>>/g, '.*')
        .replace(/\?/g, '.');
    return new RegExp(`^${regex}$`);
}
