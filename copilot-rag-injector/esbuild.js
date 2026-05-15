// @ts-check
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const isProduction = process.argv.includes('--production');
const isWatch = process.argv.includes('--watch');

/** @type {esbuild.Plugin} */
const copyWasmPlugin = {
    name: 'copy-wasm',
    setup(build) {
        build.onEnd(() => {
            const distDir = path.resolve(__dirname, 'dist');
            if (!fs.existsSync(distDir)) {
                fs.mkdirSync(distDir, { recursive: true });
            }

            // Copy web-tree-sitter WASM
            const treeSitterWasm = path.resolve(__dirname, 'node_modules', 'web-tree-sitter', 'tree-sitter.wasm');
            if (fs.existsSync(treeSitterWasm)) {
                fs.copyFileSync(treeSitterWasm, path.join(distDir, 'tree-sitter.wasm'));
            }

            // Copy language WASM files from tree-sitter-wasms if available
            const wasmDir = path.resolve(__dirname, 'node_modules', 'tree-sitter-wasms', 'out');
            if (fs.existsSync(wasmDir)) {
                const wasmFiles = fs.readdirSync(wasmDir).filter(f => f.endsWith('.wasm'));
                for (const file of wasmFiles) {
                    fs.copyFileSync(path.join(wasmDir, file), path.join(distDir, file));
                }
            }
        });
    }
};

/** @type {esbuild.Plugin} */
const esbuildProblemMatcher = {
    name: 'esbuild-problem-matcher',
    setup(build) {
        build.onStart(() => {
            console.log('[watch] build started');
        });
        build.onEnd(result => {
            for (const { text, location } of result.errors) {
                console.error(`✘ [ERROR] ${text}`);
                if (location) {
                    console.error(`    ${location.file}:${location.line}:${location.column}:`);
                }
            }
            console.log('[watch] build finished');
        });
    }
};

async function main() {
    /** @type {esbuild.BuildOptions} */
    const buildOptions = {
        entryPoints: ['src/extension.ts'],
        bundle: true,
        format: 'cjs',
        minify: isProduction,
        sourcemap: !isProduction,
        sourcesContent: false,
        platform: 'node',
        target: 'node18',
        outfile: 'dist/extension.js',
        external: [
            'vscode'
        ],
        loader: {
            '.wasm': 'file',
            '.node': 'file'
        },
        plugins: [
            copyWasmPlugin,
            ...(isWatch ? [esbuildProblemMatcher] : [])
        ],
        logLevel: 'silent',
        metafile: true
    };

    if (isWatch) {
        const ctx = await esbuild.context(buildOptions);
        await ctx.watch();
        console.log('Watching for changes...');
    } else {
        const result = await esbuild.build(buildOptions);
        if (result.metafile) {
            console.log(await esbuild.analyzeMetafile(result.metafile, { verbose: false }));
        }
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
