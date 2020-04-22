import 'jasmine';

import { indentLevel, parse, Snippet, snippets } from './extract';

const dhall = `
, dashboardNotification :
    let dashboardNotification =
        -- snippet:panel.mesh.dashboardNotification
        -- first line
        -- another line
          { serviceUserExistence : Bool
          , show4EyePrincipleWarning : Optional Bool
          }

    in  dashboardNotification
, partner : { createCustomerEnabled : Bool }
`;

const expectedSnippet = `
-- first line
-- another line
{ serviceUserExistence : Bool
, show4EyePrincipleWarning : Optional Bool
}`.trimStart();

describe('extract', () => {

  describe('countIndent', () => {
    it('counts lines with content correctly', () => {
      expect(indentLevel(`    123`)).toEqual(4);
    });
    it('counts empty lines correctly', () => {
      expect(indentLevel('')).toEqual(-1);
    });
    it('counts lines with zero indent correctly', () => {
      expect(indentLevel(`123`)).toEqual(0);
    });
  });

  describe('parse', () => {
    it('returns correct model', () => {
      const result = parse(dhall);

      const expected = [
        { index: 0, indent: -1, id: null, content: '' },
        { index: 1, indent: 0, id: null, content: ', dashboardNotification :' },
        { index: 2, indent: 4, id: null, content: 'let dashboardNotification =' },
        { index: 3, indent: 8, id: 'panel.mesh.dashboardNotification', content: '-- snippet:panel.mesh.dashboardNotification' },
        { index: 4, indent: 8, id: null, content: '-- first line' },
        { index: 5, indent: 8, id: null, content: '-- another line' },
        { index: 6, indent: 10, id: null, content: '{ serviceUserExistence : Bool' },
        { index: 7, indent: 10, id: null, content: ', show4EyePrincipleWarning : Optional Bool' },
        { index: 8, indent: 10, id: null, content: '}' },
        { index: 9, indent: -1, id: null, content: '' },
        { index: 10, indent: 4, id: null, content: 'in  dashboardNotification' },
        { index: 11, indent: 0, id: null, content: ', partner : { createCustomerEnabled : Bool }' },
        { index: 12, indent: -1, id: null, content: '' }
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('snippets', () => {
    it('returns snippet blocks', () => {
      const result = snippets(dhall);

      const expected: Snippet = {
        id: 'panel.mesh.dashboardNotification',
        content: expectedSnippet
      };

      expect(result).toEqual([expected]);
    });
  });

});
