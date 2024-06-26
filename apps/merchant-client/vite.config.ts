/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
    cacheDir: '../../node_modules/.vite/merchant-client',

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

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      root: '../../',
    //    }),
    //  ],
    // },
    //

    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
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
