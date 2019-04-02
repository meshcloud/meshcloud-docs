---
id: administration.customers
title: Administrate Customers
---

With a Partner Account you can easily manage multiple customer accounts with the Meshcloud Portal. The Meshcloud administration area is the
place to create and manage your customer accounts. You can access the Meshcloud **Administration** Area by opening the settings menu and
navigating to the **Administration** Area. In case you do not see a menu entry called **Administration** in your settings menu, your account
is probably not a partner account yet. Please contact [Meshcloud Support](https://support.meshcloud.io) to transform your account into a
partner account.

When selecting **Customers** in the menu bar on the left you can see the list of all customers managed by you.

## Creating Managed Customer Accounts

With Meshcloud you can easily create customer accounts.

1. Login to the meshPanel with your partner credentials
2. If not logged in, please login with your Partner account credentials.
3. On the Welcome Dashboard, please make sure that you have selected your Partner account in the account selection on the top left.
4. Select **Administration** from the toolbox and go to **Customers** in the menu bar on the left.
5. On the top of the table enter the new managed customer's name and identifier. Then click on the `+` button. Your managed customer is created.

> **Attention**: The identifiers can not be changed. Please choose them carefully.

## Providing access to the managed customer account

After creation, a customer account contains no users yet. Therefore you need to invite your customer's users to their newly created account.
To do so as a partner, assign yourself to the account to access the account with your Partner credentials:

1. Go to **Administration &gt; Customers** and click on the **Users** icon on the managed customer account you want to edit.
2. In the **Customers Users** view click on the button **Add Myself** in the top right corner.
3. After you have successfully assigned yourself to the account you can now choose the account in the top left drop-down. Please select the
   new managed customer there.
4. In the toolbox go to **Account &gt; Users** where you can invite and add users to the managed customer account.
5. Invited users will receive an e-mail with a link to get access to this new customer. For more details on user invitation, also see [meshCustomer](meshcloud.customer.md).

## Send messages to customer users

Partner are able to send short notification messages to the users of their managed customer accounts. Recipients will see these notifications
upon login.

In order to send such a message:

1. Login to the Meshpanel with your partner credentials.
2. Navigate to the **Administration** area via the toolbox on the top right and then click on **Customers** in the menu.
3. In the **Actions** colum click on the envelope icon.

Write your messages and choose which recipient should receive the messages: **All must read** will show the message to all recipients and everyone has
to acknowledged the message. Or you can choose **Single read only** which will hide the message for all other users if one single user has acknowledged
it. This is useful e.g. for maintenance task required to be done by the project team. Once one team member has solved the task, displaying the
notification is no longer necessary.

## Customer quota management

Partners and Administrators can manage the quota, that limits the maximum number of projects per customer.

1. Login to the Meshpanel with your credentials
2. Navigate to the **Administration** area via the toolbox on the top right and then click on **Customers** in the menu.
3. In the **Actions** colum click on the **Quota** icon on the managed customer account you want to edit.
4. Then you can increase and decrease the number of projects per customer.

## Approve Customer

A meshStack installation can be configured to require a manual approval by a partner/admin for new meshCustomer registrations. Users who register receive an email notifying them, that their account is currently being verified. As soon as a partner/admin approves the request, they receive another email. This email informs the user, that he is now approved and can start working with the cloud ressources. Dependend on the configuration, the user may also have to confirm his email address via a confirmation link, that is available in the second email.

## Customer History

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
