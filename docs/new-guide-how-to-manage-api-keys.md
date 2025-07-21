---
id: new-guide-how-to-manage-api-keys
title: How to Manage API Keys
---

:::note What is this guide about?
This guide explains how to handle API keys to provide workspaces scoped API access to meshStack. Managing these keys effectively is crucial to maintain security and control over API access. 
:::

## Challenge

You want to provide application teams dedicated API keys scoped for their workspaces to access only certain objects in meshStack. This is useful for integrations or automations that require API access without exposing broader permissions across the whole organization.

## Prerequisites

- API keys are enabled in the meshStack instance. Check in the admin area under settings > compliance > API keys.
- No limiting quota is set on the workspace for API keys by default. If you want to limit the number of API keys per workspace, please refer to [How to Limit Workspace Resources](new-guide-how-to-limit-workspace-resources.md).
- Workspace owner or manager permissions on the workspace where you want to manage API keys or for changes in the admin area organization admin permissions.

## Step-by-Step Guide to Set Up API Keys

1. Open the respective workspace and go to Workspace Access → API Keys. 
2. Issue a new API key by clicking "create API key" and provide a name and an authorization scope.
3. Make sure to save the secret and key ID securely to make the request
4. Issue an API call towards the backend to receive a short-lived bearer token via /api/login (Provide the following keys in the body of the request in the x-www-form-urlencoded format):

    - client_id: This is the key ID
    - client_secret: This is the key secret provided to you
    - grant_type is always specified as: client_credentials
      
5. Use the token in further request by specifying it in the authorization header

## Setting Expiration for API Keys

You can set an expiration date for API keys to ensure they are not used indefinitely. This is done during the creation of the API key. You can also enforce expiration policies in the admin area under settings > compliance > API keys.

## Related Resources

### Concepts

- [Users and Groups](new-concept-users-and-groups.md)

### Guides

- [How to Limit Workspace Resources](new-guide-how-to-limit-workspace-resources.md)
