
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { existsSync } from 'node:fs';

const BASE = '/portfolio/';
const extensions = ['jpg', 'jpeg', 'png', 'webp'];

const profile = extensions
  .map((ext) => `profile.${ext}`)
  .find((file) =>
    existsSync(path.resolve(import.meta.dirname, 'public/images', file))
  );

export default defineConfig({
  base: BASE,

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },

  define: {
    __PROFILE_IMAGE__: JSON.stringify(
      profile ? `${BASE}images/${profile}` : null
    ),
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
