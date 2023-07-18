---
id: meshcloud.workspace
title: meshWorkspace
---

A meshWorkspace usually represents a product team or department in your organization. Self-service within a meshWorkspace
allows you to invite and manage team members, create [meshProjects](meshcloud.project.md) and maintain organizational metadata like payment methods.

## Workspace Creation

Organizations implementing meshStack can choose to offer self-service workspace registration via meshPanel or externalize
the process to some existing ITSM or process automation system. Operators can read more about these options [here](meshstack.onboarding.md#workspace-registration).

In any case, the meshWorkspace creation process always involves collecting basic workspace information like name, identifier
and any additional [metadata specific to your organization](meshstack.metadata-tags.md#workspace-tag-schema).

## Managing your meshWorkspace

Every aspect of your meshWorkspace can be managed in the so-called [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace). The workspace control plane is the highest control plane. From that level, you can navigate to various control planes like the [project control plane](./meshcloud.project-resources.md#project-control-plane) or the [tenant control plane](./meshcloud.project-resources.md#tenant-control-plane). Each control plane has a similar scheme. Depending on your permissions within the workspace and the meshStack configuration, you will have access to different tabs like **Settings** or **Financials**. The workspace control plane below shows the control plane from the perspective of a Customer Admin.

![Workspace Control Plane User Interface](assets/workspace-control-plane.png)

General information of a meshWorkspace (like its name) and [Workspace Tags](meshstack.metadata-tags.md#workspace-tag-schema) can be edited under the **Settings** tab.
The workspace identifier is also shown here, but it can never be changed,
as it is used as an immutable identifier of the meshWorkspace for its
representation in the different cloud platforms. You are however able to change the display name of the meshWorkspace.

If configured by your Cloud Foundation team, you may also be able to edit additional workspace [metadata tags](./meshcloud.metadata-tags.md) in the Settings Tab.

## Invite users to a meshWorkspace team

If you would like to give others access to your meshWorkspace and the related meshProjects, go to your **Access Control** tab.
You can access them by pressing the settings icon on the top right of the meshPanel.
From here, navigate to **Access Control**. Here you can invite users or groups to the meshWorkspace.
You can search for users via first & last name, email and username. The users that can be found via
this search depend on the configured IAM system in you meshInstallation. It is e.g. possible to search for users in an Active Directory or a Google Cloud Directory. Additionally all users already known to meshStack can be found via this user search. Besides users, also [groups](#user-groups) can be searched for. You can search for groups via their name and identifier.

If you want to invite a user that it is not known to the connected IAM system and meshStack, you are able to invite a user by providing
the first and last name as well as an email address. The invited user will be matched via the email address when he logs in the first time to meshStack.
The "invite user" link is available when the search did not return any results.

You can initially setup the meshWorkspace role in the dropdown which describes the access level of the invited user or group.
Press "+" to add to the meshWorkspace. All users and members of the group will receive an email with the information,
that they have been granted access to your meshWorkspace.

Assigning a meshWorkspace role is necessary in order to give access to [meshProjects](meshcloud.project.md) insight the meshWorkspace.
If 4 eyes-principle is active, the user or group will not be assigned directly to your meshWorkspace. Another Customer Admin has to approve this role assignment first. Therefore the user or group will appear in the "Pending Requests" section.

## User Groups

For not having to assign multiple users individually to your projects, you can also group them in a user group. The user group is only available inside your meshWorkspace. User groups can be assigned roles on a [meshWorkspace](#invite-users-to-a-meshworkspace-team) and a [meshProject](meshcloud.project.md#access-control-on-a-meshproject) in the same way as for usual users.

You can view user groups within your workspace by going to the **Groups** section in the **Access Control** tab.
Currently, creating a group is only supported via [meshObject API](meshstack.api.md).

## Assign meshWorkspace Roles

You can change the role assigned to each user or group on the current meshWorkspace.
To change the assigned role choose a new role from the dropdown.

A user or a group can be assigned multiple roles simultaneously. All users and members will receive the combined rights of all their assigned roles.

The following roles are available:

- **Customer Owner**: Has full access to the meshWorkspace and its projects and can manage access to the meshWorkspace. A user that has this role will be the contact person for any matters related to the meshWorkspace. There can be maximum two Customer Owners in a meshWorkspace. If a Customer Owner already exists, that Customer Owner can assign the Customer Owner role to another user. If a Customer Owner doesn't exist, the Customer Admins can assign a Customer Owner.
- **Customer Admin**: Has full access to the meshWorkspace and its projects and can manage access to the meshWorkspace.
- **Customer Employee**: Has full access to project resources, but **cannot** manage access, create projects, etc. of the meshWorkspace.

### meshWorkspace Roles

The following table provides details about the functionality available to the different roles.

|                                                                                                                        | Customer Owner | Customer Admin | Customer Employee |
| ---------------------------------------------------------------------------------------------------------------------- | :------------: | :------------: |:----------------:|
| [Project&nbsp;Resources](meshcloud.project-resources.md)                                                               |    &#10003;    |    &#10003;    |     &#10003;     |
| &nbsp;&nbsp;[Project&nbsp;Control&nbsp;Plane](meshcloud.project-resources.md#project-control-plane)                    |    &#10003;    |    &#10003;    |     &#10003;     |
| &nbsp;&nbsp;[Tenant&nbsp;Control&nbsp;Plane](meshcloud.project-resources.md#tenant-control-plane)                      |    &#10003;    |    &#10003;    |     &#10003;     |
| &nbsp;&nbsp;[Service&nbsp;User](meshcloud.service-user.md)                                                             |    &#10003;    |    &#10003;    |     &#10003;     |
| &nbsp;&nbsp;[Usage Reports](meshcloud.project-metering.md#tenant-usage-report)                                         |    &#10003;    |    &#10003;    |     &#10003;     |
| [Workspace&nbsp;Projects](meshcloud.project.md#manage-meshprojects)                                                     |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Create&nbsp;Project](meshcloud.project.md#create-a-new-meshproject)                                       |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Edit&nbsp;Project](meshcloud.project.md#manage-meshprojects)                                              |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;&nbsp;[Add&nbsp;meshTenants](meshcloud.project.md#adding-meshtenants)                                |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;&nbsp;[Payment&nbsp;Information](meshcloud.project.md#provide-payment-information-for-meshproject)   |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;&nbsp;[Access&nbsp;Control](meshcloud.project.md#access-control-on-a-meshproject)                    |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Assign&nbsp;Workspace&nbsp;Owner](#assign-meshworkspace-roles)                            |    &#10003;    |                |                  |
| &nbsp;&nbsp;[Expired&nbsp;Access](meshcloud.project.md#expiration-of-a-principal-assignment)                           |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Project&nbsp;Statements](meshcloud.project-metering.md#project-statement)                                 |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Delete&nbsp;Project](meshcloud.project.md#delete-a-meshproject)                                           |    &#10003;    |    &#10003;    |                  |
| [Workspace&nbsp;Users](meshcloud.workspace.md)                                                                           |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Give&nbsp;Access](meshcloud.workspace.md#invite-users-to-a-meshworkspace-team)                              |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Edit&nbsp;Access](meshcloud.workspace.md#assign-meshworkspace-roles)                                        |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Remove&nbsp;Access](meshcloud.workspace.md#remove-assigned-meshworkspace-roles)                             |    &#10003;    |    &#10003;    |                  |
| [Workspace&nbsp;User&nbsp;Groups](meshcloud.workspace.md#user-groups)                                                    |    &#10003;    |    &#10003;    |                  |
| [Workspace&nbsp;Settings](#workspace-deletion)                                                                           |    &#10003;    |    &#10003;    |                  |
| [Payment&nbsp;Methods](meshcloud.payment-methods.md)                                                                   |    &#10003;    |    &#10003;    |                  |
| Domains                                                                                                                |    &#10003;    |    &#10003;    |                  |
| [Marketplace&nbsp;Development](meshstack.meshmarketplace.development.md)                                               |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;[Service&nbsp;Broker](meshstack.meshmarketplace.development.md#how-to-use-it)                              |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;&nbsp;[Publish Service Broker](meshstack.meshmarketplace.development.md#publish-your-service-broker) |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;&nbsp;[Analytics](meshstack.meshmarketplace.development.md#debugging-your-service-broker)            |    &#10003;    |    &#10003;    |                  |
| &nbsp;&nbsp;&nbsp;Failed&nbsp;Instances                                                                                |    &#10003;    |    &#10003;    |                  |

> The roles that are available for Partner and Admin workspaces are described in the [Administration](administration.index.md) section.

meshWorkspace roles grant rights in meshStack only. In order to access cloud resources users need to be [granted a role on a meshProject](meshcloud.project.md#access-control-on-a-meshproject).

## Remove assigned meshWorkspace Roles

If you would like to remove a user or group from your meshWorkspace go to the **Access Control** tab and select **Current Access**. You can click the "trash" icon in the **Current Access** section to remove the user or group from your meshWorkspace. If 4-AP is active in your meshInstallation and the role request has not been approved by another Customer Admin yet, click the "trash" icon in the "Access Requests" section. When removing someone from the meshWorkspace, the user or group is automatically removed from all projects it has access to. All users won't be able to access cloud resources of your projects anymore, if they are not assigned via another role binding anymore. The users or members of the group will be informed via email, that their access to the meshWorkspace was revoked.

## Workspace Deletion

Before a meshWorkspace may be deleted, a check is performed to verify the following:

- all meshProjects in the meshWorkspace have been deleted
- all published Service Brokers in the meshWorkspace have been [deactivated](meshstack.meshmarketplace.development.md#deactivation-of-service-brokers)

The deletion can be performed only by the Customer Owners! You can delete the workspace under **Deletion** in the workspace control plane. You will be asked for confirmation and a deletion reason.

Note : The deletion of a workspace can not be reversed!

The following steps will be done during deletion:

- all assigned users & groups as well as pending binding requests will be removed from the meshWorkspace
- all payment methods on the meshWorkspace will be soft-deleted, so meshPartners can still get details like info on usage of these payment methods
- all policy violations related to the deleted meshWorkspace will be removed
- a "deleted" event is written to the workspace events, including a reason that was provided during deletion

meshWorkspaces are soft-deleted, so meshPartners can still see deleted meshWorkspaces and their events in the Admin Area. Deleted meshWorkspaces and meshPaymentMethods will be highlighted by a "Deleted" label.