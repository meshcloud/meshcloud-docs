---
id: new-concept-tenant
title: Tenant
---

A tenant represents an isolated segment within a platform. Each tenant is an instantiation of a platform resource, providing a dedicated environment for a specific use case. Resources can be added to a tenant via meshStack building blocks or directly through the platform's native capabilities.

Each tenant belongs to a project and can be accessed by users assigned to that project.

## Platform mapping

Here is a mapping of the term "tenant" across different platforms:

| Platform                | Tenant Equivalent         |
|-------------------------|--------------------------|
| AWS                     | Account                  |
| Microsoft Azure         | Subscription             |
| Google Cloud            | Project                  |
| Kubernetes & OpenShift  | Namespace                |
| OpenStack               | Project                  |
| CloudFoundry            | Space                    |

## Desired State of a Tenant

meshStack brings together the project context such as tags and users, the landing zone configuration, and platform settings (managed by platform engineers via the platform builder) to define the desired state of a tenant. 

- meshStack regularly checks and updates tenants to match the desired state.  
- This process is called replication and ensures all tenants managed by meshStack are always in the correct state.  
- The default frequency is set to once per day, but this can be adjusted by contacting support@meshcloud.io.

---
Below is an example diagram illustrating the tenant concept:

![Tenant Concept Diagram](assets/new_concept/concept_tenant.png)

## Related Resources
