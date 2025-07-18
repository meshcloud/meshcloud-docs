id: new-guide-how-to-manage-a-project
title: How to Manage a Project
---

:::note What Is this guide about?

This guide explains how to manage projects in meshStack, including user access, environments, tags, and financials.

:::

## Creating a Project

### Creating a Project as an Application Team

**Prerequisites:**

- Have a user account that can log into meshStack.
- Workspace owner or admin access to workspace manager of the workspace.

**Step by Step Guide:**

1. Start the wizard by selecting "Create Project" in the project tab inside the workspace manager.
2. Fill in the required details such as name, ID, and tag information.
3. Review the project details and confirm creation.

### Creating a Project as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin or organization user permissions.

**Step by Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. Assign yourself to the workspace you want to create a project for.
3. Follow the steps for [Creating a Project as an Application Team](/docs/new-guide-how-to-manage-a-project).

## Deleting a Project

### Deleting a Project as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace owner permissions.
- No remaining resources in the project (e.g. building blocks, tenants)

**Step by Step Guide:**

1. Navigate to the workspace management area.
2. In the project tab, select the project you want to delete.
3. Go to the "Deletion" section.
4. Provide a reason for deletion and confirm.

### Deleting a Project as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin, organization user, onboarding support, platform engineer, ops support permissions.
- No remaining resources in the workspace (e.g. building blocks, tenants)

**Step by Step Guide:**

1. Navigate to the admin area and select "Projects"
2. In the drop-down for the project, select "Delete Project."
3. Provide a reason for deletion and confirm.

## Manage Workspace Tags

### Manage Workspace Tags as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.

**Step by Step Guide:**

1. Navigate to the workspace management area.
2. In the project tab, select the project you want to manage tags for.
3. Navigate to the "Settings" section.
4. Select "Tags."
5. Save changes to apply the tags to the project.

### Manage Workspace Tags as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin, organization user, onboarding support, platform engineer, ops support permissions.

**Step by Step Guide:**

1. Navigate to the admin area and select "Project".
2. In the drop-down for the project, select "Project Tags."
3. Add or edit tags as needed.

## Project User Management

:::note Info

Please be aware that users can only be added to a project if they are also part of the workspace.

:::

### Project User Management as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.
- Have workspace manager or owner permissions.

**Step by Step Guide:**

You can find the project access management in the "Access Management" tab of the project. Select "Role Bindings."

- To **add users** to a project, follow the guide [How to Onboard Your Application Team](/docs/how-to-onboard-your-application-team).
- To **remove users**, simply select their role binding and click "Remove."
- To **set an expiration date** for a user, select a deprecation date on the user.
- To **change a user's role**, choose a different role from the drop-down menu.

### Project User Management as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin or organization user permissions.

**Step by Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. Assign yourself to the workspace.
3. Follow the steps for [Project User Management as an Application Team](/docs/new-guide-how-to-manage-a-project#project-user-management-as-an-application-team).

## Related Resources

### Concepts

- [Project](/docs/new-concept-project)
- [User, Groups, and Role Management](/docs/new-concept-user-groups-and-role-management)   

### Guides

- [How to Customize Project Roles](/docs/new-guide-how-to-customize-project-roles)
- [How to Protect Admin Roles](/docs/new-guide-how-to-protect-admin-roles)