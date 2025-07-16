---
id: administration.index
title: Administration Roles
---

Admin users have access to the so called **Administration Area**. The administration area enables admin users to manage their [workspace](meshcloud.workspace) accounts within the meshcloud platform.
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

See the [meshWorkspace](meshcloud.workspace) documentation for details about how you can manage the roles of your users. This set of roles is easily extendable by adding roles to reflect individual access requirements of your organization.

The following table provides details about the functionality available to the different roles by default. The Access rights can also be adapted individually
per meshcloud installation.

|                                                                                                                  | Organization Admin        | Organization User     | Platform Engineer | Ops Support | FinOps Manager | Onboarding Support | Compliance Manager | Replication Operator |
|------------------------------------------------------------------------------------------------------------------| :------------------: | :------------------: | :---------------: |:-----------:| :--------: | :----------------: | :----------------: | :------------------: |
| [Workspace&nbsp;List](administration.workspaces)                                                                 |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |      &#10003;      |         &#10003;     |
| &nbsp;&nbsp;Payment&nbsp;Methods&nbsp;List                                                                       |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;Manage&nbsp;Payment&nbsp;Methods                                                                     |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;[Project&nbsp;List](administration.projects)                                                         |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |      &#10003;      |         &#10003;     |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Quota](administration.projects#set-project-quotas)                          |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;project&nbsp;tags                                                              |       &#10003;       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |      &#10003;      |                      |
| &nbsp;&nbsp;List&nbsp;Workspace&nbsp;Users                                                                       |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;Add&nbsp;yourself                                                                        |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;[Send&nbsp;message](administration.workspaces#send-messages-to-workspace-users)          |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;&nbsp;&nbsp;Pending&nbsp;role&nbsp;requests                                                          |       &#10003;       |       &#10003;       |                   |  &#10003;   |            |      &#10003;      |                    |                      |
| &nbsp;&nbsp;[Project&nbsp;Export](administration.projects#project-export)                                        |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |                      |
| &nbsp;&nbsp;[Quota&nbsp;Export](administration.projects#quota-export)                                            |       &#10003;       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |                    |                      |
| Compliance                                                                                                       |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; List [policies](administration.policies)                                                            |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; Manage [policies](administration.policies)                                                          |       &#10003;       |                      |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; List [Tags](meshstack.metadata-tags)                                                                |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |                      |
| &nbsp;&nbsp; Manage [Tags](meshstack.metadata-tags)                                                              |       &#10003;       |                      |                   |             |            |                    |      &#10003;      |                      |
| Project Management                                                                                               |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |                      |
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
| &nbsp;&nbsp;Create User                                                                                          |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Delete&nbsp;User](administration.users#delete-user)                                                 |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Download&nbsp;User&nbsp;Info](administration.users#download-user-information)                       |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| [API Users](administration.apiusers)                                                                             |       &#10003;       |            |                   |             |            |                    |                    |                      |
| [Service&nbsp;Broker](administration.service-brokers)                                                            |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| &nbsp;&nbsp;[Approve&nbsp;Service&nbsp;Broker](administration.service-brokers#approve-service-broker)            |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |                      |
| [List Building&nbsp;Blocks&nbsp;&amp;&nbsp;Definitions](administration.building-blocks)                          | &#10003; | &#10003; | &#10003; |  &#10003;   | | | | &#10003; |
| &nbsp;&nbsp;&nbsp;[Manage&nbsp;Building&nbsp;Blocks&nbsp;&amp;&nbsp;Definitions](administration.building-blocks) | &#10003; | &#10003; | &#10003; |  &#10003;   | | | | &#10003;|
| &nbsp;&nbsp;&nbsp;[Delete&nbsp;Building&nbsp;Blocks&nbsp;&amp;&nbsp;Definitions](administration.building-blocks) | &#10003; | &#10003; | &#10003; |             | | | |                    



Please review [meshWorkspace roles](meshcloud.workspace#assign-meshworkspace-roles) for roles available to end-users of your meshStack implementation.

## Admin Groups

To avoid assigning multiple users individually, you can create Admin Groups. These groups can be assigned to roles in the same way as individual users.
You can view Admin Groups within your Administration Area by going to the **Admin Groups** section on the **Admin Access Control** page. Currently, the creation of Admin Groups is only possible via the [meshStack API](pathname:///api/index.html), namely [meshWorkspaceUserGroups API endpoint](pathname:///api/index.html#mesh_workspaceusergroup), and to create one you will need a unique identifier, which you can find in the Admin Group section. In the example provided, the identifier is named "demo-partner," but it is unique to every meshStack.
![admin-group](assets/admin-group.png)
