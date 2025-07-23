---
id: new-concept-landingzone
title: Landing Zone
---
A **landing zone** is a platform specific predefined configuration of a new tenant. They are provided by platform engineers via the platform builder and are a prerequisite for the provisioning of new tenants.

Landing zones are typically used to:

- Provide a secure, compliant foundation for new tenants.
- Standardize network, security, and access configurations.
- Ensure consistent infrastructure across teams and environments.
- Support tailored setups for development, testing, or production.

## Versioning Landing Zones

Landing zones can evolve over time, and versioning allows organizations to manage changes effectively. Versioning landing zones involves:

- Creating new versions of landing zones to accommodate changes in requirements or best practices.
- Maintaining backward compatibility with existing tenants using older versions.

## Modularization of Landing Zones

Landing zones can consist of one or multiple building blocks rolled out when a tenant is provisioned. This modular approach allows for:

- Reusability of common configurations across different landing zones.
- Easier updates and maintenance of individual components without affecting the entire landing zone.
- Customization of specific components to meet the unique needs of different teams or projects.

Building blocks for a landing zone can be configured as:

- **required**: Building blocks that must be included by the application team when a new tenant is created. Use these for security critical configurations, such as network security groups.
- **optional**: Building blocks that are recommended to application teams when they create a new tenant. Use these for configurations that are not mandatory, such as monitoring or logging.

## Related Resources

### Concepts

- [Platform](new-concept-platform.md)
- [Tenant](new-concept-tenant.md)
- [Building Block](new-concept-buildingblock.md)
- [Resource Quota](new-concept-resource-quota.md)

## Guides

- [How to Manage Landing Zones](new-guide-how-to-manage-landing-zones.md)
- [How to Manage a Platform](new-guide-how-to-manage-a-platform.md)
- [How to Provide Your Own Platform](new-guide-how-to-provide-your-own-platform.md)