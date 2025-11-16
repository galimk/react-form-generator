import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
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
  build: {
    target: 'es2015'
  }
});
