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
  resolve: {
    alias: {
      React: 'react'
    }
  },
  build: {
    target: 'es2015'
  }
});
