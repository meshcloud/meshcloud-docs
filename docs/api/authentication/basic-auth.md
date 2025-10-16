---
id: basic-auth
title: Basic Authentication
---

Basic authentication with API Users is the legacy way to authenticate requests towards
the meshObject API. API Users implement a coarse-grained permission model with access
to all resources in meshStack equivalent to the "Admin permission" level of API Keys.
API Users support all endpoints in the meshObject API.

Basic Authentication requires API clients to provide a valid username and password to
authenticate. You can create API users for Basic Authentication via the admin area in meshPanel.

To authenticate requests via Basic Authentication, please set the Authorization header in your requests as follows:

```
Authorization: Basic <base64 encoded username:password>
```
