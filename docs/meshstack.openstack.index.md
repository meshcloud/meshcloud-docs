---
id: meshstack.openstack.index
title: Integration
---

OpenStack is an open source cloud platform that many enterprises use as a basis for a private IaaS cloud.
meshStack supports project creation, configuration, access control, quota management and billing for OpenStack.

## Integration Overview

To enable integration with OpenStack, platform engineers configure one or multiple `Platform`s of `PlatformType` OpenStack in the [Platform Administration](administration.platforms) in meshPanel.

## Prerequisites

OpenStack comes in many different distributions and flavors. Similar to our approach for supporting Kubernetes,
we try and maintain our OpenStack integration distribution-independent and purely based on "vanilla" OpenStack APIs.

The latest OpenStack release officially validated with meshStack is [OpenStack 2023.2 "Bobcat"](https://docs.openstack.org/2023.2/).
However, any later OpenStack releases that continues to maintain API compatibility with the API versions specified below is supported.

> As OpenStack is typically deployed "behind the firewall" in a private cloud settings, you may consider using an on-prem deployment of
> [meshStack Enterprise](meshstack.managed-service). This enables meshStack to safely connect to your OpenStack APIs on your private network.

### Supported OpenStack Versions

Your OpenStack cloud must provide the `KeystoneV3` API with a minimum version of `3.0`.
This an essential pre-requesite for using meshStack's OpenStack integration.

meshStack also supports the following OpenStack APIs for advanced features

| Service and minimum Version                                                                  | [Resource Metering](meshstack.openstack.metering) |
| -------------------------------------------------------------------------------------------- |--------------------------------------------------------|
| [Nova 2.0](https://docs.openstack.org/nova/latest/reference/api-microversion-history.html)   | Servers                                                |
| [Cinder 3.0](https://docs.openstack.org/api-ref/block-storage/api_microversion_history.html) | Volumes & Volume Snapshots                             |
| [Neutron v2](https://docs.openstack.org/api-ref/network/v2/index.html#api-versions)          | Floating IPs & Routers & LBaasV2                       |
| [Glance v2](https://docs.openstack.org/api-ref/image/v2/index.html)                          | Images                                                 |
| [Heat v1](https://docs.openstack.org/api-ref/orchestration/v1/index.html#list-versions)      |                                                        |
| [Designate v2](https://docs.openstack.org/api-ref/dns/dns-api-v2-index.html)                 |                                                        |
| [Swift/radowsgw-swift v1](https://docs.openstack.org/api-ref/object-store/)                  |                                                        |

> Note: OpenStack integration with meshPanel as an UI for various OpenStack services is no longer available to new meshStack customers.

### Keystone Federated Users

meshStack will identify and assign users to roles in OpenStack based on their `euid` (external user id) as described in [Identity Federation](meshstack.identity-federation#externally-provisioned-identities).
meshStack expects that your OpenStack uses [Federated Identity](https://docs.openstack.org/keystone/2023.2/admin/federation/federated_identity.html). 

You should set up OpenStack Keystone so that your identity provider stores the `euid` value in the `User.name` field of the [Keystone User object](https://docs.openstack.org/api-ref/identity/v3/?expanded=list-users-detail,show-user-details-detail#show-user-details). 

## Integration Configuration

### meshStack Admin Accounts

meshStack requires two admin user accounts for integration with OpenStack. 

- the `replicator` admin account must have permission to create projects, groups and assign roles. This typically requires an `admin` role on the admin project, unless your OpenStack deployment has additional fine-grained policies available.
- the `metering` account must have `reader` role access across all OpenStack projects. This user is used to collect [metering data](meshstack.openstack.metering) for all projects from OpenStack services.

### Permission Replication

During replication, meshStack will make sure that users have access to the OpenStack projects they are assigned to in meshStack.
If meshStack finds that a user does not exist in OpenStack yet, meshStack will log a replication remark and skip assigning that user's permission. 
When the user is created in OpenStack at any later time, meshStack will pick up this user to assign him to the according groups in the next replication.

Users will be assigned to the according groups (per project in meshStack) that meshStack creates in OpenStack.
Because OpenStack does only provide the `member` project-level role out of the box, meshStack currently supports only one default mapping of meshStack project roles to OpenStack project roles for all meshStack project roles.

### Keystone Domains

By default, meshStack will replicate [tenants](meshcloud.tenant) as OpenStack projects in the `default` Keystone domain of OpenStack. You can optionally enable meshStack to create dedicated Keystone domains per Workspace.
