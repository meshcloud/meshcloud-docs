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

```dhall
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


### Customer User Invitations

When a user is invited to a customer there are several configurations in order to customize this invitation flow which are explained below.

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
        {- If set to true the user must accept it, when the role his role on
        the customer is changed (downgrades of roles still work automatically
        without user acceptance)  -}
        , enforceUserRoleUpgradeAcceptanceRequired : Optional Bool
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
        }
      , revocation : Optional UserRevocation
      }
}
```




### Address Metadata

meshStack can maintain company and billing address metadata for meshCustomers and meshProjects. This is useful if your
meshStack implementation provides cloud services to 3rd parties or your cloud chargeback requires internal invoicing
between different subsidiaries that cannot be covered using e.g. cost-center numbers.

If you don't need address metadata, we recommend hiding it from end-users of meshStack by setting the `panel.environment.ui` configuration option:

```dhall
{
  hideAddress : Optional Bool
}
```

When enabling `hideAddress`, operators should also configure the `panel.environment.ui.register.defaultAddress` option:

```dhall
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

```dhall
{ {- the number of allowed meshProjects per meshCustomer -}
  meshProjects : Natural
}
```

The default only applies to newly registered [meshCustomers](./meshcloud.customer.md). [meshPartners](./administration.index.md) can change the individual quotas for managed meshCustomers at any time using the [administration area](administration.customers.md#customer-quota-management).

### Feedback Mailbox

Users have the option to quickly submit feedback via the meshPanel's "thumbs up/down" button in the navbar.
Operators can configure the mailbox this feedback is sent to via `meshfed.web`:

```dhall
{
  {- e.g. "feedback@example.com" -}
  feedbackEmail : Optional Text
}
```

### User Identity Lookup

When you add users to your [meshCustomers](./meshcloud.customer.md) we currently support live typeahead for users stored in an Azure AAD Identity Provider and Google Cloud Directory (GCD). This makes it easier for people to invite additional users without remembering their full contact details.

#### Configure Azure AAD

If you have an Azure AAD as an upstream IDP and want to use it for user lookup you must provide meshcloud with the following credentials:

```dhall
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

```dhall
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

### Motto of the Day

Operators can configure an optional "motto of the day" to be displayed in meshPanel.
This is useful to communicate important information such as newly available cloud plaforms or known issues to every user visiting meshPanel.

Note that Platform Operators can also use [platform notifications](./administration.platforms.md#platform-notifications) as an alternative to target messages only at users that consume a specific cloud platform.

<!--snippet:mesh.panel.environment.motd-->

The following configuration options are available at `mesh.panel.environment.motd`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let MottoOfTheDay =
    {-
        message:
            The "motto of the day" message you want to display. This can also include html tags.
            The "motto of the day" message is shown on the home screen of meshPanel for anonymous as well
            as authenticated users.

        startTime:
            The date and time after which to begin showing the message.
            Must be a JavaScript Date.parse() compatible string.

        endTime:
            The date and time after which to stop showing the message.
            Must be a JavaScript Date.parse() compatible string.
    -}
      { message : Text, startTime : Text, endTime : Text }
```
<!--Example-->
```dhall
let example
    : Optional MottoOfTheDay
    = Some
        { message =
            "The Likvid Bank Cloud Foundation Team whishes you a meshi <a href=\"https://en.wikipedia.org/wiki/Christmas\">Christmas</a>."
        , startTime = "2019-12-23 00:00"
        , endTime = "2019-12-27 00:00"
        }

let exampleNoMotto
    : Optional MottoOfTheDay
    = None MottoOfTheDay
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Customizable Descriptions

Depending on your meshStack implementation, it may be helpful for you to customize error descriptions to guide
end-users towards resolving common problems in self-service. meshStack therefore provides the following configuration
options in `panel.ui`.

> Note: You can use sanitized HTML in all of these settings. This is useful to create links and apply minimal formatting.

```dhall
{
    {- Generic error message displayed when meshPanel can't connect to backend services. Configure this if users need to e.g. use a certain VPN or browser with CAs pre-installed.-}
    connectivityError : Text
    {- Displayed when users are required to sign in before registering in self-service. Configure this to explain users which IDP/Credential they need to provide -}
  , idpRegister : Optional Text

    {- Displayed when users are required to sign in before accepting an invite. Configure this to explain users which IDP/Credential they need to provide -}
  , idpAcceptCustomerUserRoleRequest : Optional Text
    {- Displayed in when users provide a cost center that's already used by another meshStack customer. Configure this e.g. to encourage users to register only one meshCustomer per cost center. -}
  , duplicateCostCenter : Optional Text
    {- Display a configurable confidentiality label in the meshPanel navbar, e.g. "internal" or "secret". -}
  , confidentialityLevel : Optional Text
    {- Display a notification that users accept platform ToS when they create a meshProject. Configure this if you need to inform end-users about custom ToS that apply to cloud platforms available in your meshStack implementation.. -}
  , platformTermsNote : Optional Text
}
```
