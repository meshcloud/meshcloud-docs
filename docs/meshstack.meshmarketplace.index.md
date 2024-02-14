---
id: meshstack.meshmarketplace.index
title: Integration
---

The Open Service Broker (OSB) platform provides a common integration point for any remote service which can be provisioned by an API (e.g. a database). A lightweight service broker component implementing the [Open Service Broker API Specification](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md) allows such services to become a resource within a meshProject and be included in the project lifecycle management at the meshStack platform.

> To learn more about providing a service ecosystem in your cloud foundation team, have a look at the [maturity model](https://cloudfoundation.meshcloud.io/maturity-model/service-ecosystem/).

## OSB Services Platform

The OSB Services Platform allows users to manage service instances attached to a meshProject. The OSB Services Platform uses the official Open Service Broker API standard to communicate with Service Brokers, which are responsible for the actual provisioning of service instances through their service implementation. This guide aims to provide a quick overview of the Open Service Broker API and implementation specific topics. It is required that service implementers study the Open Service Broker API specification for in-depth information.

## Locality of Services

The OSB Services Platform provides support for global and local services. Service Providers must choose which type of Service they want to offer so that the service is appropriately integrated into the user interface.

### Global Service

- global entry point for consumers (API), reachable from all networks
- Service is provided in a location agnostic manner
- Service may offer configuration of data locations etc. through configuration/dashboards
- Examples: CDN, DNS, Backup

### Local Service

- Local entry point for consumers (API), may be reachable only within a specific location
- Service is provided from a single location only
- Location of data etc. is important
- Examples: DBaaS

## OSB API Profile

meshcloud implements an extended [OSB API Profile](./meshstack.meshmarketplace.profile.md) that allows brokers a deeper integration with meshStack. Please review the documentation to learn more about the use-cases this API profile enables.

## Authentication & Authorization

### Marketplace to Service Broker

All communication between the OSB Services platform and Service Brokers is secured using HTTPS Basic Auth and a pre-shared key. Service owners that also develop brokers for platforms like Cloud Foundry or OpenShift will be familiar with this model.

### Replicating Authorization Information

OSB Services platform supports two different options for authenticating and authorizing users.

- (Enterprise Plans only) use an OIDC client in meshIdB as described in the [OSB dashboard tutorial](./meshstack.meshmarketplace.dashboard-tutorial.md)
- replicate permissions to Azure Active Directory groups ([learn more](#aad-permission-replication))

If the above options do not work for your use case, you can also consider extracting the authorization information from meshStack
using the [meshObject API](/api/).

## Deprecating OSB Services

At some point along the lifecycle of an OSB service you might want to deprecate it, i.e. existing service instances will
remain and keep working but you prevent the booking of new service instances.

You can do so by removing the service definition from the service catalog. meshStack will retain all known information about
the service and service instances but from there on it will no longer be possible to see the service and book new instances of
the service.

### Undeprecating an OSB Service

Did you wrongly deprecate a service? Or was the deprecation only temporary? You can bring back the service at any time.
Just place it back in the service catalog (with the same identifier!) and meshStack will pick it up again, and it will be
made available in the marketplace and made bookable for customers.

## Configuring OSB Services Platforms

OSB Services platforms can only be configured by meshcloud via Dhall. It is not yet available in self-service. Please consult the following example as a reference of possible configuration settings.

```dhall
let PermissionReplication = ./PermissionReplication.dhall

in    λ(Secret : Type)
    → { platform : Text, permissionReplication : PermissionReplication Secret }
```

The default `permissionReplication` for setting every OSB Services platform is an instance of `MeshIdb`, which
offers no further configuration options. Note that these platforms do not need to be explicitly configured at this time.

### AAD Permission Replication

Platforms that want to use AAD group permission replication need to configure an instance of `AzureAd`

```dhall
let InviteB2BUserConfig =
  { redirectUrl = "https://example.com"
    {-  Redirect URL used in the Azure invitation mail sent -}
  , sendAzureInvitationMail = false
    {- Flag if an Invitation mail by Azure should be send out -}
  }

in    λ(Secret : Type)
    → { groupNamePattern :
          {- A pattern for deriving AAD Group names. Please see details described below -}
          Optional Text
      , servicePrincipal :
          {- Either friendly domain name or your tenants GUID -}
          { aadTenant = "<AAD_TENANT>"
          , objectId = "<SERVICE_PRINCIPAL_OBJECT_ID>"
          , clientId = "<SERVICE_PRINCIPAL_CLIENT_ID>"
          , clientSecret = "<SERVICE_PRINCIPAL_CLIENT_SECRET>"
          }
      , b2bUserInvitation :
          {-
          Optionally configure the replicator to create Azure B2B guest invitations for
          users missing in the target AAD tenant.
          -}
          Optional InviteB2BUserConfig
      , roleMappings :
          {-
          Each mesh project role (specified by key, i.e. user) is mapped to an
          AAD Group via an alias. This alias is available as a parameter in the
          groupNamePattern. Example:
          List { mapKey : Text, mapValue : { alias : Text } }
          -}
      }
```

Role mappings must be configured for all [meshProject roles](./meshcloud.project.md#project-roles). Note that in
contrast to the [Azure replicator](meshstack.azure.index.md) replication for the OSB Services platform will not create any
Azure-role assignments.

### AAD Group Name

The name of the generated subscriptions can be fully customized. A `printf` format string is used. You can read about all the available options in the official Java documentation about [`String.format`](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html#syntax).

For example the default string pattern `%s.%s-%4$s` would generate the group name `workspace.project-role`.

> Operators must be careful to ensure resulting group names are unique for project-role combinations. Groups should also not conflict with existing AAD groups.

The arguments available here are:

1. argument: meshWorkspace [identifier](./meshstack.identifiers.md)
2. argument: meshProject [identifier](./meshstack.identifiers.md)
3. argument: meshProject [ID (numeric)](./meshstack.identifiers.md)
4. argument: role name alias.
