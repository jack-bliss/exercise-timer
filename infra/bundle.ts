import * as esbuild from 'esbuild';
import { join } from 'path';

esbuild.build({
  entryPoints: [
    join(__dirname, `../src/client/routine-page.tsx`),
    join(__dirname, `../src/client/routine-page.css`),
    join(__dirname, `../src/client/splash.css`),
  ],
  bundle: true,
  minify: false,
  outdir: 'bucket/bundles',
  platform: 'browser',
});
