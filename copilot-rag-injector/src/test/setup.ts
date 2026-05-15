/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

// Mock vscode module BEFORE any test files try to import it
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id: string) {
  if (id === 'vscode') {
    return {
      workspace: {
        getConfiguration: (_section?: string) => ({
          get: (_key: string, defaultValue?: any) => defaultValue,
          update: async (_key: string, _value: any, _target?: any) => {},
        }),
        findFiles: async (_include: string, _exclude?: string, _maxResults?: number) => [],
        onDidChangeConfiguration: () => ({ dispose: () => {} }),
        onDidCreateFiles: () => ({ dispose: () => {} }),
        onDidDeleteFiles: () => ({ dispose: () => {} }),
        onDidSaveTextDocument: () => ({ dispose: () => {} }),
      },
      window: {
        showInformationMessage: async (_message: string) => undefined,
        showErrorMessage: async (_message: string) => undefined,
        createOutputChannel: () => ({
          append: () => {},
          appendLine: () => {},
          show: () => {},
          dispose: () => {},
        }),
      },
      commands: {
        registerCommand: (_command: string, _callback: any) => ({ dispose: () => {} }),
        executeCommand: async (_command: string, ..._args: any[]) => undefined,
      },
      Uri: {
        file: (path: string) => ({ fsPath: path }),
      },
      CancellationTokenSource: class {
        cancel() {}
        dispose() {}
      },
    };
  }
  return originalRequire.apply(this, arguments);
};

export {};



