import 'jasmine';

import { SnippetRepository } from './SnippetRepository';
import { SnippetsRenderer } from './SnippetsRenderer';
import { update } from './update';

const markdown = `
# First

first text

<!--snippet:a-->
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:b-->
I had some old content
<!--END_DOCUSAURUS_CODE_TABS-->
`.trimStart();

const repo: Partial<SnippetRepository> = {
  findSnippet: async (id) => {
    switch (id) {
      case 'a':
        return { id: 'a', content: 'foo' };
      case 'b':
        return { id: 'b', content: 'bar' };
      default:
        return null;
    }
  }
};

const expected = `
# First

first text

<!--snippet:a-->
foo
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:b-->
bar
<!--END_DOCUSAURUS_CODE_TABS-->
`.trimStart();

const renderer: Partial<SnippetsRenderer> = {
  render: (s) => `
<!--snippet:${s.id}-->
${s.content}
<!--END_DOCUSAURUS_CODE_TABS-->`.trimStart()
};

describe('update', () => {

  const stubRepo = repo as SnippetRepository;
  const stubRenderer = renderer as SnippetsRenderer;

  it('updates multiple snippets in one go', async () => {
    const result = await update(markdown, stubRepo, stubRenderer);

    expect(result).toEqual(expected);
  });

  it('updates are idempotent', async () => {
    const result = await update(expected, stubRepo, stubRenderer);

    expect(result).toEqual(expected);
  });

  it('throws when snippet not found', async () => {
    const markdownWithInvalidReference = `
    # First
    <!--snippet:noexist-->
    <!--END_DOCUSAURUS_CODE_TABS-->
    `;

    await expectAsync(update(markdownWithInvalidReference, stubRepo, stubRenderer)).toBeRejectedWithError();
  });
});
