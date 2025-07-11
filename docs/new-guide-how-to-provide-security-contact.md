---
id: new-guide-how-to-provide-security-contact
title: How to Provide Security Contact Information in Tenants
---

> **How to Provide Security Contact Information in Tenants**
>
> This guide provides a step-by-step approach to ensuring that every tenant in meshStack has up-to-date security contact information. This helps your organization respond quickly to incidents and meet compliance requirements.

## Challenge

Missing or outdated security contact information can delay incident response and create compliance risks. Ensuring each tenant has a designated security contact is essential for effective cloud governance.

## Prerequisites

- Admin access to meshStack with permissions to manage tenants and metadata tags
- Knowledge of your organization's security contact process or responsible team

## Step by Step Guide

As this affects all tenants, follow these steps carefully and coordinate with your security team as needed.

1. **Define a Security Contact Tag**
   - Navigate to the tags or metadata section in meshStack admin area.
   - Create a mandatory tag (e.g., `security-contact`) for tenants. Set it as required for all new and existing tenants.

2. **Collect Security Contact Information**
   - Gather the correct security contact details (e.g., email, phone number, or team name) for each tenant.
   - Ensure the information is up to date and follows your organization's format.

3. **Assign Security Contact to Tenants**
   - Go to the tenant management area in meshStack.
   - For each tenant, add or update the `security-contact` tag with the appropriate information.
   - Use bulk update features or APIs if available for efficiency.

4. **Enforce and Monitor Compliance**
   - Set up policies to require the `security-contact` tag for all tenants.
   - Regularly review tenants to ensure the tag is present and accurate.
   - Configure alerts or reports for missing or outdated security contact information.

## Tips & Best Practices

- Use a group email or distribution list for the security contact to ensure continuity.
- Periodically review and update security contact information as teams or responsibilities change.
- Document the process for updating security contacts and communicate it to tenant owners.

## Troubleshooting

- If a tenant is missing the security contact tag, check tag configuration and policy enforcement settings.
- If contact information is outdated, coordinate with tenant owners to update it promptly.

## Summary

Providing and maintaining security contact information for all tenants helps your organization respond quickly to incidents and ensures compliance with security policies. Regular reviews and automation can help keep this information accurate and up to date.
