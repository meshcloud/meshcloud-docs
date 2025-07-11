---
id: new-guide-how-to-provide-organization-context
title: How to Provide Organization Context to the Platform
---

> **How to Provide Organization Context to the Platform**
>
> This guide explains how to use tags in meshStack to provide organizational context to your platform resources. Adding this context helps with reporting, cost allocation, compliance, and automation.

## Challenge

Without clear organizational context, it is difficult to track resource ownership, allocate costs, and enforce policies across cloud platforms. Tags provide a flexible way to add this context and keep your cloud environment organized.

## Prerequisites

- Admin access to meshStack with permissions to manage tags and platform configuration
- Agreement on the required organizational tags (e.g., cost center, business unit, owner)
- Replication of tags via landing zones is supported for Azure, AWS and GCP

## Step by Step Guide

1. **Define Tags**
   - In the meshStack admin area, navigate to the tags or metadata section.
   - Create tags for key organizational attributes, such as `cost-center`, `business-unit`, `application-owner`, or `environment`.
   - Set tags as replicated if you want to provide them to tenants.

2. **Configure Tag Replication**
   - In the platform configuration, enable tag replication for the tags you want to propagate to platform resources.
   - Review platform-specific limitations (e.g., tag length, allowed characters) and adjust tag definitions as needed.

3. **Apply Tags to Workspaces, Projects, and Payment Methods**
   - Assign the tags when creating or updating workspaces, projects, or other resources.

4. **Test**
    - Ensure that the tags are correctly applied and replicated to the relevant resources in the platform. This might take a while depending on the configured replication frequency.

## Tips & Best Practices

- Use a consistent naming convention for tags and values.
- Document the meaning and required format for each organizational tag.
- Periodically review and update tags as your organization evolves.
