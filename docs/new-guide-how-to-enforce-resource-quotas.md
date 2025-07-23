---
id: new-guide-how-enforce-resource-quotas
title: How to Enforce Resource Quotas
---

:::note What is this guide about?
This guide explains how to set and manage quotas for platform resources in meshStack. This includes setting resource initial base lines and approval flows for further resource consumption.
:::

## Challenge

Managing the physical resources of a platform is crucial for maintaining performance and cost efficiency. The resource quota functionality in meshStack allows platform teams to define and enforce resource limits for tenants, ensuring that resources are allocated fairly and efficiently.

## Prerequisites

- Access to the meshStack platform builder.
- Understanding of the native platform resources and consumption.

## Step-by-Step Guide Default Resource Quota

:::note Info
In order to provide quotas to tenants, the available quotas have to be defined first. A `Quota Key` that must match the quota key in the platform, can be defined. Additionally a speaking name for the quota that is shown in meshPanel as well as a description and a unit can be defined. Min and Max values can also be set to restrict the quotas to a certain maximum or minimum. An auto approval threshold can also be defined. It can be set to 0, if no auto-approval of quota requests shall be applied.
:::

To define resource quotas for a platform in meshStack, follow these steps:

1. Navigate to the platform builder in meshStack.
2. Select the platform for which you want to define resource quotas.
3. Navigate to **Settings** > **Quotas Definitions**.
4. Specify the resource quotas you want to enforce.
5. Set minimum and maximum values for each quota to ensure that tenants cannot exceed certain limits.
6. Optionally, define an **Auto Approval Threshold** for each quota. This threshold allows meshStack to automatically approve quota requests that do not exceed the defined limits, streamlining the process for tenants.
7. Save the quota definitions.
8. Navigate to the **Landing Zones** section and specify the quotas for each landing zone associated with the platform. This ensures that the quotas are applied to all tenants created under that landing zone.

## Step-by-Step Guide Delete Default Resource Quota

:::note Info
If removed in the resource quota definition, quotas will be removed from the Landing Zones and tenants belonging to the platform as well. The removal of quotas from the tenants will happen during next replication.
:::

1. Navigate to the platform builder in meshStack.
2. Select the platform for which you want to manage quota definitions.
3. Navigate to **Settings** > **Quotas Definitions**.
4. To remove a quota definition, click the "-" button on the right side of the table. 

## Step-by-Step Guide Quota Request During Tenant Creation

You can directly submit a resource quota request when creating a project or adding a platform to a project.

1. If the platform supports quotas, you will see the default quotas that will be applied via the landing zone.
2. **optional** If you already know that you need a higher quota, you can request higher quota values. If requested quotas are below the approval threshold defined by the platform team, they will be auto-approved when creating the tenant.

## Step-by-Step Guide Extending Resource Quota

1. Navigate to the workspace manager in meshPanel.
2. Select the project and tenant for which you want to extend the resource quota.
3. Go to **Settings** > **Quotas**.
Quota requests can be made when you open a tenant (that supports quotas) under **Settings** > **Quotas**.
4. **optional** You can also update and cancel existing requests in the dialog.

## Approval of Quota Requests for Platform Teams

- Platform teams can approve resource quota requests
- Platform teams can modify resource quota requests and provide a reason why they changed it.
- Application teams can find this comment in the resource quota dialog when managing your resource quota as described above.

## Related Resources

### Concepts

- [Platform](new-concept-platform.md)
- [Landing Zone](new-concept-landingzone.md)
- [Tenant](new-concept-tenant.md)

### Guides

- [How to Manage a Platform](new-guide-how-to-manage-a-platform.md)