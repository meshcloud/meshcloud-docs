---
id: meshstack.how-to.change-workspace-owner
title: How to change the Workspace Owner of a meshWorkspace via API
---

This how-to guide is targeted at Cloud Foundation Partners. You need a meshObject API user with permissions `Get any meshObject`, `Import any supported meshObject`, and `Allow assignment of the Workspace Owner role to a user or group` to run through the steps below.

If the meshWorkspace does not have a Workspace Owner yet, you can add yourself as a Workspace Manager and assign yourself the Workspace Owner role via the panel.

If the meshWorkspace has a single Workspace Owner set, you do not need to use a meshObjectCollection and can start at step 3.

If the meshWorkspace has two Workspace Owners set, you need to follow all three steps.

## Step 1: Create a meshObjectCollection

Follow [API docs](https://docs.meshcloud.io/api/index.html#mesh_object_collection_create) to create a meshObjectCollection.

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

## Step 2: Import existing Workspace Owners into the meshObjectCollection

Import the existing [meshWorkspaceUserBindings](https://docs.meshcloud.io/api/index.html#_meshworkspaceuserbinding) for the Workspace Owners into the meshObjectCollection.
Importing is done by specifying the [meshObjectCollection](https://docs.meshcloud.io/api/index.html#mesh_object_declarative_import) in the request URL.

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

## Step 3: Set yourself as Workspace Owner

Set yourself as Workspace Owner.

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
