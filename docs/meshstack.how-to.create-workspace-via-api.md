---
id: meshstack.how-to.create-workspace-via-api
title: How to create a meshWorkspace via API
---

This how-to guide is targeted at Cloud Foundation Partners. You need meshObject API user to run through the steps below.

## Step 1: Install Postman

First install postman. While any tool will do, in this how-to will use [Postman](https://www.postman.com/).

## Step 2: Import existing Workspace Owners into the meshObjectCollection

Import the existing [meshWorkspaceUserBindings](/api/index.html#_meshworkspaceuserbinding) for the Workspace Owners into the meshObjectCollection.
Importing is done by specifying the [meshObjectCollection](/api/index.html#mesh_object_declarative_import) in the request URL.

```sh
curl --location --request PUT 'https://backend-url/api/meshobjects?meshObjectCollection=collection-my-workspace-workspace-owners&owner=partner@meshcloud.io' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjects.v1+yaml;charset=UTF-8' \
--header 'Accept:  application/vnd.meshcloud.api.meshobjects.v1+json' \
--header 'Authorization: Basic xyz' \
--data-raw 'apiVersion: v1
kind: meshWorkspaceUserBinding
roleRef:
  name: Workspace Owner
targetRef: my-workspace
  name:
subjects:
  - name: partner@meshcloud.io'
```
