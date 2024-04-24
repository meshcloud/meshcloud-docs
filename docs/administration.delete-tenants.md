---
id: administration.delete-tenants
title: Delete Tenants
---

## Delete Tenants

The process for [deleting a tenant](meshcloud.tenant.md#delete-a-meshtenant) always starts by putting the tenant in the deletion queue from the workspace view.

### Tenant Deletion Behavior

The behavior for deletion depends on the configuration defined in the landing zone of the tenant's platform.

#### Approval

In the landing zone you can decide to either auto-approve tenant deletion requests, or require manual approval. For example,
you might not want to be involved with each single deletion request for sandbox tenants. But perhaps for production tenants
you want to be really sure that the tenant deletion should occur.

In any landing zone, you can (un)check the "Automatically approve tenant deletions requested by workspaces" checkbox to determine
the behavior around approvals.

#### Performing deletions in the cloud platform

> If you have the Open Service Broker marketplace experience enabled, the OSB Marketplace tenants are automatically approved and deleted.

meshStack can also delete the underlying cloud tenant if desired.

This also is defined in the Landing Zone. It can be enabled or disabled by (un)checking the
"Automatically perform approved tenant deletions via replication" checkbox.

If enabled, meshStack will perform a deletion of the cloud tenant as part of the replication process.

> **Warning**: meshStack does not delete nor touch any of the cloud resources in the tenant. The platform operator
> remains responsible for making sure that any remaining resources cause cost after the tenant has been deleted by meshStack.

### Processing the Tenant Deletion Queue

To open the tenant deletion queue, follow these steps:

1. Navigate to the **Administration** Area.
2. Click on **Deleted Tenants** under **Platforms**. You can see a list of deleted tenants and tenants in the deletion queue.

You can filter tenants that require approval by selecting the status column and choosing the dropdown option `Requires approval`.

As a partner or a platform operator, you have the option to either confirm or decline the deletion of the tenant. For either decision, you can also enter an optional comment which is limited to 255 characters.

In order to confirm the deletion, you have to first perform the manual deletion of the tenant. Once you have performed this task, you can confirm that the deletion is completed by clicking on the trash icon.

If you choose to decline the deletion, you can do so by clicking on the decline button. If you decline the deletion, the tenant will be available again on the workspace control plane.

> When a user marks a project for deletion, the project will be automatically deleted once all tenants of that project have been successfully deleted.


### Review Deleted Tenants

You can filter tenants that were deleted successfully by selecting the status column and choosing the dropdown option `Deleted`. 
