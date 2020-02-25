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

Operators must ensure to create these management groups in the meshcloud AAD Tenant before configuring them for use in a Landing Zone.

The following parameter can be used in the Blueprint:

| Parameter          | Description                                                       |
| ------------------ | :---------------------------------------------------------------- |
| customerIdentifier | Customer Identifier                                               |
| costcenter         | ID of the CostCenter defined for this meshProject.                |
| projectIdentifier  | The project identifier                                            |
| subscriptionId     | The ID of the Azure Subscription associated with this meshProject |

**Please Note:** that there are a few shortcomings when dealing with Azure parameters. Resource Group names and locations can not be directly parametrized as their format of reporting missing parameters is not compatible with the replicator.

When parameter are marked as a static parameter in the Azure Panel, then they are not reported as missing parameters during project replication by the Azure API and thus can not be replaced anymore. This means a replaceable parameter should never be marked as static in the Azure Blueprint panel.

<figure>
  <img src="assets/azure-static-param.png" alt="Static Parameter usage in Azure Blueprint Panel">
  <figcaption>Static Parameter usage in Azure Blueprint Panel</figcaption>
</figure>

#### Max. Auto Upgrade Blueprint Version

Blueprints are versioned in Azure and can be managed via the Azure Portal. To avoid the accidental assignment of new (and possibly faulty) Blueprints there is this `Max. Auto Upgrade Blueprint Version` field. If you enter a version identifier here which corresponds to a existing Blueprint version in the Azure portal:

* Existing projects with this Landing Zone will get their Blueprint updated to this version on the next [replication](./meshcloud.tenant.md)
* Newly created projects will get the latest Blueprint version assigned (possibly higher then the version configured here)

### Azure Function

Assign a Azure function to the landing zone configuration to trigger a small piece of code in the cloud. Currently this function is invoked via a `POST` request and carries parameter, similiar to the ones in the Blueprint via HTTP header values.

The following HTTP headers are provided to the Azure Function:

| HTTP Header Name           | Description                                                       |
| -------------------------- | :---------------------------------------------------------------- |
| x-mesh-customer-identifier | Customer Identifier                                               |
| x-mesh-costcenter          | ID of the CostCenter defined for this meshProject.                |
| x-mesh-project-identifier  | The project identifier                                            |
| x-mesh-subscription-id     | The ID of the Azure Subscription associated with this meshProject |

#### Azure Function Scope

To securely call an Azure Function, meshcloud uses Microsoft's [App Authentication](https://docs.microsoft.com/en-us/azure/app-service/app-service-authentication-how-to) feature (available to Azure Premium Functions only). This means that behind the scenes meshcloud is fetching a JWT token uniquely scoped to your function and passes it during the Azure Function call. In order for meshcloud to fetch the right token it needs to know the unique ID of the Azure Enterprise Application your function belongs to. You can obtain this token by navigating to your function -> `Platform Features` -> `Authentication / Authorization` -> `Azure Active Directory` -> field `Client ID`.
