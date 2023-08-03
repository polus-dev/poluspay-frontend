/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';

export default defineConfig({
    cacheDir: '../../node_modules/.vite/pay-form',
    server: {
        port: 4200,
        host: '0.0.0.0',
    },
    preview: {
        port: 4300,
        host: '0.0.0.0',
    },
    plugins: [
        react(),
        viteTsConfigPaths({
            root: '../../',
        }),
        // @ts-ignore
        reactScopedCssPlugin(),
        svgr({
            svgrOptions: {
                svgo: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    inlineStyles: {
                                        onlyMatchedOnce: false,
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        }),
    ],
    build: {
        outDir: 'build',
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // fix by https://github.com/Uniswap/sdk-core/issues/20#issuecomment-1557317607
            jsbi: path.resolve(
                __dirname,
                '../../',
                'node_modules',
                'jsbi',
                'dist',
                'jsbi-cjs.js'
            ),
        },
    },
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      root: '../../',
    //    }),
    //  ],
    // },
    esbuild: {
        // drop: ['debugger', "console"]
    },
    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});
