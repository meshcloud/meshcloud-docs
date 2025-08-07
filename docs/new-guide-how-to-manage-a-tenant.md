---
id: new-guide-how-to-manage-a-tenant
title: How to Manage a Tenant
---

:::note What is this guide about?
This guide helps you manage tenants in meshStack. You'll learn how to keep your environments organized and secure.
:::

## How to Import Existing Tenants

### Prerequisites

- Have an admin user that can log into meshStack.
- For AWS account import, refer to the [AWS Integration Guide Step 11](new-integration-how-to-integrate-aws.md) for detailed instructions.

### Step by Step Guide

1. Access the unmanaged tenant list via the admin area by navigating to "Platforms" and selecting "Unmanaged Tenants."
2. Click on "Import Existing Tenant" in list.
3. Select the workspace and project you want to assign the tenant to.
4. Check the tenant list to confirm the tenant has been imported successfully.

## Step by Step Guide: How to Access Tenants (Application Team)

### Prerequisites

- Have a user account that can log into meshStack.
- Workspace owner or admin access to the workspace.

### Step by Step Guide

1. **Navigate to the Workspace:**  
   Use the top navigation bar to select the workspace containing your project and tenant.
2. **Select the Project:**  
   Within the workspace, choose the relevant project.
3. **View Tenants:**  
   In the project view, you'll see a list of tenants. Click a tenant to view its details.

## Step by Step Guide: How to Access Tenants (Platform Team)

### Prerequisites

- Have a user account that can log into meshStack.
- Workspace owner or admin access to the workspace.
- Platform Builder enabled in the workspace.

### Step by Step Guide

1. **Navigate to the Workspace:**  
   Use the top navigation bar to select the workspace containing your project and tenant.
2. **Navigate to Platform Builder:**  
   Within the workspace, click on "Platform Builder" on the top right.
3. **View Tenants:**  
   On the left side, under platform select "Tenants" to see a list of tenants. 

## How to Assess Tenant Status and Start Troubleshooting

### Pre-requisites

- Have a user account that can log into meshStack.
- Workspace owner or admin access to the workspace.
- Platform Builder enabled in the workspace.

### Step by Step Guide

1. Access the tenant list as described in the [How to Access Tenants (Platform Team)](#how-to-access-tenants-platform-team) section.
2. Access the tenant details by clicking on "View more" in the tenant list.
3. Review the tenant status by checking the replication information. Those provide details about the successful completion of dedicated replication steps. You can also see any tags that have been replicated to the tenant.

## How to Trigger Desired State Replication

### Prerequisites

- Have a user account that can log into meshStack.
- Workspace owner or admin access to the workspace.
- Platform Builder enabled in the workspace.

### Step by Step Guide

1. Access the tenant list as described in the [How to Access Tenants (Platform Team)](#how-to-access-tenants-platform-team) section.
2. Select the tenant for which you want to trigger replication.
3. In the tenant details view, locate the "Trigger Replication" button within the replication section and click it to initiate replication.

## Tenant Creation

Tenants are created when a new project is set up or when additional environments are needed. This can be self-service and API-driven. You configure the desired state configuration via landing zones.

### Prerequisites

- Have a user account that can log into meshStack.
- Workspace owner or admin access to the workspace.

### Step by Step Guide

:::info Preferred Way
To allow for the best user experience including browsing multiple offerings for tenants, navigate to the marketplace within a workspace and choose from one of the catalog entries.
:::

Alternative:   

1. Navigate to the workspace manager.
2. Select the project where you want to create a new tenant.
3. Click on "Create Tenant" and fill in the required details such as landing zone and potentially required or recommended additional building blocks.

## Change Environment Ownership

If project or tenant ownership changes, update user/group assignments and tags. See [How to Reflect Organizational Changes](new-guide-how-to-reflect-organizational-changes.md).

## Tenant Deletion Flow

:::note Info
The behavior for deletion depends on the configuration defined in the landing zone of the tenant's platform. There are multiple options to tailor the deletion process of tenants to your organizational requirements. See [How to Ensure Compliant Deletion of Environments](new-guide-how-to-ensure-compliant-deletion-of-environments.md).
:::

### 1. Deletion Request

These tasks are typically performed by the application team:

- Navigate to the workspace manager.
- Select the tenant you want to delete.
- Navigate to the "Deletion" Section.
- Confirm that all resources have been deleted.
- Click on "Confirm Deletion" to place the tenant in the deletion queue.

### 2. Deletion Approval (Optional)

These tasks are performed by the platform team:

- Navigate to the admin area or platform builder.
- Click on **Deleted Tenants** under **Platforms**.
- If deletion approval was configured meshStack assigns the status "Requires approval" to tenants entering the tenants deletion queue.
- You can filter tenants that require approval by selecting the status column and choosing the dropdown option `Requires approval`.
- As an administrative user, you have the option to either confirm or decline the deletion of the tenant.
- Once a tenant deletion was approved, it's not possible to abort the tenant deletion process.
- When you decline tenant deletion, the tenant will be reinstantiated in its project. meshStack will also re-enable any project role bindings on the tenant. This has the effect that application teams will re-gain access to the tenant in the cloud platform.

:::warning 
If you have the Open Service Broker marketplace experience enabled, the OSB Marketplace tenants are automatically approved and deleted.
:::

### 3. Deletion Replication (Optional)

This tasks is performed by meshStack:

If automatic deletion was configured meshStack assigns the status "Pending deletion" to tenants entering the tenants deletion queue.
In this status meshStack will verify if the tenant still exists and attempt to delete any IAM groups, permissions and other artifacts managed by meshStack for this tenant.

Once meshStack has confirmed the tenant was deleted (or entered a Suspended/Disabled state as part of the platform's deletion process), meshStack will conclude the deletion process and set the tenant status to "Deleted".

:::warning 
Automated tenant deletion may permanently remove workloads and data. meshStack does not delete cloud resources; billing may continue until resources are manually removed. Review your platform's documentation for recovery options.
:::

### 4. Review Deleted Tenants

This task is performed by the platform team:

You can filter tenants that were deleted successfully by selecting the status column and choosing the dropdown option `Deleted`.

## Related Resources

### Concepts

- [Tenant](new-concept-tenant.md)
- [Landing Zone](new-concept-landingzone.md)
- [Platform](new-concept-platform.md)

### Guides

- [How to Manage a Platform](new-guide-how-to-manage-a-platform.md)
- [How to Reflect Organizational Changes in meshStack](new-guide-how-to-reflect-organizational-changes.md)
- [How to Restrict Platform Access](new-guide-how-to-restrict-platform-access.md)
- [How to Protect Admin Roles](new-guide-how-to-protect-admin-roles.md)
- [How to Enforce Resource Quota](new-guide-how-to-enforce-resource-quotas.md)
- [How to Ensure Compliant Deletion of Environments](new-guide-how-to-ensure-compliant-deletion-of-environments.md)
