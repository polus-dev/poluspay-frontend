
      /// <reference types="vitest" />
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import viteTsConfigPaths from 'vite-tsconfig-paths';
      import {reactScopedCssPlugin} from "rollup-plugin-react-scoped-css";
      import svgr from "vite-plugin-svgr";


      export default defineConfig({
        cacheDir: '../../node_modules/.vite/admin',

    server:{
      port: 4200,
      host: 'localhost',
    },

    preview:{
      port: 4300,
      host: 'localhost',
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

        define: {
    'import.meta.vitest': undefined
  },
        test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    includeSource: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },
      });
