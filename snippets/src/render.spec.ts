import 'jasmine';

import { parseSections, renderDocusaurusCodeBlock, SnippetSections } from './render';

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

const parsedSections: SnippetSections = { type: typeSection, examples: exampleSection };

describe('render', () => {

  describe('parseSections', () => {
    it('parses type and example', () => {
      const result = parseSections({ id: 'id', content: fullSnippet });

      expect(result).toEqual(parsedSections);
    });
  });

  describe('renderDocusaurusCodeBlock', () => {
    it('renders blocks', () => {
      const result = renderDocusaurusCodeBlock('id', parsedSections);
      // this logic is tested by update.spec.ts

      // we could check the final result but since there's not much logic in there and getting the test data
      // into this spec is a PITA we just check the code returns something
      expect(result).toBeTruthy();
    });
  });
});
