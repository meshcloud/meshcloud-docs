---
id: new-guide-how-to-manage-a-platform
title: How to Manage a Platform
---

:::note What is this guide about?
This guide explains how to manage the lifecycle of platforms in meshStack. Please see the dedicated platform section on the left side for detailed information about configuration of the different platform types.
:::

## Prerequisites

- Access to a platform builder
- Access to the administration capabilities of the platform you want to integrate.

## Step-by-Step Guide to Register a New Platform

1. In meshPanel, go to platforms in the platform builder area.
2. Click on "Add Platform" on the top right.
3. Select Platform Type: Choose the platform type (e.g., AWS, Azure, GCP, OpenStack, Cloud Foundry).
4. Provide further context such as a name, id and description. You are also able to provide links that are shown to application teams when working with the new platform. 
5. Chose a location for the platform. See [Location](new-concept-location.md) for more details.
6. You can add a tenant price to the platform. See [Pricing](new-guide-how-enforce-pricing-structure.md) for more details.

:::note Next Steps
Next Step: In order to trigger the platform via meshStack you need to provide configuration details. See the guides linked below for specific platform types.

The platform will only be published to the marketplace if there is a landing zone configured.
:::

## Step-by-Step Guide to Deprecate a Platform

:::note Info
Please be aware that not all platform support deprecation and reactivation. Please check the platform configuration for more details.
:::

**Deprecation** will prevent application teams to create further tenants via the marketplace. Existing tenants of this platform will still receive the desired state from meshStack until the platform or landing zone is deleted.

Your users can recognize a tenant of a deprecated platform by a yellow bubble on the platform icon in the "Projects Overview" on the workspace manager.

1. In meshPanel, go to platforms in the platform builder area.
2. Select the platform.
3. Navigate to **Danger Zone** and click on "Deprecate Platform" and save.

## Step-by-Step Guide to Reactivate a Platform

**Reactivation** will allow application teams to create new tenants via the marketplace again. Existing tenants of this platform will still receive the desired state from meshStack.

1. In meshPanel, go to platforms in the platform builder area.
2. Select the platform.
3. Navigate to **Danger Zone** and click on "Reactivate Platform" and save.

### Step-by-Step Guide to Delete Platform

**Deletion** will prevent application teams from creating further tenants via the marketplace and existing tenants will no longer be accessible via meshPanel. The desired state will no longer be applied by meshStack. 

:::note Info
Please be aware that the deletion of the platform will cut the integration with the platform but not delete actual tenants on the platform such as deleting the Azure subscription. You need to to do that either via meshStack or directly in the cloud platform for every tenant.
:::

1. In meshPanel, go to platforms in the platform builder area.
2. Select the platform.
3. Navigate to **Danger Zone**.
4. Click on `Delete platform` button and confirm the deletion with its identifier.


## Related Resources

### Concepts

- [Location](new-concept-platform-location.md)
- [Platform](new-concept-platform.md)
- [Resource Quota](new-concept-resource-quota.md)

### Guides

- [How to Provide Your Own Platform](new-guide-how-to-provide-your-own-platform.md)
- [How to Restrict Platform Access](new-guide-how-to-restrict-platform-access.md)
- [How to Enable a New Platform Team](new-guide-how-to-enable-a-new-platform-team.md)
- [How to Manage Landing Zones](new-guide-how-to-manage-landing-zones.md)