---
id: meshcloud.landing-zones
title: Landing Zones
---

Landing Zones describe a set of policies that are automatically applied to [tenants created for a meshProject](./meshcloud.project.md). They relate to a "bootstrap" configuration in the meshPlatform, that sets
up and configures the cloud tenant according to policies and requirements of your company.

Typical use-cases for Landing Zones are setting up cloud tenants to restrict administrative privileges
over core configuration like identity and access management. This ensures company policies with regards to authentication
and authorization are consistently enforced across all cloud tenants. Other common use cases include cloud service or
region restrictions to ensure compliance regarding data processing restrictions.

Another use-case is defining default quotas in private cloud environments that are directly applied to your [meshTenant](./meshcloud.tenant.md) after creation.
This allows your Platform Operators to provide you direct access with a limited scope. When you require a higher quota, you can create a [quota request](./meshcloud.tenant-quota.md), which must be [approved](meshcloud.tenant-quota.md#approval-of-tenant-quota-requests) by a platform operator.

Platform Operators can provide multiple Landing Zones per meshPlatform. This allows e.g. different setups
for a Dev, QA and Production stage. Landing zones can also consume project meta-data like cost-center or similar attributes
and use it.

> Only your Platform Operators can configure Landing Zones and control their content. Your operations team
> can provide details how Landing Zones are used in your meshcloud installation.

## Using Landing Zones

Workspace managers can choose a Landing zone when [adding meshTenants](./meshcloud.project.md#adding-meshtenants) to a meshProject.
It is not possible to change the chosen Landing Zone of an existing meshTenant. The only way of doing so is by removing the meshTenant and creating another by re-adding the same meshPlatform to the Project again.
