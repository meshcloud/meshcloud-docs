---
id: meshstack.identity-lookup
title: Identity Lookup
---

meshStack allows Customer Admins to [quickly onboard team members](./meshcloud.customer.md#invite-users-to-a-meshcustomer-team) with an assisted onboarding workflow.
This onboarding workflow features an autocomplete and search for user identities in an enterprise user directory. This search process is called identity lookup.

<!--snippet:mesh.meshfed.web.identity-lookup-->

The following configuration options are available at `mesh.meshfed.web.identity-lookup`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let IdentityLookup =
    {-
      Configure identity lookup to support invitation workflow.

        provider:
            Configure the identity provider to use as a source for identity lookup.

        deny-assigning-other-users:
            Controls the behavior of self-service user invitations (e.g. meshCustomer role assignments from meshPanel).
            When true, users can only invite other users listed in the identity provider.
            When false, users can create invitations also for users not listed in the identity provider.
    -}
      { provider : Optional IdentityProvider
      , deny-assigning-other-users : Bool
      }
```
<!--Example-->
```dhall
let example
    : IdentityLookup
    =
      -- do not use identity lookup, in this case it's important to allow assigning other users
      { provider = None IdentityProvider
      , deny-assigning-other-users = False
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Supported Identity Providers

meshStack supports configuring either of the following identity providers as identity lookup source.

<!--snippet:mesh.meshfed.identitylookup.identityprovider#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let IdentityProvider =
      < Azure : AzureIdentity
      | Gcd : GcdIdentity
      | GcdEuid : GcdIdentityAndEuid
      >
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Azure Active Directory

In order to use Azure lookup functionality, you must create a new service principal as described in [Azure Service Principal Setup](./meshstack.azure.index.md#service-principal-setup) and assign the following required permissions as an **application permission**:

- `User.Read.All`

> You will also need to grant admin consent in AAD in order to activate the  `User.Read.All` permission.

Operators must then configure the service principal credentials and user lookup configuration as follows.

<!--snippet:mesh.meshfed.identitylookup.azure.creds#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzureCreds =
    {-
      Setting this configuration enables the use of an AAD as a user lookup source to allow
      autocomplete of user information when adding new users to customers.

        aad-tenant:
            The active directory tenant. Its either a UID of the AAD or its domain
            like devmeshcloud.onmicrosoft.com

        client-id:
            The client id of the service principal

        client-secret:
            The credentials of the service principal


    -}
      { aad-tenant : Text
      , client-id : Text
      , client-secret : Secret.Type
      , guestLookup : Optional AzureGuestDetection
      , euidSchemaExtensionUpdate : Optional AzureEuidExtensionSchema
      , euidUserAttributeUpdate : Optional AzureEuidUserAttribute
      , usernameAttributeUpdate : Optional AzureUsernameAttributeUpdate
      }

let AzureIdentity = { azure : AzureCreds }
```
<!--Example-->
```dhall
let example
    : AzureCreds
    = { aad-tenant = "devmeshcloud.onmicrosoft.com"
      , client-id = "f112f31-248a-4461-1269-0f13164acb95"
      , client-secret = Secret.fromAnsible "client_secret"
      , guestLookup = None AzureGuestDetection
      , euidSchemaExtensionUpdate = None AzureEuidExtensionSchema
      , euidUserAttributeUpdate = None AzureEuidUserAttribute
      , usernameAttributeUpdate = None AzureUsernameAttributeUpdate
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

With this initial config is present, operators can setup the following optional settings to customize the way meshStack provisions user accounts from identity lookup.

To provision new meshUsers as [guest users](./administration.users.md#guest-users), configure the guest detection.

<!--snippet:mesh.meshfed.identitylookup.azure.guest#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzureGuestDetection =
    {-
      When adding/inviting a new meshUser check AAD User attributes data to determine if the meshUser shall be provisioned as a guest user in meshStack.

      Attention: This check is only performe on the first attempt when a user is added/invited
      to a customer. If this check is configured after some users were initially added to a
      customer they are not detected as guest users.

        guestProperty:
            The AAD's custom attribute which is checked against the guestValue.
            This can be any attribute that can be retrieved via the MS Graph API GET user $select query parameter
            https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http

        guestValue:
            If the AAD custom attribute matches this value, the user is considered to be a guest.
    -}
      { guestProperty : Text, guestValue : Text }
```
<!--Example-->
```dhall
let exampleUsingOnlyUserType
    : AzureGuestDetection
    =
      -- use only the AAD userType to determine meshUser guest status
      { guestProperty = "userType", guestValue = "Guest" }

let exampleWithSchmaExtension
    : AzureGuestDetection
    =
      -- Note that meshStack implicitly adds an additional check for userType=Guest
      -- when configuring a custom guestProperty. This configuration will thus check
      -- userType=Guest && extension_1234_supplierContractType=contractor
      { guestProperty = "extension_1234_supplierContractType"
      , guestValue = "contractor"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

To use a non-standard attribute as

<!--snippet:mesh.meshfed.identitylookup.azure.euid-extension-schema#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzureEuidExtensionSchema =
    {-
      When adding/inviting a new user to a customer a custom attribute property from the users AAD
      extension schema can be used to fill in his euid.

      Attention: This check is only performed on the first attempt when a user is added/invited
      to a customer. If this check is configured after some users were initially added to a
      customer their euid's are not udpated.

        euidExtensionSchemaProperty:
            The name of the extension schema property which is used as EUID value.

        euidExtensionSchemaIdentifier:
            The identifier of the custom schema which should be used to extract the value out of.
            See: https://docs.microsoft.com/en-us/graph/api/schemaextension-post-schemaextensions
    -}
      { euidExtensionSchemaProperty : Text
      , euidExtensionSchemaIdentifier : Text
      }
```
<!--Example-->
```dhall
let example
    : AzureEuidExtensionSchema
    = { euidExtensionSchemaProperty = "uniqueid"
      , euidExtensionSchemaIdentifier = "extkvbmkofy_mySchema"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Google Cloud Identity

In order to use Google Cloud Directory (also called Google Cloud Identity) as a lookup provider you need to provide these credentials:

<!--snippet:mesh.meshfed.identitylookup.gcd.creds#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let GcdCreds =
    {-
      Setting this configuration enables the use of an GCD as a user lookup source to allow
      autocomplete of user information when adding new users to customers.

        domain:
            The domain used for cloud identity directory-groups created and managed by meshStack.
            meshStack maintains separate groups for each meshProject role on each managed GCP project.

        customer-id:
            The client id of the service principal

        service-account-credentials-b64:
            The credentials of the service principal
    -}
      { domain : Text
      , customer-id : Text
      , service-account-credentials-b64 : Secret.Type
      }
```
<!--Example-->
```dhall
let example
    : GcdCreds
    = { domain = "example.com"
      , customer-id = "customer-id"
      , service-account-credentials-b64 =
          Secret.fromAnsible "gcp_credentials"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

The GCD Service User needs read access to the [GCD Directory API](https://developers.google.com/admin-sdk/directory/v1/get-start/getting-started).

If this initial config if present you can decide to setup the following optional user identity steps:

<!--snippet:mesh.meshfed.identitylookup.gcd.euid#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let GcdEuid =
    {-
      When adding/inviting a new user to a customer a custom attribute property from the users GCD
      custom schema can be used to fill in his euid.

      Attention: This check is only performed on the first attempt when a user is added/invited
      to a customer. If this check is configured after some users were initially added to a
      customer their euid's are not udpated anymore.

        euidCustomSchema:
            The name of the extension schema which contains the EUID value.

        euidProperty:
            The name of the custom schema property which is used as EUID value.
    -}
      { euidCustomSchema : Text, euidProperty : Text }
```
<!--Example-->
```dhall
let example
    : GcdEuid
    = { euidCustomSchema = "schema-containing-euid"
      , euidProperty = "euid-property"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

Operators have the option of disabling inviting users that are not listed in the identity provider. They can do so by setting
the `deny-assigning-other-users` configuration option to `true`.
