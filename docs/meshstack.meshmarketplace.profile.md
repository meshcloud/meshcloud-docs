---
id: meshstack.meshmarketplace.profile
title: meshcloud OSB API Profile
---

The OSB API Specification itself is a generic protocol and allows extension for specific implementations. meshMarketplace uses these extensions to allow service brokers to receive metadata from meshStack, control how their services are presented and made available in the marketplace as well as how they are to be billed.

The OSB API Spec allows platforms to define various extensions as part of a [Profile](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/profile.md).

## Originating Identity Header

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

## Context Object

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

> `auth_url`, `token_url` and `permission_url` will be `null`, unless the service broker's catalog specifies a dashboard client.

It is recommended that Service Brokers store this information as it allows operators to more easily identify links between service instances and projects when handling support requests or monitoring service operation.

## Catalog Metadata

The OSB API Spec defines free-form metadata fields in the service catalog for service instances and plans. By providing
specific metadata as outlined in the next sections, service brokers can instruct the meshMarketplace to provide specific functionality for their services such as metering or allowing service instance sharing.

The conventions used by meshMarketplace are very similar to official [OSB Profile metadata conventions](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#service-metadata) for Cloud Foundry and Kubernetes.

### Cost Information

The OSB profile also contains properties to provide [cost information](https://github.com/openservicebrokerapi/servicebroker/blob/master/profile.md#cost-object)
via the OSB catalog. Besides showing this information to the user of the meshMarketplace, this information is also used
by [meshStack metering](meshstack.billing.md). That means cost information provided via the OSB catalog will be used to calculate costs for used services by meshStack metering.

Please review the [meshMarketplace Metering documentation](meshstack.meshmarketplace.metering.md) for more details.

Also see [Metrics-based Metering](meshstack.meshmarketplace.metrics-metering.md#cost-information-in-catalog) for details about how to charge your services usage-based.

### Sensitive Services

Usually the meshMarketplace shows credentials of a Service Binding to the users, who have access to it. If the Service Broker requires a more secure handling of credentials, it can provide the `sensitive` metadata for the according service in the OSB catalog.

```json
{
  "services": [{
    "id": "acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
    "name": "fake-service",
    "metadata": {
      "sensitive": true
    }
  }]
}
```

The meshMarketplace does not store any credentials provided by bindings on sensitive services. Instead, the meshMarketplace will only offer the credentials for download during the initial creation of the binding. The precondition for this to work is, that the creation of the binding is synchronous. Async bindings are not supported for sensitive services.

### Tenant-Aware Services

A Service Broker can define its services to be tenant-aware by providing a `tenantAware` flag in service metadata of the service definition. Tenant-aware Services can receive special Service Bindings that provide the meshTenant context to the Service Broker using a special [Bind Resource Object](https://github.com/openservicebrokerapi/servicebroker/blob/v2.15/spec.md#bind-resource-object). When users create a tenant service binding in the meshMarketplace, they have to select a meshTenant. Only the meshTenants of the meshProject, which contains the Service Instance, can be selected.

In the service catalog it would like this:

```json
{
  "services": [{
    "id": "acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
    "name": "my-service",
    "metadata": {
      "tenantAware": true
    }
  }]
}
```

Please review the [Tenant Services documentation](./meshstack.meshmarketplace.tenant-services.md) for more details.

### Sharable Service Instances

[Service Instance Sharing](marketplace.service-instances.md#share-service-instance) must be activated by Service Broker via `shareable` flag on metadata of the service definition.

```json
{
  "services": [{
    "id": "acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
    "name": "fake-service",
    "metadata": {
      "shareable": true
    }
  }]
}
```

### Expiring Service Bindings

Additionally, the meshMarketplace supports expiring service bindings which can be used to force credential rolling. Service catalogs can specify service plans with expiring bindings by settings `metadata.expiryDays` to the number of days after which a service binding for a service instance based on this plan should be deleted.
The meshStack regularly checks expiring service bindings, notifies users about upcoming expiration dates through the marketplace dashboard and enforces their deletion once they are expired.

## Service Instance / Binding Parameters

The meshMarketplace supports JSON schema for custom parameters used for service instance creation and service binding. The support of JSON schema is part of the [OSB spec](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md#schemas-object).
Delivering JSON schema information allows the meshMarketplace UI to assist users in crafting proper parameters by rendering a user interface based on the content of the JSON schema.
meshstack uses an open-source library to achieve this result. If you want to learn more about how to render the JSON schema into a UI, including all the edge-case possibilities, you can take a look at the library's [GitHub repository](https://github.com/guillotinaweb/ngx-schema-form).
Below is an example of a JSON schema which should give you an idea of what's possible and how.

> Please be aware that the meshMarketplace UI currently only supports version [draft-04](http://json-schema.org/draft-04/schema#) of the JSON schema specification.

### Service Instance JSON Schema Example

```json
{
  "type": "object",
  "properties": {
    "securityContact": {
      "type": "string",
      "title": "Security Contact",
      "description": "Who is the security responsible person for this service instance?",
      "default": "person@example-company.com"
    },
    "serviceType": {
      "type": "string",
      "title": "Service Type",
      "description": "Describes where the services faces its endpoints",
      "oneOf": [
        { "description": "Internal", "enum": ["int"] },
        { "description": "External", "enum": ["ext"] }
      ]
    },
    "externalRegistrationNumber": {
      "type": "string",
      "title": "External Registration Number",
      "description": "The external registration number which is required for externally facing services. The number should be exactly 5 digits. If not sure what number to pick, please go to help.example.com/external-registration-number.",
      "pattern": "^[0-9]{5}$",
      "visibleIf": {
        "serviceType": ["ext"]
      }
    }
  }
}
```

### Things to keep in mind

- The order in which the JSON schema properties are shown is determined by the order of the properties within the JSON schema. Looking at the example, the ordering of UI inputs would be `securityContact`, `serviceType` and then `externalRegistrationNumber`.
- It is possible to conditionally hide certain properties, depending on the values of other properties. Given the example JSON schema, `externalRegistrationNumber` will only be visible when the `serviceType` value is equal to `ext`.
- The control that is rendered is dependent on data of the schema property itself. If you want, you can override this behavior by filling the `widget` property. Read more on widgets [here](https://github.com/guillotinaweb/ngx-schema-form#widgets).
- If the value of a certain JSON schema property is not clear from the surface, don't forget that you can use the `description` for extra contextual information such as Wiki links or contact information.
- It is possible to enforce certain patterns. This can be done by providing a Regular Expression in the `pattern` property. `externalRegistrationNumber` demonstrates this by enforcing the use of exactly five digits (0-9) as a value.
