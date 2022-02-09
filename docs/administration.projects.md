---
id: administration.projects
title: meshProjects
---

## Manage Projects

### Edit Customer Tag Values

Partner users can edit tag values for tags defined in both [restricted and unrestricted meshTags](meshstack.metadata-tags.md) for managed **meshProjects**.

1. Login to the meshPanel with your administrator credentials.
2. Navigate to the **Administration** via the settings button on the top right.
3. Click on **Customers**. You will see a list of your customers here.
4. Under the **Actions** column, you can click on **Customer Projects** and you will see a list of all the projects belonging to that customer.
5. Select a project and click the `Project Tags` button in the **Actions** column.

### Set Project Quotas

The **Administration** Area includes a quota dashboard that lets you define the amount of resources your customers can use for their projects. These resource definitions are called quotas. Quotas can be set per customer project. OpenStack and Cloud Foundry quotas are defined independently.

To edit the quotas, please follow these steps:

1. Login to the meshPanel with your Administrator credentials.
2. Navigate to the **Administration** via the settings button on the top right.
3. Click on **Customers**. In this area you can create new customers and manage your customers’ quotas. You will see a list of your customers here.
4. Under the **Actions** column, you can click on **Customer Projects** and you will see a list of all the projects belonging to that customer.
5. Also under the **Actions** column, you reach the **Quota Dashboard**. These quotas are project-specific.
6. You can now change the quotas as desired.

### Delete Projects

When a user deletes a meshProject it is not completely removed in the cloud platforms and in the database, only flagged for deletion.
The deletion procedure depends on the variaty of meshTenants under the project:

1. a project contains exclusively tenants where we don't support automatic deletion (AWS, GCP, Azure, Kubernetes, OpenShift)
2. a project contains exclusively tenants where we support automatic deletion (OpenStack, Cloud Foundry, Marketplace)
3. a project containing a combination of 1. and 2.

**1. No Automatic Deletion**: If a meshProject contains meshTenants from a public cloud platform, a partner or platform operator will have to perform the deletion of those platform tenants manually in the respective platform.

The following steps need to be performed by an partner admin:
In the **Deleted Projects** page in the **Administration** area, you have the option to filter for projects which contain tenants that require manual actions.
For the projects that require manual deletion, you have the option to either confirm or decline the deletion. In order to confirm the deletion, you have to first perform the manual deletion of tenants in the platforms on which meshStack does not support automatic deletion. Once you have performed this task, you can confirm that the deletion is completed by clicking on the trash icon. You have to confirm that you have deleted all platform tenants for the project.
You can also enter an optional comment regarding the deletion which is limited to 255 characters. Once you confirm the deletion, an asynchronous background job that runs regularly will pick it up and perform any additional actions that are needed to complete the deletion. This includes deleting any OpenStack, Cloud Foundry and Marketplace platform tenants.
The "Deleted in platforms on" column shows the time when the background process completed the project deletion successfully.

If you choose to decline the project deletion, you can do so by clicking on the decline button. You have to enter the project identifier to confirm that you decline the deletion.
You can also enter an optional reason for deletion which is limited to 255 characters. If you decline the deletion, the project will be available again in the **Projects** section of the meshCustomer.

You also have to consider limitations described [here](meshstack.tenants.md).

**2. Automatic Deletion**: If a project with OpenStack, Cloud Foundry and Marketplace tenants is marked for deletion, it will be eligible for **automatic deletion** and no manual actions are needed neither from the meshCustomer level nor the meshPartner level. An asynchronous background job removes tenants from platforms regularly.

A list of deleted meshProject is shown in the Administration/Project section. To view a list of deleted meshProject which doesn't require manual deletion action on partner level **uncheck** the "Requires manual deletion" box on top of the list.

**3. Combination Of meshTenants**: If a projects contains a combination of tenants for 1. and 2. the tenants which dont require manual deletion are deleted automatically. For the other tenants the manual deletion step is necessary.

## Audit Projects

### Project Export

If you need to get an overview of all projects or want to use them inside a spreadsheed application you can export all projects as a
[.csv file](https://en.wikipedia.org/wiki/Comma-separated_values). This export contains one row for each Platform that is configured for a project. The configured billing adresses, project tags, local IDs of the project in the cloud platforms and more is available in this export.

To export projects, plase follow these steps:

1. Login to the meshPanel with your Administrator credentials.
2. Navigate to the **Administration** Area via the settings button on the top right.
3. Click on **Customers**.
4. In the upper right there is the button `Project Export`. By clicking it, the download of the Project .CSV file for all customers will start.

### Quota Export

This export is an extension of the [Project Export](#project-export). It adds the configured Project Quota to the export. The `Quota Export` button is available in the upper right of **Customers** section in the **Administration** Area as well.

### Project History

Sometimes additional information about the lifecycle of the project is required. The archive icon in the list of deleted projects shows all major events that happened on the project. This history is also available for existing projects in the **Customers** section of the **Administration** area. Navigate to the **Customer Projects** of a specific customer and click the archive icon on the project you want to see details about.

The following events are available:

- **PROJECT_CREATED**: A new meshProject was created.
- **PROJECT_DELETED**: A meshProject was deleted by a customer admin.
- **PROJECT_DELETION_CONFIRMED**: A partner or platform operator confirmed a meshProject deletion that required manual deletion of platform tenants.
- **PROJECT_DELETION_DECLINED**: A partner or platform operator declined a meshProject deletion that required manual deletion of platform tenants.
- **ALL_PROJECT_TENANTS_DELETED**: Tenants of a meshProject are deleted asynchronously after the user deleted the project. When this deletion is successful, this event is written.
- **TENANT_ADDED**: One tenant was added to a project.
- **TENANT_REMOVED**: One tenant was removed from a project.
- **USER_ASSIGNED**: A user was assigned to the project. If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written after successful approval of the role request.
- **USER_UNASSIGNED**: A user was removed from the project.
- **PROJECT_ROLE_CHANGED**: The user role was changed on the project. If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written after successful approval of the role request.
- **PROJECT_ROLE_APPROVED**: If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written for every approval.
- **PROJECT_ROLE_REJECTED**: If [4-EP](meshstack.authorization.md#user-project-role-approval) is active, this event is written when a role request is rejected.
- **EDIT_PROJECT_TAGS**: If Project Tags are configured, this event is written every time a tag is edited by a customer admin.
- **PARTNER_EDIT_PROJECT_TAGS**: If Project Tags are configured, this event is written every time a partner/admin edits the restricted project tags.
- **QUOTA_EDITED**: Quota Settings for the project were changed.
- **SERVICE_USER_CREATED**: A Service User was created for the project.
- **SERVICE_USER_DELETED**: A Service User was deleted for the project.
