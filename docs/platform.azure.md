---
id: azure.landingzone
title: Landingzone
---

The meshcloud can orechestrate and automate project replication and user assignment to meshProjects into the Azure cloud. We can utilize pre-provisioned Subscription or use an existing Enterprise Enrollment to create Subscriptions on demand for replicated projects.

Blueprints can automatically get assigned to projects in order to enforce certain company policies regarding allowed cloudresources. These setup is done via a landingzone.

## Landingzone

The landingzone can be configured in the `Administration` section. If a project is selected to have an Azure location a landingzone must be picked by the user. By choosing a landing zone platform specific configuration can be set (in this case for Azure). The options for Azure are:

### Management Group

All newly created meshProjects get their corresponding Subscription assigned to this [Management Group](https://azure.microsoft.com/en-us/features/management-groups/). The Management Group can be configured by an platform operator throughout the Azure portal.

### Blueprint Name

The name of the [Blueprint](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) which should get assigned to the project. You can leave it empty, then no Blueprint will get automatically assigned.

### Blueprint Management Group

Blueprints must reside inside a Management Group. It is assumed it is in the same group as the group where to put the Subscriptions by default. If the Blueprint is located in another group it can be configuered here.

### Max. Auto Upgrade Blueprint Version

Blueprints are versioned in Azure and can be managed via the Azure Portal. To avoid the accidental assignment of new (and possibly faulty) Blueprints there is this `Max. Auto Upgrade Blueprint Version` field. If you enter a version identifier here which corresponds to a existing Blueprint version in the Azure portal:

* Existing projects with this Landing Zone will get their Blueprint updated to this version on the next replication
* Newly created projects will get the latest Blueprint version assigned (possibly higher then the version configured here)
