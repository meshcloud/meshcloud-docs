---
id: meshstack.tenants
title: meshTenants
---

meshStack is responsible for creation of [meshTenants](meshcloud.tenant.md) in the cloud platforms. Some operational restrictions are described here.

## Reuse of an existing tenant

meshStack does not support reusing platformTenants. Imagine a meshProject has been set as [deleted by an operator](administration.projects.md#delete-projects), but the underlying platform tenant has not been deleted by the operator. You may think of resuing this tenant in another project by using the [meshObject Import](https://docs.meshcloud.io/api/#mesh_object_declarative_import). This is not supported by meshStack and will lead to an error during import. The reason for this current limitation is handling such a reuse of a tenant in meshMetering. Having the same tenant being used by different projects (perhaps even within the same month), makes it hard or in some cases even impossible to decide which project to charge for this tenant. Therefore reusing platformTenants is currently not supported by meshStack.
