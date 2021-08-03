---
id: meshstack.onboarding
title: Onboarding
---

meshStack enables self-service onboarding for your internal customers. Operators can use the following options to customise the experience.

## Customer Registration

Multiple options are available to control how [meshCustomers](./meshcloud.customer.md) can sign up to meshStack in
self-service. meshStack can be configured to suit your organization's unique demands for sign up.

<!--snippet:mesh.panel.environment.mesh.registration-->

The following configuration options are available at `mesh.panel.environment.mesh.registration`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Registration =
    {-
        requirePayment:
            Determines if the customer registration wizard will collect a default "Cost Center" payment method.
            Disabling this will cause new meshCustomers to be registered without a payment method.
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
```
<!--Example-->
```dhall
let example =
        { requirePayment = True
        , externalRegistrationUrl = Some
            "https://itsm.example.com/order/meshcloud"
        }
      : Registration
```
<!--END_DOCUSAURUS_CODE_TABS-->

Additional configuration options control backend behavior in `meshfed.web.register` as follows:

```dhall

{ {- Configure an additional BCC email to receive registration related email notifications (e.g. a group inbox) -}
  bccEmail: Optional Text
  {- Allow sign up only if valid payment information was provided during registration  -}
, requirePayment : Optional Bool
  {- Allow generation of invite links (see below) -}
, allowPartnerInviteLinks : Optional Bool
  {- Require manual approval of new meshCustomer accounts by a partner before they can use cloud resources -}
, approvalRequired : Optional Bool
}
```

Additional remarks and configuration links:

- `requirePayment` must be consistently configured between `panel` and `meshfed` configuration settings. The configuration model validates this.
- `allowPartnerInviteLinks` enables the use of [invite links](administration.customers.md#invite-customer-via-link)
- `approvalRequired` configures manual [customer approval](./administration.customers.md#approve-customer) through a partner


### Default Quotas

meshStack assigns a default quota to newly registered [meshCustomers](./meshcloud.customer.md) (see section above). Operators can configure this default quota via `meshfed.web.customer.defaultQuota`:

```dhall
{ {- the number of allowed meshProjects per meshCustomer -}
  meshProjects : Natural
}
```

The default only applies to newly registered [meshCustomers](./meshcloud.customer.md). [meshPartners](./administration.index.md) can change the individual quotas for managed meshCustomers at any time using the [administration area](administration.customers.md#customer-quota-management).


## Customer User Invitations

When a user is invited to a customer there are several configurations to customize this invitation flow which is explained below.

Of importance is the setup of the new user EUID (external user-id) property. This value identifies the user against external systems during project replication. The EUID is updated for every log in of the user into meshPanel. However, to directly start replicating a newly invited user, without requiring the user to login at least once, several methods can be set up to fetch the EUID from an external identity provider.

```dhall
{ web :
  , user :
    Optional
      { rolerequest :
        {- If set to a number higher then 1, then at least that many additional
        administrator roles in a customer must approve a users role request.
        Setting it to 2 basically activates the 4-eye-principle for customer
        user role assignments. -}
        { minApprovalCount : Optional Natural

        {- If set to true the user must accept the role invitation by clicking
        on an email link, otherwise he automatically gets the role assigned. -}
        , userRoleInviteAcceptanceRequired : Optional Bool

        {- Enables to add users with E-Mails from outside the used directory.
        Depending on the cloud environment this is handled differently (in
        Azure these users are added as guest users in the AAD)  -}
        , enableGuestUser : Optional Bool

        {- If set to true the users E-Mail is assumed as EUID which allows
        GCP and Azure projects to directly replicate the users permission without
        requiring him to login into the panel first -}
        , setEmailAsEuid : Bool

        {- If set to true, all possible ways of granting the Customer Admin role via
        the panel will be prohibited. This means that the Customer Admin role can only
        be assigned via the meshObject API. This is useful when an external system
        is the source of truth regarding Customer Admin role assignments. This value
        is 'false' by default. If someone uses the 'Add Myself' button in the partner
        area, this person will be assigned as 'Customer Employee' instead. -}
        , restrictCustomerAdminRoleAssignment : Optional Bool
        }

      , revocation : Optional UserRevocation
      , identity-lookup : Optional IdentityLookup
      }
}
```

### User Setup Steps

In order to use Azure lookup functionality, you must create a new principal (described in **Replicator** &rarr; **AAD Level Permissions** step 1 and 2) and assign the following required permissions as an **application permission**:

- `User.Read.All`

> You will also need to grant admin consent in AAD in order to activate the  `User.Read.All` permission.

If you have an Azure AAD as an upstream IDP and want to use it for user lookup you must provide meshcloud with the following credentials:

<!--snippet:mesh.meshfed.identity.azure.creds#type-->


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

        user-lookup-strategy:
            The lookupstrategy which is used in order to find the user. Use either
            UserByUsernameLookupStrategy or UserByMailLookupStrategy. The UserByMailLookupStrategy
            uses the users euid and uses it as an E-Mail address for AAD lookup. The
            UserByUsernameLookupStrategy assumes the euid is an userPrincipalName for AAD lookup.
    -}
      { aad-tenant : Text
      , client-id : Text
      , client-secret : Secret.Type
      , user-lookup-strategy : AzureLookupStrategy
      , guestLookup : Optional AzureGuestDetection
      , euidSchemaExtensionUpdate : Optional AzureEuidExtensionSchema
      , euidUserAttributeUpdate : Optional AzureEuidUserAttribute
      , usernameAttributeUpdate : Optional AzureUsernameAttributeUpdate
      }
```
<!--Example-->
```dhall
let example
    : AzureCreds
    = { aad-tenant = "devmeshcloud.onmicrosoft.com"
      , client-id = "f112f31-248a-4461-1269-0f13164acb95"
      , client-secret = Secret.fromAnsible "client_secret"
      , user-lookup-strategy =
          AzureLookupStrategy.UserByMailLookupStrategy
      , guestLookup = None AzureGuestDetection
      , euidSchemaExtensionUpdate = None AzureEuidExtensionSchema
      , euidUserAttributeUpdate = None AzureEuidUserAttribute
      , usernameAttributeUpdate = None AzureUsernameAttributeUpdate
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

If this initial config if present you can decide to setup the following optional user identity steps:

<!--snippet:mesh.meshfed.identity.azure.guest#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzureGuestDetection =
    {-
      When adding/inviting a new user to a customer a custom attribute property from the AAD data
      can be used to determine if it is a guest user.
      Attention: This check is only performed on the first attempt when a user is added/invited
      to a customer. If this check is configured after some users were initially added to a
      customer they are not detected as guest users.

        guestProperty:
            The AAD's custom attribute which is checked against the guestValue.

        guestValue:
            If the AAD custom attribute matches this value the user is considered to be a guest.
    -}
      { guestProperty : Text, guestValue : Text }
```
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:mesh.meshfed.identity.azure.euid-extension-schema#type-->


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
            The identifier of the custom schema which should be used to extract the value out of. E.g: extkvbmkofy_mySchema
            See: https://docs.microsoft.com/en-us/graph/api/schemaextension-post-schemaextensions
    -}
      { euidExtensionSchemaProperty : Text
      , euidExtensionSchemaIdentifier : Text
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

In order to use Google Cloud Directory as a lookup provider you need to provide these credentials:

<!--snippet:mesh.meshfed.identity.gcd.creds#type-->


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

<!--snippet:mesh.meshfed.identity.gcd.euid#type-->


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
