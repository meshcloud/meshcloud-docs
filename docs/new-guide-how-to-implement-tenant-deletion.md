---
id: new-guide-how-to-implement-tenant-deletion
title: How to Implement a Tenant Deletion Concept
---

> **How to Implement a Tenant Deletion Concept**
>
> This guide explains how to design and implement a secure, compliant, and auditable tenant deletion process in meshStack. Proper tenant deletion is essential for data privacy, cost control, and maintaining a clean cloud environment.

## Challenge

Deleting tenants (cloud accounts, subscriptions, or projects) involves risks such as accidental data loss, compliance violations, and orphaned resources. A robust deletion concept ensures only authorized deletions, proper data handling, and auditability.

## Prerequisites

- Admin access to meshStack with permissions to manage tenants and policies
- Understanding of your organization's data retention and compliance requirements
- Communication with affected workspace/project owners

## Step by Step Guide

1. **Define Deletion Policy and Workflow**
   - Establish clear criteria for when a tenant can be deleted (e.g., project end, cost center closure, compliance requirements).
   - Document the approval process (e.g., who can request, who must approve, required documentation).
   - Communicate the policy to all relevant users and stakeholders.

2. **Configure meshStack for Tenant Deletion**
   - Use meshStack's tenant management features to mark tenants for deletion.
   - Set up approval workflows using policies or external ITSM integration (e.g., ServiceNow).
   - Optionally, use tags to track deletion status (e.g., `deletion-requested`, `pending-approval`, `scheduled-for-deletion`).

3. **Data Retention and Backup**
   - Before deletion, ensure all required data is backed up or archived according to your organization's retention policy.
   - Notify users of the pending deletion and provide a window for data export.

4. **Execute Deletion**
   - After approvals and data handling, use meshStack to delete the tenant from the platform.
   - Ensure all associated resources (VMs, storage, users, service instances) are removed or transferred as needed.
   - Monitor the deletion process for errors or orphaned resources.

5. **Audit and Compliance**
   - Log all deletion requests, approvals, and actions for audit purposes.
   - Periodically review deletion logs and processes to ensure compliance and identify improvements.

## Tips & Best Practices

- Automate notifications to users and approvers during the deletion process.
- Use tags and policies to prevent accidental deletion of critical tenants.
- Regularly review tenants for candidates for deletion to keep your environment clean.

## Troubleshooting

- If a tenant cannot be deleted, check for dependent resources or policy restrictions.
- If deletion is not reflected in the cloud platform, verify meshStack's integration and permissions.

## Summary

A well-defined tenant deletion concept in meshStack helps you manage cloud resources securely, reduce costs, and meet compliance requirements. Document and automate the process as much as possible for efficiency and auditability.
