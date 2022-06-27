---
id: meshstack.how-to.change-customer-owner
title: How to change the Customer Owner of a meshCustomer via API
---

This how-to guide is targeted at Cloud Foundation Partners. You need a meshObject API user to run through the steps below.

If the meshCustomer does not have a Customer Owner yet, you can add yourself as a Customer Admin and assign yourself the Customer Owner role via the panel.

If the meshCustomer has a single Customer Owner set, you do not need to use a meshObjectCollection and can start at step 3.

If the meshCustomer has two Customer Owners set, you need to follow all three steps.

## Step 1: Create a meshObjectCollection

Follow [API docs](https://docs.meshcloud.io/api/#mesh_object_collection_create) to create a meshObjectCollection.

```sh
curl --location --request POST 'https://backend-url/api/meshobjectcollections' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjectcollection.v1+json;charset=UTF-8' \
--header 'Authorization: Basic xyz' \
--data-raw '{
"name": "collection-my-customer-customer-owners",
"owner": "partner@meshcloud.io",
"description": "This is a meshObjectCollection."
}'
```

## Step 2: Import existing Customer Owners into the meshObjectCollection

Import the existing [meshCustomerUserBindings](https://docs.meshcloud.io/api/#_meshcustomeruserbinding) for the Customer Owners into the meshObjectCollection.
Importing is done by specifying the [meshObjectCollection](https://docs.meshcloud.io/api/#mesh_object_declarative_import) in the request URL.

```sh
curl --location --request PUT 'https://backend-url/api/meshobjects?meshObjectCollection=collection-my-customer-customer-owners&owner=partner@meshcloud.io' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjects.v1+yaml;charset=UTF-8' \
--header 'Accept:  application/vnd.meshcloud.api.meshobjects.v1+json' \
--header 'Authorization: Basic xyz' \
--data-raw 'apiVersion: v1
kind: meshCustomerUserBinding
roleRef:
  name: Customer Owner
targetRef:
  name: my-customer
subjects:
  - name: partner@meshcloud.io'
```

## Step 3: Set yourself as Customer Owner

Set yourself as Customer Owner.

```sh
# If you skipped steps 1 and 2, replace the first line of the command below with:
# curl --location --request PUT 'https://backend-url/api/meshobjects \
# If you went through steps 1 and 2, run the command as is:
curl --location --request PUT 'https://backend-url/api/meshobjects?meshObjectCollection=collection-my-customer-customer-owners&owner=partner@meshcloud.io' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjects.v1+yaml;charset=UTF-8' \
--header 'Accept:  application/vnd.meshcloud.api.meshobjects.v1+json' \
--header 'Authorization: Basic xyz' \
--data-raw 'apiVersion: v1
kind: meshCustomerUserBinding
roleRef:
  name: Customer Owner
targetRef:
  name: my-customer
subjects:
  - name: partner@meshcloud.io'
```
