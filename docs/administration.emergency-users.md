---
id: administration.emergency-users
title: "Guide: Emergency Users"
---

meshStack manages access to cloud platforms, projects and resources. In case urgent intervention is required by someone without regular access permissions there must be a defined process to securely access meshProjects and associated meshTenants. This page outlines step-by-step procedures that meshStack operators can use as the basis for their own emergency procedures. Depending on your organization's requirements, these procedures can be augmented with additional organisational or technical procedures.

Example use cases for emergency users and emergency intervention include

- An important application has stopped functioning and operating users needs access to debug and fix the problem
- Project access for a specific user must be immediately revoked (e.g. due to an account compromise)

In all cases access permissions can always be modified through the [meshPartner](administration.index.md) account which is managed by an operations team. If available, a user with workspace manager access is also sufficient for some cases.

## Emergency Access with Workspace Manager

If a user with [workspace manager](meshcloud.workspace.md) access is available, meshProject users and roles can be managed the normal way, even if the workspace manager is not assigned to the meshProject.

First, the user requiring emergency access must be invited to the meshWorkspace

- Ensure that the correct meshWorkspace is selected
- Open the **Workspace Access** tab in the [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace) and navigate to **Current Access** subtab.
- At the bottom of the screen, type in the name or e-mail of the new user and invite them with the desired role.

You can also grant workspace manager rights to the newly invited user, i.e. if the emergency user needs to modify other user permissions. In this case, the new user can perform the following steps themselves.

### Adding emergency as Workspace Manager

The user can then be assigned to meshProjects belonging to the meshWorkspace:

- In the project overview in the [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace), open the designated project by clicking on its name.
- Navigate to the **Project Access** tab and open the **Current Access** subtab.
- Add the user with the desired project role.

Since emergency access should only be temporary, it's strongly advised to assign the user a role with a [set expiration date](./meshcloud.project.md#expiry-of-a-user-assignment) which will ensure that the user is automatically removed from the meshProject after the specified date.

### Approving emergency user requests

User project role assignments can be configured to require consent from multiple workspace managers ([4 eye principle](./meshstack.authorization.md#user-project-role-approval)). To avoid situations where not enough workspace managers are available to confirm an urgent user role request, the meshPartner can confirm project role requests directly:

- Ensure that the partner is selected from the meshWorkspace drop down
- Open "Administration" from the settings menu in the top right
- Navigate to "Workspaces" and select "User Pending Role Requests" from the actions column for the meshWorkspace to which the project is assigned
- Approve the user role request

### Removing emergency user via meshWorkspace

When emergency access is no longer required the following steps will revert performed changes:

- Remove user from meshProject by opening the project again and navigating to **Project Access** > **Current Access** (performed automatically if expiration date was set)
- Remove user from meshWorkspace via the [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace): go to **Workspace Access** > **Current Access**.

## Access with meshPartner

Even when no workspace manager is available, users with partner admin/employee access can manage permissions for their managed meshWorkspaces.

### Adding emergency user as meshPartner

Note: this only works when Workspace Manager role assignment is enabled via the panel. This depends on the `restrictCustomerAdminRoleAssignment` configuration
value ([read more here](meshstack.onboarding.md#workspace-user-invitations))

In order to manage users for a specific meshProject, the partner user must add their own account to the respective meshWorkspace as a workspace manager:

- Ensure that the meshPartner is selected from the meshWorkspace dropdown
- Open "Administration" from the settings menu in the top right
- Navigate to "Workspaces" and select "Workspace User" from the actions column for the target workspace
- Activate “Add Myself” button in the top right

Afterwards they may proceed to manage users for this meshWorkspace as a workspace manager (see previous section).

### Removing emergency user as meshPartner

Since the meshPartner user is now a workspace manager the procedure is the same as outlined in the previous section.
However, to revert the temporary workspace manager role assignment, another workspace manager must remove the partner user from the workspace via **Workspace Access** > **Current Access**.

## Access Through Service Users

When access is only required for cloud resources and the cloud platform supports [service users](./meshcloud.service-user.md) emergency access can also be arranged by utilizing service users.
Service user credentials can be generated by any user assigned to a meshProject by navigating to the desired meshProject and meshPlatform and selecting “Service Users”. When they are no longer required they can be deleted here as well.

## Auditing Emergency Access

Since meshWorkspace/meshProject access permissions should not be granted lightly all changes to them are logged and can be audited by partner admin/employee users.

### Workspace History

- Ensure that the meshPartner is selected from the meshWorkspace drop down
- Open "Administration" from the settings menu in the top right
- Navigate to "Workspaces" and select "Workspace History"

The list contains all meshWorkspace events (i.e. sent invitations, added/removed users, role changes), when they occurred and who initiated the action. Event specific information (i.e. who the recipient of an invite was) is available via the “Details” button.

### Project History

- Ensure that the meshPartner is selected from the meshWorkspace drop down
- Open "Administration" from the settings menu in the top right
- Navigate to "Workspaces" and select "Workspace Projects"
- Find the project and select "Project History"

The general information per project event is the same as before. Event types include user assignments, project role changes and created service users. Event specific information is again available via the “Details” button.
