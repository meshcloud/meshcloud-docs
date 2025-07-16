---
id: administration.landing-zones
title: Landing Zones
---

## Configuring Landing Zones

Platform engineers can configure the [Landing Zones](meshcloud.landing-zones) available for each meshPlatform. The capabilities supported by meshcloud differ per platform type as we support "native" tooling provided by the different cloud platforms and vendors.

This ensures enterprises can seamlessly integrate existing operational capabilities and leverage the most powerful
and best-integrated tooling available for each platform. In most instances, this tooling follows an infrastructure-as-code paradigm that fits naturally with meshcloud's multi-cloud orchestration approach.

Please consult the [Administrator documentation](meshstack.index) of the respective cloud platforms for more details.

## Disabling Landing Zones

Disabled Landing Zones can't be assigned to projects anymore. If the Landing Zone has already been assigned to a project,
this assignment will remain, but workspace managers can no longer create new projects using this Landing Zone.

## Configure Landing Zone tags

Platform engineers can configure a custom Landing Zone [meshTag](meshstack.metadata-tags). The schema is available during the Landing Zone creation and update. For each created Landing Zone different tags can be attached. You can tag or modify tags on a landing zone during creation and edit.

## Include Building Blocks as part of the Landing Zone

For all types of platforms it is possible to include building blocks as part of the landing zone. These building blocks can be configured to be either:

- Required: this means the building block has to be booked by the workspace user. This is useful when you want to enforce
  the usage of a particular building block in combination with the landing zone.
- Optional: this means the building block can be optionally added by the workspace user, but they are not required to
  do so and they could decide not to add it.

## Defining Quotas

> Please note that landing zone quotas are currently only available for OpenShift & Kubernetes platforms.

Limiting access to private cloud platforms is an important tool to keep control over the load on your platform and providing a fair share of resources to your workspaces. Therefore, private cloud platforms provide quotas to achieve this limitation. Defining these quotas is supported by meshStack per meshLandingZone. This provides maximum flexibility to platform engineers to define quotas for their workspaces. meshPlatforms that support quota management will provide an according section when editing landing zones.

![Landing Zone Quota](assets/tenants/landing-zone-quota.png)

> Available quotas can be managed via the [Platform Quota Definition Screen](administration.platforms#manage-quota-definitions) that is available for each platform.
> Currently Quota Management is only supported for OpenShift platforms. More private cloud platforms will follow.

Quotas defined here will be applied as default quotas to newly created meshTenants. That way you can provide direct access to your workspaces with a limited scope. If users require a higher quota, they can create a [Tenant Quota Request](meshcloud.tenant-quota), which has to be [approved](administration.tenants#tenant-quota-requests) by a platform engineer.
