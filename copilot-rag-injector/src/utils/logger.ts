import * as vscode from 'vscode';

/** Log levels for the extension logger. */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};

let outputChannel: vscode.OutputChannel | undefined;
let currentLevel: LogLevel = 'info';

/**
 * Initializes the output channel for logging.
 * @param context - The VS Code extension context.
 */
export function initLogger(context: vscode.ExtensionContext): void {
    outputChannel = vscode.window.createOutputChannel('Copilot RAG Injector');
    context.subscriptions.push(outputChannel);
}

/**
 * Sets the minimum log level.
 * @param level - The log level to set.
 */
export function setLogLevel(level: LogLevel): void {
    currentLevel = level;
}

function shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLevel];
}

function formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Logs a debug message.
 * @param message - The message to log.
 * @param args - Additional arguments to log.
 */
export function debug(message: string, ...args: unknown[]): void {
    if (!shouldLog('debug')) { return; }
    const formatted = formatMessage('debug', message);
    outputChannel?.appendLine(formatted);
    if (args.length > 0) {
        outputChannel?.appendLine(`  ${JSON.stringify(args)}`);
    }
}

/**
 * Logs an info message.
 * @param message - The message to log.
 * @param args - Additional arguments to log.
 */
export function info(message: string, ...args: unknown[]): void {
    if (!shouldLog('info')) { return; }
    const formatted = formatMessage('info', message);
    outputChannel?.appendLine(formatted);
    if (args.length > 0) {
        outputChannel?.appendLine(`  ${JSON.stringify(args)}`);
    }
}

/**
 * Logs a warning message.
 * @param message - The message to log.
 * @param args - Additional arguments to log.
 */
export function warn(message: string, ...args: unknown[]): void {
    if (!shouldLog('warn')) { return; }
    const formatted = formatMessage('warn', message);
    outputChannel?.appendLine(formatted);
    if (args.length > 0) {
        outputChannel?.appendLine(`  ${JSON.stringify(args)}`);
    }
}

/**
 * Logs an error message.
 * @param message - The message to log.
 * @param error - Optional error object.
 */
export function error(message: string, error?: unknown): void {
    if (!shouldLog('error')) { return; }
    const formatted = formatMessage('error', message);
    outputChannel?.appendLine(formatted);
    if (error instanceof Error) {
        outputChannel?.appendLine(`  ${error.message}`);
        if (error.stack) {
            outputChannel?.appendLine(`  ${error.stack}`);
        }
    } else if (error !== undefined) {
        outputChannel?.appendLine(`  ${JSON.stringify(error)}`);
    }
}
