import * as program from 'commander';
import * as glob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { snippets } from './extract';
import { SnippetRepository } from './SnippetRepository';
import { SnippetsRenderer } from './SnippetsRenderer';
import { update } from './update';

export async function extractSnippets(srcPath: string) {
  const content = await fs.promises.readFile(srcPath, 'utf8');

  const snips = snippets(content);

  return snips;
}

async function buildSnippetCache(srcGlob: string, repo: SnippetRepository) {
  console.log(`Building snippet cache from ${srcGlob}`);
  const files = await glob(srcGlob);

  await Promise.all(files.map(async (inPath) => {
    const snips = await extractSnippets(inPath);

    for (const snip of snips) {
      console.log(`- saving snippet ${snip.id}`);
      await repo.saveSnippet(snip);
    }
  }));
}

export async function updateSnippets(srcPath: string, repo: SnippetRepository, renderer: SnippetsRenderer) {
  const content = await fs.promises.readFile(srcPath, 'utf8');

  const updatedContent = await update(content, repo, renderer);

  if (updatedContent !== content) {
    console.log(`- updating snippet referenes in: ${srcPath}`);
    await fs.promises.writeFile(srcPath, updatedContent, 'utf8');
  }
}

function createSnippetCacheDir(cacheDir: string) {
  if (!fs.existsSync(cacheDir)) {
    console.log(`creating cache dir: ${cacheDir}`);
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}

async function updateDocsSnippets(docsGlob: string, repo: SnippetRepository) {
  console.log(`Updating docs in ${docsGlob}`);
  const files = await glob(docsGlob);

  const renderer = new SnippetsRenderer();

  await Promise.all(files.map(async (inPath) => {
    await updateSnippets(inPath, repo, renderer);
  }));
}

async function main(): Promise<number> {
  program
    .version('0.1.0')
    .description('Builds and updates documentation snippets')
    .option('--src <src>', 'path to src files. Specifying this will rebuild the snippets cache.')
    .option('--srcGlob <srcGlob>', 'glob pattern to filter source files.', 'deployment/model/**/*.dhall')
    .requiredOption('--snips <snips>', 'path to snippet cache directory')
    .option('--docs <docs>', 'path to doc files. Specifying this will update snippets in markdown docs.')
    .option('--docsGlob <docsGlob>', 'glob pattern to filter docs', 'docs/**/*.md')
    .allowUnknownOption(false)
    .parse(process.argv);

  const src = program['src'];
  const srcGlob = program['srcGlob'];
  const snipsPath = program['snips']!!; // it's a requiredOption so always truthy
  const docs = program['docs'];
  const docsGlob = program['docsGlob'];

  const repo = new SnippetRepository(snipsPath);

  createSnippetCacheDir(snipsPath);

  if (src) {
    const absoluteSrc = await path.resolve(src);
    const absoluteSrcGlob = await path.join(absoluteSrc, srcGlob);
    await buildSnippetCache(absoluteSrcGlob, repo);
  }

  if (docs) {
    const absoluteDocs = await path.resolve(docs);
    const absoluteDocsGlob = await path.join(absoluteDocs, docsGlob);
    await updateDocsSnippets(absoluteDocsGlob, repo);
  }

  return 0;
}

(async () => {
  (process as any).exitCode = await main();

})().catch(e => {
  console.error('an unexpected error occured');
  console.error(e);
  process.exit(1);
});

