---
id: new-guide-how-to-ensure-compliant-deletion-of-tenants
title: How to Ensure Compliant Deletion of Environments
---

:::note What is this guide about?
This guide explains how to design and implement a secure, compliant, and auditable tenant deletion process using meshStack. It covers the full lifecycle, configuration options, and operational safeguards for deleting environments.
:::

## Why Compliant Deletion Matters

Deleting cloud environments (tenants) is a sensitive operation. Risks include accidental data loss, compliance violations, and orphaned resources that may continue to incur costs. Organizations need a process that balances operational agility with control and auditability.

meshStack provides a flexible, multi-stage tenant deletion workflow that can be tailored to your needs—whether for sandbox experimentation or production workloads.

## The Tenant Deletion Lifecycle

Tenant deletion in meshStack follows a clear, auditable process:

### 1. Request

Application teams initiate deletion by removing a tenant from their project workspace. This action places the tenant in the deletion queue.

- **Access Impact:** Until deletion is approved, meshStack disables all assigned project roles for the tenant. Teams lose access to the tenant in the cloud platform, but the tenant itself is still replicated.

### 2. Approval

Tenants in the deletion queue receive the status **Requires approval**.

- **Manual Approval:** By default, an operator must approve deletion from the **Deleted Tenants** view in the admin area.
- **Auto-Approval:** You can configure meshStack to auto-approve deletion requests per landing zone. This is useful for sandbox environments, while production zones may require stricter controls.
- **Marketplace Tenants:** If the Open Service Broker marketplace is enabled, OSB tenants are automatically approved and deleted.

> Once a tenant deletion is approved, it cannot be aborted.

### 3. Deletion Replication

After approval, the tenant status changes to **Pending deletion**.

- meshStack verifies the tenant's existence and deletes any IAM groups, permissions, and artifacts it manages for the tenant.
- **Cloud Tenant Deletion:** By default, operators must manually delete the tenant in the cloud platform. Optionally, meshStack can be configured to perform this automatically.

Once meshStack confirms deletion (or the tenant enters a Suspended/Disabled state), the status updates to **Deleted**.

> **Warning:** Automated tenant deletion will remove all workloads in the tenant. This can cause irrecoverable data loss. Some platforms (AWS, Azure, GCP) offer limited recovery windows—review your provider's documentation.
> meshStack does not delete or touch resources inside the tenant. Billing may not stop immediately after tenant deletion, depending on the platform.

## Operator Experience: Managing the Deletion Queue

Operators manage tenant deletion from the **Administration Area**:

1. Navigate to **Deleted Tenants** under Platforms.
2. View tenants in the deletion queue and those already deleted.
3. Filter by status (e.g., **Requires approval**, **Deleted**).

### Approving or Rejecting Deletion

- Approve or decline requests, optionally adding a comment (max 255 characters).
- If declined, the tenant is reinstated in its project and project role bindings are re-enabled—restoring access for application teams.
- When a project is marked for deletion, it is automatically deleted once all its tenants are successfully deleted.

## Configuring Deletion Behavior

meshStack lets you tailor the deletion workflow per landing zone:

- **Deletion after Approval:** Enforce an approval flow before deletion.
- **Automatic Deletion:** meshStack deletes tenants in the cloud platform automatically.
- **Manual Deletion:** Operators manually delete tenants in the cloud platform; meshStack only removes its own artifacts.

### How to Configure in Platform Builder

#### Automatic Tenant Deletion

1. Go to Platform Builder.
2. Select your platform.
3. Open the **Landing Zones** section.
4. Choose the relevant landing zone.
5. Enable **Automatically perform approved tenant deletions via replication**.
6. (Optional) Disable **Automatically Approve Tenant Deletion** to require manual approval.
7. Save.

#### Manual Tenant Deletion

1. Go to Platform Builder.
2. Select your platform.
3. Open the **Landing Zones** section.
4. Choose the relevant landing zone.
5. Disable **Automatically perform approved tenant deletions via replication**.
6. (Optional) Disable **Automatically Approve Tenant Deletion** to require manual approval.
7. Save.

## Summary

meshStack's tenant deletion process is designed for compliance, auditability, and operational flexibility. By configuring landing zones appropriately, you can ensure that environments are deleted securely and in line with your organization's policies.

## Related Resources

### Concepts

- [Tenant](new-concept-tenant.md)
- [Landing Zone](new-concept-landingzone.md)
- [Platform](new-concept-platform.md)

### Guides

- [How to Manage a Platform](new-guide-how-to-manage-a-platform.md)
- [How to Manage Landing Zones](new-guide-how-to-manage-landing-zones.md)
- [How to Manage a Tenant](new-guide-how-to-manage-a-tenant.md)