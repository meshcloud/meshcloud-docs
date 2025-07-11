---
id: new-concept-buildingblock
title: Building Block
---

Building blocks are a granular and standardized asset of automation provided by platform teams via the platform builder. If you often set up the same infrastructure or configurations, meshstack's building blocks can save you time and effort. Building blocks definitions are offered via the marketplace and can be provisioned as building blocks by application teams in self-service.

## Building Block Definition

A building block definition is a reusable template for automating resource provisioning.  Building blocks are instances of building block definitions. Platform teams create and manage these definitions in the platform builder.

## Building Block Types

### Workspace Building Blocks

A workspace building block is created under a workspace and is globally available to all projects within that workspace.
Use this type when the service does not need to be tied to a specific environment (project) for example project tooling or a central service used by multiple environments. Workspace building blocks don't have prerequisites such as platform type, platform, landing zone or a tenant. They have an individual life cycle linked only to the workspace.

### Tenant Building Blocks

A tenant building block is tied directly to a specific tenant, such as a virtual network or database within an AWS Account or Azure Subscription.
When the tenant is deleted, the building block must also be deleted beforehand. Tenant building blocks can have a price setup for them that is added to the tenant usage report and chargeback statement.

## Building Block Dependencies 

Building blocks can have dependencies on other building blocks. This allows for complex setups where one building block relies on another to function correctly. An example would be an Azure VM building block requiring a vnet building block. Dependencies are defined in the building block definition and are resolved during provisioning.

## Building Block Implementation Types

Building blocks can be implemented using different methods, depending on your automation needs and existing workflows. The available implementation types are:

### Manual Implementation

Manual building blocks are ideal if you want start standardizing without having the automation in place yet. Platform Engineers can offer manual building blocks via the marketplace to application teams. Whenever the building block is added to a tenant or workspace the Platform Engineers complete the work manually. This helps platform engineers to see the demand for this type of offering and prioritize the implementation of automated building blocks.

### Terraform Implementation

If you are a Platform Engineer with HashiCorp Terraform modules (supported until 1.5) or OpenTofu Modules in place you can easily integrate them into meshStack to completely automate provisioning from the request to deployment. The building block definition includes Terraform modules, which are executed automatically during provisioning. This approach enables consistent, repeatable, and scalable infrastructure deployment.

### GitHub Actions Workflow Implementation

GitHub Actions building blocks use GitHub Actions workflows to automate resource provisioning or configuration tasks. The building block definition references a workflow file, which is triggered and executed as part of the provisioning process. This method is ideal for teams already leveraging GitHub for source control and automation.

### GitLab CI/CD Implementation

GitLab CI/CD building blocks utilize GitLab's pipeline capabilities to automate provisioning steps. The building block definition specifies a `.gitlab-ci.yml` configuration, which runs jobs and scripts to set up resources. This approach integrates seamlessly with GitLab-based development and deployment workflows.

## Related Resources
