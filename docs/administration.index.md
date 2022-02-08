---
id: administration.index
title: Overview
---

Partners Users have access to the so called **Administration Area**. The administration area enables partner users to manage their child [meshCustomer](./meshcloud.customer.md) accounts within the meshcloud platform.
Assigning Partner Users can only be done by a **meshcloud operator** or Partner Admins.

Different groups of people may need access to the different administration area functionality. Therefore, the following administrative roles are currently
available to users of the administration area:

- **Partner Admin**: It's basically the account with administration rights. Has full access to all functionality and can manage users of the
  administrator/partner account.
- **Partner Employee**: Has full access to all administration functionality, but **cannot** manage meshPolicies, tag definitions or users of the administrator/partner account.
- **Compliance Manager**: Has the rights to manage meshPolicies and tag definitions.
- **Platform Operator**: An operator of a cloud platform, that is managed by the meshcloud platform. This role can perform tasks related to
  platform operations in the administration area.
- **Ops Support**: Not all Ops operations must be executed by Platform Operators. E.g. setting quotas is a task that can also be done by
  a separate Ops Support team.
- **Onboarding Support**: A support team in place to help users who want to sign up may also need access to some administration
  functionality which is granted by this role.
- **Controller**: A Controller has access to billing and usage information of customer projects.

See the [meshCustomer](meshcloud.customer.md) documentation for details about how you can manage the roles of your users. This set of roles is easily extendable by adding roles to reflect individual access requirements of your organization.

The following table provides details about the functionality available to the different roles by default. The Access rights can also be adapted individually
per meshcloud installation.

|                                                                                                                           | Partner Admin        | Partner Employee     | Platform Operator | Ops Support | Controller | Onboarding Support | Compliance Manager |
| ------------------------------------------------------------------------------------------------------------------------- | :------------------: | :------------------: | :---------------: | :---------: | :--------: | :----------------: | :----------------: |
| [Customer&nbsp;List](administration.customers.md)                                                                         |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |                    |
| &nbsp;&nbsp;[Project&nbsp;List](administration.projects.md)                                                               |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Quota](administration.projects.md#managing-project-quotas)                           |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;project&nbsp;tags                                                                       |       &#10003;       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[History](administration.projects.md#project-history)                                             |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |
| &nbsp;&nbsp;[List&nbsp;Customer&nbsp;Users](administration.customers.md#access-managed-customer-accounts)                                                                             |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[Add&nbsp;yourself](administration.customers.md#access-managed-customer-accounts) |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[Send&nbsp;message](administration.customers.md#send-messages-to-customer-users)                  |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;Pending&nbsp;role&nbsp;requests                                                                   |       &#10003;       |       &#10003;       |                   |  &#10003;   |            |      &#10003;      |                    |
| &nbsp;&nbsp;[Project&nbsp;Export](administration.projects.md#project-export)                                              |       &#10003;       |       &#10003;       |                   |             |  &#10003;  |                    |                    |
| &nbsp;&nbsp;[Quota&nbsp;Export](administration.projects.md#quota-export)                                                  |       &#10003;       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |                    |
| Compliance                                                                                                                |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |
| &nbsp;&nbsp; List [meshPolicies](administration.mesh-policies.md)                                                         |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |
| &nbsp;&nbsp; Manage [meshPolicies](administration.mesh-policies.md)                                                       |       &#10003;       |                      |                   |             |            |                    |      &#10003;      |
| &nbsp;&nbsp; List [Tags](meshstack.metadata-tags.md)                                                                      |       &#10003;       |       &#10003;       |                   |             |            |                    |      &#10003;      |
| &nbsp;&nbsp; Manage [Tags](meshstack.metadata-tags.md)                                                                    |       &#10003;       |                      |                   |             |            |                    |      &#10003;      |
| Project Management                                                                                                        |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |
| &nbsp;&nbsp;[Deleted&nbsp;Projects](administration.projects.md#delete-projects)                                           |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[History](administration.projects.md#project-history)                                             |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |                    |
| &nbsp;&nbsp;[Chargeback&nbsp;Statements](administration.usage.md)                                                         |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| [Platforms](administration.platforms.md)                                                                                  |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;[Platform&nbsp;Notifications](administration.platforms.md#platform-notifications)                             |       &#10003;       |       &#10003;       |     &#10003;      |             |            |                    |                    |
| &nbsp;&nbsp;[Platform&nbsp;Restrictions](administration.platforms.md#restrict-meshPlatforms)                              |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |
| &nbsp;&nbsp;[Landing&nbsp;Zones](administration.landing-zones.md)                                                         |       &#10003;       |       &#10003;       |     &#10003;      |             |            |                    |                    |
| &nbsp;&nbsp;[Usage&nbsp;Reports](administration.usage.md)                                                                 |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;[Tenants](administration.tenants.md)                                                                          |       &#10003;       |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |                    |
| [User&nbsp;List](administration.users.md)                                                                                 |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;[Delete&nbsp;User](administration.users.md#delete-user)                                                       |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;[Download&nbsp;User&nbsp;Info](administration.users.md#download-user-information)                             |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| [Service&nbsp;Broker](administration.service-brokers.md)                                                                  |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| &nbsp;&nbsp;[Approve&nbsp;Service&nbsp;Broker](administration.service-brokers.md#approve-service-broker)                  |       &#10003;       |       &#10003;       |                   |             |            |                    |                    |
| [Performance&nbsp;Analytics](administration.analytics.md)                                                                 |       &#10003;       |       &#10003;       |                   |             |            |      &#10003;      |                    |

Please review [meshCustomer roles](meshcloud.customer.md#assign-meshCustomer-roles) for roles available to end-users of your meshStack implementation.
