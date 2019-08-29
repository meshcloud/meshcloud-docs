---
id: meshcloud.landing-zones
title: Landing Zones
---

Landing Zones describe a set of policies that are automatically applied to [tenants created for a meshProject](./meshcloud.project.md). They relate to a "bootstrap" configuration in the platform instance, that sets
up and configures the cloud tenant according to policies and requirements of your company.

Typical use-cases for Landing Zones are setting up cloud tenants to restrict administrative privileges
over core configuration like identity and access management. This ensures company policies with regards to authentication
and authorization are consistently enforced across all cloud tenants. Other common use cases include cloud service or
region restrictions to ensure compliance regarding data processing restrictions.

Operators can provide multiple Landing Zones per platform instance. This allows e.g. different setups
for a Dev, QA and Production stage. Landing zones can also consume project meta-data like cost-center or similar attributes
and use it.

> Only your Platform Operators can configure Landing Zones and control their content. Your operations team
> can provide details how Landing Zones are used in your meshcloud installation.


## Using Landing Zones

Customer administrators can chose a Landing zone when [adding Locations](./meshcloud.project.md#add-remove-locations-from-a-meshproject) to a meshProject.
It is not possible to change the chosen Landing Zone, except by removing and re-adding the location to the Project.

