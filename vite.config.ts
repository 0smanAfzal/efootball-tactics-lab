import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` must match the GitHub repository name so assets resolve on GitHub Pages.
export default defineConfig({
  base: '/efootball-tactics-lab/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
