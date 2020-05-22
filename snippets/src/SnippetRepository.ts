import * as fs from 'fs';
import * as path from 'path';

import { Snippet } from './Snippet';

export class SnippetRepository {
  constructor(
    public readonly snipsPath: string
  ) {
  }

  public async findSnippet(id: string): Promise<Snippet | null> {
    const destPath = path.join(this.snipsPath, id);

    // fs.exists is deprecated and not recommended see https://stackoverflow.com/questions/48234951/node-js-enoent-file-error-handling
    try {
      const content = await fs.promises.readFile(destPath, 'utf-8');

      return {
        id: id,
        content: content
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`could not find snippet "${id}"`);
        return null;
      }

      // unexpected error
      throw error;
    }
  }

  public async saveSnippet(snippet: Snippet): Promise<void> {
    const destPath = path.join(this.snipsPath, snippet.id);

    console.log(`saving snippet ${destPath}`);

    return fs.promises.writeFile(destPath, snippet.content);
  }
}
