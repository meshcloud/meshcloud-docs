---
id: meshcloud.tenant
title: meshTenant
---

meshTenants are the representation of a [meshProject](./meshcloud.project.md) in a [meshPlatform](./meshcloud.platforms.md).
meshTenants are isolated cloud environments protected by multi-tenant mechanisms of the cloud platform. The following types of meshTenants are supported by meshStack:

* Accounts in AWS
* Subscriptions in Microsoft Azure
* Projects in Google Cloud
* Namespaces in Kubernetes & OpenShift
* Projects in OpenStack
* Spaces in CloudFoundry

Some operational limitations and other administrative information around tenants are described in the [administration section for meshTenants](meshstack.tenants.md).

## Replication and Reconciliation

meshStack combines the meshProject configuration (managed in self-service by the [meshCustomer](./meshcloud.customer.md) admins), the [Landing Zone](./meshcloud.landing-zones.md) and [meshPlatform](./meshcloud.platforms.md) configuration (managed by the operator) to compute a **desired state** for each meshTenant. For private cloud platforms this may include applying certain [quotas](./meshcloud.tenant-quota.md) to your meshTenant.

meshStack continuously reconciles the **actual state** of meshTenants with their desired state. This process is called replication and ensures that all cloud tenants governed by meshStack are in a known and expected state.

## Metadata Tags

meshStack automatically derives [metadata tags](./meshcloud.metadata-tags.md) for meshTenants based on the metadata tags set on the meshProject, the [payment method](./meshcloud.payment-methods.md) configured on the meshProject and
the meshCustomer it belongs to.

Any update to tenant metadata (e.g. a change in payment method) triggers a new meshTenant reconciliation cycle.
