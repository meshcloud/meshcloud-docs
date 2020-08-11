---
id: meshstack.authorization
title: Authorization
---

As described in [Identity Federation](meshstack.identity-federation.md) a SSO solution to access multiple cloud platforms is a central feature of meshStack. This section about **Authorization** describes in details on which level and how authorization is granted.

meshStack uses an RBAC authorization model. The default product configuration includes roles aggregating individual permissions (rights). These roles are modeled after functional roles expected in typical usage scenarios.

> Make sure to review the [meshModel](meshcloud.index.md) for background on terminology used in this document.

## Overview

meshStack includes **meshObject roles** that manage permissions on different [meshObjects](meshcloud.index.md). For example meshCustomer Roles describe permissions on a meshCustomer object.

### Role Bindings

**Role bindings** assign a meshUser or meshCustomerUserGroup a meshObject role on specific meshObject. Role bindings are also exposed via the [meshObject API](meshstack.api.md#meshobject-api). For example, a `meshProjectUserBinding` associates a meshUser with a meshProject and a meshProject Role.

Role bindings can also have a managed expiry date after which meshStack will automatically revoke the role.

Some roles also include permissions that allow users to manage role bindings in self-service. For example, a user with the "Customer Admin" [meshCustomer Role](meshcloud.customer.md#assign-meshCustomer-roles) can add new role bindings to that meshCustomer.

### Access Requests

Any change in role binding always occurs via an **access request**. Access requests can be either approved or denied. Access requests may be subject to **approval conditions**. Operators can configure these conditions to meet a range of organisational and regulatory requirements like e.g. a 4 eyes principle.

Role requests produce an audit trail and may trigger notifications to involved parties.

## meshObject Roles

### meshCustomer Roles

[meshCustomer Roles](meshcloud.customer.md#assign-meshCustomer-roles) control the permission on a [meshCustomer](meshcloud.customer.md) and the [meshObjects](meshcloud.index.md) owned by that meshCustomer. Users must have a corresponding role binding in order to access meshObjects owned by a meshCustomer like [meshProjects](meshcloud.project.md).

Users with the right permissions can [assign meshCustomer roles](meshcloud.customer.md#assign-meshcustomer-roles) in self-service.

### meshPartner Roles

The [meshPartner](administration.index.md) is a special type of meshCustomer. meshPartners own other meshCustomer accounts and therefore have far-reaching permissions managed in [meshPartner Roles](administration.index.md).

Users with the right permissions can assign meshCustomer roles in self-service with the same process used to [assign meshCustomer roles](meshcloud.customer.md#assign-meshcustomer-roles).

### meshProject Roles

[meshProject roles](meshcloud.project.md#project-roles) grant users access to meshProjects and their associated [meshTenants](meshcloud.tenant.md). meshProject roles are special in that they do not grant permissions within meshStack (apart from permission to view the meshProject). Instead meshStack replicates meshProject role bindings to the associated meshTenants according to their [meshPlatform](meshcloud.platform-location.md) and [Landing Zone](meshcloud.landing-zones.md) configuration.

Users with the right permissions can [assign meshProject roles](meshcloud.project.md#assign-user-to-a-meshproject) in self-service. Users and groups can only have meshProject role bindings as long as they also have a role binding on the meshCustomer that is the owner of that meshProject. Revocation of this meshCustomer role binding causes revocation of all associated meshProject role bindings.

## Configuration Options

### Available meshProject Roles

Operators globally configure the names and identifiers of meshProject roles available in their meshStack implementation. The individual [meshPlatform](meshcloud.platform-location.md) and [Landing Zone](meshcloud.landing-zones.md) configuration determines how these meshProject roles are mapped to cloud roles/permissions for an individual meshTenant.

The default configuration of meshStack ships with these roles and intended use.

- Project Reader: A read-only user, like a controller or similar.
- Project User: A default user, like a developer, who can manage resources in the cloud platform.
- Project Admin: An admin user, who can also change configurations of the project in the cloud platform.

<!--snippet:mesh.meshfed.web.project-->

The following configuration options are available at `mesh.meshfed.web.project`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```haskell
let ProjectRoleConfiguration =
    {-
        initialRole:
            Designates the default role that will be pre-selected for new role requests in meshPanel.

        roles:
            The list of roles available on meshProjects. Each role has a display name and an
            identifier used to reference the role in configuration (e.g. in Landing Zones).
    -}
      { initial-role : Optional Text
      , roles : Optional (List ProjectRole)
      }
```
<!--Example-->
```haskell
let example =
        { initial-role = Some "user"
        , roles = Some
          [ { name = "Project-Admin", identifier = "admin" }
          , { name = "Project-User", identifier = "user" }
          , { name = "Project-Reader", identifier = "reader" }
          ]
        }
      : ProjectRoleConfiguration
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Role Request Approval

In case you are required to implement a 4-eye-principle for access requests for compliance purposes you can configure the meshStack to do so. The approval can be configured in the [meshStack configuration model](meshstack.configuration.md) under `meshfed.web.user.rolerequest` as follows:

```dhall
{ minApprovalCount = Some 2
, enforceUserAcceptanceRequired = Some True
}
```

If the `minApprovalCount` option is set to 2 or higher upon adding a project role binding, a popup will ask the inviting user to enter some additional information like why this role is required and for how long. This information will be visible to customer administrators who then can accept or decline such a request.

<figure>
  <img src="assets/authorization.additional-role-info.png" style="width: 50%;" alt="Additional Information Role Request Popup">
  <figcaption>Popup requesting additional information for a project role request</figcaption>
</figure>

New project role requests must be approved before the binding is created. The customer admin making the role request registers an implict approval of the request. Each customer admin can only reqister a single approval for an access request. This ensures that a _different_ customer admin must register the 2nd approval before the binding is created.

Customer admins will be notified by email about pending approvals. The affected user is also informed via mail about approved or rejected role requests. In case of a customer user group, all users of the group are informed.

When any customer admin declines the role request, the role request is immediately cancelled.

> Note: When a customer has less customer admins than the requested `minApprovalCount`, role requests will get automatically approved when all customer admins have registered an approval. The meshPanel can be configured to display a warning in this case.

Its recommended to configure a warning to be shown to the user if this happens so another admin can be invited to the customer. To do so configure the [meshStack configuration model](meshstack.configuration.md) under `panel.mesh.dashboardNotification`:

```dhall
{ show4EyePrincipleWarning = Some True }
```

It's currently not possible to configure required approval for removal of role bindings.

### Authorization in Cloud Platforms

There are two different ways how to apply access rights to the Cloud Platforms. Some Platforms can use the rights that are set in the OIDC or SAML token provided by the [meshIdB](meshstack.identity-federation.md). However, not all cloud platforms support this approach. Therefore the second option is the [replication](./meshcloud.tenant.md) of authorization attributes during meshTenant replication.

> Please consult the documentation for the different cloud platforms for more details on the supported authorization mechanisms and their configuration.

#### meshIdB Authorization

In order to provide users access to their cloud resources, all relevant authorization information about a meshUser is stored in the corresponding meshIdB user. To provide the authorization information in the token, the request for the token must be scoped to a specific meshCustomer role. The tokens provided by Keycloak contain the scoped customer and the according meshCustomer role as well as information about the meshProjects the user has access to.

The following claims in the OIDC token represent this information and can be used by the cloud platforms to apply the access rights.

```json
{
  "MC_PROJECTS": [
    "project1-noadmin",
    "project2-noadmin"
  ],
  "MC_CUSTOMER": "my-customer",
  "MC_GROUPS": [
    "Customer Admin"
  ],
  "preferred_username": "user@meshcloud.io",
  "email": "user@meshcloud.io",
}
```

The `MC_PROJECTS` claim contains all projects the user has access to in the scoped meshCustomer. The `MC_GROUPS` also contain only the meshCustomer roles the user is assigned to in the current customer. This claim is currently defined as an array for future flexibility. Currently a user can only have one role assigned per meshCustomer.

#### Authorization via replication

For platforms that don't support the [Authorization via OIDC](#authorization-via-oidc), access rights are replicated during project replication. Cloud platforms provide their own ACL system and meshStack configures it as defined in the meshProject. E.g. this could be an assignment of certain roles for a certain project in the cloud platform.

## Service Users

[Service Users](meshcloud.service-user.md) are technical users, that can be created for individual meshTenants. They are local platform users and can therefore only be used to access a specific project in a specific cloud platform. The password of such a generated user is only downloaded once when a service user is created. meshStack does not store this password. It is the user’s responsibility to safely store it. If the password is somehow compromised, the service user can easily be deleted and replaced by a new service user.

A Service User can be created and deleted by all users assigned to the project. Information about the Service User creator is available in meshStack. The creator is responsible for the secure usage of this Service User.

## Role Revocation

User role revocation on [meshProject](meshcloud.project.md#unassign-principal-from-a-meshproject) and [meshCustomer](meshcloud.customer.md#remove-assigned-meshcustomer-roles) level allow Customer Admins to always limit access to the meshCustomer and meshProjects to the users that actually need access. Users who no longer should have access can easily be revoked access. Administrators also have the possibility to revoke roles for a user to all meshCustomers and meshProjects and deactivate this user completely in the complete meshStack via the [delete user](administration.users.md#delete-user) functionality.

Users who e.g. left the company, can automatically be revoked in meshStack as described [here](meshstack.user-revocation.md).
