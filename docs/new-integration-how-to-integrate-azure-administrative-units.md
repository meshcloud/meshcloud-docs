---
id: new-integration-how-to-integrate-azure-administrative-units
title: How to Integrate Azure with Administrative Units
---

:::note
This guide shows you how to set up an advanced Azure platform integration
using administrative units. This approach limits meshStack's permissions to a
specific scope within your Entra tenant and is recommended to improve the
security of your integration.
:::

## What are Administrative Units?

[Administrative Units](https://docs.microsoft.com/en-us/azure/active-directory/roles/administrative-units)
are containers in Microsoft Entra ID (formerly Azure AD) that allow you to
delegate administrative permissions to a restricted scope of resources. Instead
of granting meshStack to create and manage groups in your entire tenant, you can
limit its access to a specific administrative unit.

## Benefits of Using a Dedicated Administrative Unit with meshStack

We recommend you create a dedicated administrative unit for meshStack in your
Entra tenant.

Here's a comparison of the permissions required for meshStack's replicator
service principal when using an administrative unit versus the standard
integration:

| Feature                                 | Standard Integration Permissions                                                          | Integration Permissions with Administrative Units                                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **User Discovery for Group Membership** | `Directory.Read.All` _tenant scope_ <br>Read all users and groups                         | `AdministrativeUnit.Read.All` _tenant scope_ <br>Read administrative unit information                                              |
| **Manage Groups**                       | `Group.ReadWrite.All` _tenant scope_ <br>Create and delete groups, manage membership       | Custom role with administrative unit scope:<br>• `microsoft.directory/users/standard/read`<br>• `microsoft.directory/groups/standard/read`<br>• `microsoft.directory/groups/create`<br>• `microsoft.directory/groups/members/update`<br>• `microsoft.directory/groups/members/read`<br>• `microsoft.directory/groups/memberOf/read` |
| **Invite Users (Azure B2B)**            | `User.Invite.All` _tenant scope_ <br>Optional, invite AAD B2B guest users into the tenant | `User.Invite.All` _tenant scope_ <br>Optional, invite AAD B2B guest users into the tenant        |

<details>
<summary>
  *Azure does not sufficiently support assigning users to an administrative unit managed by meshStack.
</summary>
Most customers manage users in meshStack using SCIM, typically via a "sync group".
The users in the sync group must be kept consistent with the users in the administrative unit.
This is not only possible with dynamic user membership in the administrative unit. When dynamic user membership is used however, Azure no longer supports managing groups in the administrative unit.
</details>

Integration with Administrative Units requires that you create a custom role
with the permissions listed in the table above.

## Prerequisites

- Complete the
  [standard Azure integration](new-integration-how-to-integrate-azure.md) first
- **Global Administrator** or **Privileged Role Administrator** access to your
  Entra tenant to create the Administrative Unit
- You need an Entra Premium P1 or P2 license to use Administrative Units

## Step-by-Step Setup Guide

### 1. Create an Administrative Unit

First, you'll create an Administrative Unit to contain all meshStack-managed
identities:

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com)
   with appropriate permissions
2. Navigate to **Identity** > **Roles & admins** > **Administrative units**
3. Click **New administrative unit**
4. Configure the Administrative Unit:
   - **Name**: `meshStack-Users` (or your preferred naming convention)
   - **Description**:
     `Administrative Unit for meshStack managed users and groups`
   - **Membership Type**: **Assigned Users**  to enable group management in the administrative unit
5. Click **Create**
6. Note down the **Administrative Unit ID** - you'll need this for configuring your Azure platform in meshStack

### 2. Configure the Azure Platform in meshStack

In meshStack, navigate to configuration of your platform and in the
`Replication Behavior` section under `Administrative Unit ID` insert the id of
the administrative unit you created in the previous step.
