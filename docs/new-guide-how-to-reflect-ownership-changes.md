---
id: new-guide-how-to-reflect-ownership-changes
title: How to Reflect Ownership Changes in meshStack
---

> **How to Reflect Ownership Changes in meshStack**
>
> This guide explains how to update ownership in meshStack by moving tenants between projects and projects between workspaces. Keeping ownership information up to date ensures correct access, cost allocation, and compliance.

## Challenge

As teams and responsibilities change, you may need to transfer ownership of cloud resources. This often involves moving tenants (e.g., AWS accounts, Azure subscriptions) to different projects, or moving projects to different workspaces. Doing this correctly in meshStack ensures continued access, proper billing, and organizational clarity.

## Prerequisites

- Admin or manager permissions for the relevant workspaces and projects
- Understanding of your organization's approval and documentation requirements for ownership changes

## Step by Step Guide

### 1. Moving a Tenant Between Projects

- Go to the project that currently owns the tenant.
- Locate the tenant (AWS account, Azure subscription, GCP project, etc.) you want to move.
- Use the tenant management feature to select a new target project within the same workspace.
- Confirm the move. meshStack will update access and cost allocation automatically.
- Review user and group assignments in the new project to ensure correct access.

**Note:** Some platforms may have restrictions or require additional approval for moving tenants. Always check your organization's policy and platform documentation.

### 2. Moving a Project Between Workspaces

- Go to the workspace that currently contains the project.
- Locate the project you want to move.
- Use the project management feature to select a new target workspace.
- Confirm the move. meshStack will update all associated tenants, users, and tags to reflect the new workspace.
- Review workspace-level tags and policies, as these may change after the move.

**Tip:** Moving a project between workspaces may require approval from both workspace owners. Ensure all stakeholders are informed before making changes.

## Best Practices

- Document all ownership changes for audit and compliance purposes.
- Notify affected users and teams before and after the move.
- Review and update tags, cost centers, and access controls after ownership changes.
- Use meshStack's activity logs to track changes and ensure transparency.

## Troubleshooting

- If you cannot move a tenant or project, check for platform restrictions, policy settings, or missing permissions.
- If access or billing is incorrect after a move, review user assignments and tag replication settings.

## Summary

Reflecting ownership changes in meshStack by moving tenants and projects helps keep your cloud environment organized, secure, and compliant. Always follow your organization's approval process and review access and cost allocation after making changes.
