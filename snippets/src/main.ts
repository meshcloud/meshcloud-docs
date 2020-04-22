import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { snippets } from './extract';

export async function extractSnippets(srcPath: string) {
  console.log(`scanning snippet definitions in: ${srcPath}`);

  const content = await fs.promises.readFile(srcPath, 'utf8');

  const snips = snippets(content);

  return snips;
}


async function buildSnippetCache(repoPath: any, snipsPath: any) {

  // todo: scan the repo for snippet directivee
  const files = [
    'deployment/model/Mesh/Panel/Environment.dhall'
  ];

  await Promise.all(files.map(async (file) => {
    const inPath = path.join(repoPath, file);

    const snips = await extractSnippets(inPath);

    for (const snip of snips) {
      const destPath = path.join(snipsPath, snip.id);

      console.log(`extracted ${destPath}`);
      fs.promises.writeFile(destPath, snip.content);
    }
  }));
}

async function updateDocsSnippets(docsPath: any, snipsPath: any) {

  // todo: scan the repo for snippet directivee
  const files = [
    'meshstack.configuration.md'
  ];

  await Promise.all(files.map(async (file) => {
    const inPath = path.join(docsPath, file);

    const snips = await findSnippets(inPath);

    for (const snip of snips) {
      const destPath = path.join(snipsPath, snip.id);

      console.log(`extracted ${destPath}`);
      fs.promises.writeFile(destPath, snip.content);
    }
  }));
}


async function main(): Promise<number> {
  program
    .version('0.1.0')
    .description('Builds and updates documentation snippets')
    .option('--src <src>', 'path to meshstack git repository. Specifying this will rebuild the snippets cache.')
    .requiredOption('--snips <snips>', 'path to snippet cache directory')
    .option('--docs <docs>', 'path to markdown docs directory.  Specifying this will update snippets in markdown docs.')
    .allowUnknownOption(false)
    .parse(process.argv);

  const repoPath = program['src'];
  const snipsPath = program['snips'];
  const docsPath = program['docs'];

  console.log(`repo path is ${repoPath}`);

  if (repoPath && snipsPath) {
    await buildSnippetCache(repoPath, snipsPath);
  }

  if (snipsPath && docsPath) {
    await updateDocsSnippets(snipsPath, docsPath)
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

