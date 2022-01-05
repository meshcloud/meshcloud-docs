---
id: administration.customers
title: meshCustomers
---

With a Partner Account you can easily manage multiple customer accounts with the meshcloud Portal. The meshcloud administration area is the
place to create and manage your customer accounts. You can access the meshcloud **Administration** Area by opening the settings menu and
navigating to the **Administration** Area.

When selecting **Customers** in the menu bar on the left you can see the list of all customers managed by you.

## Create managed Customer Accounts

### Manually register a new Customer

With meshcloud you can easily create customer accounts.

1. Login to the meshPanel with your partner credentials.
2. If not logged in, please login with your Partner account credentials.
3. On the toolbar at the top, please make sure that you have navigated into the 'Admin Area'.
4. Select **Customers** in the menu bar on the left.
5. There is a button `+ Create Customer` on the top-right of the table. After clicking the button, you will be navigated to the customer creation screen. Here you can enter the name and identifier of the new customer as well as the user(s) that should be assigned to the customer. Keep in mind that you are able to configure restricted tags, this is not possible for non-partner users.

> **Attention**: Identifiers can not be changed. Please choose them carefully.

### Approve new Customer Accounts

A meshStack installation can be configured to require a manual approval by a partner/admin for new meshCustomer registrations. Users who register receive an email notifying them, that their account is currently being verified. As soon as a partner/admin approves the request, they receive another email. This email informs users, that they are now approved and can start working with the cloud resources. Depending on the configuration, users may also have to confirm their email address via a confirmation link, that is available in the second email.

## Manage Customer Accounts

### Disabling Customer Accounts

Operators can disable meshCustomers in case the responsible customer admins do not provide valid [Payment Methods](meshcloud.payment-methods.md) or do not maintain correct [metadata](meshstack.metadata-tags.md).

Setting the meshCustomer account status to **Disabled** has the following effects on [meshProjects](meshcloud.project.md) and [meshTenants](meshcloud.tenant.md) owned by this customer:

- users can no longer access [meshTenants](meshcloud.tenant.md) via meshPanel
- users can no longer create [Service Users](meshcloud.service-user.md)

Disabling a customer does not technically prevent users from accessing tenants when logging in directly on the cloud platform. To prevent this access so, partners must add themselves to the customer account as an admin and manually remove user permissions and service users.

If you want to prevent a customer from creating new [meshProjects](meshcloud.project.md), you can [adjust the customer's meshProject quota](#set-customer-quotas).

### Access managed Customer Accounts

As a partner user you can assign yourself a role on managed customer accounts. The role that will be assigned can either be "Customer Employee" or "Customer Admin" depending on the configuration of meshStack ([read more here](meshstack.configuration.md#customer-user-invitations)). If you are assigned as a Customer Employee you cannot execute
step four and five.

1. Go to **Administration &gt; Customers** and click on the **Users** icon on the managed customer account you want to edit.
2. In the **Customers Users** view click on the button **Add Myself** in the top right corner.
3. After you have successfully assigned yourself to the account you can now choose the account in the top left drop-down. Please select the
   new managed customer there.
4. In the toolbox go to **Account &gt; Users** where you can invite and add users to the managed customer account.
5. Invited users will receive an e-mail with a link to get access to this new customer. For more details on user invitation, also see [meshCustomer](meshcloud.customer.md).

### Send messages to customer users

Partner are able to send short notification messages to the users of their managed customer accounts. Recipients will see these notifications
upon login.

In order to send such a message:

1. Login to the meshPanel with your partner credentials.
2. Navigate to the **Administration** area via the toolbox on the top right and then click on **Customers** in the menu.
3. In the **Actions** column click on the envelope icon.

Write your messages and choose which recipient should receive the messages: **All must read** will show the message to all recipients and everyone has
to acknowledged the message. Or you can choose **Single read only** which will hide the message for all other users if one single user has acknowledged
it. This is useful e.g. for maintenance task required to be done by the project team. Once one team member has solved the task, displaying the
notification is no longer necessary.

### Set Customer Quotas

Partners and Administrators can manage the quota, that limits the maximum number of projects per customer.

1. Login to the meshPanel with your credentials.
2. Navigate to the **Administration** area via the toolbox on the top right and then click on **Customers** in the menu.
3. In the **Actions** column click on the **Quota** icon on the managed customer account you want to edit.
4. Then you can increase and decrease the number of projects per customer.

### Edit Customer Tag Values

Partner users can edit tag values for tags defined in both [restricted and unrestricted meshTags](meshstack.metadata-tags.md) for managed **meshCustomers** by navigating to the **Customers** list and clicking the `Customer Tags` button.

## Audit Customer Accounts

### Account History

Sometimes additional information about the lifecycle of a customer is required. The archive icon in the list of customers shows all major events that happened on the customer.

The following events are available:

- **CUSTOMER_REGISTERED**: A new meshCustomer registered in self-service.
- **CUSTOMER_CREATED**: A new meshCustomer was created by a partner/admin.
- **USER_INVITED**: A user was invited to a meshCustomer.
- **USER_ACCEPTED_INVITATION**: A user accepted the invitation.
- **USER_INVITATION_CANCELLED**: An invitation was cancelled by a customer admin.
- **USER_REMOVED**: A user was removed from the meshCustomer.
- **USER_ROLE_CHANGED**: The role of a user was changed on the meshCustomer.
- **CUSTOMER_QUOTA_EDITED**: The quota of a meshCustomer was changed.
- **USER_ASSIGNED_HIMSELF**: A partner/admin assigned himself to a meshCustomer.
- **CUSTOMER_STATUS_CHANGED**: A partner/admin changed the status of a meshCustomer (i.e. disabled or enabled the meshCustomer).
- **CUSTOMER_APPROVED**: A partner/admin approved a new meshCustomer registration. This event is only available, when the [manual customer approval](#approve-customer) is activated.
