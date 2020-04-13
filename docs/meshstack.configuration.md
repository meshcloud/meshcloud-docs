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

meshStack can restrict legal identifiers for [meshCustomers](./meshcloud.customer.md) and [meshProjects](./meshcloud.project.md). This is useful to ensure projects can be identifiers are compatible with all connected cloud platforms and don't require additional name mangling to comply with cloud specific naming rules. You can configure these options in `meshfed.web.restriction` as follows:

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
self-service. meshStack can be configured to suit your organization's unique demands for sign up. You can configure these options in `meshfed.web.register` as follows

```haskell

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

- `allowPartnerInviteLinks` enables the use of [invite links](administration.customers.md#invite-customer-via-link)
- `approvalRequired` configures manual [customer approval](./administration.customers.md#approve-customer) through a partner

### Address Metadata

meshStack can maintain company and billing address metadata for meshCustomers and meshProjects. This is useful if your
meshStack implementation provides cloud services to 3rd parties or your cloud chargeback requires internal invoicing
between different subsidiaries that cannot be covered using e.g. cost-center numbers.

If you don't need address metadata, we recommend hiding it from end-users of meshStack by setting the `panel.environment.ui` configuration option:

```haskell
{
  hideAddress : Optional Bool
}
```

When enabling `hideAdress`, operators should also configure the `panel.environment.ui.register.defaultAddress` option:

```haskell
Optional {
  street : Text
, houseNumber : Text
, zipCode : Text
, city : Text
, continent : Text
, country : Text
}
```

The configured address will be automatically used as a default billing address for all meshCustomers created using the
self-service registration wizard.


### Default Quotas

meshStack assigns a default quota to newly registered [meshCustomers](./meshcloud.customer.md) (see section above). Operators can configure this default quota via `meshfed.web.customer.defaultQuota`:

```haskell
{ {- the number of allowed meshProjects per meshCustomer -}
  meshProjects : Natural
}
```

The default only applies to newly registered [meshCustomers](./meshcloud.customer.md). [meshPartners](./administration.index.md) can change the individual quotas for managed meshCustomers at any time using the [administration area](administration.customers.md#customer-quota-management).

### Feedback Mailbox

Users have the option to quickly submit feedback via the meshPanel's "thumbs up/down" button in the navbar.
Operators can configure the mailbox this feedback is sent to via `meshfed.web`:

```haskell
{
  {- e.g. "feedback@example.com" -}
  feedbackEmail : Optional Text
}
```

### User Identity Lookup

When you add users to your [meshCustomers](./meshcloud.customer.md) we currently support live typeahead for users stored in an Azure AAD Identity Provider and Google Cloud Directory (GCD). This makes it easier for people to invite additional users without remembering their full contact details.

#### Configure Azure AAD

If you have an Azure AAD as an upstream IDP and want to use it for user lookup you must provide meshcloud with the following credentials:

```haskell
{ azure :
  
  { {- Either friendly domain name or your tenants GUID -}
    aadTenant : Text
    {- Service Principal Client Id -}
  , clientId : Text
    {- Service Principal Client Secret -}
  , clientSecret : Text
  }
}
```

The Azure Service Principal must have at least the `User.Read.All` permission for the [list users web call](https://docs.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http#permissions).


#### Configure Google Cloud Directory

In order to use GCD as a lookup provider you need to provide these credentials:

```haskell
{ gcd :
  { {- GCD Domain, e.g. example.com  -}
    domain : Text
    {- GCD Service User primary email, e.g. meshfed-service@example.com -}
  , serviceUser : Text
    {- GCP Service Account ID , e.g. meshfed-service@meshstack-root.iam.gserviceaccount.com -}
  , accountId : Text
  {- GCP Service Account Private Key -}
  , privateKey : Text
  }
}
```

The GCD Service User needs read access to the [GCD Directory API](https://developers.google.com/admin-sdk/directory/v1/get-start/getting-started).
