---
id: meshstack.meshmarketplace.tenant-services
title: Tenant Services
---

Tenant Services provide a convenient way for cloud foundation teams to provide "foundational" services such as virtual
networks with intranet connectivity, CI/CD platform integration and similar scenarios. Tenant services are Open Service Broker
(OSB) API compatible services that are flagged as "tenant-aware" services in the meshMarketplace. Service consumers
can then bind their [meshTenants](./meshcloud.tenant.md) against these services using a specialized service binding type. This allows service brokers to receive tenant information like an Azure Subscription Id or AWS Account number where the
consumer wants the service to be provisioned.


## Service Broker Categories

There are 2 different categories of Service Brokers that can be implemented that way. They don't differ from an API perspective, but they treat bindings differently in their implementation.

- `single-tenant-aware`: For each tenant binding a specific configuration is done inside the tenant. It could e.g. provide an "OnPrem Connect" to a public cloud tenant. This configuration must be done for every tenant that is provided via a binding.
- `multi-tenant-aware`: Bindings are a configuration to make the service aware of tenants it can work with. An example for this is a "CI/CD" Service Broker. The CI/CD pipeline should be able to work on multiple tenants of a multi-cloud application. E.g. parts of the application are deployed to Azure, others to AWS. Especially for this type of Service Brokers not only tenants of the same meshProject must be selectable, but also tenants of other meshProjects in the same meshCustomer. E.g. the CI/CD pipeline should have access to dev, int and prod tenants, which might be located in different meshProjects. Providing those cross-project bindings can be achieved via [Service Instance Sharing](#sharable-service-instances).

## Creating Service Binding

When the service binding is created, meshMarketplace will provide a [Bind Resource object](https://github.com/openservicebrokerapi/servicebroker/blob/v2.15/spec.md#bind-resource-object) with properties `tenant_id` and `platform` in the `bind_resource` object of the bind request:

```json
{
  "service_id": "my-service-id",
  "plan_id": "my-plan-id",
  "bind_resource": {
    "tenant_id": "my_tenant_id_1",
    "platform": "platform-identifier-1"
  }
}
```

- `tenant_id` is the tenant id in the platform, e.g. AWS Account ID or Azure Subscription Id.
- `platform` is the full identifier of the platform as it is configured in meshStack. It is custom per environment. The Service Broker team can request the list of available platforms and their identifier from meshcloud.

As a response the Service Broker will provide a credential binding. Depending on the service it might not be real credentials, but just a link to e.g. the CI/CD Web Interface. Or in case of the "OnPrem Connect" perhaps some metadata information for the user is provided. An empty object would also be a valid response. This credential information is only displayed to the user, so it should only contain information the user can understand.

## Configuration in the meshMarketplace

Services can be platform-specific. A specific AWS OnPrem Connect SB is an example for this. It should only be possible to bind AWS tenants to this service. This can be achieved by [publishing](meshstack.meshmarketplace.development.md#publish-your-service-broker) this Service Broker only to marketplaces of AWS meshLocations. This will allow the user to only select tenants related to this meshLocation.

Multi-tenant-aware service brokers that support different platform types, should only be [published](meshstack.meshmarketplace.development.md#publish-your-service-broker) to the global location. This allows the user to select any tenant in the meshProject, independent of the meshLocation.
