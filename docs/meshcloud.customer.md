---
id: meshcloud.customer
title:  Customer Accounts (meshCustomer)
---

## What is a meshCustomer?

A meshCustomer is automatically created for you when you [sign up](meshcloud.profile.md) for a new account. A meshCustomer usually represents your company or department. Within a meshCustomer you manage multiple [projects](meshcloud.project.md), your users and their access rights and maintain general data like addresses and payment methods.

## Customer Settings

General information of a meshCustomer (like its name) can be edited here. The customer identifier is also shown here, but it can never be changed, as it is used as an immutable identifier of the meshCustomer for its representation in the different cloud platforms.

If applicable in your Meshcloud installation, also a Tax ID can be defined here for your meshCustomer.

## Invite users to access a meshCustomer

If you would like to give others access to your meshCustomer and the related meshProjects, go to your "Account" settings. You access them by pressing the settings icon on the top right of the meshPanel. From here, navigate to "Users" and provide the full name as well as the email address of that person under "Pending Invitations". Press "+" to send an invitation email to this person. This step is necessary in order to give a user access to your [projects](meshcloud.project.md).

## Manage groups of assigned users

After inviting a user, the user appears in the **Users** list below the invitations. You can change the group in the dropdown and save the changes via the *disc* icon. The following groups are available:

- **Customer Admin**: Has full access to the meshCustomer and its projects and can manage users of the meshCustomer account.
- **Customer Employee**: Has full access to project resources, but **cannot** manage users, create projects, etc of the meshCustomer account.

For Partner accounts a different set of groups is available as described in the [Administration](administration.index.md) section.

## Remove users from a meshCustomer

If you would like to remove a user from your meshCustomer go to your "Account" settings and select "Users". If the user already accepted the invitation, you can click the "trash" icon in the "Users" section to remove the user from your meshCustomer. If a user has already received an invitation before, but never claimed it, click the "trash" icon in the Pending Invitations section. When removing the user on the meshCustomer, the user is automatically removed from all projects he had access to. He also won't be able to access cloud resources of your projects anymore.
