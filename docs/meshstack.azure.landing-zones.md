---
id: meshstack.azure.landing-zones
title: Landing Zones
---

In Azure, a [Landing Zone](./meshcloud.landing-zones.md) is defined via a management group the subscription for the project will be assigned to. Policies can be applied
to these management groups. Optionally a blueprint can also be defined. Via an Azure Blueprint default resources can be deployed to the
subscription and additional specific policies can be defined. A blueprint can be configured to decline users to change or delete the
resources and policies created by the blueprint.

The [Landing Zone](./meshcloud.landing-zones.md) can be configured in the `Administration` section. If a project is selected to have an Azure location a landingzone must be picked by the user. By choosing a landing zone platform specific configuration can be set (in this case for Azure). The options for Azure are:

## Parameters

Each Landing Zone has paremeters which control its behavior. The available parameters are described below.

### Management Group Assignment

All newly created [meshProjects](./meshcloud.project.md) get their corresponding Subscription assigned to this [Management Group](https://azure.microsoft.com/en-us/features/management-groups/). The Management Group can be configured by an platform operator through the Azure portal or using infrastructure as code.

> Management Groups used in different Azure [Landing Zones](./meshcloud.landing-zones.md) should not overlap or be nested into one another. A flatter Management Group hierarchy is significantly less complex to manage and thereby greatly reduces the risk of security issues through misconfiguration. However, you can nest Landing Zone Management Groups in other Management Groups controlled outside of meshStack to share common policies between landing zones.

### Blueprint Assignment

#### Blueprint Name

The name of the [Blueprint](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) which should get assigned to the project. You can leave it empty, then no Blueprint will get automatically assigned.

#### Blueprint Management Group

Blueprints must reside inside a Management Group. It is assumed it is in the same group as the group where to put the Subscriptions by default. If the Blueprint is located in another group it can be configuered here.

Operators must ensure to create these management groups in the meshcloud AAD Tenant before configuring them for use in a meshLanding Zone.

#### Available Blueprint Parameters

The following parameter can be used in the Blueprint:

| Parameter          | Description                                                                               |
|--------------------|:------------------------------------------------------------------------------------------|
| customerIdentifier | Customer Identifier                                                                       |
| ~~costcenter~~     | ID of the CostCenter defined for this meshProject. (Deprecated. Please use tagCostCenter) |
| projectIdentifier  | The project identifier                                                                    |
| subscriptionId     | The ID of the Azure Subscription associated with this meshProject                         |
| tagCostCenter      | Example for a  [metadata tags](./meshstack.tag-schema.md) named `costCenter`              |

As the example `tagCostCenter` in the above table indicates, any payment settings, project tags or customer tags can also be used in the Blueprints.
The following modifications are applied to metadata tag keys by meshstack before making them available as parameters:

- Parameters are prefixed with `tag`
- First letter of metadata tag key is capitalized

In the example, the value of the tag `costCenter` will be made available via the key `tagCostCenter`.
See [metadata tags](./meshstack.tag-schema.md) for more information.

> If you are planning on converting any of the blueprint parameters into Azure tags, please be aware of the limits and requirements
> that Azure has [described in their docs](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources#limitations).
> 
> Key takeaways here:
> - A resource can have a maximum of 50 tags.
> - The characters < > % & \ ? / are not allowed in tag keys.

**Please Note:** there are some specialities to keep in mind when dealing with Azure parameters. Resource group names and locations can not be parameterised via meshStack.

When parameters are marked as static in the Azure Panel, they can not be replaced or overwritten during replication. Usually default parameter should not be marked as static in the Azure Blueprint panel because doing so prevents their replacement by meshStack specific variables.

<figure>
  <img src="assets/azure-static-param.png" alt="Static Parameter usage in Azure Blueprint Panel">
  <figcaption>Static Parameter usage in Azure Blueprint Panel</figcaption>
</figure>

#### Max. Auto Upgrade Blueprint Version

Blueprints are versioned in Azure and can be managed via the Azure Portal. To avoid the accidental assignment of new (and possibly faulty) Blueprints there is this `Max. Auto Upgrade Blueprint Version` field. If you enter a version identifier here which corresponds to a existing Blueprint version in the Azure portal:

- Existing projects with this Landing Zone will get their Blueprint updated to this version on the next [replication](./meshcloud.tenant.md)
- Newly created projects will get the latest Blueprint version assigned (possibly higher then the version configured here)

#### Use User Assigned Managed Identity (UAMI)

This flag allows you to use a User Assigned Managed Identity (UAMI) instead of the standard System Assigned Managed Identity (SAMI) during the assignment of your blueprint. For more details on their differences, refer to the [Azure Documentation](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview#how-does-the-managed-identities-for-azure-resources-work)).

Currently we only recommend to use this flag if you want to create resources that require permissions outside of the meshcloud managed subscription. A good example is if you want to connect a meshcloud managed subscription to a central log workspace. In order to do this, you require permissions in both the meshcloud managed subscription and the subscription your central Log Workspace App resides in.

**Please note**: meshcloud automatically handles permissions in the subscription the Blueprint is assigned to, but permissions outside of that cannot be handled and have to be setup by yourself.

The following parameters are required:
| Parameter              | Description                                                                                                                                                                                                                                                            |
|------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UAMI Azure Resource ID | Azure Resource ID of the identity; has the following form: `/subscriptions/[subscriptionId]/resourceGroups/[yourRG]/providers/Microsoft.ManagedIdentity/userAssignedIdentities/[userIdentity]`. When opening the UAMI in Azure Portal you can obtain this from the URL |
| UAMI Object ID         | Object ID of the identity; When opening the UAMI in Azure Portal you can obtain this from the `Object ID` field                                                                                                                                                        |



#### Locking Mode

Blueprint assignments are performed with a specific [resource locking mode](https://docs.microsoft.com/en-us/azure/governance/blueprints/concepts/resource-locking) which determines if locked resources managed by Blueprints can be deleted and/or modified.

| Locking Mode            | Description                                                                               |
|-------------------------|:------------------------------------------------------------------------------------------|
| None                    | Resources are not protected                                                               |
| AllResourcesReadOnly    | Locked resource groups are read only and other locked resources can't be modified at all. |
| AllResourcesDoNotDelete | Locked resources can be modifiede but not deleted.                                        |

### meshRole to Platform Role Mapping

The meshProject roles must be mapped to Azure specific roles. You can control this by setting up the meshProject role to Azure group suffix mapping. However depending on your configuration of the [AAD group name generation](./meshstack.azure.index.md#aad-group-name), this setting is used or not.

The Azure Role Definition is the RBAC ID of the Azure role you want to use. You can either create your own roles or use the [predefined global IDs](https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles) from Azure.


### Azure Function

Assign a Azure function to the landing zone configuration to trigger a small piece of code in the cloud. Currently this function is invoked via a `POST` request and carries parameter, similiar to the ones in the Blueprint via HTTP header values.

Please review the [meshStack Landing Zone Http Header interface](./meshstack.tag-schema.md#http-header-interface) for metadata meshStack makes available to Azure Functions.

In addition to the headers referenced above, meshStack provides the following Azure-specific HTTP headers:


| HTTP Header Name           | Description                                                       |
|----------------------------|:------------------------------------------------------------------|
| x-mesh-subscription-id     | The ID of the Azure Subscription associated with this meshProject |


#### Azure Function Scope

To securely call an Azure Function, meshcloud uses Microsoft's [App Authentication](https://docs.microsoft.com/en-us/azure/app-service/app-service-authentication-how-to) feature (available to Azure Premium Functions only). This means that behind the scenes meshcloud is fetching a JWT token uniquely scoped to your function and passes it during the Azure Function call. In order for meshcloud to fetch the right token it needs to know the unique ID of the Azure Enterprise Application your function belongs to. You can obtain this token by navigating to your function -> `Platform Features` -> `Authentication / Authorization` -> `Azure Active Directory` -> field `Client ID`.
