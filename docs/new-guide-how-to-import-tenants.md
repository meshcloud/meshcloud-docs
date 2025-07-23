---
id: new-guide-how-to-import-tenants
title: How to Import Tenants
---

This guide explains how to import existing tenants into meshStack, allowing you to bring platform resources (such as AWS accounts, Azure subscriptions, or GCP projects) under meshStack management.

## When to Import Tenants

Importing tenants is useful when:

- You have existing platform resources not yet managed by meshStack.
- You want to consolidate tenant management, tagging, and access control in meshStack.
- You are migrating to meshStack from another management solution.

---

## Prerequisites

- You must have the necessary permissions in meshStack (typically Workspace Manager or Platform Builder roles).
- The platform integration (AWS, Azure, GCP, etc.) must be set up in meshStack.
- You need the identifiers (e.g., account ID, subscription ID, project ID) of the tenants you want to import.

---

## Importing Tenants: Step-by-Step

1. **Navigate to the Workspace**
   - Use the top navigation bar to select the workspace where you want to import tenants.

2. **Go to the Platform Integration Area**
   - In meshPanel, access the platform builder or the relevant platform integration area.

3. **Start the Import Process**
   - Look for an option such as "Import Tenant" or "Add Existing Tenant." This may be under the platform's tenant management section.
   - Select the platform (AWS, Azure, GCP, etc.) and provide the required tenant identifier (e.g., AWS Account ID, Azure Subscription ID).

4. **Configure Tenant Details**
   - Assign the tenant to a project within the workspace.
   - Add tags and metadata as needed (e.g., cost center, owner, environment).
   - Set up user and group access for the tenant.

5. **Review and Confirm**
   - Review the import summary and confirm the import.
   - meshStack will validate the connection and begin managing the tenant.

---

## After Importing

- The imported tenant will appear in the project and workspace views.
- meshStack will begin managing the tenant's desired state, including tags, users, and platform settings.
- You can now use meshStack features such as replication, policy enforcement, and reporting for the imported tenant.

---

## Troubleshooting & Best Practices

- **Ensure Platform Integration**: Make sure the platform is properly integrated with meshStack before importing tenants.
- **Validate Identifiers**: Double-check tenant identifiers to avoid import errors.
- **Tag Consistently**: Use consistent tags for reporting and automation.
- **Review Access**: Assign appropriate users and groups to the imported tenant.

---

## Related Resources

- [Tenant Concept](./new-concept-tenant.md)
- [How to Manage a Tenant](./new-guide-how-to-manage-a-tenant.md)
- [How to Reflect Organizational Changes](./new-guide-how-to-reflect-organizational-changes.md)
- [Workspace Users and Permissions](./new-concept-users-and-groups.md#workspace-users-and-permissions)
