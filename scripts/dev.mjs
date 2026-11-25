import { spawn } from 'node:child_process';
const run = (f, a = []) => spawn('node', [f, ...a], { stdio: 'inherit' });
run('scripts/build.mjs', ['--watch']); setTimeout(() => run('scripts/serve.mjs'), 1500);
