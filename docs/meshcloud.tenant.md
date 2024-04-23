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

meshStack combines the meshProject configuration (managed in self-service by the [meshWorkspace](./meshcloud.workspace.md) admins), the [Landing Zone](./meshcloud.landing-zones.md) and [meshPlatform](./meshcloud.platforms.md) configuration (managed by the platform operator) to compute a **desired state** for each meshTenant. For private cloud platforms this may include applying certain [quotas](./meshcloud.tenant-quota.md) to your meshTenant.

meshStack continuously reconciles the **actual state** of meshTenants with their desired state. This process is called replication and ensures that all cloud tenants governed by meshStack are in a known and expected state.

## Metadata Tags

meshStack automatically derives [metadata tags](./meshcloud.metadata-tags.md) for meshTenants based on the metadata tags set on the meshProject, the [payment method](./meshcloud.payment-methods.md) configured on the meshProject and
the meshWorkspace it belongs to.

Any update to tenant metadata (e.g. a change in payment method) triggers a new meshTenant reconciliation cycle.

## Delete a meshTenant

> Only users with the role [Workspace Manager](meshcloud.workspace.md#assign-meshworkspace-roles) or [Workspace Owner](meshcloud.workspace.md#assign-meshworkspace-roles) have access to the administrative functionality described in this section.

If you would like to delete a meshTenant which is no longer used, open the corresponding meshTenant navigate to **Deletion**.

> If you delete the entire meshProject [submitted for deletion](meshcloud.project.md#delete-a-meshproject) instead,
> the meshProject will be deleted once all meshTenants within the meshProject have been deleted successfully.

Depending on the landing zone you picked and the setup that the platform operator has chosen, your tenant might either
be deleted automatically by the system, or manually by the platform operator.

The tenant also requires approval which might either happen automatically or by manual approval by the platform operator.

In any case, after deleting the tenant from your project you will not see it anymore and the platform operator has to 
take care of its deletion. Only in the rare case might the tenant appear again when the platform operator decides to reject
your tenant deletion request.

> If you are a platform operator and want to learn more about the approval and deletion workflows in the Admin Area, read more [here](./administration.delete-tenants.md)


