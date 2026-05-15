import * as vscode from 'vscode';
import { Retriever } from './ragEngine/retriever';
import { buildEnrichedPrompt, buildContextSummary } from './contextBuilder';
import * as logger from './utils/logger';

/**
 * Registers the RAG chat participant with VS Code's Chat API.
 * Users invoke it as @RAG in Copilot Chat.
 *
 * @param context - The VS Code extension context.
 * @param retriever - The configured retriever instance.
 * @returns The created chat participant disposable.
 */
export function registerChatParticipant(
    context: vscode.ExtensionContext,
    retriever: Retriever
): vscode.Disposable {
    const participant = vscode.chat.createChatParticipant(
        'copilot-rag-injector.assistant',
        async (
            request: vscode.ChatRequest,
            _context: vscode.ChatContext,
            stream: vscode.ChatResponseStream,
            token: vscode.CancellationToken
        ) => {
            await handleChatRequest(request, stream, token, retriever);
        }
    );

    participant.iconPath = new vscode.ThemeIcon('database');

    context.subscriptions.push(participant);
    return participant;
}

/**
 * Handles an incoming chat request by retrieving context and streaming an LLM response.
 */
async function handleChatRequest(
    request: vscode.ChatRequest,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
    retriever: Retriever
): Promise<void> {
    const query = request.prompt;

    if (!query.trim()) {
        stream.markdown('Please provide a query to search the codebase.');
        return;
    }

    if (token.isCancellationRequested) { return; }

    // Step 1: Retrieve relevant code chunks
    logger.info(`Chat query: "${query.slice(0, 80)}..."`);
    stream.progress('Searching codebase for relevant context...');

    let chunks;
    try {
        chunks = await retriever.retrieve(query);
    } catch (err) {
        logger.error('Retrieval failed', err);
        stream.markdown('⚠️ Failed to search the codebase. Please try re-indexing with the "RAG: Re-index Workspace" command.');
        return;
    }

    if (token.isCancellationRequested) { return; }

    // Step 2: Show context summary
    const summary = buildContextSummary(chunks);
    stream.markdown(summary + '\n\n---\n\n');

    // Step 3: Build enriched prompt
    const enrichedPrompt = buildEnrichedPrompt(chunks, query);

    // Step 4: Get LLM model and stream response
    try {
        const models = await vscode.lm.selectChatModels({
            vendor: 'copilot',
            family: 'gpt-4o'
        });

        if (models.length === 0) {
            // Try any copilot model
            const fallbackModels = await vscode.lm.selectChatModels({ vendor: 'copilot' });
            if (fallbackModels.length === 0) {
                stream.markdown(
                    '⚠️ No Copilot language model found. Please ensure GitHub Copilot is installed and active.'
                );
                return;
            }
            await streamModelResponse(fallbackModels[0], enrichedPrompt, stream, token);
        } else {
            await streamModelResponse(models[0], enrichedPrompt, stream, token);
        }
    } catch (err) {
        if (token.isCancellationRequested) { return; }
        logger.error('LLM streaming failed', err);
        stream.markdown('⚠️ Failed to get a response from the language model.');
    }
}

/**
 * Streams a language model response to the chat stream.
 */
async function streamModelResponse(
    model: vscode.LanguageModelChat,
    prompt: string,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken
): Promise<void> {
    const messages = [
        vscode.LanguageModelChatMessage.User(prompt)
    ];

    const response = await model.sendRequest(messages, {}, token);

    for await (const fragment of response.text) {
        if (token.isCancellationRequested) { break; }
        stream.markdown(fragment);
    }
}
