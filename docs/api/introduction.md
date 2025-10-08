---
id: introduction
title: Introduction
---

Hey there, and welcome to the official meshStack API documentation!
This documentation page will guide you through the process of integrating
with your meshStack.

This API documentation will help you accomplish specific use cases that
require you to read data from meshStack or insert data into meshStack.

meshStack offers various public REST endpoints to enable your use cases.
If you’re interested in reading data from meshStack via a REST API,
have a look at all API endpoints.

We also provide a Postman collection and OpenAPI documentation.

- [Postman Collection](pathname:///api/meshstack-postman-collection.json)
- [OpenAPI documentation](pathname:///api/meshstack-openapi-docs.json)

The first step for being able to use the new Postman Collection is to import it in Postman.
To proceed, [Authentication](./authentication/api-keys.md) information must be provided centrally in the collection.
You can configure the credentials in the "Authorization" tab of this collection.
These credentials can be retrieved from the panel by creating a new API User or
by using the credentials of an already existing API User. In that case you provide
Basic Auth credentials. You can also use [API Keys](./authentication/api-keys.md), which require a Bearer Token authentication.
Finally, set the hostname variable to ensure that the requests are ready to be executed.

Reading, creating, updating and deleting data into meshStack can be done via [REST API Endpoints](./api-root.api.mdx).

If you are not familiar with the different types of objects in meshStack, we highly recommend
reading about them in our [product documentation](../concepts/meshstack-areas.md). This should give you an idea of what the
objects are, what their relationships are and when you need them.
