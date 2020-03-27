---
id: meshcloud.tenant
title: meshTenant
---

meshTenants are the representation of a [meshProject](./meshcloud.project.md) in a [meshPlatform](./meshcloud.platform-location.md).
meshTenants are isolated cloud environments protected by multi-tenant mechanisms of the cloud platform such as
AWS Accounts, Azure Subscriptions or Cloud Foundry Spaces.

[meshCustomer] don't manually create or manage meshTenants. Instead, meshTenants always automatically managed through
a [meshProject](./meshcloud.project.md).

## Replication and Reconciliation

meshStack combines the meshProject configuration (managed in self-service by the [meshCustomer](./meshcloud.customer.md) admins), the [Landing Zone](./meshcloud.landing-zones.md) and [meshPlatform](./meshcloud.platform-location.md) configuration (managed by the operator) to compute a **desired state** for each meshTenant.

meshStack continuously reconciles the **actual state** of meshTenants with their desired state. This process is called replication and ensures that all cloud tenants governed by meshStack are in a known and expected state.

## Viewing tenant status

Partners are able to see the full list of tenants with their status in the Administration area. Go to the Administration area and click on 'Tenants' below the Inventory header. The list contains all tenants and their status, which is either:
- Replication successful
- Replication in progress
- Replication failed
Additionally, the list can be filtered on customer, project, location, platform and tenant status.

For more information, click on 'View more' in the tenant list and in this screen additional information is available like System Remarks or User Remarks.
