---
id: meshcloud.profile
title: User Account
---
The following section covers all the relevant details regarding your meshStack user account.

## Account Creation

In most meshcloud installations an external identiy provider (IdP) is available and configured for authentication in meshcloud.
That way users and their credentials already exist and can be used to login to meshPanel. If an IdP is not available, the registration of new users is enabled in the meshIdB. Before being able to create a new meshCustomer, users have to create their user in meshIdB first.

When a user already exists, he can create a new account (meshCustomer) after login. Click "Create meshCustomer" and fill out the form.

Submit the form to create an account.

You will receive an email to confirm your account and after that you can start using your account.

## Login

Logging in to your federated meshFed SSO account can be done by:

1. Navigate to your meshPanel.
2. In the upper right corner or inside the home screen. click on the **Login** link.
3. You will be redirected to the meshFed SSO login.
4. Enter your credentials (in most cases your known company credentials, or the ones you created during registration).
5. After a successful login, you will be automatically redirected to the meshPanel project overview.

## Change Password

If a company IdP is used for authentication, you have to contact your IT to centrally change your credentials. If no IdP is available
and the user account was registered via the meshIdB, you can access the "Forgot Password" from the login screen.

## Profile

Navigate to the **Profile** page via the navigation on the top right of the meshPanel.

### Information

Here you can find all your personal information stored in the meshStack. You can also expand an area on the bottom of the page, to see a list of related systems, that also persist your personal information (e.g. cloud platforms). In general meshStack tries to store as little of your personal information as possible in the different systems.

### Platform Notification Subscriptions

Here you can also manage your subscriptions if you wish to receive emails for any [platform notifications](administration.platforms.md).
While all platform notifications are also shown in the meshPanel (i.e. project overview/dashboards) it can be useful to subscribe to notifications for specific platforms.
Notifications have a severity level (info > warning > critical) and you can select to only receive notifications above a certain level, i.e. selecting a minimum severity of info will also include warnings and critical notifications while selecting warning will *only* include warnings and critical notifications.
If you have important applications running in a specifc platform you might be interested in notifications with a serverity level of at least warning, so you'd be informed about service disruptions, platform outages, etc.
