---
id: meshcloud.customer
title:  meshCustomer
---

A meshCustomer usually represents a product team or department in your organization. Self-service within a meshCustomer
allows you to invite and manage team members, create [meshProjects](meshcloud.project.md) and maintain organizational metadata like billing-addresses and payment methods.

## Customer Creation

Organizations implementing meshStack can choose to offer self-service customer registration via meshPanel or externalize
the process to some existing ITSM or process automation system. Operators can read more about these options [here](meshstack.configuration.md#customer-registration).

In any case, the meshCustomer creation process always involves collecting basic customer information like Name, identifier
and any additional [metadata specific to your organization](meshstack.tag-schema.md#customer-tag-schema).


## Customer Settings

General information of a meshCustomer (like its name) and [Customer Tags](meshstack.tag-schema.md#customer-tag-schema) can be edited here. The customer identifier is also shown here, but it can never be changed, as it is used as an immutable identifier of the meshCustomer for its representation in the different cloud platforms.

Depending on the configuration of your meshStack implementation, you may be able to edit additional customer [metadata tags](./meshcloud.tag-schema.md) here.

## Invite users to a meshCustomer team

If you would like to give others access to your meshCustomer and the related meshProjects, go to your "Account" settings. You can access them by pressing the settings icon on the top right of the meshPanel. From here, navigate to "Users" and provide the full name as well as the email address of that person. You can initially setup the role in the dropdown which describes the access level of the invited user. Press "+" to send an invitation email. This step is necessary in order to give a user access to your [projects](meshcloud.project.md). After this action the created invitation will be appear under the pending customer user role requests section.

## Assign meshCustomer Roles

You can change the role assigned to each user on the current meshCustomer. To change the assigned role choose a new role from the dropdown and save the changes via the disc icon. The following roles are available:

- **Customer Admin**: Has full access to the meshCustomer and its projects and can manage users of the meshCustomer account.
- **Customer Employee**: Has full access to project resources, but **cannot** manage users, create projects, etc of the meshCustomer account.

### meshCustomer Roles

The following table provides details about the functionality available to the different roles.

|                       | Customer Admin | Customer Employee |
| --------------------- | :---: | :---: |
| [Project&nbsp;Resources](meshcloud.project-resources.md) | &#10003; | &#10003; |
| &nbsp;&nbsp;[Project&nbsp;Dashboard](meshcloud.project-resources.md#project-dashboard) | &#10003; | &#10003; |
| &nbsp;&nbsp;[Project&nbsp;Platform&nbsp;Dashboard](meshcloud.project-resources.md#project-platform-dashboard) | &#10003; | &#10003; |
| &nbsp;&nbsp;[Service&nbsp;User](meshcloud.service-user.md) | &#10003; | &#10003; |
| &nbsp;&nbsp;[Usage Reports](meshcloud.project-metering.md#tenant-usage-report) | &#10003; | &#10003; |
| [Customer&nbsp;Projects](meshcloud.project.md#manage-meshprojects) | &#10003; | |
| &nbsp;&nbsp;[Create&nbsp;Project](meshcloud.project.md#create-a-new-meshproject) | &#10003; | |
| &nbsp;&nbsp;[Edit&nbsp;Project](meshcloud.project.md#manage-meshprojects) | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Project&nbsp;Locations](meshcloud.project.md#add-remove-locations-from-a-meshproject) | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Payment&nbsp;Information](meshcloud.project.md#provide-payment-information-for-meshproject) | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Manage&nbsp;Users](meshcloud.project.md#user-management-on-a-meshproject) | &#10003; | |
| &nbsp;&nbsp;[Expired&nbsp;Access](meshcloud.project.md#expiry-of-a-user-assignment) | &#10003; | |
| &nbsp;&nbsp;[Project&nbsp;Statements](meshcloud.project-metering.md#project-statement) | &#10003; | |
| &nbsp;&nbsp;[Delete&nbsp;Project](meshcloud.project.md#delete-a-meshproject) | &#10003; | |
| [Customer&nbsp;Users](meshcloud.customer.md) | &#10003; | |
| &nbsp;&nbsp;[Invite&nbsp;User](meshcloud.customer.md#invite-users-to-access-a-meshcustomer) | &#10003; | |
| &nbsp;&nbsp;[Edit&nbsp;User&nbsp;Group](meshcloud.customer.md#manage-groups-of-assigned-users) | &#10003; | |
| &nbsp;&nbsp;[Remove&nbsp;User](meshcloud.customer.md#remove-users-from-a-meshcustomer) | &#10003; | |
| [Customer&nbsp;Settings](meshcloud.customer.md#customer-settings) | &#10003; | |
| [Company&nbsp;Address](meshcloud.project-metering.md#company-billing-addresses) | &#10003; | |
| [Billing&nbsp;Address](meshcloud.project-metering.md#company-billing-addresses) | &#10003; | |
| [Payment&nbsp;Methods](meshcloud.project-metering.md#payment-methods) | &#10003; | |
| Domains | &#10003; | |
| [Marketplace&nbsp;Development](meshstack.meshmarketplace.development.md) | &#10003; | |
| &nbsp;&nbsp;[Service&nbsp;Broker](meshstack.meshmarketplace.development.md#how-to-use-it) | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Publish Service Broker](meshstack.meshmarketplace.development.md#publish-your-service-broker) | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Analytics](meshstack.meshmarketplace.development.md#debugging-your-service-broker) | &#10003; | |
| &nbsp;&nbsp;&nbsp;Failed&nbsp;Instances | &#10003; | |

> The roles that are available for Partner and Admin customers are described in the [Administration](administration.index.md) section.

meshCustomer roles grant rights in meshStack only. In order to access cloud resources users need to be [granted a role on a meshProject](meshcloud.project.md#user-management-on-a-meshproject).

## Change or Remove assigned meshCustomer Roles

If you would like to remove a user from your meshCustomer go to your "Account" settings and select "Users". If the user already accepted the invitation, you can click the "trash" icon in the "Users" section to remove the user from your meshCustomer. If a user has already received an invitation before, but never claimed it, click the "trash" icon in the Pending Invitations section. When removing the user on the meshCustomer, the user is automatically removed from all projects he had access to. He also won't be able to access cloud resources of your projects anymore. The user will be informed via email, that his access to the meshCustomer was revoked.
