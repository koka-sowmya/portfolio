// Production build: bundles src/main.tsx with esbuild, copies public/ and index.html into dist/.
import { build, context } from 'esbuild';
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const profile = ['jpg', 'jpeg', 'png', 'webp'].map((e) => `profile.${e}`).find((f) => existsSync(resolve(root, 'public/images', f)));
const watch = process.argv.includes('--watch');
const opts = {
  entryPoints: [resolve(root, 'src/main.tsx')],
  bundle: true, format: 'esm', target: 'es2022', jsx: 'automatic',
  outdir: resolve(root, 'dist/assets'), entryNames: 'app', sourcemap: watch,
  minify: !watch, alias: { '@': resolve(root, 'src') },
  define: { __PROFILE_IMAGE__: JSON.stringify(profile ? `/images/${profile}` : null), 'process.env.NODE_ENV': watch ? '"development"' : '"production"' },
  logLevel: 'info',
};
export async function copyStatic() {
  cpSync(resolve(root, 'public'), resolve(root, 'dist'), { recursive: true });
  writeFileSync(resolve(root, 'dist/index.html'), readFileSync(resolve(root, 'index.html'), 'utf8'));
}
rmSync(resolve(root, 'dist'), { recursive: true, force: true });
mkdirSync(resolve(root, 'dist'), { recursive: true });
if (watch) {
  const ctx = await context(opts);
  await ctx.watch(); await copyStatic();
} else {
  await build(opts); await copyStatic();
  console.log('Build complete → dist/');
}
