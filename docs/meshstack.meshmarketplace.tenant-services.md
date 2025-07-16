---
id: meshstack.meshmarketplace.tenant-services
title: Tenant Services
---

> **The Tenant Services feature is deprecated! Please do not use this anymore.**
> **We recommend the usage of [Tenant Building Blocks](administration.building-blocks.md) for additional services for your tenants.**

Tenant Services provide a convenient way for cloud foundation teams to provide "foundational" services such as virtual
networks with intranet connectivity, CI/CD platform integration and similar scenarios. Tenant services are Open Service Broker
(OSB) API compatible services that are flagged as "tenant-aware" services in the OSB Services platform. Service consumers
can then bind their [meshTenants](meshcloud.tenant.md) against these services using a specialized service binding type. This allows service brokers to receive tenant information like an Azure Subscription Id or AWS Account number where the
consumer wants the service to be provisioned.

## Service Broker Categories

There are 2 different categories of Service Brokers that can be implemented that way. They don't differ from an API perspective, but they treat bindings differently in their implementation.

- `single-tenant-aware`: For each tenant binding a specific configuration is done inside the tenant. It could e.g. provide an "OnPrem Connect" to a public cloud tenant. This configuration must be done for every tenant that is provided via a binding.
- `multi-tenant-aware`: Bindings are a configuration to make the service aware of tenants it can work with. An example for this is a "CI/CD" Service Broker. The CI/CD pipeline should be able to work on multiple tenants of a multi-cloud application. E.g. parts of the application are deployed to Azure, others to AWS. Especially for this type of Service Brokers not only tenants of the same meshProject must be selectable, but also tenants of other meshProjects in the same meshWorkspace. E.g. the CI/CD pipeline should have access to dev, int and prod tenants, which might be located in different meshProjects. Providing those cross-project bindings can be achieved via [Service Instance Sharing](marketplace.service-instances.md#share-service-instance).

## Creating Service Binding

When the service binding is created, OSB Services platform will provide a [Bind Resource object](https://github.com/openservicebrokerapi/servicebroker/blob/v2.15/spec.md#bind-resource-object) with properties `tenant_id` and `platform` in the `bind_resource` object of the bind request:

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

## Configuration in the OSB Services platform

Services can be platform-specific. A specific AWS OnPrem Connect SB is an example for this. It should only be possible to bind AWS tenants to this service. This can be achieved by [publishing](meshstack.meshmarketplace.development.md#publish-your-service-broker) this Service Broker only to OSB Services platform of AWS meshLocations. This will allow the user to only select tenants related to this meshLocation.

Multi-tenant-aware service brokers that support different platform types, should only be [published](meshstack.meshmarketplace.development.md#publish-your-service-broker) to the global location. This allows the user to select any tenant in the meshProject, independent of the meshLocation.

## Converting non-tenant-aware services to tenant-aware services

> If you are actually interested in doing a proper tenant binding workflow, read our documentation above.
> This section only describes a workaround for services that already know for which cloud tenant(s) they need to connect.

For some service brokers it might be the case that you have built some kind of automation that can understand which
meshTenant belongs to which service, but they do not use meshStack's concept of tenant-aware services.

For these kind of cases we have a workaround that allows these services to become tenant-aware anyway:

1. Flag the service in the service catalog as `tenantAware: true`. You can see an example of that [here](meshstack.meshmarketplace.profile.md#tenant-aware-services). If you
   use our [unipipe-service-broker](https://github.com/meshcloud/unipipe-service-broker), you can do this in the [catalog.yml](https://github.com/meshcloud/unipipe-service-broker/wiki/Reference#catalogyml).
2. When a service is now tenant-aware, the OSB Services platform expects an endpoint for creating so-called tenant bindings.
   You must implement this endpoint, because otherwise the service binding will show up as 'Failed' in meshStack.
   The endpoint does not actually have to do something, but it needs to exist and return an HTTP 200 with at least an
   empty JSON object `{}`. Read the [OSB Spec](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#request-creating-a-service-binding)
   on what exact URL the endpoint needs to be & some more information if you are interested.

