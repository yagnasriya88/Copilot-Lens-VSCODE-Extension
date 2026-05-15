import * as vscode from 'vscode';
import { VectorStore } from './ragEngine/vectorStore';
import { Indexer } from './ragEngine/indexer';
import { Retriever } from './ragEngine/retriever';
import { registerChatParticipant } from './chatParticipant';
import { createFileWatcher } from './utils/fileWatcher';
import { initLogger, info, error } from './utils/logger';

let statusBarItem: vscode.StatusBarItem;
let indexer: Indexer;

/**
 * Activates the Copilot RAG Context Injector extension.
 *
 * Lifecycle:
 * 1. Shows "Indexing..." status bar
 * 2. Indexes the workspace (AST chunking + embedding)
 * 3. Registers the @RAG chat participant
 * 4. Sets up file watchers for incremental re-indexing
 * 5. Registers the manual re-index command
 *
 * @param context - The VS Code extension context.
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
    // Initialize logger
    initLogger(context);
    info('Copilot RAG Context Injector activating...');

    // Check for GitHub Copilot
    const copilotExtension = vscode.extensions.getExtension('GitHub.copilot-chat');
    if (!copilotExtension) {
        vscode.window.showWarningMessage(
            'Copilot RAG Injector: GitHub Copilot Chat extension is not installed. ' +
            'The @RAG participant will still work, but may not have an LLM to stream responses to.'
        );
    }

    // Create status bar
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = '$(sync~spin) RAG: Indexing...';
    statusBarItem.tooltip = 'Copilot RAG Context Injector — indexing workspace';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Initialize core components
    const vectorStore = new VectorStore();
    indexer = new Indexer(vectorStore, context.extensionPath);
    const retriever = new Retriever(vectorStore);

    // Index workspace (async, non-blocking for activation)
    indexWorkspaceWithProgress(vectorStore).catch(err => {
        error('Initial indexing failed', err);
        statusBarItem.text = '$(warning) RAG: Index failed';
        statusBarItem.tooltip = 'Indexing failed. Click to re-index.';
    });

    // Register chat participant
    registerChatParticipant(context, retriever);

    // Register file watcher for incremental re-indexing
    createFileWatcher(context, async (uris) => {
        statusBarItem.text = '$(sync~spin) RAG: Updating...';
        try {
            await indexer.reindexFiles(uris);
            statusBarItem.text = `$(database) RAG: ${vectorStore.size} chunks`;
        } catch (err) {
            error('Incremental re-index failed', err);
        }
    });

    // Register re-index command
    const reindexCmd = vscode.commands.registerCommand(
        'copilot-rag-injector.reindex',
        async () => {
            vectorStore.clear();
            await indexWorkspaceWithProgress(vectorStore);
        }
    );
    context.subscriptions.push(reindexCmd);

    // Set status bar command to trigger re-index
    statusBarItem.command = 'copilot-rag-injector.reindex';

    info('Copilot RAG Context Injector activated');
}

/**
 * Runs workspace indexing with a VS Code progress notification.
 */
async function indexWorkspaceWithProgress(vectorStore: VectorStore): Promise<void> {
    await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Notification,
            title: 'RAG: Indexing workspace',
            cancellable: true
        },
        async (progress, token) => {
            await indexer.indexWorkspace(token, progress);
            statusBarItem.text = `$(database) RAG: ${vectorStore.size} chunks`;
            statusBarItem.tooltip = `Copilot RAG Context Injector — ${vectorStore.size} chunks indexed`;
        }
    );
}

/**
 * Deactivates the extension.
 * Persists the embedding cache to disk for faster reactivation.
 */
export async function deactivate(): Promise<void> {
    info('Copilot RAG Context Injector deactivating...');

    try {
        await indexer?.persistCache();
    } catch (err) {
        error('Failed to persist cache on deactivation', err);
    }
}
