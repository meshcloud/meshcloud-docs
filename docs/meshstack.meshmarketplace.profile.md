---
id: meshstack.meshmarketplace.profile
title: meshcloud OSB API Profile
---

The OSB API Specification itself is a generic protocol and allows extension for specific implementations. meshMarketplace uses these extensions to allow service brokers to receive metadata from meshStack, control how their services are presented and made available in the marketplace as well as how they are to be billed.

## OSB API Profile

The OSB API Spec allows platforms to define various extensions as part of a [Profile](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/profile.md)

### Originating Identity Header

meshMarketplace sets the [X-Broker-API-Originating-Identity](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/profile.md#originating-identity-header) header to contain a Json Web Token (JWT) with the meshStack user id as well as the [euid](./meshstack.identity-federation.md#externally-provisioned-identities).

```text
X-Broker-API-Originating-Identity: meshmarketplace eyJ1c2VyX2lkIjogInRlc3R1c2VyIiwgInVzZXJfZXVpZCI6ICJ0ZXN0VXNlckV1aWQifQ==
```

Decoding this JWT results in the following value:

```json
{
  "user_id": "testuser",
  "user_euid": "testUserEuid"
}
```

### Context Object

meshMarketplace defines its own context objects for service provisioning requests. For the convenience of the service broker, the meshMarketplace delivers the following information:

```json
{
  "platform": "meshmarketplace",
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

The OSB profile also contains properties to provide [cost information](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#cost-object) via the OSB catalog. Besides showing this information to the user of the meshMarketplace, this information is also used in the [meshMetering](meshstack.meshmarketplace.metering.md) component. That means cost information provided via the OSB catalog will be used to calculate costs for used services my meshMetering. In order to successfully parse the cost information provided via the catalog, the following rules have to be considered, as the OSB Profile is not specific enough to use the cost information for automated pricing of service usages:

- unit must be one of: `HOURLY, WEEKLY, MONTHLY, YEARLY, MB, GB`
- currently only one cost component can be set per service plan. Multiple different cost components per plan are not supported yet. If provided anyway, meshMetering will only use one of the defined cost components (most likely the last one).
- currently only `eur` is supported as a currency

#### Expiring Service Bindings

Additionally, the meshMarketplace supports expiring service bindings which can be used to force credential rolling. Service catalogs can specify service plans with expiring bindings by settings `metadata.expiryDays` to the number of days after which a service binding for a service instance based on this plan should be deleted.
The meshStack regularly checks expiring service bindings, notifies users about upcoming expiration dates through the marketplace dashboard and enforces their deletion once they are expired.

### Service Instance / Binding Parameters

The meshMarketplace intends to support JSON schema for custom parameters used for service instance creation and service binding. You can find the description of the schema [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md#schemas-object)

Delivering this schema information allows the Marketplace UI to assist users in crafting proper parameters.
