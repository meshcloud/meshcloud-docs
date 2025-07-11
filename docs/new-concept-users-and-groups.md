---
id: new-concept-users-and-groups
title: Users, Groups and Roles
---

## Accounts

### Users

A user is an individual account in meshStack. Users can be assigned to workspaces and projects with specific roles, determining their level of access and responsibility. Admin users are managed under Admin Access.

### Groups

A group is a collection of users, used to manage permissions collectively. Groups can be assigned to roles at the workspace or project level, simplifying access management for teams.

### Workspace User Groups

A workspace user group is a special type of group that exists within a workspace. These groups are used for managing permissions at the workspace level, allowing for easier assignment of roles and access to multiple users at once.

## Admin Area Users and Permissions

Admin area users have access to the meshStack Admin Area can perform administrative tasks that affect the entire meshStack. Access to the Admin Area is typically restricted to the central platform team providing the Internal Developer Platform.

## Workspace Users and Permissions

Workspace users are assigned roles within a workspace, such as Workspace Owner, Workspace Manager, or Workspace User. These roles determine what actions a user can perform within the workspace.

**Workspace Owner**: Often the team lead or product owner and central point of contact for the team

**Workspace Manager**: Often the application architects or solution architects and back office personnel

**Workspace Member**: Often the developers and individual systems engineers

| Permission                        | Workspace Owner | Workspace Manager | Workspace Member |
|------------------------------------|:--------------:|:----------------:|:--------------:|
| Manage all resources               |       ✔️       |        ✔️        |       ❌       |
| Manage users                       |       ✔️       |        ✔️        |       ❌       |
| Assign/change roles                |       ✔️       |   ✔️ (limited)*  |       ❌       |
| Assign/remove Owner role           |       ✔️       |        ❌        |       ❌       |
| Invite new users                   |       ✔️       |        ✔️        |       ❌       |
| Delete workspace                   |       ✔️       |        ❌        |       ❌       |
| Use resources                      |       ✔️       |        ✔️        |       ✔️       |
| Change workspace settings          |       ✔️       |        ✔️        |       ❌       |

*Managers cannot assign or remove the Owner role.

## Role Expiration

## Project Users and Permissions

Project users are assigned to specific projects within a workspace. Their permissions are limited to the resources and actions within those projects, as defined by their project role (e.g., Project Member, Project Admin).

Project roles can be customized in the global settings in the admin area.

Project permissions are managed separately from workspace permissions, allowing for granular access control at the project level.

Add platform configuration and landing zone configuration for role mappings.
