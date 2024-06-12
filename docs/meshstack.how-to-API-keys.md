---
id: meshstack.how-to-API-keys
title: How to use scoped API keys
---
You can issue workspace scoped API Keys via the admin or workspace area. Those API keys authorize only for requests towards the meshObject API in scope of the respective workspace. Step by step we will enable the individual endpoints of the meshObject API to allow for more scoped requests.

How to set it up:

1. Open the respective workspace and go to Workspace Access → API Keys. 
2. Issue a new API key by clicking "create API key" and provide a name and an authorization scope.
3. Make sure to save the secret and key ID securely to make the request
4. Issue an API call towards the backend to receive a short-lived bearer token e.g. /api/login (Provide the following keys in the body of the request in the x-www-form-urlencoded format):
   
    - client_id: This is the key ID
    - client_secret: This is the key secret provided to you
    - grant_type is always specified as: client_credentials
      
5. Use the token in further request by specifying it in the authorization header

If you want to disable the creation of API keys in self service via the workspace area please reach out to support@meshcloud.io. By default this functionality is enabled. 
