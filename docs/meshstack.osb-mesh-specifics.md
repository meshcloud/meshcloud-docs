---
id: meshstack.osb-mesh-specifics
title: meshMarketplace Specifics
---

The OSB API spec does not specify all necessary steps to achieve properly secured dashboard integration. This section describes how Service Brokers can discover user permissions and the URLs necessary for OAuth integration.

## Permissions on Service Instance Level

The authorization shall be done per service instance for every user who accesses the dashboard. This means that only users, that are assigned to the project in the meshMarketplace where the service instance was created, shall have access to its dashboard. Therefore the meshMarketplace provides a REST endpoint to retrieve the information whether the current user is allowed to access a specific service instance. This URL is submitted in the context object of a provision request as the property permission_url:

```json
{
  "permission_url": "https://{mesh-hostname}/serviceInstances/c48d065b-a123-4a1e-8021-2965928d022d/permissions",
  "...": "..."
}
```

When requesting the URL, the access token retrieved via the described OAuth flow, must be submitted in the Authorization header:

```yml
Authorization: Bearer eyHKJDSA57...
```

The response of this request contains a simple json object with a permission field, that can currently have the values NONE and USER.

```json
{
  "permission" : "USER"
}
```

If NONE is returned, the access to the dashboard must be denied for the user. If USER is returned, access must be granted. If the service instance id is not known by the platform (meshMarketplace), HTTP Status 404 is returned.

## Initiating the OAuth Flow

There are two ways for Service Brokers to initiate the OAuth flow for SSO. Implementers can choose the way that’s more convenient for them.

### 1) Use OAuth URLs available in the context

To simplify the OAuth flow for the service brokers and to guarantee, that the service broker uses the same IdB as the platform, the auth_url is part of the context when provisioning a service instance.

```json
{
  "auth_url":"https://{mesh-hostname}/auth/realms/meshfed/protocol/openid-connect/auth?client_id=my-service-client-id&response_type=code&redirect_uri={redirect_uri}&nonce={nonce}&state={state}",
  "...": "..."
}
```

This URL is a template. The redirect_uri must be set by the Service Broker (to redirect to a specific URI containing the service instance id or similar). The random parameters nonce and state have to be generated and replaced by the service broker (see OpenID documentation for this.)
For the OAuth flow, a token endpoint is required too. It is a static link and the request must be build as described in the OpenId documentation.

```json
{
  "token_url": "https://{mesh-hostname}/auth/realms/meshfed/protocol/openid-connect/token",
  "...": "..."
}
```

### 2) Use X-Api-Info-Location header as in Cloud Foundry

For being compatible with Cloud Foundry and making integration easy for Service Brokers, that are already using the Cloud Foundry SSO, an X-Api-Info-Location header is submitted on every request the meshMarketplace executes to the Service Broker.

The header contains an URL to retrieve general information like the auth URL.

```yml
X-Api-Info-Location: http://{mesh-hostname}/info
```

The response when calling this URL has the following content:

```json
{
  "authorization_endpoint": "https://{mesh-hostname}/auth/realms/meshfed/protocol/openid-connect/auth",
  "token_endpoint": "https://{mesh-hostname}/auth/realms/meshfed/protocol/openid-connect/token"
}
```

## meshSpecific Service Tags

The [OSB Spec](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md#service-object) provides a field `tags` for services. By providing specific tags here, the meshMarketplace will interpret them and provide specific functionality for these services. The tags described in the following sections are currently supported.

### Sensitive Service Brokers

Usually the meshMarketplace shows credentials of a Service Binding to the users, who have access to it. If the Service Broker requires a more secure handling of credentials, it can provide the "sensitive" tag for the according service in the OSB catalog. This will result in not displaying the credentials in the meshMarketplace. Instead a download of the credentials is triggered once on initial creation of the binding . The precondition for this to work is, that the creation of the binding is synchronous. Async binding is not supported for sensitive services. The meshMarketplace does not store any credentials provided by sensitive service brokers. It only passes the credentials directly through to the user via the download of a text file containing the credentials.

## meshMarketplace Profile

The OSB API Spec allows platforms to define various extensions as part of a [Profile](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/profile.md)

This section outlines the implementation-specific extensions of the meshMarketplace.

### Context Object

meshMarketplace defines its own context objects for service provisioning requests. For the convenience of the service broker, the meshMarketplace delivers the following information:

```json
{
  "platform": "http://{mesh-hostname}/serviceRegistry/location/1",
  "customer_id": "testCustomer",
  "project_id": "testProject",
  "auth_url": "https://{mesh-hostname}/auth/realms/meshfed/protocol/openid-connect/auth?client_id=1d4ad6d8-dfaa-4913-9c12-fd64b42a5c8d&response_type=code&redirect_uri={redirect_uri}&nonce={nonce}&state={state}",
  "token_url": "https://{mesh-hostname}/auth/realms/meshfed/protocol/openid-connect/token",
  "permission_url": "http://{mesh-hostname}/serviceInstances/c48d065b-a123-4a1e-8021-2965928d022d/permissions"
}
```

It is recommended that Service Brokers store this information as it allows operators to more easily identify links between service instances and projects when handling support requests or monitoring service operation.

### Catalog Metadata

The OSB API Spec defines free-form metadata fields for service instances and plans. Even though not standardized, there are established conventions around their use. In order to have their service properly rendered on the meshMarketplace User Interface, Service Brokers must stick to the [OSB Profile metadata conventions](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#service-metadata).

#### Cost Information

The OSB profile also contains properties to provide [cost information](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#cost-object) via the OSB catalog. Besides showing this information to the user of the meshMarketplace, this information is also used in the [meshMetering](meshstack.metering-meshmarketplace.md) component. That means cost information provided via the OSB catalog will be used to calculate costs for used services my meshMetering. In order to successfully parse the cost information provided via the catalog, the following rules have to be considered, as the OSB Profile is not specific enough to use the cost information for automated pricing of service usages:

- unit must be one of: `HOURLY, WEEKLY, MONTHLY, YEARLY, MB, GB`
- currently only one cost component can be set per service plan. Multiple different cost components per plan are not supported yet. If provided anyway, meshMetering will only use one of the defined cost components (most likely the last one).
- currently only `eur` is supported as a currency

### Service Instance / Binding Parameters

The meshMarketplace intends to support JSON schema for custom parameters used for service instance creation and service binding. You can find the description of the schema [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md#schemas-object)

Delivering this schema information allows the Marketplace UI to assist users in crafting proper parameters.

