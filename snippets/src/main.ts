import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { snippets } from './extract';

export async function extract(src: string) {
  const content = await fs.promises.readFile(src, 'utf8');

  const snips = snippets(content);

  return snips;
}


async function main(): Promise<number> {
  program
    .version('0.1.0')
    .description('Updates documentation snippets')
    .requiredOption('--src <src>', 'path to meshstack git repository')
    .requiredOption('--out <out>', 'path to snippet output directory')
    .allowUnknownOption(false)
    .parse(process.argv);

  const repoPath = program['src'];
  const outPath = program['out'];

  const files = [
    'deployment/model/Mesh/Panel/Environment.dhall'
  ];

  console.log(`repo path is ${repoPath}`);

  await Promise.all(files.map(async (file) => {
    const inPath = path.join(repoPath, file);

    const snips = await extract(inPath);

    for (const snip of snips) {
      const destPath = path.join(outPath, snip.id);
      console.log(`writing ${destPath}`);
      fs.promises.writeFile(destPath, snip.content);
    }
  }));

  return 0;
}

(async () => {
  (process as any).exitCode = await main();

})().catch(e => {
  console.error('an unexpected error occured');
  console.error(e);
  process.exit(1);
});
