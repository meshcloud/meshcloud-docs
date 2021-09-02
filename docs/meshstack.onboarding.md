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


<!--snippet:mesh.web.user.rolerequest-->

The following configuration options are available at `mesh.web.user.rolerequest`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let UserRoleRequest =
    {-
      Configure settings related to role-requests for users. This includes
      functionality like adding new users to a meshCustomer.

        min-approval-count:
          The minimum number of approvals needed before a requested role binding is granted and made effective.
          Using 2 or higher allows implementation of a 4-eyes principle and similar approval workflows.

        set-email-as-euid:
          When the role request is for a new meshUser, set the email address (either entered by the inviting
          person or retrieved from identity lookup) as the new meshUser's euid.

          The effect of this setting may be overriden, as IdentityLookup configuration takes precendence over
          this.

        restrict-customer-admin-role-assignment:
          When enabled, prevents self-service assignment of the Customer Admin role via meshPanel.
          In this case, only meshObject API (or meshStack's Identity Connector) can be used for creating these role
          bindings. This is useful when an external system is the source of truth regarding
          Customer Admin role assignments.

          Also, partner users using the "add myself" functionality in the admin area will be restricted to granting
          thesmelves 'Customer Employee' roles instead of 'Customer Admin'.
    -}
      { min-approval-count : Natural
      , set-email-as-euid : Bool
      , restrict-customer-admin-role-assignment : Bool
      }
```
<!--Example-->
```dhall
let example
    : UserRoleRequest
    = { min-approval-count = 1
      , set-email-as-euid = True
      , restrict-customer-admin-role-assignment = False
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->
