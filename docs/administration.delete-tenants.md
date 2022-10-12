---
id: administration.delete-tenants
title: Delete Tenants
---

# Delete Tenants

The [deletion procedure](meshcloud.tenant.md#delete-a-meshtenant) depends on the platform of the meshTenant.

For the following platforms manual actions are required by a partner or a platform operator:

- AWS
- GCP
- Azure
- Kubernetes
- OpenShift

To take action, follow these steps:

1. Navigate to the **Administration** Area.
2. Click on **Deleted Tenants** under **Platforms**. You can see a list of deleted tenants and tenants in the deletion queue.
3. Select in the status column the dropdown option `Requires approval` to filter the tenants in the deletion queue.

As a partner or a platform operator, you have the option to either confirm or decline the deletion of the meshTenant. For either decision, you can also enter an optional comment which is limited to 255 characters.

In order to confirm the deletion, you have to first perform the manual deletion of the tenant. Once you have performed this task, you can confirm that the deletion is completed by clicking on the trash icon.

If you choose to decline the deletion, you can do so by clicking on the decline button. If you decline the deletion, the meshTenant will be available again on the customer control plane.

> If a meshProject was marked for deletion before by a customer, and all meshTenants of the meshProject have been successfully deleted, the meshProject is permanently deleted.
