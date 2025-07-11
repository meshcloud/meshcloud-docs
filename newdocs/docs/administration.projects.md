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
