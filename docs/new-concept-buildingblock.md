---
id: new-concept-buildingblock
title: Building Block
---

Building blocks are a granular and standardized asset of automation provided by platform teams via the platform builder. If you often set up the same infrastructure or configurations, meshstack's building blocks can save you time and effort. Building blocks definitions are offered via the marketplace and can be provisioned as building blocks by application teams in self-service.

:::tip Use the meshStack Hub
The meshStack Hub is your go-to place for discovering ready to use building blocks without the need to create them from scratch.
:::

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

**Logs**
When a Terraform Building Block is added to a project, logs are generated detailing the provisioning process and any errors. Admins and platform builder users can access these logs via the Building Block overview. Selecting a specific Building Block instance and its "Run" allows inspection of the related Terraform logs.

### GitHub Actions Workflow Implementation

GitHub Actions building blocks use GitHub Actions workflows to automate resource provisioning or configuration tasks. The building block definition references a workflow file, which is triggered and executed as part of the provisioning process. This method is ideal for teams already leveraging GitHub for source control and automation.

### GitLab CI/CD Implementation

GitLab CI/CD building blocks utilize GitLab's pipeline capabilities to automate provisioning steps. The building block definition specifies a `.gitlab-ci.yml` configuration, which runs jobs and scripts to set up resources. This approach integrates seamlessly with GitLab-based development and deployment workflows.

## Building Block Inputs

Building Blocks work on the principle of collecting input parameters from various sources to customize the provisioning process.

There are many input types available which you can chose from. You can also decide to encrypt sensitive inputs.

With terraform building blocks you are also able to generate the inputs automatically from the terraform module.

We are in the process of adding more input sources and types. If you have a specific request, please let us know via [Canny](https://meshcloud.canny.io).

### User Permissions Input

This input type is useful for granting users access to specific resources within a platform. This make sense if you are handling a platform that is not natively supported by meshStack or you want to handle user authorization on your own. It provides the Building Block with a list of user objects in the following JSON structure:

```json
[
    {
        "meshIdentifier": "identifier1",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@test.com",
        "euid": "johndoe",
        "roles": ["reader"]
    },
    {
        "meshIdentifier": "identifier2",
        "username": "lisaluck",
        "firstName": "Lisa",
        "lastName": "Luck",
        "email": "lisaluck@test.com",
        "euid": "lisaluck",
        "roles": ["admin", "reader", "user"]
    }
]
```

## Building Block Outputs

Building Blocks can provide output values to both admins and users after provisioning. These outputs can include information such as resource IDs, connection strings, or other relevant data generated during automation.

For Terraform-based Building Blocks, you can automatically extract Terraform outputs into meshStack. This is helpful in two main scenarios:

- **Dependency Management:** If a Building Block depends on another (e.g., a virtual machine requiring a VNET ID), you can output the required variable from one Building Block and use it as an input for the dependent Building Block.
- **User Visibility:** Outputs that are important for end users, such as access credentials or resource endpoints, can be displayed in the tenant control plane, making them easily accessible to customer users.

## Pricing

You can set up prices for Building Blocks when ordered via the marketplace. For more information please follow the [How to Setup Prices](how-to-setup-prices.md) guide.

## Versioning and Rollout

To update an existing Building Block, go to the Building Block definitions and select the desired Building Block. Click "Create draft" to start a new version. The definition will enter edit mode, allowing you to make and save changes.

Once your changes are complete, select "Release" to publish the new version. This version becomes the default for users ordering the Building Block from the Marketplace. Existing users continue to use the previous version unless an upgrade is performed.

If you need to upgrade existing instances to the latest version, navigate to the Admin Area and select "Marketplace > Building Blocks." Check the boxes next to the Building Blocks you want to upgrade, then click “Upgrade.” This action forces a new run of the selected Building Blocks, ensuring users receive the latest version.

## Credentials Management (Terraform Only)

In some cases, Terraform code requires credentials to provision infrastructure. For example, a Terraform building block for AWS typically needs access keys. A best practice is to use environment variables such as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. In this case, your Terraform AWS provider configuration can be as simple as:

```hcl
provider "aws" {}
```

These environment variables must be provided to the Terraform runner. In meshStack, you can define these as input variables in the Building Block definition with the following settings:

- **Source**: Static (if you want to use the same credentials for every run) or User input (to let users provide their own)
- **Input type**: String
- **Provided as**: Environment
- **Encryption**: Enabled

This approach is not limited to AWS. Many Terraform providers support authentication via environment variables. For example, the Datadog provider uses `DD_API_KEY` and `DD_APP_KEY` as environment variables. For more details, see the [Datadog Terraform provider documentation](https://registry.terraform.io/providers/DataDog/datadog/latest/docs).

meshStack simplifies credential management by offering preconfigured inputs for common platforms. When creating a Terraform building block, you can use the "Generate Input" menu to automatically add the necessary credential inputs for AWS, Azure, or GCP. For example, selecting "Generate AWS auth inputs" will create the required AWS credential inputs. You can then assign static values or allow users to provide them at runtime.

## Related Resources

### Concepts

- [Platforms](new-concept-platforms.md)
- [User Permissions](new-concept-user-permissions.md)

### Guides

- [How to Generate Building Block Documentation](how-to-generate-building-block-documentation.md)
- [How to Provide Your Own Platform](how-to-provide-your-own-platform.md)
- [How to Launch a New Manual Building Block Definition](how-to-launch-a-new-manual-building-block.md)
- [How to Launch a New Terraform Building Block](how-to-launch-a-new-terraform-building-block.md)
- [How to Offer an AWS S3 Bucket via Marketplace](meshstack.building-aws-quickstart-guide.md)