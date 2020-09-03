---
id: meshcloud.project
title: meshProject
---

meshProjects are multi-cloud enabled projects that allow teams to manage and scale cloud resources across all [meshPlatforms](meshcloud.platform-location.md) made available to their [meshCustomer](meshcloud.customer.md).

> Only users or users of [group](meshcloud.customer.md#user-groups) with the role [Customer Admin](meshcloud.customer.md#assign-meshcustomer-roles) have access to the administrative functionality described in this section.

## Create a new meshProject

Log on to the Meshpanel with your account credentials and press `Create`. Type in a name for your new project and press `Next`. Choose a payment method as well as your billing address and press `Next` again. In the last step, you can choose the locations from which you can obtain the cloud computing resources for your project. Press `Create Project` and you will see your new project listed in the Projects List.

## Manage meshProjects

In your **Account** section under **Projects** all meshProjects of your meshCustomer are listed. You find the **Account** section by pressing the settings icon on the top right of the meshPanel. You can execute administrative actions on your meshProjects from the **Projects** section. To edit a project, click the **pen** icon in the **Actions** column of the meshProject list. You can edit the assigned locations, payment information and the assigned users and groups of the project.

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

You also have the option of setting a substitute payment method on a project. This feature is enabled via a configuration in meshStack. A job that runs daily will check if the already assigned payment method is expired and if it is, will replace it with the substitute payment method. In that case, the substitute payment will be set to `None`.

Depending on the configuration of your meshStack implementation, you may be able to edit additional project [metadata tags](./meshcloud.tag-schema.md) here.

## Access Control on a meshProject

Before being able to assign a user or [user groups](meshcloud.customer.md#user-groups) to a meshProject, the user or group must have been [invited to the meshCustomer](meshcloud.customer.md#invite-users-to-a-meshcustomer-team). By adding a group, all users of this group will be provided access to the meshProject. In the **Project Access** section of the project edit screen all users and groups of the project are listed and new ones can be added. When adding/changing or removing a user or a group, all users and members will be informed via email about this change of access rights they have.
While adding users or groups or updating roles on a project an expiration date can be set. All expired and soon expired roles will be listed under projects/expired access.
Soon expired access (expiration date < 7 days) will be highlighted with **yellow** and expired access will be highlighted with **red**.

If [4-eye-principle](meshstack.authorization.md#user-project-role-approval) is activated in your meshStack installation, an additional approval might be necessary, before a user or group is actually assigned/remove/updated on a project.

### Assign user to a meshProject

In the **Project Access Control** section you can find a type-ahead `Search for a customer user or group` field at the bottom. You search for users via their first and last name, email address and username. Groups can be found via their group name and identifier. You have to select the user or group you want to assign in the dropdown. Also select a project role. Press the `+` to add the user or group to the project. Note that only users with a valid account on the meshPanel can access your projects. You can assign multiple project roles to a user or a group on the same project.

### Project Roles

Project roles grant a configured set of permissions in cloud platforms used by the project. Project roles can be configured according to exisiting requirements or policies, by default the following roles are used:

- **Project Reader**: A read-only user, like a controller or similar.
- **Project User**: A default user, like a developer, who can manage resources in the cloud platform.
- **Project Admin**: An admin user, who can also change configurations of the project in the cloud platform.

### Update Project Role

You can change the Project Role, by choosing a different role in the dropdown at the **Project Access** section, and clicking the **disc** icon afterwards to save the change.

### Expiration of a user or group assignment

An expiration date can be set for an assignment to a project. When this expiration date is reached, access to the project will be revoked. An expiration date can be set directly when assigning a user or group to the project. It can also be updated any time.

Customer Admins are informed about project role assignments that will expire soon via dashboard notifications on the my project screen and in the Account Dashboard.
Via "Projects" -> "Expired Access", the expired or soon to expire role assignments are listed and can be extended.

### Unassign user or group from a meshProject

In the **Project Access** section you can click the `-` button in the row of a user or group to remove them from the project. The users and memebers will not be able to access this project in meshPortal and the cloud platforms anymore. You can add the user or group to your project again later on and all related users will get access again.

## Delete a meshProject

If you would like to delete a project which is no longer used, go to your **Account** settings. Navigate to **Projects** and click the button with the trash icon.

When you want to delete a meshProject it is not completely removed in the cloud platforms and in the database, only flagged for deletion.

The deletion procedure depends on the variaty of meshTenants under the project:

1. a project contains exclusively tenants where we don't support automatic deletion (AWS, GCP, Azure, Kubernetes,OpenShift)
2. a project contains exclusively OpenStack, Cloud Foundry and Marketplace meshTenants
3. a project contains a project containing a combination of 1. and 2.

**1. No automatic deletion**: Following platform doesn't support automatic deletion:

- AWS
- GCP
- Azure
- Kubernetes
- Openshift

 If the project contains tenants on which an operator will have to perform manual deletion actions in the respective platform, you can provide operators with a reason for the deletion. The reason field is currently limited to 255 characters. The reason for deletion will be shown to the operator when they perform the required deletion actions. Manual deletion performed by a partner user is necessary for above mentioned cloud tenants.
 After performing the resource deletion you have to confirm the deletion by entering the identifier of your project. The actual project deletion in the platforms will be done in the background and may take a while. Once you confirm the deletion, all users will be removed from the meshProject, and they will not be able to access the connected platform tenants or the related cloud resources anymore.

If a meshProject contains meshTenants of the above mentioned cloud platform, a partner or platform operator will have to perform the deletion of those platform tenants manually in the respective platform.

**2. OpenStack, Cloud Foundry and Marketplace meshTenants**: The system will perform a check to see if any resources exist in the tenants of the project being deleted. This check is currently implemented only for OpenStack and Cloud Foundry platforms. If resources do exist in any of those platform tenants, you will be informed about them. You have to manually delete those resources and any other resources in the scope of your project that may exist in other platform tenants where the resource check is not implemented. Once you have performed the manual resource deletion, you can confirm the project deletion by entering the identifier of your project. An asynchronous background job removes tenants from platforms regularly.

**3. Combination of meshTenants**: If a projects contains a combination of tenants from 1. and 2. the tenants which dont require manual deletion are deleted automatically. For the other tenants the manual deletion step is necessary.

