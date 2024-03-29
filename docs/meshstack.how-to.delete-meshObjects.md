---
id: meshstack.how-to.delete-meshObjects
title: How to delete meshObjects in the meshPanel
---

Part of the cloud lifecycle inside meshStack is the deletion of meshWorkspaces, meshProject and meshTenants.
The following guide provides a guide for users how to proceed with the deletion of their cloud environments and workspaces via the meshPanel

## How to delete a meshTenant

Your user needs at least the Workspace Manager role to proceed with the meshProject deletion.

If you want to delete just a meshTenant e.g. AWS Account without deleting your complete meshProject you can use the meshTenant deletion.

The following step-by-step guide shows how to successfully request the deletion of an meshTenant:

1. Go to your meshWorkspace where the meshProject is located in the meshPanel ![Choose meshWorkspace](./assets/workspace/choose-workspace.png)
2. Go to your meshProject in which you want to delete the meshTenant ![Choose meshProject](./assets/project/project-in-top-nav.png)
3. Click on "View more details" for the meshTenant you want to delete !["View more details"](./assets/project/project-nav-to-tenant.png)
4. Click on the "Deletion" tab and follow the deletion instruction for the meshTenant !["Delete meshTenant"](./assets/project/project-tenant-deletion.png)

### Admin action

The meshTenant deletion requires follow up action from Cloud Foundation administrators (Partner Admins or similar).
Cloud Foundation or Cloud Platform administrators can either confirm or decline the deletion after checking the meshTenant.

> Please reach out to support@meshcloud.io if you are interested in deletion request notifications. Deletion request notifications will inform you via Email or Slack if a new deletion request arrives.

#### How to confirm or decline a meshTenant deletion request

1. Go to the Admin Area ![Admin Area](./assets/partner/navigate-to-admin-area.png)
2. Navigate to Platforms -> Deleted Tenants ![deleted meshTenants](./assets/partner/partner-tenant-deletion-action.png)

2.1. Click on the bin icon (green) to confirm the meshTenant deletion. The meshTenant will than be deleted from meshStack. <p>
2.2. Click on the stop icon (yellow) to decline the meshTenant deletion. The meshTenant will re-appear in the meshWorkspaces meshProject.

## How to delete a meshProject

Your user needs at least the Workspace Manager role to proceed with the meshProject deletion.

The following step-by-step guide shows how to successfully request a meshProject deletion:

1. Go to your meshWorkspace where the meshProject is located in the meshPanel ![Choose meshWorkspace](assets/workspace/choose-workspace.png)
2. Go to your meshProject from which you want to delete the meshTenant ![Choose meshProject](./assets/project/project-in-top-nav.png)
3. Click on the "Deletion" tab and follow the deletion instruction for the meshProject !["Delete meshTenant"](./assets/project/project-deletion.png)

## How to delete a meshWorkspace

Your user needs the "Workspace Owner" role to proceed with the deletion of the meshWorkspace.

1. Go to your meshWorkspace where the meshProject is located in the meshPanel ![Choose meshWorkspace](assets/workspace/choose-workspace.png)
2. Click on the "Deletion" tab and follow the deletion instructions for the meshWorkspace !["Delete meshTenant"](assets/workspace/workspace-deletion.png)
