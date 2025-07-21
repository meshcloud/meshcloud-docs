id: new-guide-how-to-protect-admin-roles
title: How to Protect Admin Roles
---

:::note What is this guide about?

This guide provides a step-by-step approach to securing admin roles in platforms by restricting their usage and ensuring only authorized users can perform sensitive actions.
:::

## Challenge

Admin roles have elevated permissions and, if misused or compromised, can lead to significant security risks. Protecting these roles is essential for maintaining secure environments. 

## Prerequisites

- Admin access to meshStack with organization admin permissions
- Familiarity with meshStack's ability to tag users via SCIM or meshUser API

## Step by Step Guide

As this has implications for all workspace users, it is recommended to follow these steps carefully and within a maintenance window to avoid disruptions for users

1. **Create or Admin Tags for Roles**
   - Navigate to tags > project role tags
   - Create a mandatory tag (e.g., multi select `admin=yes,no`)

2. **Identify and Tag Roles**
   - Navigate to settings > management > project roles
   - Apply (`admin=yes`) to all roles that have administrative privileges
   - Apply (`admin=yes,no`) to all roles that should not have administrative privileges

3. **Create Admin Tags for Users/Groups**
   - Navigate to tags > user/groups
   - Create a mandatory tag (e.g., single select `admin=yes and no`)

4. **Tag Users**
   - Add tags to users and groups via API (see meshUser example below)

```json
{
  "kind": "meshUser",
  "apiVersion": "v2",
  "metadata": {
    "name": "Policy-Test-User"
  },
  "spec": {
    "email": "<test@meshcloud.io>",
    "firstName": "Test",
    "lastName": "User",
    "euid": "Test-User",
    "tags": {
      "Admin": [
        "no"
      ]
    }
  }
}
```

5. **Define Policies**
   - Create a policy that validates a subset match between the project role tags and the user/group tags.

6. **Test and Review**
   - Verify via a project creation and test users for admin (`admin=yes,no`) and for non-admin (`admin=no`) that only intended users/groups can receive admin roles and that policies are enforced as expected.
   - Before ending of the maintenance window ensure that all users have the correct tags applied.

## Related Resources

### Concepts

- [/docs/new-concept-project](./new-concept-project.md)
- [/docs/new-concept-users-and-groups](./new-concept-users-and-groups.md)

### Guides

- [/docs/new-guide-how-to-customize-project-roles](./new-guide-how-to-customize-project-roles.md)
