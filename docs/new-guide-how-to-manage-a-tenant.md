---
id: new-guide-how-to-manage-a-tenant
title: How to Manage a Tenant
---

This guide explains how to manage a tenant in meshStack, including viewing tenant details, updating tenant information, managing access, and handling tenant lifecycle events.

## What is a Tenant?
A tenant represents an isolated segment within a platform (e.g., AWS account, Azure subscription, GCP project, or Kubernetes namespace). Each tenant is linked to a project and provides a dedicated environment for a specific use case.

For more details, see the [Tenant Concept](./new-concept-tenant).

---

## Accessing Tenants

1. **Navigate to the Workspace**: Use the top navigation bar to select the workspace containing the project and tenant you want to manage.
2. **Select the Project**: Within the workspace, choose the relevant project.
3. **View Tenants**: In the project view, you will see a list of tenants associated with the project. Click on a tenant to view its details.

---

## Managing Tenant Details

- **View Tenant Information**: See platform, status, tags, and other metadata.
- **Edit Tenant Tags**: Update tags to reflect cost centers, ownership, or other metadata. Tags can be managed via the tenant details page.
- **Update Security Contacts**: Provide or update security contact information for the tenant if required by your organization.

---

## Managing Tenant Access

- **Assign Users/Groups**: Add or remove users and groups to control who can access the tenant. This is managed via the project or workspace user management screens.
- **Set Roles**: Assign appropriate roles (e.g., admin, developer, auditor) to users/groups for the tenant.
- **Review Permissions**: Regularly review user and group assignments to ensure only authorized personnel have access.

---

## Tenant Lifecycle Management

- **Tenant Creation**: Tenants are typically created when a new project is set up or when additional environments are needed. This can be self-service or API-driven.
- **Tenant Deletion**: To delete a tenant, follow your organization's process. meshStack may require approval or cleanup steps. See [How to Implement a Tenant Deletion Concept](./new-guide-how-to-implement-tenant-deletion).
- **Reflect Ownership Changes**: If project or tenant ownership changes, update user/group assignments and tags accordingly. See [How to Reflect Organizational Changes](./new-guide-how-to-reflect-organizational-changes).

---

## Troubleshooting & Best Practices

- **Regularly Review Access**: Periodically audit tenant access and tags for compliance.
- **Use Tags Effectively**: Leverage tags for cost allocation, reporting, and automation.
- **Document Security Contacts**: Ensure security contact information is up to date for each tenant.

