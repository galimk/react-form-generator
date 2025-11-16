import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    viteCommonjs(),
    react({
      include: '**/*.{js,jsx}',
      jsxRuntime: 'classic',
      fastRefresh: false,
      babel: {
        presets: [
          ['@babel/preset-env', { targets: { ie: '11' } }],
          ['@babel/preset-react', { runtime: 'classic' }]
        ]
      }
    })
  ],
  esbuild: {
    // Treat legacy .js modules inside src/ as JSX so esbuild's dependency
    // scanner (used by optimizeDeps and ssr) parses them correctly.
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  resolve: {
    alias: {
      React: 'react'
    }
  },
  optimizeDeps: {
    // Explicitly limit dependency scanning to the main HTML entry; otherwise
    // Vite tries to crawl the legacy component HTML stubs and fails before the
    // JSX loader override above can take effect.
    entries: ['index.html']
  },
  build: {
    target: 'es2015'
  }
});
