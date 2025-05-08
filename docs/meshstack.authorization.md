---
id: meshstack.authorization
title: Authorization
---

As described in [Identity Federation](meshstack.identity-federation.md) a SSO solution to access multiple cloud platforms is a central feature of meshStack. This section about **Authorization** describes in details on which level and how authorization is granted.

meshStack uses an RBAC authorization model. The default product configuration includes roles aggregating individual permissions (rights). These roles are modeled after functional roles expected in typical usage scenarios.

> Make sure to review the [meshModel](meshcloud.index.md) for background on terminology used in this document.

## Overview

meshStack includes **meshObject roles** that manage permissions on different [meshObjects](meshcloud.index.md). For example meshWorkspace Roles describe permissions on a meshWorkspace object.

### Role Bindings

**Role bindings** assign a meshUser or meshWorkspaceUserGroup a meshObject role on specific meshObject. Role bindings are also exposed via the [meshStack API](/api/). For example, a `meshProjectUserBinding` associates a meshUser with a meshProject and a meshProject Role.

Role bindings can also have a managed expiry date after which meshStack will automatically revoke the role.

Some roles also include permissions that allow users to manage role bindings in self-service. For example, a user with the "Workspace Manager" [meshWorkspace Role](meshcloud.workspace.md#assign-meshWorkspace-roles) can add new role bindings to that meshWorkspace.

### Access Requests

Any change in role binding always occurs via an **access request**. Access requests can be either approved or denied. Access requests may be subject to **approval conditions**. Partners can configure these conditions to meet a range of organisational and regulatory requirements like e.g. a 4 eyes principle.

Role requests produce an audit trail and may trigger notifications to involved parties.

## meshObject Roles

### meshWorkspace Roles

[meshWorkspace Roles](meshcloud.workspace.md#assign-meshWorkspace-roles) control the permission on a [meshWorkspace](meshcloud.workspace.md) and the [meshObjects](meshcloud.index.md) owned by that meshWorkspace. Users must have a corresponding role binding in order to access meshObjects owned by a meshWorkspace like [meshProjects](meshcloud.project.md).

Users with the right permissions can [assign meshWorkspace roles](meshcloud.workspace.md#assign-meshworkspace-roles) in self-service.

### meshPartner Roles

The [meshPartner](administration.index.md) is a special type of meshWorkspace. meshPartners own other meshWorkspaces and therefore have far-reaching permissions managed in [meshPartner Roles](administration.index.md).

Users with the right permissions can assign meshWorkspace roles in self-service with the same process used to [assign meshWorkspace roles](meshcloud.workspace.md#assign-meshworkspace-roles).

### meshProject Roles

[meshProject roles](meshcloud.project.md#project-roles) grant users access to meshProjects and their associated [meshTenants](meshcloud.tenant.md). meshProject roles are special in that they do not grant permissions within meshStack (apart from permission to view the meshProject). Instead meshStack replicates meshProject role bindings to the associated meshTenants according to their [meshPlatform](meshcloud.platforms.md) and [Landing Zone](meshcloud.landing-zones.md) configuration.

Users with the right permissions can [assign meshProject roles](meshcloud.project.md#assign-user-to-a-meshproject) in self-service. Users and groups can only have meshProject role bindings as long as they also have a role binding on the meshWorkspace that is the owner of that meshProject. When a user or group loses access to a workspace, meshStack will automatically remove all associated project role bindings.

## Configuration Options

### Available meshProject Roles

Operators globally configure the names and identifiers of meshProject roles available in their meshStack implementation. The individual [meshPlatform](meshcloud.platforms.md) and [Landing Zone](meshcloud.landing-zones.md) configuration determines how these meshProject roles are mapped to cloud roles/permissions for an individual meshTenant.

The default configuration of meshStack ships with these roles and intended use.

- Project Reader: A read-only user, like a finops manager or similar.
- Project User: A default user, like a developer, who can manage resources in the cloud platform.
- Project Admin: An admin user, who can also change configurations of the project in the cloud platform.

It is possible to define **additional custom roles**. These roles can also be referenced in the landing zone configuration to map them to roles available in the cloud platform.

<!--snippet:mesh.meshfed.web.project-->

The following configuration options are available at `mesh.meshfed.web.project`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let ProjectRoleConfiguration =
    {-
        roles:
            The list of roles available on meshProjects. Each role has a display name and an
            identifier used to reference the role in configuration (e.g. in Landing Zones).
    -}
      { roles : List ProjectRole }
```
<!--Example-->
```dhall
let example =
        { roles =
          [ { name = "Project Admin"
            , identifier = "admin"
            , description = Some
                "Can fully access the project in the cloud platform with administrative permissions including changing project configuration."
            , rank = 3
            }
          , { name = "Project User"
            , identifier = "user"
            , description = Some
                "Can use, create, and manage cloud resources within the cloud platforms project."
            , rank = 2
            }
          , { name = "Project Reader"
            , identifier = "reader"
            , description = Some
                "Can only view project resources in the cloud platform without the ability to use, manage and create new resources."
            , rank = 1
            }
          ]
        }
      : ProjectRoleConfiguration
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Role Request Approval

In case you are required to implement a 4-eye-principle for access requests for compliance purposes you can configure the meshStack to do so. The approval can be configured in the [meshStack configuration model](meshstack.index.md#configuration) under `meshfed.web.user.rolerequest`. See the [role request configuration reference](meshstack.onboarding.md#workspace-user-invitations) for details.

If the `minApprovalCount` option is set to 2 or higher upon adding a project role binding, a popup will ask the inviting user to enter some additional information like why this role is required and for how long. This information will be visible to workspace managers who then can accept or decline such a request.

<figure>
  <img src="assets/authorization.additional-role-info.png" style="width: 50%;" alt="Additional Information Role Request Popup">
  <figcaption>Popup requesting additional information for a project role request</figcaption>
</figure>

New project role requests must be approved before the binding is created. The workspace manager making the role request registers an implict approval of the request. Each workspace manager can only reqister a single approval for an access request. This ensures that a _different_ workspace manager must register the 2nd approval before the binding is created.

> Note: if you make a role request on behalf of another workspace manager, that user (or another workspace manager) still has to approve or reject this request. This is intentional behavior to make users aware of any role changes done on their behalf.

Workspace managers will be notified by email about pending approvals. The affected user is also informed via mail about approved or rejected role requests. In case of a workspace user group, all users of the group are informed.

When any workspace manager declines the role request, the role request is immediately cancelled.

> Note: When a workspace has less workspace managers than the requested `minApprovalCount`, role requests will get automatically approved when all workspace managers have registered an approval. The meshPanel can be configured to display a warning in this case.

Its recommended to configure a warning to be shown to the user if this happens so another admin can be invited to the workspace. To do so configure the [meshStack configuration model](meshstack.index.md#configuration) under `panel.mesh.dashboardNotification`:

```dhall
{ show4EyePrincipleWarning = Some True }
```

It's not possible to configure required approval for removal of role bindings. Removal of role bindings
do not require approval and are made effective immediately.

### Authorization in Cloud Platforms

meshStack [replicates](./meshcloud.tenant.md) project role bindings to the cloud platform. During this process, meshStack translates the role binding to platform-specific role assignments according to the configuration provided by a Platform Engineer on the platform or landing zone level.

> Please consult the documentation for the different cloud platforms for more details on the supported authorization mechanisms and their configuration.
