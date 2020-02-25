---
id: administration.index
title: Overview
---

meshcloud Partners have access to a so called **meshAdmin** account. This account type enables to manage multiple child-customer accounts
(so called **managed customers**) within the meshcloud platform. Therefore, With this functionality the **meshAdmin** account is needed to enable
customer management. A **meshAdmin** account can only be activated by a **meshcloud Operator**.

Different groups of people may need access to the different administration functionality. Therefore the following administrative roles are currently
available to users of partner or admin accounts:

- **meshcloud Operator**: Is the super admin and operator of the whole meshcloud platform. He can also create **meshAdmin** accounts.
- **meshAdmin**: It's basically the account with administration rights. Has full access to all functionality and can manage users of the
  administrator/partner account.
- **meshAdmin Employee**: Has full access to all administration functionality, but **cannot** manage users of the administrator/partner account.
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

|                                                                                                                           | meshAdmin / Employee | Platform Operator | Ops Support | Controller | Onboarding Support |
| ------------------------------------------------------------------------------------------------------------------------- | :------------------: | :---------------: | :---------: | :--------: | :----------------: |
| [Customer&nbsp;List](administration.customers.md)                                                                         |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |
| &nbsp;&nbsp;[Project&nbsp;List](administration.projects.md)                                                               |       &#10003;       |     &#10003;      |  &#10003;   |  &#10003;  |      &#10003;      |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Quota](administration.projects.md#managing-project-quotas)                           |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;project&nbsp;tags                                                                       |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[History](administration.projects.md#project-history)                                             |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |
| &nbsp;&nbsp;Customer&nbsp;User&nbsp;List                                                                                  |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[Add&nbsp;yourself](administration.customers.md#providing-access-to-the-managed-customer-account) |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;[Send&nbsp;message](administration.customers.md#send-messages-to-customer-users)                  |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;&nbsp;&nbsp;Pending&nbsp;role&nbsp;requests                                                                   |       &#10003;       |                   |  &#10003;   |            |      &#10003;      |
| &nbsp;&nbsp;[Project&nbsp;Export](administration.projects.md#project-export)                                              |       &#10003;       |                   |             |  &#10003;  |                    |
| &nbsp;&nbsp;[Quota&nbsp;Export](administration.projects.md#quota-export)                                                  |       &#10003;       |     &#10003;      |             |  &#10003;  |                    |
| Projects                                                                                                                  |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |
| &nbsp;&nbsp;[Deleted&nbsp;Projects](administration.projects.md#deleted-projects)                                          |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |
| &nbsp;&nbsp;&nbsp;&nbsp;[History](administration.projects.md#project-history)                                             |       &#10003;       |     &#10003;      |  &#10003;   |            |      &#10003;      |
| &nbsp;&nbsp;[Chargeback&nbsp;Statements](administration.usage.md)                                                         |       &#10003;       |                   |             |            |                    |
| [Platforms](administration.platforms.md)                                                                                  |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;[Platform&nbsp;Notifications](administration.platforms.md#platform-notifications)                             |       &#10003;       |     &#10003;      |             |            |                    |
| &nbsp;&nbsp;[Platform&nbsp;Restrictions](administration.platforms.md#restrict-meshPlatforms)                         |       &#10003;       |     &#10003;      |  &#10003;   |            |                    |
| &nbsp;&nbsp;[Landing&nbsp;Zones](administration.landing-zones.md)                                                         |       &#10003;       |     &#10003;      |             |            |                    |
| &nbsp;&nbsp;[Usage&nbsp;Reports](administration.usage.md)                                                                 |       &#10003;       |                   |             |            |                    |
| [User&nbsp;List](administration.users.md)                                                                                 |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;[Delete&nbsp;User](administration.users.md#delete-user)                                                       |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;[Download&nbsp;User&nbsp;Info](administration.users.md#download-user-information)                             |       &#10003;       |                   |             |            |                    |
| [Service&nbsp;Broker](administration.service-brokers.md)                                                                  |       &#10003;       |                   |             |            |                    |
| &nbsp;&nbsp;[Approve&nbsp;Service&nbsp;Broker](administration.service-brokers.md#approve-service-broker)                  |       &#10003;       |                   |             |            |                    |
| Performance&nbsp;KPIs                                                                                                     |       &#10003;       |                   |             |            |      &#10003;      |
| [Performance&nbsp;Analytics](administration.analytics.md)                                                                 |       &#10003;       |                   |             |            |      &#10003;      |

Please review [meshCustomer roles](meshcloud.customer.md#meshCustomer-roles) for roles available to end-users of your meshStack implementation.
