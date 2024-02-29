---
id: meshstack.openstack.index
title: Integration
---

OpenStack is an open source cloud platform that many enterprises use as a basis for a private IaaS cloud.
meshStack supports project creation, configuration, access control, quota management and billing for OpenStack.

## Integration Overview

> Self-service OpenStack platform configuration is currently not available in the [Platform Administration](./administration.platforms.md) in meshPanel.
> Please request assistance from our customer success team to configure your OpenStack platform.

## Prerequisites

OpenStack comes in many different distributions and flavors. Similar to our approach for supporting Kubernetes,
we try and maintain our OpenStack integration distribution-independent and purely based on "vanilla" OpenStack APIs.

The latest OpenStack release officially validated with meshStack is [OpenStack Ussuri](https://www.openstack.org/software/ussuri/).
However, any later OpenStack releases that continues to maintain API compatibility with the API versions specified
is supported.

> Since OpenStack is typically deployed "behind the firewall" in a private cloud settings, consider using
> meshStack Enterprise which supports an on-prem deployment option. This enables meshStack to safely connect to your
> OpenStack APIs.

### Supported OpenStack Versions

Your OpenStack cloud must provide the `KeystoneV3` API with a minimum version of `3.0`.
This an essential pre-requesite for using meshStack's OpenStack integration.

meshStack also supports the following OpenStack APIs for advanced features

| Service and minimum Version                                                                  | [Resource Metering](./meshstack.openstack.metering.md) |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [Nova 2.0](https://docs.openstack.org/nova/latest/reference/api-microversion-history.html)   | Servers                                                |
| [Cinder 3.0](https://docs.openstack.org/api-ref/block-storage/api_microversion_history.html) | Volumes<br>Volume Snapshots                            |
| [Neutron v2](https://docs.openstack.org/api-ref/network/v2/index.html#api-versions)          | Floating IPs<br>Routers<br>LBaasV2                     |
| [Glance v2](https://docs.openstack.org/api-ref/image/v2/index.html)                          | Images                                                 |
| [Heat v1](https://docs.openstack.org/api-ref/orchestration/v1/index.html#list-versions)      |                                                        |
| [Designate v2](https://docs.openstack.org/api-ref/dns/dns-api-v2-index.html)                 |                                                        |
| [Swift/radowsgw-swift v1](https://docs.openstack.org/api-ref/object-store/)                  |                                                        |

> Note: OpenStack integration with meshPanel as an UI for various OpenStack services is no longer available to new meshStack customers.

## Access Control Integration

meshStack will identify and assign users to roles in OpenStack based on their `euid` (external user id) as described in [Identity Federation](meshstack.identity-federation.md#externally-provisioned-identities).
meshStack expects you to configure [Federated Identity](https://docs.openstack.org/keystone/ussuri/admin/federation/federated_identity.html) so that
your identity provider stores the `euid` value in the `User.federated[].protocols[].unique_id` field of the [Keystone User object](https://docs.openstack.org/api-ref/identity/v3/?expanded=list-users-detail,show-user-details-detail#show-user-details).

When configuring the meshPlatform in meshStack's dhall config model, provide the `idp_id` as `idp-provider` and `protocol_id` as `idp-protocol`
property respectively

```dhall
...
let platformConfig =
      Platform.OpenStack::{
      ...
      , idp-provider = "aad"
      , idp-protocol = "openid"
      }
...
```

During replication, meshStack will make sure that users have access to the OpenStack projects they are assigned to in meshStack.
Users will be assigned to the according groups (per meshProject) that meshStack creates in OpenStack.
If meshStack is about to assign a user that does not exist in OpenStack yet, meshStack will create this user with the
according IDP attributes and create the user in the Keystone domain `MeshUsers`.

That way once the user logs in via the IdP, he will be mapped to the user created by meshStack.
If the user already exists in OpenStack during replication, meshStack will pick up this user to assign him to the according groups.

<!-- 
The following features are currently missing documentation

- adding default system users + roles to projects
- optional use of Keystone domains
-->
