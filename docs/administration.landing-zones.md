---
id: administration.landing-zones
title: Landing Zones
---

## Configuring Landing Zones

Platform Operators can configure the [Landing Zones](./meshcloud.landing-zones.md) available for each meshPlatform. The capabilities supported by meshcloud differ per platform type as we support "native" tooling provided by the different cloud platforms and vendors.

This ensures enterprises can seamlessly integrate existing operational capabilities and leverage the most powerful
and best-integrated tooling available for each platform. In most instances, this tooling follows an infrastructure-as-code paradigm that fits naturally with meshcloud's multi-cloud orchestration approach.

Please consult the [Administrator documentation](./meshstack.index.md) of the respective cloud platforms for more details.

## Disabling Landing Zones

Disabled Landing Zones can't be assigned to projects anymore. If the Landing Zone has already been assigned to a project,
this assignment will remain, but workspace managers can no longer create new projects using this Landing Zone.

## Configure Landing Zone tags

Platform Operators can configure a custom Landing Zone [meshTag](./meshstack.metadata-tags.md). The schema is available during the Landing Zone creation and update. For each created Landing Zone different tags can be attached. You can tag or modify tags on a landing zone during creation and edit.

## Include Platform Services as part of the Landing Zone

For all types of platforms it is possible to include some Platform Services, namely OSB Services and Building Blokcs as part of the Landing Zone. These Platform Services can be configured to be either:

- Required: this means the Platform Service has to be booked by the Workspace user. This is useful when you want to enforce
  the usage of a particular Platform Service in combination with the Landing Zone.
- Optional: this means the Platform Service can be optionally added by the Workspace user, but they are not required to
  do so and they could decide not to add it

Building Blocks and OSB Services could be added to the Landing Zone as part of the Project (see an example of step 6 for OSB Services and step 6 for Building Blocks [here](./meshstack.how-to.create-project.md) as well as from the Marketplace Catalog (see example here)

## Defining Quotas

> Please note that landing zone quotas are currently only available for OpenShift & Kubernetes platforms.

Limiting access to private cloud platforms is an important tool to keep control over the load on your platform and providing a fair share of resources to your workspaces. Therefore, private cloud platforms provide quotas to achieve this limitation. Defining these quotas is supported by meshStack per meshLandingZone. This provides maximum flexibility to Platform Operators to define quotas for their workspaces. meshPlatforms that support quota management will provide an according section when editing landing zones.

![Landing Zone Quota](assets/tenants/landing-zone-quota.png)

> Available quotas can be managed via the [Platform Quota Definition Screen](administration.platforms.md#manage-quota-definitions) that is available for each platform.
> Currently Quota Management is only supported for OpenShift platforms. More private cloud platforms will follow.

Quotas defined here will be applied as default quotas to newly created meshTenants. That way you can provide direct access to your workspaces with a limited scope. If users require a higher quota, they can create a [Tenant Quota Request](./meshcloud.tenant-quota.md), which has to be [approved](./administration.tenants.md#tenant-quota-requests) by a Platform Operator.
