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

1. Start the wizard by selecting "Create Workspace" in the workspace drop-down in the top navigation bar.
2. Fill in the required details such as name, ID, and tag information.
3. Onboard the initial team members.
4. Review the workspace details and confirm creation.

### Creating a Workspace as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

1. Navigate to the admin area and select "Workspaces."
2. Click on "Create Workspace."
3. Fill in the required details such as name, ID, and tag information.
4. Assign initial users and roles.
5. Review the workspace details and confirm creation.

## Manage Workspace Tags

### Manage Workspace Tags as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.

1. Navigate to the workspace management area.
2. Under "Settings," select "Tags."
3. Add or edit tags as needed. Please be aware that some tags may be restricted to admin users only.
4. Save changes to apply the tags to the workspace.

### Manage Workspace Tags as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "Workspace Tags."
3. Add or edit tags as needed.

## Workspace User Management

### User Management as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.

You can find the workspace access management in the workspace management area under "Access Management." Select "Role Bindings."

- To **add users** to a workspace, follow the guide [How to Onboard Your Team to a Workspace](how-to-onboard-your-team-to-workspace.md).
- To **remove users**, simply select their role binding and click "Remove."
- To **set an expiration date** for a user, select a deprecation date on the user.
- To **change a user's role**, choose a different role from the drop-down menu.
- To **add a workspace group**, use the "meshWorkspaceUserGroup" resource in the API.

### User Management as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "User & Groups."

- To **add users** to a workspace, follow the guide [How to Onboard Your Team to a Workspace](how-to-onboard-your-team-to-workspace.md).
- To **remove users**, simply select their role binding and click "Remove."
- To **set an expiration date** for a user, select a deprecation date on the user.
- To **change a user's role**, choose a different role from the drop-down menu.
- To **add a workspace group**, use the "meshWorkspaceUserGroup" resource in the API.

## Payment Methods

:::note Info
Deleting payment methods is not supported via UI.
:::

### Manage Payment Methods as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.
- Have default payment method setup enabled. This means payment methods are created by admins and assigned to workspaces.

1. Navigate to the workspace management area.
2. Under "Financials," select "Payment Methods."
3. See the status of your payment methods across projects.
4. Access the details for tags, budget status, spend history, and forecast.

### Manage Payment Methods as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "Create/Edit Payment Methods."

- To **create a new payment method**, click "Create Payment Method" and fill in the required details.
- To **edit an existing payment method**, select "Edit Payment Method" in the drop-down.
- To **export payment methods**, click "Export Payment Methods" to download a CSV file with the payment method details.
- To **delete a payment method**, select use the meshpayment method endpoint in the API.
