import 'jasmine';

import { SnippetSections, SnippetsRenderer } from './SnippetsRenderer';

const typeSection = `
let Registration =
    {-
        requirePayment:
            bla

        externalRegistrationUrl:
            blubb
    -}
      { requirePayment : Bool
      , externalRegistrationUrl : Optional Text
      }
`.trim();

const exampleSection = `
let example =
        { requirePayment = True
        , externalRegistrationUrl = Some
            "https://itsm.example.com/order/meshcloud"
        }
      : Registration
`.trim();

const fullSnippet = `
${typeSection}

${exampleSection}

in  Registration
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

const fence = '```';

const renderedWithoutExample = `
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
`.trim();

const renderedWithExample = `
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
`.trim();

describe('render', () => {

  let sut: SnippetsRenderer;

  beforeEach(() => {
    sut = new SnippetsRenderer();
  });

  describe('parseSections', () => {

    it('parses type and example', () => {
      const result = sut.parseSections({ id: 'id', content: fullSnippet });
      const expected: SnippetSections = {
        id: 'id',
        type: typeSection,
        examples: exampleSection
      };

      expect(result).toEqual(expected);
    });
  });

  describe('render', () => {

    it('renders without examples', () => {
      const result = sut.render({ id: 'a', content: snippetWithoutExample });

      expect(result).toEqual(renderedWithoutExample);
    });

    it('renders with examples', () => {
      const result = sut.render({ id: 'b', content: snippetWithExample });

      expect(result).toEqual(renderedWithExample);
    });
  });
});


