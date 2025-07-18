---
id: new-guide-how-to-reflect-organizational-changes
title: How to Reflect Organizational Changes in meshStack
---

:::note What is this guide about?

This guide explains how you can reflect organizational changes within meshStack. This includes changes in responsibilities of an application team or changing the ownership of a project. 

:::

## Challenge

As teams and responsibilities change, you may need to transfer ownership of environments. This often involves moving tenants (e.g., AWS accounts, Azure subscriptions) to different projects, or moving projects to different workspaces.

## Moving a Tenant Between Projects

**Note:** Some platforms may have restrictions or require additional approval for moving tenants. Always check your organization's policy and platform documentation.

### Prerequisites

- Have admin access to meshStack with organization admin permissions.

### Step-by-Step Guide

1. In the admin area, navigate to the tenants and click on "View more"
2. Go to Settings > Move Tenant

## Change Owner of a Workspace

### Prerequisites

- meshObject API user with permissions `Get any meshObject`, `Import any supported meshObject`, and `Allow assignment of the Workspace Owner role to a user or group`

### Step-by-Step Guide

- If the workspace does not have a workspace owner yet add yourself as a workspace manager and assign yourself the workspace owner role via the panel.
- If the workspace has a single workspace owner set, you do not need to use a meshObjectCollection and can start at step 3.
- If the workspace has two workspace owners set follow all three steps in the guide.

1. Create a meshObjectCollection

Follow [API docs](pathname:///api/#mesh_object_collection_create) to create a meshObjectCollection.

```sh
curl --location --request POST 'https://backend-url/api/meshobjectcollections' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjectcollection.v1+json;charset=UTF-8' \
--header 'Authorization: Basic xyz' \
--data-raw '{
"name": "collection-my-workspace-customer-owners",
"owner": "partner@meshcloud.io",
"description": "This is a meshObjectCollection."
}'
```

2. Import existing workspace owners into the meshObjectCollection

Import the existing [meshWorkspaceUserBindings](pathname:///api/index.html#_meshworkspaceuserbinding) for the Workspace Owners into the meshObjectCollection.
Importing is done by specifying the [meshObjectCollection](pathname:///api/index.html#mesh_object_declarative_import) in the request URL.

```sh
curl --location --request PUT 'https://backend-url/api/meshobjects?meshObjectCollection=collection-my-workspace-customer-owners&owner=partner@meshcloud.io' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjects.v1+yaml;charset=UTF-8' \
--header 'Accept:  application/vnd.meshcloud.api.meshobjects.v1+json' \
--header 'Authorization: Basic xyz' \
--data-raw 'apiVersion: v1
kind: meshWorkspaceUserBinding
roleRef:
  name: Workspace Owner
targetRef:
  name: my-workspace
subjects:
  - name: partner-old@meshcloud.io'
```

3. Set yourself as workspace owner

```sh
# If you skipped steps 1 and 2, replace the first line of the command below with:
# curl --location --request PUT 'https://backend-url/api/meshobjects \
# If you went through steps 1 and 2, run the command as is:
curl --location --request PUT 'https://backend-url/api/meshobjects?meshObjectCollection=collection-my-workspace-customer-owners&owner=partner@meshcloud.io' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjects.v1+yaml;charset=UTF-8' \
--header 'Accept:  application/vnd.meshcloud.api.meshobjects.v1+json' \
--header 'Authorization: Basic xyz' \
--data-raw 'apiVersion: v1
kind: meshWorkspaceUserBinding
roleRef:
  name: Workspace Owner
targetRef:
  name: my-workspace
subjects:
  - name: partner-new@meshcloud.io'
```

## Related Resources

### Concepts

- [Workspace](./new-concept-workspace.md)
- [Project](./new-concept-project.md)
- [Tenant](./new-concept-tenant.md)
- [User, Groups, and Role Management](./new-concept-user-groups-and-role-management.md)
