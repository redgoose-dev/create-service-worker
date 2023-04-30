import fs from 'fs'
import path from 'path'
import { build } from 'esbuild'

const __dirname = path.resolve('./')
const defaultBuildOptions = {
  platform: 'node',
  bundle: true,
  minify: true,
  format: 'esm',
}

// reset bundle
async function resetBundle()
{
  fs.rmSync(`${__dirname}/bundle`, {
    recursive: true,
    force: true,
  })
  fs.mkdirSync(`${__dirname}/bundle`)
}

// build createServiceWorker
async function buildCreateServiceWorker()
{
  await build({
    ...defaultBuildOptions,
    entryPoints: [ `${__dirname}/src/index.js` ],
    outfile: `${__dirname}/bundle/index.js`,
  })
}

// build vite plugin
async function buildVitePlugin()
{
  await build({
    ...defaultBuildOptions,
    entryPoints: [ `${__dirname}/src/vite/plugin.js` ],
    outfile: `${__dirname}/bundle/vite.plugin.js`,
  })
}

// copy files
async function copyFiles()
{
  fs.copyFileSync(`${__dirname}/src/index.d.ts`, `${__dirname}/bundle/index.d.ts`)
}

// play build
await resetBundle()
await buildCreateServiceWorker()
await buildVitePlugin()
await copyFiles()
