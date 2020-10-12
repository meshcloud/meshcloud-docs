---
id: meshstack.meshmarketplace.index
title: Integration
---

The Open Service Broker (OSB) Marketplace provides a common integration point for any remote service which can be provisioned by an API (e.g. a database). A lightweight service broker component implementing the [Open Service Broker API Specification](https://github.com/openservicebrokerapi/servicebroker/blob/v2.14/spec.md) allows such services to become a resource within a meshProject and be included in the project lifecycle management at the meshStack platform.

## meshMarketplace

The meshMarketplace allows users to manage service instances attached to a meshProject. The meshMarketplace uses the official Open Service Broker API standard to communicate with Service Brokers, which are responsible for the actual provisioning of service instances through their service implementation. This guide aims to provide a quick overview of the Open Service Broker API and implementation specific topics. It is required that service implementers study the Open Service Broker API specification for in-depth information.

## Locality of Services

The meshMarketplace provides support for global and local services. Service Providers must choose which type of Service they want to offer so that the service is appropriately integrated into the user interface.

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

meshcloud implements an extended [meshMarketplace OSB API Profile](./meshstack.meshmarketplace.profile.md) that allows brokers a deeper integration with meshStack. Please review the documentation to learn more about the use-cases this API profile enables.

## Authentication & Authorization

### Marketplace to Service Broker

All communication between the meshMarketplace and Service Brokers is secured using HTTPS Basic Auth and a pre-shared key. Service owners that also develop brokers for platforms like Cloud Foundry or OpenShift will be familiar with this model.

### Service Broker Dashboard SSO

meshMarketplace also supports two different options for authenticanting users of Service Broker [dashboard clients](https://github.com/openservicebrokerapi/servicebroker/blob/v2.15/profile.md#dashboard-client-object)

- using an OIDC client in meshIdB as described in the [dashboard-tutorial](./meshstack.meshmarketplace.dashboard-tutorial.md)
- replicating of permission to Azure Active Directory groups


## Platform Instance Configuration

Please consult the following example as a reference of possible configuration settings.

```dhall
let PermissionReplication = ./PermissionReplication.dhall

in    λ(Secret : Type)
    → { platform : Text, permissionReplication : PermissionReplication Secret }
```

The default `permissionReplication` for setting every meshMarketplace meshPlatform is an instance of `MeshIdb`, which
offers no further configuration options. Note that these platforms do not need to be explicitly configured at this time.

Platforms that want to use AAD permission replication need to configure an instance of `AzureAd`

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
contrast to the [Azure replicator](meshstack.azure.index.md) replication for the meshMarketplace will not create any
Azure-role assignments.

### AAD Group Name

The name of the generated subscriptions can be fully customized. A `printf` format string is used. You can read about all the available options in the official Java documentation about [`String.format`](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html#syntax).

For example the default string pattern `%s.%s-%4$s` would generate the group name `customer.project-role`.

> Operators must be careful to ensure resulting group names are unique for project-role combinations. Groups should also not conflict with existing AAD groups.

The arguments available here are:

1. argument: meshCustomer [identifier](./meshstack.configuration.md#identifiers)
2. argument: meshProject [identifier](./meshstack.configuration.md#identifiers)
3. argument: meshProject [ID (numeric)](./meshstack.configuration.md#identifiers)
4. argument: role name alias.
