import 'jasmine';

import * as tmp from 'tmp';

import { Snippet } from './Snippet';
import { SnippetRepository } from './SnippetRepository';

describe('SnippetRepository', () => {
  let dir: tmp.DirResult;
  let sut: SnippetRepository;

  beforeEach(() => {
    dir = tmp.dirSync({ unsafeCleanup: true });
    sut = new SnippetRepository(dir.name);
  });

  afterEach(() => {
    dir.removeCallback();
  });

  describe('saveSnippet', () => {

    it('saves snippet so they can be read', async () => {
      const snip: Snippet = { id: 'snip', content: 'xxx' };

      await sut.saveSnippet(snip);

      const result = await sut.findSnippet(snip.id);

      expect(result).toEqual(snip);
    });
  });

  describe('findSnippet', () => {

    it('returns null if snippet is not found', async () => {
      const result = await sut.findSnippet('id');

      expect(result).toEqual(null);
    });
  });
});
