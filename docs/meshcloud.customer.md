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
and any additional [metadata specific to your organization](meshstack.metadata-tags.md#customer-tag-schema).

## Customer Settings

General information of a meshCustomer (like its name) and [Customer Tags](meshstack.metadata-tags.md#customer-tag-schema) can be edited here. The customer identifier is also shown here, but it can never be changed, as it is used as an immutable identifier of the meshCustomer for its representation in the different cloud platforms.

Depending on the configuration of your meshStack implementation, you may be able to edit additional customer [metadata tags](./meshcloud.metadata-tags.md) here.

## Invite users to a meshCustomer team

If you would like to give others access to your meshCustomer and the related meshProjects, go to your "Account" settings.
You can access them by pressing the settings icon on the top right of the meshPanel.
From here, navigate to "Access Control". Here you can invite users or groups to the meshCustomer.
You can search for users via first & last name, email and username. The users that can be found via
this search depend on the configured IAM system in you meshInstallation. It is e.g. possible to search for users in an Active Directory or a Google Cloud Directory. Additionally all users already known to meshStack can be found via this user search. Besides users, also [groups](#user-groups) can be searched for. You can search for groups via their name and identifier.

If you want to invite a user that it is not known to the connected IAM system and meshStack, you are able to invite a user by providing
the first and last name as well as an email address. The invited user will be matched via the email address when he logs in the first time to meshStack.
The "invite user" link is available when the search did not return any results.

You can initially setup the meshCustomer role in the dropdown which describes the access level of the invited user or group.
Press "+" to add to the meshCustomer. All users and members of the group will receive an email with the information,
that they have been granted access to your meshCustomer.

Assigning a meshCustomer role is necessary in order to give access to [meshProjects](meshcloud.project.md) insight the meshCustomer.
If 4 eyes-principle is active, the user or group will not be assigned directly to your meshCustomer. Another Customer Admin has to approve this role assignment first. Therefore the user or group will appear in the "Pending Requests" section.

## User Groups

For not having to assign multiple users individually to your projects, you can also group them in a user group. The user group is only available inside your meshCustomer. User groups can be assigned roles on a [meshCustomer](#invite-users-to-a-meshcustomer-team) and a [meshProject](meshcloud.project.md#access-anagement-on-a-meshproject) in the same way as for usual users.

You can view user groups within your customer account by going to the **Groups** section in the **Account** area.
Currently, creating a group is only supported via [meshObject API](meshstack.api.md).

## Assign meshCustomer Roles

You can change the role assigned to each user or group on the current meshCustomer.
To change the assigned role choose a new role from the dropdown and save the changes via the disc icon.

A user or a group can be assigned multiple roles simultaneously. All users and members will receive the combined rights of all their assigned roles.

The following roles are available:

- **Customer Owner**: Has full access to the meshCustomer and its projects and can manage access to the meshCustomer account. A user that has this role will be the contact person for any matters related to the meshCustomer. There can be maximum two Customer Owners in a meshCustomer. If a Customer Owner already exists, that Customer Owner can assign the Customer Owner role to another user. If a Customer Owner doesn't exist, the Customer Admins can assign a Customer Owner.
- **Customer Admin**: Has full access to the meshCustomer and its projects and can manage access to the meshCustomer account.
- **Customer Employee**: Has full access to project resources, but **cannot** manage access, create projects, etc of the meshCustomer account.

### meshCustomer Roles

The following table provides details about the functionality available to the different roles.

|                       | Customer Owner | Customer Admin | Customer Employee |
| --------------------- | :---: | :---: | :---: |
| [Project&nbsp;Resources](meshcloud.project-resources.md) | &#10003; | &#10003; | &#10003; |
| &nbsp;&nbsp;[Project&nbsp;Dashboard](meshcloud.project-resources.md#project-dashboard) | &#10003; | &#10003; | &#10003; |
| &nbsp;&nbsp;[Project&nbsp;Platform&nbsp;Dashboard](meshcloud.project-resources.md#project-platform-dashboard) | &#10003; | &#10003; | &#10003; |
| &nbsp;&nbsp;[Service&nbsp;User](meshcloud.service-user.md) | &#10003; | &#10003; | &#10003; |
| &nbsp;&nbsp;[Usage Reports](meshcloud.project-metering.md#tenant-usage-report) | &#10003; | &#10003; | &#10003; |
| [Customer&nbsp;Projects](meshcloud.project.md#manage-meshprojects) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Create&nbsp;Project](meshcloud.project.md#create-a-new-meshproject) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Edit&nbsp;Project](meshcloud.project.md#manage-meshprojects) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Project&nbsp;Locations](meshcloud.project.md#add-remove-locations-from-a-meshproject) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Payment&nbsp;Information](meshcloud.project.md#provide-payment-information-for-meshproject) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Access&nbsp;Control](meshcloud.project.md#access-control-on-a-meshproject) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assign&nbsp;Customer&nbsp;Owner | &#10003; | | |
| &nbsp;&nbsp;[Expired&nbsp;Access](meshcloud.project.md#expiration-of-a-principal-assignment) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Project&nbsp;Statements](meshcloud.project-metering.md#project-statement) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Delete&nbsp;Project](meshcloud.project.md#delete-a-meshproject) | &#10003; | &#10003; | |
| [Customer&nbsp;Users](meshcloud.customer.md) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Give&nbsp;Access](meshcloud.customer.md#invite-users-to-a-meshcustomer-team) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Edit&nbsp;Access](meshcloud.customer.md#assign-meshcustomer-roles) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Remove&nbsp;Access](meshcloud.customer.md#remove-assigned-meshcustomer-roles) | &#10003; | &#10003; | |
| [Customer&nbsp;User&nbsp;Groups](meshcloud.customer.md#user-groups) | &#10003; | &#10003; | |
| [Customer&nbsp;Settings](meshcloud.customer.md#customer-settings) | &#10003; | &#10003; | |
| [Company&nbsp;Address](meshcloud.project-metering.md#company-billing-addresses) | &#10003; | &#10003; | |
| [Billing&nbsp;Address](meshcloud.project-metering.md#company-billing-addresses) | &#10003; | &#10003; | |
| [Payment&nbsp;Methods](meshcloud.payment-methods.md) | &#10003; | &#10003; | |
| Domains | &#10003; | &#10003; | |
| [Marketplace&nbsp;Development](meshstack.meshmarketplace.development.md) | &#10003; | &#10003; | |
| &nbsp;&nbsp;[Service&nbsp;Broker](meshstack.meshmarketplace.development.md#how-to-use-it) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Publish Service Broker](meshstack.meshmarketplace.development.md#publish-your-service-broker) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;&nbsp;[Analytics](meshstack.meshmarketplace.development.md#debugging-your-service-broker) | &#10003; | &#10003; | |
| &nbsp;&nbsp;&nbsp;Failed&nbsp;Instances | &#10003; | &#10003; | |

> The roles that are available for Partner and Admin customers are described in the [Administration](administration.index.md) section.

meshCustomer roles grant rights in meshStack only. In order to access cloud resources users need to be [granted a role on a meshProject](meshcloud.project.md#access-control-on-a-meshproject).

## Remove assigned meshCustomer Roles

If you would like to remove a user or group from your meshCustomer go to your "Account" settings and select "Customer Access". You can click the "trash" icon in the "Customer Access" section to remove the user or group from your meshCustomer. If 4-AP is active in your meshInstallation and the role request has not been approved by another Customer Admin yet, click the "trash" icon in the Pending Role Requests section. When removing someone from the meshCustomer, the user or group is automatically removed from all projects it had access to. All users won't be able to access cloud resources of your projects anymore, if they are not assigned via another role binding anymore. The users or members of the group will be informed via email, that their access to the meshCustomer was revoked.

## Customer Deletion

Before a meshCustomer may be deleted, a check is performed to verify the following:

- all meshProjects in the meshCustomer have been deleted. This means, that they are not only [marked for deletion](meshcloud.project.md#delete-a-meshproject), but that they have [actually been deleted](administration.projects.md#delete-projects) in the platforms.
- all published Service Brokers in the meshCustomer have been [deactivated](meshstack.meshmarketplace.development.md#deactivation-of-service-brokers)
- the meshCustomer is not a meshPartner. Deletion of meshPartners is not supported.

The deletion can be performed only by the Customer Owners! You can find the "Delete" button on the "General" screen in the Customer Area. You will be asked for confirmation and a deletion reason when you click the button.

The following steps will be done during deletion:

- all assigned users & groups as well as pending binding requests will be removed from the meshCustomer
- all payment methods on the meshCustomer will be soft-deleted, so meshPartners can still get details like info on usage of these payment methods
- all policy violations related to the deleted meshCustomer will be removed
- a "deleted" event is written to the customer events, including a reason that was provided during deletion

meshCustomers are soft-deleted, so meshPartners can still see deleted meshCustomers and their events in the Admin Area. Deleted meshCustomers and meshPaymentMethods will be highlighted by a "Deleted" label.
