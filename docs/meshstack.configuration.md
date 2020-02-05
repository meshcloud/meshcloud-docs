---
id: meshstack.configuration
title: Configuration
---

meshcloud will typically operate your meshStack installation as a [managed service](./meshstack.managed-service.md) for you. As a managed service, all configuration and validation is done by meshcloud. Nonetheless, we make references to configuration options in the documentation so that operators get a better understanding of meshStack's capabilities. The configuration references also simplify examples and communicate the exact parameters that may need to be supplied by platform operators (e.g. Service Principal credentials).

meshcloud configures your meshStack installation using a [dhall](https://dhall-lang.org/) configuration model. As part of meshcloud's managed service, customers get access to their configuration in a git repository. This is also useful to communicate configuration options and track changes.

The configuration documentation will occasionally also make references to [YAML](https://en.wikipedia.org/wiki/YAML) configuration options. These will be replaced with `dhall` models in the next releases. Dhall models can generate YAML configuration files dynamically, but provide superior features in terms of flexibility and validation.

## Global Configuration Options

### Identifiers

Objects in meshcloud can have three kinds of properties used to refer to them.

- **ID**: An immutable id, unique in space and time, e.g. `123`.
- **Identifier**: An immutable id, unique in space. Drawn from a reduced character set, e.g. `my-project`.
- **Name/Display Name**: A mutable display string to be used for display purposes e.g. `My Project`

meshStack can restrict legal identifiers for [meshCustomers](./meshcloud.customer.md) and [meshProjects](./meshcloud.project.md). This is useful to ensure projects can be identifiers are compatible with all connected cloud platforms and don't require additional name mangling to comply with cloud specific naming rules.

```haskell
{ customerIdentifierLength :
    Optional Natural
, projectIdentifierLength :
    Optional Natural
, projectIdentifierPrefix :
    Optional Text
, projectNamePrefix :
    Optional Text
, envIdentifier :
    Optional Text
}
```

### Customer Registration

Multiple options are available to control how [meshCustomers](./meshcloud.customer.md) can sign up to meshStack in
self-service. meshStack can be configured to suit your organization's unique demands for sign up.

```haskell
  
{ {- Configure an additional BCC email to receive registration related email notifications (e.g. a group inbox) -}
  bccEmail = None Text
  {- Allow sign up only if valid payment information was provided during registration  -}
, requirePayment = None Bool
  {- Allow generation of invite links (see below) -}
, allowPartnerInviteLinks = None Bool
  {- Require manual approval of new meshCustomer accounts by a partner before they can use cloud resources -}
, approvalRequired = None Bool
}
```

Additional remarks and configuration links:

- `allowPartnerInviteLinks` enables the use of [invite links](administration.customers.md#invite-customer-via-link)
- `approvalRequired` configures manual [customer approval](./administration.customers.md#approve-customer) through a partner

### User Identity Lookup

When you add users to your [meshCustomers](./meshcloud.customer.md) we currently support live typeahead for users stored in an Azure AAD Identity Provider. This makes it easier for people to invite additional users without remembering their full contact details.

If you have an Azure AAD as an upstream IDP you can configure this functionality by the following configuration:

```haskell
{ identityLookup =
  { azure =
    {- Either friendly domain name or your tenants GUID -}
    { aadTenant = "<AAD_TENANT_ID>"
    , clientId = "<SERVICE_PRINCIPAL_CLIENT_ID>"
    , clientSecret = "<SERVICE_PRINCIPAL_CLIENT_SECRET>"
    }
  }
}
```

The Azure Service Principal must have at least the `User.Read.All` permission for the [list users web call](https://docs.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http#permissions).
