import 'jasmine';

import { SnippetRepository } from './SnippetRepository';
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


const snippetWithoutExample = `
let Foo = {
  x: 1
}
in Foo
`.trimStart();

const snippetWithExample = `
let Foo = {
  x: 1
}
let example = {
  y: 1
}
in Foo
`.trimStart();

const repo: Partial<SnippetRepository> = {
  findSnippet: async (id) => {
    switch (id) {
      case 'a':
        return { id: 'a', content: snippetWithoutExample };
      case 'b':
        return { id: 'b', content: snippetWithExample };
      default:
        return null;
    }
  }
};

const fence = '```';

const expected = `
# First

first text

<!--snippet:a-->

The following configuration options are available at \`a\`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
${fence}haskell
let Foo = {
  x: 1
}
${fence}
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:b-->

The following configuration options are available at \`b\`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
${fence}haskell
let Foo = {
  x: 1
}
${fence}
<!--Example-->
${fence}haskell
let example = {
  y: 1
}
${fence}
<!--END_DOCUSAURUS_CODE_TABS-->
`.trimStart();


describe('update', () => {

  const repoMock = repo as SnippetRepository;

  it('updates multiple snippets in one go', async () => {
    const result = await update(markdown, repoMock);

    expect(result).toEqual(expected);
  });

  it('updates are idempotent', async () => {
    const result = await update(expected, repoMock);

    expect(result).toEqual(expected);
  });

  it('throws when snippet not found', async () => {
    const markdownWithInvalidReference = `
    # First
    <!--snippet:noexist-->
    <!--END_DOCUSAURUS_CODE_TABS-->
    `;

    await expectAsync(update(markdownWithInvalidReference, repoMock)).toBeRejectedWithError();
  });
});
