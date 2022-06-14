---
id: meshstack.how-to.create-customer
title: How to create a meshCustomer via API
---

This how-to guide is targeted at Cloud Foundation Partners. You need an meshObject API user to run through the steps below.

## Step 1: Install Postman

First install postman. While any tool will do, in this how-to will use [Postman](https://www.postman.com/).

## Step 2: Import existing Customer Owners into the meshObjectCollection

Import the existing [meshCustomerUserBindings](https://docs.meshcloud.io/api/#_meshcustomeruserbinding) for the Customer Owners into the meshObjectCollection.
Importing is done by specifying the [meshObjectCollection](https://docs.meshcloud.io/api/#mesh_object_declarative_import) in the request URL.

```sh
curl --user name:password --location --request PUT 'https://backend-url/api/meshobjects?meshObjectCollection=collection-my-customer-customer-owners&owner=partner@meshcloud.io' \
--header 'Content-Type:  application/vnd.meshcloud.api.meshobjects.v1+yaml;charset=UTF-8' \
--header 'Accept:  application/vnd.meshcloud.api.meshobjects.v1+json' \
--data-raw 'apiVersion: v1
kind: meshCustomerUserBinding
roleRef:
  name: Customer Owner
targetRef: my-customer
  name:
subjects:
  - name: partner@meshcloud.io'
```
