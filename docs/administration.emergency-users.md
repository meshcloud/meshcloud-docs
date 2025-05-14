---
id: administration.emergency-users
title: "Guide: Emergency Users"
---

meshStack manages access to cloud platforms, projects and resources. In case urgent intervention is required by someone without regular access permissions there must be a defined process to securely access projects and associated tenants. This page outlines step-by-step procedures that users with the role "Platform Engineer" can use as the basis for their own emergency procedures. Depending on your organization's requirements, these procedures can be augmented with additional organisational or technical procedures.

Example use cases for emergency users and emergency intervention include

- An important application has stopped functioning and operating users needs access to debug and fix the problem
- Project access for a specific user must be immediately revoked (e.g. due to an account compromise)

In all cases access permissions can always be modified through the [Admin Area](administration.index.md) account which is managed by an operations team. If available, a user with workspace manager access is also sufficient for some cases.

## Emergency Access with Workspace Manager

If a user with [workspace manager](meshcloud.workspace.md) access is available, project users and roles can be managed the normal way, even if the workspace manager is not assigned to the project.

First, the user requiring emergency access must be invited to the workspace

- Ensure that the correct workspace is selected
- Open the **Workspace Access** tab in the [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace) and navigate to **Current Access** subtab.
- At the bottom of the screen, type in the name or e-mail of the new user and invite them with the desired role.

You can also grant workspace manager rights to the newly invited user, i.e. if the emergency user needs to modify other user permissions. In this case, the new user can perform the following steps themselves.

### Adding emergency as Workspace Manager

The user can then be assigned to projects belonging to the workspace:

- In the project overview in the [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace), open the designated project by clicking on its name.
- Navigate to the **Project Access** tab and open the **Current Access** subtab.
- Add the user with the desired project role.

Since emergency access should only be temporary, it's strongly advised to assign the user a role with a [set expiration date](./meshcloud.project.md#expiry-of-a-user-assignment) which will ensure that the user is automatically removed from the project after the specified date.

### Approving emergency user requests

User project role assignments can be configured to require consent from multiple workspace managers ([4 eye principle](./meshstack.authorization.md#user-project-role-approval)). To avoid situations where not enough workspace managers are available to confirm an urgent user role request, an Admin user can confirm project role requests directly:

- Ensure that the Admin user is selected from the workspace drop down
- Open "Administration" from the settings menu in the top right
- Navigate to "Workspaces" and select "User Pending Role Requests" from the actions column for the workspace to which the project is assigned
- Approve the user role request

### Removing emergency user via workspace

When emergency access is no longer required the following steps will revert performed changes:

- Remove user from project by opening the project again and navigating to **Project Access** > **Current Access** (performed automatically if expiration date was set)
- Remove user from workspace via the [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace): go to **Workspace Access** > **Current Access**.

## Workspace Access as an Admin User

Even when no workspace manager is available, admin users can manage permissions for workspaces.

### Workspace History

- Ensure that the Admin user is selected from the workspace drop down
- Open "Administration" from the settings menu in the top right
- Navigate to "Workspaces" and select "Workspace History"

The list contains all workspace events (i.e. sent invitations, added/removed users, role changes), when they occurred and who initiated the action. Event specific information (i.e. who the recipient of an invite was) is available via the “Details” button.
