---
id: administration.index
title: Overview
---

Meshcloud Partners and Administrators have the ability to manage multiple, child-customer accounts (managed customers) within the Meshcloud platform. Therefore, a Meshcloud Partner account has additional functionality to enable customer management. A Partner Account can only be activated by a Meshcloud Administrator.

Different groups of people may need access to the different administration functionality provided for partners and admins. Therefore the following roles can currently be assigned to users of partner or admin accounts:

- **Partner Admin**: Has full access to all administration functionality and can manage users of the partner account.
- **Partner Employee**: Has full access to all administration functionality, but **cannot** manage users of the partner account.
- **Platform Operator**: An operator of a cloud platform, that is managed by the Meshcloud platform. This group can do platform operation related tasks in the administration area.
- **Controller**: A Controller has access to billing and usage information of customer projects.
- **Ops Support**: Not all Ops operations must be executed by Platform Operators. E.g. setting quotas is a task that can also be done by a separate Ops Support team.
- **Onboarding Support**: Having a support team in place, that can support users who want to sign up, may also need access to some administration functionality.

See the [Customer Account](meshcloud.customer.md#manage-groups-of-assigned-users) documentation for details about how you can manage the groups of your users.

This set of groups is easily extendable for further groups, so individual requirements of your organization can be reflected by the different groups.

The following table provides details about the functionality available to the different groups.

|                       | Platform Operator | Controller | Ops Support | Onboarding Support | meshPartner / meshAdmin |
| --------------------- | :---: | :---: | :---: | :---: | :---: |
| [Customer&nbsp;List](administration.customers.md) | X | X | X | X | X |
| &nbsp;&nbsp;[Project&nbsp;List](administration.projects.md) | X | X | X | X | X |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Quota](administration.projects.md#managing-project-quotas) | X |  | X |  | X |
| &nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;project&nbsp;tags | X | X |  |  | X |
| &nbsp;&nbsp;&nbsp;&nbsp;[History](administration.projects.md#project-history) | X |  | X | X | X |
| &nbsp;&nbsp;Customer&nbsp;User&nbsp;List |  |  |  |  | X |
| &nbsp;&nbsp;&nbsp;&nbsp;[Add&nbsp;yourself](administration.customers.md#providing-access-to-the-managed-customer-account) |  |  |  |  | X |
| &nbsp;&nbsp;&nbsp;&nbsp;[Send&nbsp;message](administration.customers.md#send-messages-to-customer-users) |  |  |  |  | X |
| &nbsp;&nbsp;Quota&nbsp;Export | X | X |  |  | X |
| &nbsp;&nbsp;Project&nbsp;Export |  | X |  |  | X |
| [Usage&nbsp;&&nbsp;Billing](administration.usage.md) |  |  |  |  | X |
| [Deleted&nbsp;Projects](administration.projects.md#deleted-projects) | X |  | X | X | X |
| &nbsp;&nbsp;[History](administration.projects.md#project-history) | X |  | X | X | X |
| Platform Notifications | X |  |  |  | X |
| [User&nbsp;List](administration.users.md) |  |  |  |  | X |
| &nbsp;&nbsp;[Delete&nbsp;User](administration.users.md#delete-user) |  |  |  |  | X |
| &nbsp;&nbsp;[Download&nbsp;User&nbsp;Info](administration.users.md#download-user-information) |  |  |  |  | X |
| Service&nbsp;Broker&nbsp;List |  |  |  |  | X |
| &nbsp;&nbsp;Approve&nbsp;Service&nbsp;Broker |  |  |  |  | X |
| Performance&nbsp;KPIs |  |  |  | X | X |