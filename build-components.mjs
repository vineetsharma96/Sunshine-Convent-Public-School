import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
await build({entryPoints:['components/site.tsx'],outfile:'vendor/school-components.js',bundle:true,minify:true,format:'iife',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},target:['es2020'],legalComments:'eof'});
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','component-input.css','-o','vendor/component-utilities.css','--minify'],{stdio:'inherit'});
