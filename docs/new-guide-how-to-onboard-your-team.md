---
id: new-guide-how-to-onboard-your-team
title: How to Onboard Your Team
---

:::note What is this guide about?

This guide walks you through adding your application or platform team members to provide access to workspace management and included platform environments. You’ll learn how to invite users, assign roles, and use optional approval workflows for extra control.

:::

## Invite to Workspace

**Prerequisites**

- You need either the workspace manager or workspace owner role in the workspace where you want to add users to.
- Users need to be present in meshStack.

**Step-by-Step Guide**

1. **Select Your Workspace**
   - Use the drop-down in the upper-left corner to pick the workspace you want to manage.

2. **Open the Access Control Panel**
   - Click the `Workspace Access` tab to manage team members.

3. **Invite Users and Assign Roles**
   - At the end of the `Current Access` list, type in the first name, last name, or email address to find the user you want to add.
   - Choose a workspace role (workspace owner, admin, or employee) and press the `+` button.
   - You can only grant workspace owner to a maximum of 2 users per workspace. Only a workspace owner can grant another user the owner role—unless there’s no workspace owner at all.

4. **(Optional) Use 4-Eyes Access Controls**
   - meshStack supports optional 4-eyes access controls for extra security.
   - If enabled, a second user with workspace manager or workspace owner permission must approve the access request. The second user should navigate to the specific workspace, go to the `Workspace Access` tab, and then click the `Access Requests` tab in the second tab row.

## Troubleshooting

- If you can’t find a user, check spelling and make sure they’re registered in your organization.
- If the user is not present in meshStack check the IAM configuration of your meshStack e.g. for SCIM syncronization make sure the user is in scope of the SCIM sync.

## Invite to Project

**Prerequisites**

- You need either the workspace manager or workspace owner role in the workspace where you want to add users to.
- Users need to be present in meshStack.

**Step-by-Step Guide**

1. Make sure you are in the workspace you want to add further users. Do this by checking the drop-down in the upper-left corner.
2. Navigate to the project where you want to onboard your project team members.
3. Select the project using the top navigation bar.
4. Select the project from the workspace overview.
5. Go to the access control panel by clicking on the `Project Access` tab.
6. At the end of the `Current Access` list, use the input field to type in the first name, last name, or email address to find and select the user you want to add. Choose a Project Role and press the `+` button.
7. Optional 4-Eyes Access Controls: A second user with Workspace Manager or Workspace Owner permission needs to approve the access request. The second user must also navigate to the specific workspace (see step 1.), select the project (see step 2.), go to the `Workspace Access` tab (see step 3.) and then click on the `Access Requests` tab in the second tab-row.

## Related Resources

### Concepts

- [Workspace](./new-concept-workspace.md)
- [Projects](./new-concept-project.md)
- [Workspace Users and Permissions](./new-concept-users-and-groups.md#workspace-users-and-permissions)

### Guides

- [How to Manage Workspaces](./new-guide-how-to-manage-a-workspace.md)