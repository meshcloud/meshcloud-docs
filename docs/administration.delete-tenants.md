---
id: administration.delete-tenants
title: Delete Tenants
---

The process for [deleting a tenant](meshcloud.tenant#delete-a-meshtenant) always starts by putting the tenant in the deletion queue from the workspace view.

## Tenant Deletion Process

The behavior for deletion depends on the configuration defined in the landing zone of the tenant's platform. The tenant deletion process has the following stages described in the sections below.

### Request

Application teams owning a workspace can start the tenant deletion process by deleting the tenant from their project.
This places the tenant on the tenant deletion queue.

Until tenant deletion is approved, meshStack will continue replicating the tenant but will disable all
assigned project roles. This has the effect that application teams will loose access to the tenant in the cloud platform.

### Approval

meshStack assigns the status "Requires approval" to tenants entering the tenants deletion queue.
By default, an operator must manually [approve tenant deletion](#processing-the-tenant-deletion-queue) from the "Deleted Tenants" view in the admin area.
You can configure meshStack to auto-approve tenant deletion requests in the settings of the respective landing zone.

Configuring this setting per landing zone allows you to adapt the tenant deletion behavior to your
specific needs. For example, you might not want to be involved with each single deletion request for  a sandbox landing zone that is intended for experimentation. But perhaps your organization requires a more
careful process for deleting tenants in a landing zone hosting production workloads.

Once a tenant deletion was approved, it's not possible to abort the tenant deletion process.

> If you have the Open Service Broker marketplace experience enabled, the OSB Marketplace tenants are automatically approved and deleted.

### Deletion Replication

After approving tenant deletion, meshStack assigns the tenant status "Pending deletion".
In this status meshStack will verify if the tenant still exist and attempt to delete any IAM groups, permissions and other artifacts managed by meshStack for this tenant. 

By default, an operator must manually perform the deletion of the cloud tenant itself directly in the cloud platform.
You can configure meshStack to automatically perform the deletion of the tenant in the settings of the respective landing zone.

Once meshStack has confirmed the tenant was deleted (or entered a Suspended/Disabled state as part of the platform's deletion process), meshStack will conclude the deletion process and set the tenant status to "Deleted".

> **Warning**: Operators shold consider automated tenant deletion carefully as most cloud platforms will
> delete any workload together with the tenant. This can lead to irrecoverable loss of data. In some 
> platforms (AWS, Azure, GCP) workload can be recovered for a limited period after deletion. Please
> review your platform's documentation for details.

Please be aware that meshStack itself does not delete nor touch any of the cloud resources in the tenant. Depending on the cloud platform, this can lead to situations where billing does not stop
immediately once a tenant is deleted.

## Processing the Tenant Deletion Queue

To open the tenant deletion queue, follow these steps:

1. Navigate to the **Administration** Area.
2. Click on **Deleted Tenants** under **Platforms**. You can see a list of deleted tenants and tenants in the deletion queue.

### Approving Tenant Deletion

You can filter tenants that require approval by selecting the status column and choosing the dropdown option `Requires approval`.

As an administrative user, you have the option to either confirm or decline the deletion of the tenant. For either decision, you can also enter an optional comment which is limited to 255 characters.

Depending on the configuration of the tenant's landing zone, meshStack will ask you to confirm whether you want meshStack to perform the tenant deletion automatically or that you will manually perform deletion in the cloud platform.

> When a user marks a project for deletion, the project will be automatically deleted once all tenants of that project have been successfully deleted.

### Rejecting Tenant Deletion

If you choose to decline the deletion, you can do so by clicking on the decline button. When you decline tenant deletion, the tenant will be reinstantiated in its project. meshStack will also re-enable any project role bindings on the tenant. This has the effect that application teams will re-gain access to the tenant in the cloud platform.

### Review Deleted Tenants

You can filter tenants that were deleted successfully by selecting the status column and choosing the dropdown option `Deleted`.
