---
id: meshcloud.project
title: meshProject
---

meshProjects are multi-cloud enabled projects that allow teams to manage and scale cloud resources across all [meshPlatforms](meshcloud.platform-location.md) made available to their [meshCustomer](meshcloud.customer.md).

> Only users with the role [Customer Admin](meshcloud.customer.md#meshCustomer-roles) have access to the administrative functionality described in this section.

## Create a new meshProject

Log on to the Meshpanel with your account credentials and press `Create`. Type in a name for your new project and press `Next`. Choose a payment method as well as your billing address and press `Next` again. In the last step, you can choose the locations from which you can obtain the cloud computing resources for your project. Press `Create Project` and you will see your new project listed in the Projects List.

## Manage meshProjects

In your **Account** section under **Projects** all meshProjects of your meshCustomer are listed. You find the **Account** section by pressing the settings icon on the top right of the mesPanel. You can execute administrative actions on your meshProjects from the **Projects** section. To edit a project, click the **pen** icon in the **Actions** column of the meshProject list. You can edit the assigned locations, payment information and the assigned users of the project.

The following diagram shows how access rights and project [replication](./meshcloud.tenant.md) result in the correct project access for your users.

![Project User Role Replication](assets/project-user-roles.png)

Projects have a representation in each cloud platform that we call [meshTenant](./meshcloud.tenant.md). Azure Subscriptions, AWS Accounts and Cloud Foundry Spaces are all examples of Tenants. Each meshProject can have at most one Tenant in cloud platforms enabled for the project.
meshcloud uses orchestration to ensure users assigned to a meshProject always have the same role on all Tenants associated with the Project.

### Adding meshPlatforms

The edit screen of a project shows the list of all [meshPlatforms](meshcloud.platform-location.md) grouped by location. Via the dropdown, new meshPlatforms can be added to the project. They will be added to the project when clicking the `+` button. Depending on the configuration of the [meshPlatform](meshcloud.platform-location.md), users may also have to select a [Landing Zone](meshcloud.landing-zones.md) for this platform.

When adding a [meshPlatform](meshcloud.platform-location.md) to a meshProject, meshStack creates a representation of the meshProject for that meshPlatform. This representation is called a [meshTenant](meshcloud.tenant.md) and is an isolated cloud environment e.g. an AWS Account, Azure Subscription or Cloud Foundry Space.

[meshPlatforms](meshcloud.platform-location.md) can also be removed from the project with some limitations. All resources in the [meshTenant](meshcloud.tenant.md) (i.e. OpenStack instances, Cloud Foundry Apps, etc.) have to be deleted manually before removing a meshPlatform.

### Editing Payment and Project Settings

You can configure one or multiple [payment methods](meshcloud.project-metering.md#payment-methods) and [billing addresses](meshcloud.project-metering.md#company-billing-addresses) for you meshCustomer. For a meshProject you have to select a specific one, so the project resources can be billed via a specific payment method and to a specific billing address.

Depending on the configuration of your meshStack implementation, you may be able to edit additional project [metadata tags](./meshcloud.tag-schema.md) here.

## User Management on a meshProject

Before being able to assign a user to a meshProject, the user must have been [invited to the Meshcustomer](meshcloud.customer.md). In the **Project Users** section of the project edit screen all users of the project are listed and new ones can be added. When adding/changing or removing a user, the user will be informed via email about this change of access rights he has.
While adding or updating a user on a project they exists the option to set an expiry date. All expired and soon expired users will be listed under projects/expired access.
Soon expired access (expiry date < 7 days) will be highlighted with **yellow** and expired access will be highlighted with **red**.

If [4-eye-principle](meshstack.authorization.md#user-project-role-approval) is activated in your meshStack installation, an additional approval might be necessary, before a user is actually assigned/remove/updated on a project.

### Assign user to a meshProject

In the **Project Users** section you can find a type-ahead `email` field at the bottom. You can start typing the email address of a user assigned to your Meshcustomer and select the according user in the dropdown. Also select a project role for the user. Press the `+` to actually add this user to the project. Note that only users with a valid account on the Meshpanel can access your projects.

### Project Roles

Project roles grant users a configured set of permissions in cloud platforms used by the project. Project roles can be configured according to exisiting requirements or policies, by default the following roles are used:

- **Project Reader**: A read-only user, like a controller or similar.
- **Project User**: A default user, like a developer, who can manage resources in the cloud platform.
- **Project Admin**: An admin user, who can also change configurations of the project in the cloud platform.

### Update Project Role

You can change the Project Role of a user, by choosing a different role for the user in the dropdown at the **Project Users** section, and clicking the **disc** icon afterwards to save the change.

### Expiry of a user assignment

An expiry date can be set for a user assignment to a project. When this expiry date is reached, access to the project will be revoked for this user. An expiry date
can be set directly when assigning a user to the project. It can also be updated any time.

Customer Admins are informed about project role assignments that will expire soon via dashboard notifications on the my project screen and in the Account Dashboard.
Via "Projects" -> "Expired Access", the expired or soon to expire role assignments are listed and can be extended.

### Unassign user from a meshProject

In the **Project Users** section you can click the `-` button in the row of a user to remove the user from the project. This user will not be able to access this project in Meshportal and the cloud platforms anymore. You can add the user to your project again later on and he will get access again.

## Delete a meshProject

If you would like to delete a project which is no longer used, go to your **Account** settings. Navigate to **Projects** and click the button with the trash icon. The system now checks whether any resources still exist for your project. If there are existing resources, you will be informed about which resources still exist. As deletion of a project is an irrevocable action, you cannot delete projects with resources. You have to delete those resources manually before to be sure that you really want to delete these resources that may contain production relevant workloads. When no resources exist anymore you have to confirm the deletion by entering the identifier of your project again. The actual project deletion in the platforms will be done in the background and may take a while.
