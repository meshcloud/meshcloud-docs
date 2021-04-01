---
id: meshcloud.tenant
title: meshTenant
---

meshTenants are the representation of a [meshProject](./meshcloud.project.md) in a [meshPlatform](./meshcloud.platform-location.md).
meshTenants are isolated cloud environments protected by multi-tenant mechanisms of the cloud platform such as
AWS Accounts, Azure Subscriptions or Cloud Foundry Spaces.

[meshCustomers](./meshcloud.customer.md) don't manually create or manage meshTenants. Instead, meshTenants are always automatically managed through
a [meshProject](./meshcloud.project.md).

## Replication and Reconciliation

meshStack combines the meshProject configuration (managed in self-service by the [meshCustomer](./meshcloud.customer.md) admins), the [Landing Zone](./meshcloud.landing-zones.md) and [meshPlatform](./meshcloud.platform-location.md) configuration (managed by the operator) to compute a **desired state** for each meshTenant. For private cloud platforms this may include applying certain [quotas](./meshcloud.tenant-quota.md) to your meshTenant.

meshStack continuously reconciles the **actual state** of meshTenants with their desired state. This process is called replication and ensures that all cloud tenants governed by meshStack are in a known and expected state.

## Metadata Tags

meshStack automatically derives [metadata tags](./meshcloud.metadata-tags.md) for meshTenants based on the metadata tags set on the meshProject, the [payment method](./meshcloud.payment-methods.md) configured on the meshProject and
the meshCustomer it belongs to.

Any update to tenant metadata (e.g. a change in payment method) triggers a new meshTenant reconciliation cycle.
