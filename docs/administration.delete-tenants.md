---
id: administration.delete-tenants
title: Delete Tenants
---

## Delete Tenants

The process for [deleting a tenant](meshcloud.tenant.md#delete-a-meshtenant) always starts by putting the tenant on
the deletion queue.

meshStack will automatically approve and confirm deletion of OSB Marketplace tenants.
For tenants of all other platforms (including custom platforms), manual actions are required by a partner or a platform operator to approve and confirm tenant deletion.

To open the tenant deletion queue, follow these steps:

1. Navigate to the **Administration** Area.
2. Click on **Deleted Tenants** under **Platforms**. You can see a list of deleted tenants and tenants in the deletion queue.

### Processing the Tenant Deletion Queue

You can filter tenants that require approval by selecting the status column and choosing the dropdown option `Requires approval`.

As a partner or a platform operator, you have the option to either confirm or decline the deletion of the tenant. For either decision, you can also enter an optional comment which is limited to 255 characters.

In order to confirm the deletion, you have to first perform the manual deletion of the tenant. Once you have performed this task, you can confirm that the deletion is completed by clicking on the trash icon.

If you choose to decline the deletion, you can do so by clicking on the decline button. If you decline the deletion, the tenant will be available again on the workspace control plane.

> When a user marked a project for deletion, the project will be automtically deleted once all tenants of that project have been successfully deleted.


### Review Deleted Tenants

You can filter tenants that were deleted successfully by selecting the status column and choosing the dropdown option `Deleted`. 
