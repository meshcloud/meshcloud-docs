---
id: how-to-manage-api-users
title: How to Manage API Users
---

:::warning API User Deprecation
We have decided to deprecate the API user feature in meshStack. This decision was made to streamline our user management processes and enhance security. We recommend transitioning to API keys for managing API access. For more information on API keys, please refer to the [How to Manage API Keys](./how-to-manage-api-keys.md) guide.
:::

:::note What is this guide about?
This guide explains how to handle API users to manage objects within meshStack.
:::

## Prerequisites

- Only users with the role organization admin have access to the administrative functionality described in this section

## Step-by-Step Guide Create API Users

1. Navigate to the **Administration** Area.
2. Click on **API Users** under **Access Control**.
3. Click on `+ Create API User` in the top right corner.
4. Fill in the form. Pick a username for API User and decide which resources you want to grant access by selecting the permissions. You can also provide a description. Keep in mind that a username cannot be changed afterwards.
5. Click on `Save`.

## Step-by-Step Guide Update API Users

1. Navigate to the **Administration** Area.
2. Click on **API Users** under **Access Control**.
3. Click on the pencil icon in the 'Actions' column of the API Users you want to update.
4. Update your description or the permissions, you want to grant that API User.
5. Click on `Save`.

## Step-by-Step Guide Delete API Users

1. Navigate to the **Administration** Area.
2. Click on **API Users** under **Access Control**.
3. Click on the trash icon in the 'Actions' column of the API Users you want to delete. A prompt will appear.
4. Confirm the deletion by entering the username in the input field of the prompt. After the deletion of your API User is finalized your list of active API Users will be updated.

## Related Resources

### Concepts

- [Users and Groups](../../concepts/users-and-groups.md)
