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

### Management Group

All newly created meshProjects get their corresponding Subscription assigned to this [Management Group](https://azure.microsoft.com/en-us/features/management-groups/). The Management Group can be configured by an platform operator throughout the Azure portal.

### Blueprint Name

The name of the [Blueprint](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) which should get assigned to the project. You can leave it empty, then no Blueprint will get automatically assigned.

### Blueprint Management Group

Blueprints must reside inside a Management Group. It is assumed it is in the same group as the group where to put the Subscriptions by default. If the Blueprint is located in another group it can be configuered here.

Operators must ensure to create these management groups in the meshcloud AAD Tenant before configuring them
for use in a Landing Zone.

The following parameter can be used in the Blueprint:

| Parameter          | Description                                        |
| ------------------ | :------------------------------------------------- |
| customerIdentifier | Customer Identifier                                |
| costcenter         | ID of the CostCenter defined for this meshProject. |
| projectIdentifier  | The project identifier                             |

### Max. Auto Upgrade Blueprint Version

Blueprints are versioned in Azure and can be managed via the Azure Portal. To avoid the accidental assignment of new (and possibly faulty) Blueprints there is this `Max. Auto Upgrade Blueprint Version` field. If you enter a version identifier here which corresponds to a existing Blueprint version in the Azure portal:

* Existing projects with this Landing Zone will get their Blueprint updated to this version on the next replication
* Newly created projects will get the latest Blueprint version assigned (possibly higher then the version configured here)

### Azure Function

Assign a Azure function to the landing zone configuration to trigger a small piece of code in the cloud. Currently this function is invoked via a `POST` request and carries parameter, similiar to the ones in the Blueprint via HTTP header values.

The following HTTP headers are provided to the Azure Function:

| HTTP Header Name           | Description                                        |
| -------------------------- | :------------------------------------------------- |
| x-mesh-customer-identifier | Customer Identifier                                |
| x-mesh-costcenter          | ID of the CostCenter defined for this meshProject. |
| x-mesh-project-identifier  | The project identifier                             |

