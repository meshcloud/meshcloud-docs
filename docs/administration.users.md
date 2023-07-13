---
id: administration.users
title: meshUsers
---

To manage users of your workspaces go to the **Users** section of the **Administration** area.

To search for a user, please follow these steps:

1. Click on **meshStack Users** in the **Administration** Area.
2. Enter a part or the complete first name, last name or email address of the user you are searching for.
3. The list will restrict the results to your search criteria automatically.

## Delete User

If you also want to delete a user follow these additional steps:

1. Click the trash icon.
2. In the confirmation dialog,  enter the username or email address of the user you want to delete. This avoids deleting users accidentally.
3. Click **"Confirm Deletion"** to finally delete the user.

After you completed the deletion, these users  will be removed from all projects and workspaces they're assigned to automatically.

Deleted users will only be flagged as deleted. Everything except their username will be pseudonomized via a SHA-256 hash (mandatory for privacy compliance by the EU GDPR).
Future audits of these users' actions will thus still be possible. Furthermore, you can reuse the usernames of deleted users. This enables you to invite users with usernames that once belonged to deleted users or reinvite them with the same username once they've been deleted.

## Download User information

To retrieve detailed information about which systems under meshStack management contain a user's personal information, just click the disc icon in the user list and a file containing this information will be downloaded.

## Guest Users

It's possible to flag meshUsers as "guest users". Guest users are intended for scenarios where a cloud foundation team wants to manage permissions for  external users via meshStack.
A common scenario where this occurs is when you organization collaborates with external partners on cloud projects and these partners "bring their own" indentities.

Guest users have the following properties

- They are not expected or unable to sign in via the configured Enterprise  [Identity Provider](./meshstack.identity-provider.md).
- Guest users are not able to login to meshPanel. It's sufficient for guest users to access any assigned cloud tenants directly via the cloud platform.
- Guest users do not receive email notifications from meshStack, e.g. about changed role assignments
- Guest users have an `euid`, see [configuring externally-provisioned identities](./meshstack.identity-federation.md#configuring-externally-provisioned-identity-federation).
- Guest user identities are available in the cloud platform's IAM directory with an `euid`, e.g. via AAD B2B or disabling domain restricted sharing on GCP
