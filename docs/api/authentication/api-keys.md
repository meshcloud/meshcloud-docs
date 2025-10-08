---
id: api-keys
title: OAuth API Keys
---

API keys authorize requests towards the meshObject API within the scope of
the workspace owning the API key. To issue workspace-scoped API Keys,
navigate to the admin or workspace area. Follow these steps:

1. Open the respective workspace.
2. Go to Workspace Access > API Keys.
3. Issue a new API key by clicking `+ Create API Key`.
4. Provide a name and select permissions the API key shall get.
5. Use the API Key `client_id` and `client_secret` to make requests
   to the [login endpoint](../api-key-login-response.api.mdx) to retrieve an OAuth access token.

Most API endpoints support API Keys with fine-grained permissions that provide separate permissions for
read, create or update and delete permissions. Please review the permissions in meshPanel for a full
list of supported permissions.

You can also assign "Admin permissions" to an API key. While normal permissions scope access to resources
owned by the workspace the API key is issued for, "Admin permissions" allow access to all resources in meshStack.
Admin permissions can only be assigned to an API Key from the admin area in meshPanel.

To authenticate requests via API keys, please set the Authorization header in your requests as follows:

```
Authorization: Bearer <access_token>
```
