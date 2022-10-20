---
id: meshcloud.tenant
title: meshTenant
---

meshTenants are the representation of a [meshProject](./meshcloud.project.md) in a [meshPlatform](./meshcloud.platforms.md).
meshTenants are isolated cloud environments protected by multi-tenant mechanisms of the cloud platform. The following types of meshTenants are supported by meshStack:

- Accounts in AWS
- Subscriptions in Microsoft Azure
- Projects in Google Cloud
- Namespaces in Kubernetes & OpenShift
- Projects in OpenStack
- Spaces in CloudFoundry

Some operational limitations and other administrative information around tenants are described in the [administration section for meshTenants](meshstack.tenants.md).

## Replication and Reconciliation

meshStack combines the meshProject configuration (managed in self-service by the [meshCustomer](./meshcloud.customer.md) admins), the [Landing Zone](./meshcloud.landing-zones.md) and [meshPlatform](./meshcloud.platforms.md) configuration (managed by the operator) to compute a **desired state** for each meshTenant. For private cloud platforms this may include applying certain [quotas](./meshcloud.tenant-quota.md) to your meshTenant.

meshStack continuously reconciles the **actual state** of meshTenants with their desired state. This process is called replication and ensures that all cloud tenants governed by meshStack are in a known and expected state.

## Metadata Tags

meshStack automatically derives [metadata tags](./meshcloud.metadata-tags.md) for meshTenants based on the metadata tags set on the meshProject, the [payment method](./meshcloud.payment-methods.md) configured on the meshProject and
the meshCustomer it belongs to.

Any update to tenant metadata (e.g. a change in payment method) triggers a new meshTenant reconciliation cycle.

## Delete a meshTenant

> Only users with the role [Customer Admin](meshcloud.customer.md#assign-meshcustomer-roles) or [Customer Owner](meshcloud.customer.md#assign-meshcustomer-roles) have access to the administrative functionality described in this section.

If you would like to delete a meshTenant which is no longer used, open the corresponding meshTenant, navigate to **Deletion**.

We distinguish between automatic and non-automatic deletion supported procedures. The deletion procedure depends on the platform of the meshTenant.

### Non-automatic deletion

For the following platforms automatic deletion is not supported:

- AWS
- GCP
- Azure
- Kubernetes
- OpenShift

A partner or a platform operator will have to perform manual deletion actions in the respective platform, you can provide them with a reason for the deletion. The reason field is currently limited to 255 characters. The reason for deletion will be shown to them when they perform the required deletion actions.

### Automatic deletion

For the following platforms automatic deletion is supported:

- OpenStack
- Cloud Foundry
- Marketplace meshTenants

The system will perform a check to see if any resources exist in the tenants being deleted. This check is currently implemented only for OpenStack and Cloud Foundry platforms. If resources do exist in any of those platform tenants, you will be informed about them. You have to manually delete those resources. Once you have performed the manual resource deletion, you can confirm the tenant deletion.

> Your meshProject [submitted for deletion](meshcloud.project.md#delete-a-meshproject) is classified as deleted once all meshTenants within the meshProject have been deleted successfully.
