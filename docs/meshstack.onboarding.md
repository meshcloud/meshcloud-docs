---
id: meshstack.onboarding
title: Onboarding
---

meshStack enables self-service onboarding for your internal customers. Operators can use the following options to customize the experience.

## Workspace Registration

Multiple options are available to control how [meshWorkspaces](./meshcloud.workspace.md) can sign up to meshStack in
self-service. meshStack can be configured to suit your organization's unique demands for sign up.

<!--snippet:mesh.panel.environment.mesh.registration-->

The following configuration options are available at `mesh.panel.environment.mesh.registration`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Registration =
    {-
        requirePayment:
            Determines if the workspace registration wizard will collect a default "Cost Center" payment method.
            Disabling this will cause new meshWorkspaces to be registered without a payment method.
            This is useful if the meshStack implementation requires users to register payment methods via an external
            process (e.g. via API createLimitedPaymentMethod).

            See ui.costCenter for customizing the default cost center payment method.
    -}
      { requirePayment : Bool }
```
<!--Example-->
```dhall
let example = { requirePayment = True } : Registration
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Additional Approval Flows

Additional configuration option control backend behavior in `meshfed.web.register` as follows:

```dhall

{ {- Allow sign up only if valid payment information was provided during registration  -}
, requirePayment : Optional Bool
}
```

Additional remarks and configuration links:

- `requirePayment` must be consistently configured between `panel` and `meshfed` configuration settings. The configuration model validates this.

### Default Quotas

meshStack assigns a default quota to newly registered [meshWorkspaces](./meshcloud.workspace.md) (see section above). platform engineers can configure this default quota via `meshfed.web.customer.defaultQuota`:

```dhall
{ {- the number of allowed meshProjects per meshWorkspace -}
  meshProjects : Natural
}
```

The default only applies to newly registered [meshWorkspaces](./meshcloud.workspace.md). [meshPartners](./administration.index.md) can change the individual quotas for managed meshWorkspaces at any time using the [administration area](administration.workspaces.md#workspace-quota-management).


## Workspace User Invitations

When a user is invited to a workspace there are several configurations to customize this invitation flow which is explained below.


<!--snippet:mesh.web.user.rolerequest-->

The following configuration options are available at `mesh.web.user.rolerequest`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let UserRoleRequest =
    {-
      Configure settings related to role-requests for users. This includes
      functionality like adding new users to a meshWorkspace.

        min-approval-count:
          The minimum number of approvals needed before a requested role binding is granted and made effective.
          Using 2 or higher allows implementation of a 4-eyes principle and similar approval workflows.

        set-email-as-euid:
          When the role request is for a new meshUser, set the email address (either entered by the inviting
          person or retrieved from identity lookup) as the new meshUser's euid.

          The effect of this setting may be overridden, as IdentityLookup configuration takes precedence over
          this.

        restrict-customer-admin-role-assignment:
          When enabled, prevents self-service assignment of the Workspace Manager role via meshPanel.
          In this case, only meshObject API (or meshStack's Identity Connector) can be used for creating these role
          bindings. This is useful when an external system is the source of truth regarding
          Workspace Manager role assignments.

          Also, admin users using the "add myself" functionality in the admin area will be restricted to granting
          themselves 'Workspace Member' roles instead of 'Workspace Manager'.
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
