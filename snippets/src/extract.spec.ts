import 'jasmine';

import { indentLevel, parse, snippets } from './extract';
import { Snippet } from './Snippet';

const simpleDhall = `
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

const dhall = `
let Snippet =
    -- snippet:mesh.panel.environment.mesh.registration
      let Registration =
          {-
              requirePayment:
                  Determines if the customer registration wizard will collect a default "Cost Center" payment method.
                  Disabling this will cause new meshWorkspaces to be registered without a payment method.
                  This is useful if the meshStack implementation requires customers to register payment methods via an external
                  process (e.g. via API createLimitedPaymentMethod).

                  See ui.costCenter for customizing the default cost center payment method.

              externalRegistrationUrl:
                  If set, disables the self-service customer registration wizard and instead redirects to the specified external
                  url. Use this if the meshStack implementation uses another way to register customers (e.g. via API).
          -}
            { requirePayment : Bool
            , externalRegistrationUrl : Optional Text
            }

      let example =
              { requirePayment = True
              , externalRegistrationUrl = Some
                  "https://itsm.example.com/order/meshcloud"
              }
            : Registration

      in  Registration

in  Snippet
`;

const expectedSnippet = `
let Registration =
    {-
        requirePayment:
            Determines if the customer registration wizard will collect a default "Cost Center" payment method.
            Disabling this will cause new meshWorkspaces to be registered without a payment method.
            This is useful if the meshStack implementation requires customers to register payment methods via an external
            process (e.g. via API createLimitedPaymentMethod).

            See ui.costCenter for customizing the default cost center payment method.

        externalRegistrationUrl:
            If set, disables the self-service customer registration wizard and instead redirects to the specified external
            url. Use this if the meshStack implementation uses another way to register customers (e.g. via API).
    -}
      { requirePayment : Bool
      , externalRegistrationUrl : Optional Text
      }

let example =
        { requirePayment = True
        , externalRegistrationUrl = Some
            "https://itsm.example.com/order/meshcloud"
        }
      : Registration

in  Registration
`.trimStart();

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

      const result = parse(simpleDhall);

      const expected = [
        { index: 0, indent: -1, id: null, content: '' },
        { index: 1, indent: 0, id: null, content: ', dashboardNotification :' },
        { index: 2, indent: 4, id: null, content: '    let dashboardNotification =' },
        { index: 3, indent: 8, id: 'panel.mesh.dashboardNotification', content: '        -- snippet:panel.mesh.dashboardNotification' },
        { index: 4, indent: 8, id: null, content: '        -- first line' },
        { index: 5, indent: 8, id: null, content: '        -- another line' },
        { index: 6, indent: 10, id: null, content: '          { serviceUserExistence : Bool' },
        { index: 7, indent: 10, id: null, content: '          , show4EyePrincipleWarning : Optional Bool' },
        { index: 8, indent: 10, id: null, content: '          }' },
        { index: 9, indent: -1, id: null, content: '' },
        { index: 10, indent: 4, id: null, content: '    in  dashboardNotification' },
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
        id: 'mesh.panel.environment.mesh.registration',
        content: expectedSnippet
      };

      expect(result).toEqual([expected]);
    });
  });

});
