---
id: meshstack.tenants
title: meshTenants
---

meshStack is responsible for creation of [meshTenants](meshcloud.tenant.md) in the cloud platforms according to their [meshPlatform](administration.platforms.md) configuration. Some operational restrictions are described here.

## Reuse of an existing tenant

meshStack does not support reusing platformTenants. Imagine a meshProject has been set as [deleted by a platform operator](administration.projects.md#delete-projects), but the underlying platform tenant has not been deleted by the platform operator. You may think of reusing this tenant in another project by using the [meshObject Import](/api/#mesh_object_declarative_import). This is not supported by meshStack and will lead to an error during import. The reason for this current limitation is handling such a reuse of a tenant in meshMetering. Having the same tenant being used by different projects (perhaps even within the same month), makes it hard or in some cases even impossible to decide which project to charge for this tenant. Therefore reusing platformTenants is currently not supported by meshStack.

> Read best practices on building a solid tenant management in your cloud foundation on the [cloud foundation website](https://cloudfoundation.org/maturity-model/tenant-management/).

## Deprovisioning / Deleting Tenants

Before a meshTenant can be [automatically deleted](meshcloud.tenant.md#automatic-deletion) by meshStack, users must make sure that no resources are left in the cloud platform tenants. This is a security measure as we do not want to accidentally delete a tenant with resources still used from the cloud platforms. We therefore check the absence of resources prior of tenant deletion and upon presence of a resource we stop the deprovisioning process.

This security check is currently supported for the platforms:

* CloudFoundry
* OpenStack
* Service Marketplace

> Since this security measure is very important, fully automated deprovisioning of projects from other platforms is currently not supported and requires [manual intervention](administration.projects.md#delete-tenants). We are looking into extending support for further automating this process in the future.
