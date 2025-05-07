---
id: meshstack.cloudfoundry.index
title: Integration
---

meshStack supports integration with Cloud Foundry. Cloud Foundry is a PaaS platform which provides convenient application hosting capabilities to software and DevOps engineers.

meshStack supports project creation, configuration, access control, quota management and billing for Cloud Foundry.

## Integration Overview

To enable integration with Cloud Foundry, Platform Engineers configure one or multiple `Platform`s of `PlatformType` Cloud Foundry in the [Platform Administration](./administration.platforms.md) in meshPanel.

## Prerequisites 

Your Cloud Foundry must support the v3 Cloud Foundry API.
We have officially validated meshStack with support for Cloud Foundry `v3.108.0`.

### UAA Federated Users

meshStack will identify and assign users to roles in Cloud Foundry based on their `euid` (external user id) as described in [Identity Federation](meshstack.identity-federation.md#externally-provisioned-identities).

You should set up your Cloud Foundry and UAA so that they store the `euid` value in the `User.userName` field of the [UAA User object](https://docs.cloudfoundry.org/api/uaa/version/77.8.0/index.html#get) and `User.username` field of the [Cloud Foundry user object](http://v3-apidocs.cloudfoundry.org/version/3.164.0/index.html#users).

## Integration Configuration

> The recommended way to set up Cloud Foundry as a meshPlatform is via the public terraform [Cloud Foundry meshPlatform Module](https://github.com/meshcloud/terraform-cloudfoundry-meshplatform).

### meshStack Admin User Accounts

meshStack requires two technical admin user accounts for integration with Cloud Foundry. We recommend your assign these 
users the following [Cloud Foundry roles](https://docs.cloudfoundry.org/concepts/roles.html) and [UAA scopes](https://docs.cloudfoundry.org/concepts/architecture/uaa.html#scopes).

- the `replicator` admin account must have permission to create orgs, spaces, groups and assign roles. This user requires the
  `Admin` role and additionally needs the `cloud_finops manager.admin`, `uaa.admin` and  `scim.read` scopes in UAA.
- the `metering` admin account is used to collect [metering data](./meshstack.cloudfoundry.metering.md). This requires the `Global Auditor`.

The tenant [replication](./meshcloud.tenant.md) ensures spaces and orgs are created within the CF platform and appropriate permission rights are set when users access the CF platform. If a user's project permissions are modified, meshStack updates the permissions for this user accordingly within the CF platform.

### Spaces & Organizations

By default, meshStack will replicate [tenants](./meshcloud.tenant.md) as Cloud Foundry Spaces and create a
Cloud Foundry Organization for every [workspace](./meshcloud.workspace.md).

### Permission Replication

During replication, meshStack will make sure that users have access to the Cloud Foundry spaces they are assigned to in meshStack.
It is currently not possible to configure a custom role mapping for Cloud Foundry landing zones. All meshStack project roles
will be mapped to the `Space Developer` role in Cloud Foundry.

Users will additionally receive the `Org User` role on the Organization created for their workspace.
