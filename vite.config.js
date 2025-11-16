import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    viteCommonjs(),
    react({
      include: ['src/**/*.{js,jsx}'],
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
  resolve: {
    alias: {
      React: 'react'
    }
  },
  optimizeDeps: {
    // Explicitly limit dependency scanning to the main HTML entry; otherwise
    // Vite tries to crawl the legacy component HTML stubs and fails before the
    // JSX loader override above can take effect.
    entries: ['index.html'],
    esbuildOptions: {
      // Force esbuild (used during dependency optimization) to parse every
      // `.js` file as JSX so the legacy React 0.14 components don't crash the
      // scan step before Babel/@vitejs/plugin-react run.
      loader: {
        '.js': 'jsx'
      }
    }
  },
  build: {
    target: 'es2015'
  }
});
