---
id: new-guide-how-to-manage-a-workspace
title: How to Manage A Workspace
---

:::note What is this guide about?
Here are short guides on how to handle the most common tasks in a workspace.
:::

## Creating a Workspace

### Creating a Workspace as an Application Team

**Prerequisites:**

- Have a user account that can log into meshStack.
- meshStack is configured to allow workspace creation for application teams via the UI.

**Step by Step Guide:**

1. Start the wizard by selecting "Create Workspace" in the workspace drop-down in the top navigation bar.
2. Fill in the required details such as name, ID, and tag information.
3. Onboard the initial team members.
4. Review the workspace details and confirm creation.

### Creating a Workspace as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

**Step by Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. Click on "Create Workspace."
3. Fill in the required details such as name, ID, and tag information.
4. Assign initial users and roles.
5. Review the workspace details and confirm creation.

## Deleting a Workspace

### Deleting a Workspace as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace owner permissions.
- No remaining resources in the workspace (e.g., projects, building blocks, tenants)

**Step by Step Guide:**

1. Navigate to the workspace management area.
2. Under "Deletion", provide a reason for deletion and confirm.

### Deleting a Workspace as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.
- No remaining resources in the workspace (e.g., projects, building blocks, tenants)

**Step by Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "Delete Workspace."
3. Provide a reason for deletion and confirm.

## Manage Workspace Tags

### Manage Workspace Tags as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.

**Step by Step Guide:**

1. Navigate to the workspace management area.
2. Under "Settings," select "Tags."
3. Add or edit tags as needed. Please be aware that some tags may be restricted to admin users only.
4. Save changes to apply the tags to the workspace.

### Manage Workspace Tags as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

**Step by Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "Workspace Tags."
3. Add or edit tags as needed.

## Workspace User Management

:::note Info
Please be aware that one user can have multiple workspace role bindings. As the roles are hierarchical we recommend to only assign one role per user in a workspace to ease configuration of access.
:::

### User Management as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.

**Step by Step Guide:**

You can find the workspace access management in the workspace management area under "Access Management." Select "Role Bindings."

- To **add users** to a workspace, follow the guide [How to Onboard Your Team](/docs/new-guide-how-to-onboard-your-team).
- To **remove users**, simply select their role binding and click "Remove."
- To **set an expiration date** for a user, select a deprecation date on the user.
- To **change a user's role**, choose a different role from the drop-down menu.
- To **add a workspace group**, use the "meshWorkspaceUserGroup" resource in the API.

### User Management as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

**Step by Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "User & Groups."

- To **add users** to a workspace, follow the guide [How to Onboard Your Team](/docs/how-to-onboard-your-team.md).
- To **remove users**, simply select their role binding and click "Remove."
- To **set an expiration date** for a user, select a deprecation date on the user.
- To **change a user's role**, choose a different role from the drop-down menu.
- To **add a workspace group**, use the "meshWorkspaceUserGroup" resource in the API.
