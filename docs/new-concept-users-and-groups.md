---
id: new-concept-users-and-groups
title: Users, Groups and Roles
---

## Account Types

### Users

A user is an individual account in meshStack. Users can be assigned to workspaces and projects with specific roles, determining their level of access and responsibility. Admin users are managed under Admin Access.

### API Users

API Users can access several APIs provided by meshStack. You can provide your API Users with access to certain resources for a new integration.

> Please also see the documentation on [API keys](pathname:///api/).

### Groups

A group is a collection of users, used to manage permissions collectively. Groups can be assigned to roles at the workspace or project level, simplifying access management for teams.

## User and Role Bindings

User and role bindings define how users and groups are assigned specific roles within workspaces and projects. These bindings control access and permissions, ensuring that users have the appropriate level of responsibility for their tasks.

Bindings can be managed via the meshStack UI or API. When a user or group is bound to a role, they inherit the permissions associated with that role for the relevant workspace or project.

### Admin Groups

To avoid assigning multiple users individually, you can create Admin Groups. These groups can be assigned to roles in the same way as individual users.
You can view Admin Groups within your Administration Area. Currently, the creation of Admin Groups is only possible via the [meshStack API](pathname:///api/), namely [meshWorkspaceUserGroups API endpoint](pathname:///api/index.html#mesh_workspaceusergroup).

### Workspace User Groups

A workspace user group is a special type of group that exists within a workspace. These groups are used for managing permissions at the workspace level, allowing for easier assignment of roles and access to multiple users at once.

## Admin Area Users and Permissions

Admin area users and groups have access to the meshStack admin area and can perform administrative tasks that affect the entire meshStack. Access to the admin area is typically restricted to the central platform team providing the Internal Developer Platform.

Assigning admin users can only be done by user who have "Organization Admins" rights.

Different groups of people may need access to the different administration area functionality. Therefore, the following administrative roles are currently
available to users of the administration area:

- **Organization Admin**: It's basically the account with administration rights. Has full access to all functionality and can manage users of the organization account.
- **Organization User**: Has full access to all administration functionality, but **cannot** manage policies, tag definitions or users of the organization account.
- **Platform Engineer**: An operator of a cloud platform, that is managed by the meshcloud platform. This role can perform tasks related to
  platform operations in the administration area.
- **Ops Support**: Not all Ops operations must be executed by platform engineers. E.g. setting quotas is a task that can also be done by
  a separate Ops Support team.
- **FinOps Manager**: A finOps manager has access to billing and usage information of workspace projects.
- **Onboarding Support**: A support team in place to help users who want to sign up may also need access to some administration
  functionality which is granted by this role.
- **Compliance Manager**: Has the rights to manage policies and tag definitions.
- **Replication Operator**: A supportive role that can assist by viewing tenants' replication status.
  This role is helpful for meshcloud employees to debug any potential issues with tenant replication.

|                                                                                                                     | Organization Admin        | Organization User     | Platform Engineer | Ops Support | FinOps Manager | Onboarding Support | Compliance Manager | Replication Operator |
|---------------------------------------------------------------------------------------------------------------------| :------------------: | :------------------: | :---------------: |:-----------:| :--------: | :----------------: | :----------------: | :------------------: |
| [Workspace&nbsp;List](administration.workspaces)                                                                 |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |      &#10003;      |         &#10003;     |
| &nbsp;&nbsp;Payment&nbsp;Methods&nbsp;List                                                                          |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;Manage&nbsp;Payment&nbsp;Methods                                                                        |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;[Project&nbsp;List](administration.projects)                                                         |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |      &#10003;      |         &#10003;     |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Quota](administration.projects#set-project-quotas)                          |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;project&nbsp;tags                                                                 |       &#10003;       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |      &#10003;      |                      |
| &nbsp;&nbsp;List&nbsp;Workspace&nbsp;Users        |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;[Add&nbsp;yourself](administration.workspaces#access-managed-workspace-accounts)         |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;[Send&nbsp;message](administration.workspaces#send-messages-to-workspace-users)          |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;Pending&nbsp;role&nbsp;requests                                                             |       &#10003;       |       &#10003;       |                   |  &#10003;   |            |      &#10003;      |                    |                      |
| &nbsp;&nbsp;[Project&nbsp;Export](administration.projects#project-export)                                        |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;[Quota&nbsp;Export](administration.projects#quota-export)                                            |       &#10003;       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |                    |                      |
| Compliance                                                                                                          |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; List [policies](administration.policies)                                                            |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; Manage [policies](administration.policies)                                                          |       &#10003;       |                      |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; List [Tags](meshstack.metadata-tags)                                                                |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; Manage [Tags](meshstack.metadata-tags)                                                              |       &#10003;       |                      |                   |             |            |                    |      &#10003;      |                      |
| Project Management                                                                                                  |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |                      |
| &nbsp;&nbsp;[Delete&nbsp;Tenants](administration.delete-tenants#delete-tenants)                                  |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |                      |
| &nbsp;&nbsp;[Chargeback&nbsp;Statements](meshcloud.cost-management#chargeback-statements)                       |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| [Platforms](administration.platforms)                                                                            |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Platform&nbsp;Notifications](administration.platforms#platform-notifications)                       |       &#10003;       |       &#10003;       |     &#10003;      |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Platform&nbsp;Restrictions](administration.platforms#restrict-platform-access)                      |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |                      |
| &nbsp;&nbsp;[Landing&nbsp;Zones](administration.landing-zones)                                                   |       &#10003;       |       &#10003;       |     &#10003;      |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Usage&nbsp;Reports](meshcloud.cost-management#tenant-usage-reports)                                |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;[Tenants](administration.tenants)                                                                    |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |         &#10003;     |
| &nbsp;&nbsp;View [Unmanaged Tenants](administration.unmanaged-tenants)                                           |       &#10003;       |       &#10003;       |     &#10003;      |             |            |                    |                    |         &#10003;     |
| &nbsp;&nbsp;Assign [Unmanaged Tenants](administration.unmanaged-tenants#assigning-unmanaged-tenants)             |       &#10003;       |             |           |             |            |                    |                    |             |
| [User&nbsp;List](administration.users)                                                                           |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;Create User                                                |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Delete&nbsp;User](administration.users#delete-user)                                                 |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Download&nbsp;User&nbsp;Info](administration.users#download-user-information)                       |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| [API Users](administration.apiusers)                                                                             |       &#10003;       |            |                   |             |            |                    |                    |                      |
| [Service&nbsp;Broker](administration.service-brokers)                                                            |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Approve&nbsp;Service&nbsp;Broker](administration.service-brokers#approve-service-broker)            |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| [List Building&nbsp;Blocks&nbsp;&amp;&nbsp;Definitions](administration.building-blocks)                          | &#10003; | &#10003; | &#10003; |  &#10003;   | | | | &#10003; |
| &nbsp;&nbsp;&nbsp;[Manage&nbsp;Building&nbsp;Blocks&nbsp;&amp;&nbsp;Definitions](administration.building-blocks) | &#10003; | &#10003; | &#10003; |  &#10003;   | | | | &#10003;|
| &nbsp;&nbsp;&nbsp;[Delete&nbsp;Building&nbsp;Blocks&nbsp;&amp;&nbsp;Definitions](administration.building-blocks) | &#10003; | &#10003; | &#10003; |             | | | |      

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

## Project Users and Roles

Project users are assigned to specific projects within a workspace. Their permissions manage access to platform resources, as defined by their project role (e.g., Project Member, Project Admin).

Project roles can be customized in the global settings in the admin area.

Add platform and landing zone to configuration in the platform builder to enable role mappings.

---

## Related Resources
