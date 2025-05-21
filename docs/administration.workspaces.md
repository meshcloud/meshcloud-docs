---
id: administration.workspaces
title: meshWorkspaces
---

With an admin user you can easily manage multiple workspaces with the meshcloud Portal. The meshcloud administration area is the
place to create and manage your workspaces. You can access the meshcloud **Administration** Area by opening the settings menu and
navigating to the **Administration** Area.

When selecting **Workspaces** in the menu bar on the left you can see the list of all workspaces managed by you.

## Create managed Workspaces

### Manually register a new Workspace

With meshcloud you can easily create workspaces.

1. Login to the meshPanel with your admin credentials.
2. If not logged in, please login with your admin user credentials.
3. On the toolbar at the top, please make sure that you have navigated into the 'Admin Area'.
4. Select **Workspaces** in the menu bar on the left.
5. There is a button `+ Create Workspace` on the top-right of the table. After clicking the button, you will be navigated to the workspace creation screen. Here you can enter the name and identifier of the new workspace as well as the user(s) that should be assigned to the workspace. Keep in mind that you are able to configure restricted tags, this is not possible for non-admin users.

> **Attention**: Identifiers can not be changed. Please choose them carefully.

### Approve new Workspaces

A meshStack installation can be configured to require a manual approval by a partner/admin for new meshWorkspace registrations. Users who register receive an email notifying them, that their account is currently being verified. As soon as a partner/admin approves the request, they receive another email. This email informs users, that they are now approved and can start working with the cloud resources. Depending on the configuration, users may also have to confirm their email address via a confirmation link, that is available in the second email.

## Manage Workspaces

### Disabling Workspaces

Partners can disable meshWorkspaces in case the responsible workspace managers do not provide valid [Payment Methods](meshcloud.payment-methods.md) or do not maintain correct [metadata](meshstack.metadata-tags.md).

Setting the meshWorkspace status to **Disabled** has the following effects on [meshProjects](meshcloud.project.md) and [meshTenants](meshcloud.tenant.md) owned by this workspace:

- users can no longer access [meshTenants](meshcloud.tenant.md) via meshPanel

Disabling a workspace does not technically prevent users from accessing tenants when logging in directly on the cloud platform. To prevent this access so, admins must add themselves to the workspace as an admin and manually remove user permissions.

If you want to prevent a workspace from creating new [meshProjects](meshcloud.project.md), you can [adjust the workspace's meshProject quota](#set-workspace-quotas).

### Access managed Workspaces

As an admin user you can assign yourself a role on managed workspaces. The role that will be assigned can either be "Workspace Member" or "Workspace Manager" depending on the configuration of meshstack ([read more here](meshstack.onboarding.md#workspace-user-invitations)). If you are assigned as a Workspace Member you cannot execute step four and five.

1. Go to **Administration &gt; Workspaces** and click on the **Users** icon on the managed workspace you want to edit.
2. In the **Workspaces Users** view click on the button **Add Myself** in the top right corner.
3. After you have successfully assigned yourself to the account you can now choose the account in the top left drop-down. Please select the
   new managed workspace there.
4. In the toolbox go to **Account &gt; Users** where you can invite and add users to the managed workspace.
5. Invited users will receive an e-mail with a link to get access to this new workspace. For more details on user invitation, also see [meshWorkspace](meshcloud.workspace.md).

### Send messages to workspace users

Partner are able to send short notification messages to the users of their managed workspaces. Recipients will see these notifications
upon login.

In order to send such a message:

1. Login to the meshPanel with your partner credentials.
2. Navigate to the **Administration** area via the toolbox on the top right and then click on **Workspaces** in the menu.
3. In the **Actions** column click on the envelope icon.

Write your messages and choose which recipient should receive the messages: **All must read** will show the message to all recipients and everyone has
to acknowledged the message. Or you can choose **Single read only** which will hide the message for all other users if one single user has acknowledged
it. This is useful e.g. for maintenance task required to be done by the project team. Once one team member has solved the task, displaying the
notification is no longer necessary.

### Set Workspace Quotas

Partners and Administrators can manage the quota, that limits the maximum number of projects per workspace.

1. Login to the meshPanel with your credentials.
2. Navigate to the **Administration** area via the toolbox on the top right and then click on **Workspaces** in the menu.
3. In the **Actions** column click on the **Quota** icon on the managed workspace you want to edit.
4. Then you can increase and decrease the number of projects per workspace.

### Edit Workspace Tag Values

Admin users can edit tag values for tags defined in both [restricted and unrestricted meshTags](meshstack.metadata-tags.md) for managed **meshWorkspaces** by navigating to the **Workspaces** list and clicking the `Workspace Tags` button.

## Audit Workspaces

### Account History

Sometimes additional information about the lifecycle of a workspace is required. The archive icon in the list of workspaces shows all major events that happened on the workspace.

The following events are available:

| Event | Description |
| ------| ----------- |
| **CUSTOMER_REGISTERED**| A new meshWorkspace registered in self-service. |
| **CUSTOMER_CREATED**| A new meshWorkspace was created by a partner/admin. |
| **USER_INVITED**| A user was invited to a meshWorkspace. |
| **USER_ACCEPTED_INVITATION**| A user accepted the invitation. |
| **USER_INVITATION_CANCELLED**| An invitation was cancelled by a workspace manager. |
| **USER_REMOVED**| A user was removed from the meshWorkspace. |
| **USER_ROLE_CHANGED**| The role of a user was changed on the meshWorkspace. |
| **CUSTOMER_QUOTA_EDITED**| The quota of a meshWorkspace was changed. |
| **USER_ASSIGNED_HIMSELF**| A partner/admin assigned himself to a meshWorkspace. |
| **CUSTOMER_STATUS_CHANGED**| A partner/admin changed the status of a meshWorkspace (i.e. disabled or enabled the meshWorkspace). |
| **CUSTOMER_APPROVED**| A partner/admin approved a new meshWorkspace registration. This event is only available, when the [manual workspace approval](#approve-workspace) is activated. |
