---
id: administration.index
title: Overview
---

Meshcloud Partners have access to a so called **meshAdmin** account. This account type enables to manage multiple child-customer accounts
(so called **managed customers**) within the meshcloud platform. Therefore, With this functionality the **meshAdmin** account is needed to enable
customer management. A **meshAdmin** account can only be activated by a **meshcloud Operator**.

Different groups of people may need access to the different administration functionality. Therefore the following administrative roles are currently
available to users of partner or admin accounts:

- **meshcloud Operator**: Is the super admin and operator of the whole meshcloud platform. He can also create **meshAdmin** accounts.
- **meshAdmin**: It's basically the account with administration rights. Has full access to all functionality and can manage users of the
  administrator/partner account.
- **meshAdmin Employee**: Has full access to all administration functionality, but **cannot** manage users of the administrator/partner account.
- **Platform Operator**: An operator of a cloud platform, that is managed by the meshcloud platform. This group can perform tasks related to
  platform operations in the administration area.
- **Ops Support**: Not all Ops operations must be executed by Platform Operators. E.g. setting quotas is a task that can also be done by
  a separate Ops Support team.
- **Onboarding Support**: A support team in place to help users who want to sign up may also need access to some administration
  functionality which is granted by this role.
- **Controller**: A Controller has access to billing and usage information of customer projects.

See the [Customer Account](meshcloud.customer.md#manage-groups-of-assigned-users) documentation for details about how you can manage the groups of your users.

This set of groups is easily extendable, so individual access requirements of your organization can be implemented.

The following table provides details about the functionality available to the different groups.

|                                                                                                                           | meshAdmin / Employee | Platform Operator | Ops Support | Controller | Onboarding Support | Controller |
| ------------------------------------------------------------------------------------------------------------------------- | :------------------: | :---------------: | :---------: | :--------: | :----------------: | :--------: |
| [Customer&nbsp;List](administration.customers.md)                                                                         |          x           |         X         |      X      |     X      |         X          |            |
| &nbsp;&nbsp;[Project&nbsp;List](administration.projects.md)                                                               |          x           |         X         |      X      |     X      |         X          |            |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Quota](administration.projects.md#managing-project-quotas)                           |          x           |         X         |      X      |            |                    |            |
| &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;project&nbsp;tags                                                                       |          x           |         X         |             |     X      |                    |            |
| &nbsp;&nbsp;&nbsp;&nbsp;[History](administration.projects.md#project-history)                                             |          x           |         X         |      X      |            |         X          |            |
| &nbsp;&nbsp;Customer&nbsp;User&nbsp;List                                                                                  |          x           |                   |             |            |                    |            |
| &nbsp;&nbsp;&nbsp;&nbsp;[Add&nbsp;yourself](administration.customers.md#providing-access-to-the-managed-customer-account) |          x           |                   |             |            |                    |            |
| &nbsp;&nbsp;&nbsp;&nbsp;[Send&nbsp;message](administration.customers.md#send-messages-to-customer-users)                  |          x           |                   |             |            |                    |            |
| &nbsp;&nbsp;[Project&nbsp;Export](administration.projects.md#project-export)                                              |          x           |                   |             |     X      |                    |            |
| &nbsp;&nbsp;[Quota&nbsp;Export](administration.projects.md#quota-export)                                                  |          x           |         X         |             |     X      |                    |            |
| [Usage&nbsp;&&nbsp;Billing](administration.usage.md)                                                                      |          x           |                   |             |            |                    |     X      |
| [Deleted&nbsp;Projects](administration.projects.md#deleted-projects)                                                      |          x           |         X         |      X      |            |         X          |            |
| &nbsp;&nbsp;[History](administration.projects.md#project-history)                                                         |          x           |         X         |      X      |            |         X          |            |
| [Platform&nbsp;Notifications](administration.platforms.md)                                                                |          x           |         X         |             |            |                    |            |
| [User&nbsp;List](administration.users.md)                                                                                 |          x           |                   |             |            |                    |            |
| &nbsp;&nbsp;[Delete&nbsp;User](administration.users.md#delete-user)                                                       |          x           |                   |             |            |                    |            |
| &nbsp;&nbsp;[Download&nbsp;User&nbsp;Info](administration.users.md#download-user-information)                             |          x           |                   |             |            |                    |            |
| [Service&nbsp;Broker](administration.service-brokers.md)                                                                  |          x           |                   |             |            |                    |            |
| &nbsp;&nbsp;[Approve&nbsp;Service&nbsp;Broker](administration.service-brokers.md#approve-service-broker)                  |          x           |                   |             |            |                    |            |
| Performance&nbsp;KPIs                                                                                                     |          x           |                   |             |            |         X          |            |
| [Performance&nbsp;Analytics](administration.analytics.md)                                                                 |          x           |                   |             |            |         X          |            |

Additional roles exist for consumers who are using the platform:

- **Customer Admins**: They are administrator for their own space and can manage projects and cloud platform access/resources. This can be departments of your organization, sub-contractors or single persons.
- **Customer Employees**: They can not manage the projects but can optain access to the cloud platform resources connected to the single projects.
