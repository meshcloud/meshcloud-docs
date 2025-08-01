---
id: new-guide-how-to-ensure-compliant-deletion-of-environments
title: How to Ensure Compliant Deletion of Environments
---

:::note What is this guide about?
This guide provides step-by-step instructions for designing and implementing a secure, compliant, and auditable tenant deletion process using meshStack. It ensures that environments are deleted properly, with appropriate approvals and safeguards.
:::

## Challenge

Shutting down and removing environments involves risks such as accidental data loss, compliance violations, and orphaned resources.

For example, you might not want to be involved with each single deletion request for  a sandbox landing zone that is intended for experimentation. But perhaps your organization requires a more careful process for deleting tenants in a landing zone hosting production workloads.

## Prerequisites

- Have a user account with admin access or access to the platform builder.
- Have a platform integrated either via admin area or platform builder.

## Step by Step Guide (Platform Builder)

### 1. There are the following options to configure tenant deletion

- **Deletion after Approval:**  
    Select this option if you want the platform team to enforce an approval flow for tenant deletion. meshStack will wait for approval before either issuing the automatic deletion of the tenant or notifying platform teams about an open request for manual deletion.
- **Automatic Deletion:**  
    Select this option if you want meshStack to delete the tenant in the cloud platform automatically. 
    Continue with 2.1 below.
- **Manual Deletion:**
    Select this option if you want to perform the resource check and deletion of the environment and its resources manually in the platform. meshStack will stop providing authorization for the tenants in question.
    Continue with 2.2 below.

### 2.1 How to Set Up Automatic Tenant Deletion

1. Go to the Platform Builder in meshStack.
2. Select the platform you want to configure the deletion for.
3. Navigate to the **Landing Zones** section.
4. Choose the landing zone where you want to enable automatic tenant deletion.
5. In the landing zone settings, find the option for **Automatically perform approved tenant deletions via replication**.
6. **optional** If you want meshStack to enforce an approval flow for tenant deletion, disable the option **Automatically Approve Tenant Deletion**.
7. Save the changes.

### 2.2 How to Set Up Manual Tenant Deletion

1. Go to the Platform Builder in meshStack.
2. Select the platform you want to configure the deletion for.
3. Navigate to the **Landing Zones** section.
4. Choose the landing zone where you want to enable manual tenant deletion.
5. In the landing zone settings, find the option for **Automatically perform approved tenant deletions via replication** and disable it.
6. **optional** If you want meshStack to enforce an approval flow for tenant deletion, disable the option **Automatically Approve Tenant Deletion**.
7. Save the changes.


## Related Resources

### Concepts

- [Tenant](new-concept-tenant.md)
- [Landing Zone](new-concept-landing-zone.md)
- [Platform](new-concept-platform.md)

### Guides

- [How to Manage a Platform](new-guide-how-to-manage-a-platform.md)
- [How to Manage Landing Zones](new-guide-how-to-manage-landing-zones.md)
- [How to Manage a Tenant](new-guide-how-to-manage-a-tenant.md)
