---
id: meshstack.how-to-API-keys
title: How to use scoped API keys
---
You can issue workspace scoped API Keys via the admin or workspace area. Those API keys authorize only for request towards the meshObject API in scope of the respective workspace. Step by step we will enable the individual endpoints of the meshObject API to allow for more scoped requests.

How to set it up:
1. Open the respective workspace and go to Workspace Access -> API Keys. 
2. Issue a new API key by clicking "create API key" and provide a name and an authorization scope.
3. Make sure to save the secret and key ID securely to make the request
4. Issue an API call towards the backend to receive the bearer token for further requests e.g. https://federation.dev.meshcloud.io/api/ (Provide the following keys in the body of the request in the x-www-form-urlencoded format):
    - client_id: This is the key ID
    - client_secret: This is the key secret provided to you
    - grant_type is always specified as: client_credentials