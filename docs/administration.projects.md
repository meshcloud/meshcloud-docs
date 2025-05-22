---
id: administration.projects
title: meshProjects
---

## Manage Projects

### Edit Workspace Tag Values

Admin users can edit tag values for tags defined in both [restricted and unrestricted meshTags](meshstack.metadata-tags.md) for managed **meshProjects**.

1. Login to the meshPanel with your administrator credentials.
2. Navigate to the **Administration** via the settings button on the top right.
3. Click on **Workspaces**. You will see a list of your workspaces here.
4. Under the **Actions** column, you can click on **Workspace Projects** and you will see a list of all the projects belonging to that workspace.
5. Select a project and click the `Project Tags` button in the **Actions** column.

### Set Project Quotas

The **Administration** Area includes a quota dashboard that lets you define the amount of resources your workspaces can use for their projects. These resource definitions are called quotas. Quotas can be set per workspace project. OpenStack and Cloud Foundry quotas are defined independently.

To edit the quotas, follow these steps:

1. Login to the meshPanel with your Administrator credentials.
2. Navigate to the **Administration** via the settings button on the top right.
3. Click on **Workspaces**. In this area you can create new workspaces and manage your workspaces’ quotas. You will see a list of your workspaces here.
4. Under the **Actions** column, you can click on **Workspace Projects** and you will see a list of all the projects belonging to that workspace.
5. Also under the **Actions** column, you reach the **Quota Dashboard**. These quotas are project-specific.
6. You can now change the quotas as desired.

### Delete Projects & Tenants

Projects can currently only be deleted by Workspace Managers.

If a meshProject is marked for deletion by a user, and all meshTenants of the meshProject
have been successfully deleted, the meshProject is then automatically deleted.

> Read more about the tenant deletion & approval procedure [here](./administration.delete-tenants.md).

## Audit Projects

### Project Export

If you need to get an overview of all projects or want to use them inside a spreadsheet application you can export all projects as a
[.csv file](https://en.wikipedia.org/wiki/Comma-separated_values). This export contains one row for each Platform that is configured for a project. The configured billing addresses, project tags, local IDs of the project in the cloud platforms and more is available in this export.

To export projects, follow these steps:

1. Login to the meshPanel with your Administrator credentials.
2. Navigate to the **Administration** Area via the settings button on the top right.
3. Click on **Workspaces**.
4. In the upper right there is the button `Project Export`. By clicking it, the download of the Project .CSV file for all workspaces will start.

### Quota Export

This export is an extension of the [Project Export](#project-export). It adds the configured Project Quota to the export. The `Quota Export` button is available in the upper right of **Workspaces** section in the **Administration** Area as well.

### Project History

Sometimes additional information about the lifecycle of the project is required. The archive icon in the list of deleted projects shows all major events that happened on the project. This history is also available for existing projects in the **Workspaces** section of the **Administration** area. Navigate to the **Workspace Projects** of a specific workspace and click the archive icon on the project you want to see details about.

The following events are available:
| Event | Description|
| ------| -----------|
| **PROJECT_CREATED**| A new meshProject was created |
| **PROJECT_PROJECT_MARKED_FOR_DELETION**<br>`since v7.141.0`| A meshProject was deleted by a workspace manager.|
|**PROJECT_DELETED**| `since v7.141.0` When the meshProject was submitted for deletion by a workspace manager and the deletion of all tenants is successful, this event is written.<br>`until v7.141.0`A meshProject was deleted by a workspace manager.|
|**PROJECT_DELETION_CONFIRMED**<br>`deprecated`| A partner or platform engineer confirmed a meshProject deletion that required manual deletion of platform tenants|
|**PROJECT_DELETION_DECLINED**| `since v7.141.0` When the project has been deleted by a workspace manager and the deletion of any tenant requiring manual deletion has been declined by an admin or platform engineer, this event is written.<br>`until v7.141.0`An admin or platform engineer declined a meshProject deletion that required manual deletion of platform tenants.|
|**ALL_PROJECT_TENANTS_DELETED**<br>`deprecated`| Tenants of a meshProject are deleted asynchronously after the user deleted the project. When this deletion is successful, this event is written.
|**TENANT_ADDED**| A tenant was added to a project.|
|**TENANT_MARKED_FOR_DELETION**<br>`since v7.141.0`| A tenant was submitted for deletion by a workspace manager.
|**TENANT_REMOVED**| A tenant was removed from a project by a successful deletion in the corresponding platform.
|**TENANT_DELETION_CONFIRMED**<br>`since v7.141.0`| An admin or platform engineer confirmed a tenant deletion that required manual deletion in the corresponding platform.
|**TENANT_DELETION_DECLINED**<br>`since v7.141.0`| An admin or platform engineer declined a tenant deletion that required manual deletion in the corresponding platform.
|**USER_ASSIGNED**| A user was assigned to the project. If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written after successful approval of the role request.|
|**USER_UNASSIGNED**| A user was removed from the project.|
|**PROJECT_ROLE_CHANGED**| The user role was changed on the project. If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written after successful approval of the role request.|
|**PROJECT_ROLE_APPROVED**| If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written for every approval.|
|**PROJECT_ROLE_REJECTED**| If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written when a role request is rejected.|
|**EDIT_PROJECT_TAGS**| If Project Tags are configured, this event is written every time a tag is edited by a workspace manager.|
|**PARTNER_EDIT_PROJECT_TAGS**| If Project Tags are configured, this event is written every time an admin edits the restricted project tags.|
|**QUOTA_EDITED**| Quota Settings for the project were changed.|
