---
id: meshstack.platform-location
title: Platforms & Locations
---

meshStack operators can configure the [Platforms & Locations](meshcloud.platform-location.md) available to
users. See the Platforms section in the sidebar for details on the platforms supported by meshstack.

## Restricting Access

meshStack provides simple and effective means to implement access policies, for example to control data sovereignty and access to public cloud platforms. Operators are also able to define "boundaries" on various levels and allow controlled delegation to self-service while retaining full control over policies.

### Customer-level

Operators can restrict the [Customer](meshcloud.customer.md) accounts that are allowed to access a particular [Platform Instance inside any Location](meshcloud.platform-location.md). The UI for maintaining the restricted access is described [here](administration.platforms.md#restrict-platform-instances).

This feature can be used for example to restrict access to a public cloud provider only to customer accounts that passed a certain data-protection clearance process.

### Project-level

Customers can create [Projects](meshcloud.project.md) that use the Locations available to their Customer account.
Configuring the locations available to a project is typically restricted to users with the [Customer Admin Role](meshcloud.groups.md), providing a further level of possible delegation.

## Deprovisioning / Deleting Projects

Before a project can be deleted by meshStack you must make sure that no resources are left in any platform it uses. This is a security measure as we do not want to accidently delete resources still used from the cloud platforms. We therefore check the absence of resources prior of project deletion and upon presence of a resource we stop the deprovisioning process.

This security check is currently supported for the platforms:

* CloudFoundry
* OpenStack
* Service Marketplace

> Since this security measure is very important, deprovisioning projects from other platforms is currently not supported. We are looking into extending this support and adding the missing platforms as soon as possible.
