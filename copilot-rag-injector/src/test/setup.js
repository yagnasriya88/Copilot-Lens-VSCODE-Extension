// Mock vscode module BEFORE any test files try to import it
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  if (id === 'vscode') {
    return {
      workspace: {
        getConfiguration: (_section) => ({
          get: (_key, defaultValue) => defaultValue,
          update: async (_key, _value, _target) => {},
        }),
        findFiles: async (_include, _exclude, _maxResults) => [],
        onDidChangeConfiguration: () => ({ dispose: () => {} }),
        onDidCreateFiles: () => ({ dispose: () => {} }),
        onDidDeleteFiles: () => ({ dispose: () => {} }),
        onDidSaveTextDocument: () => ({ dispose: () => {} }),
      },
      window: {
        showInformationMessage: async (_message) => undefined,
        showErrorMessage: async (_message) => undefined,
        createOutputChannel: () => ({
          append: () => {},
          appendLine: () => {},
          show: () => {},
          dispose: () => {},
        }),
      },
      commands: {
        registerCommand: (_command, _callback) => ({ dispose: () => {} }),
        executeCommand: async (_command, ..._args) => undefined,
      },
      Uri: {
        file: (path) => ({ fsPath: path }),
      },
      CancellationTokenSource: class {
        cancel() {}
        dispose() {}
      },
    };
  }
  return originalRequire.apply(this, arguments);
};
