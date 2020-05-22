import * as program from 'commander';
import * as glob from 'fast-glob';
import * as fs from 'fs';
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
    .option('--src <src>', 'absolute path to src files, may include glob patterns. Specifying this will rebuild the snippets cache.')
    .requiredOption('--snips <snips>', 'path to snippet cache directory')
    .option('--docs <docs>', 'absolute path to markdown files, may include glob patterns.  Specifying this will update snippets in markdown docs.')
    .allowUnknownOption(false)
    .parse(process.argv);

  const srcGlob = program['src'];
  const snipsPath = program['snips']!!; // it's a requiredOption so always truthy
  const docsGlob = program['docs'];

  const repo = new SnippetRepository(snipsPath);

  if (srcGlob) {
    await buildSnippetCache(srcGlob, repo);
  }

  if (docsGlob) {
    await updateDocsSnippets(docsGlob, repo);
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

