---
id: meshstack.aks-developer-platform-quickstart-guide
title: AKS Developer Platform Guide
---

## Introduction

Welcome to the **First Developer Platform Guide**! This guide provides step-by-step instructions to help you set up your first developer platform experience incorporating AKS, GitHub & GitHub Actions to deliver an easy-to-use starter kit to your application teams.

## Goals

By the end of this guide, you will have built a complete starter kit for your users that will provide:

- A new GitHub repository
- A “dev” project with:
  - an AKS namespace
  - a GitHub actions workflow with credentials to the AKS namespace
- A “prod” project with:
  - an AKS namespace
  - a GitHub actions workflow with credentials to the AKS namespace

## Prerequisites

Before starting, ensure you have the following:

- You have a basic understanding of building blocks in meshStack.
  - *If you don’t, we recommend running through the [AWS S3 guide](meshstack.building-aws-quickstart-guide.md) to learn how building blocks work.*
- You have integrated an AKS cluster into meshStack.
  - *If you don’t, we recommend running through the [First Platform guide for AKS](meshstack.aks-platform-quickstart-guide.md) where you are guided to integrate an AKS cluster as a platform in meshStack*

## What Will We Do in This Guide?

Shortly put, we will set up the following in this guide:

- A building block definition that allows application teams to provision new repositories.
- A building block definition that adds a GitHub Action workflow with the right credentials in the AKS namespace so application teams have an out-of-the-box working Kubernetes CI/CD.
- A building block definition that combines all these elements & more into a single packaged starter kit.

## 1. GitHub Repository

### Preparing GitHub Repository

The GitHub Repository building block definition needs access to your GitHub organization.
Follow the following steps to create a GitHub App that will be used to manage the repositories.

1. [**Register a GitHub App**](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
    1. Make sure you give it sufficient permissions. When creating the app you’ll see a section “Repository permissions”. Under here make sure that you set the following:
        1. “Administration” is set to “read & write”.
        2. “Environments” is set to “read & write”.
        3. “Secrets” is set to “read & write”.
        4. “Contents” is set to “read & write”.
    2. After creating the app you will see an “App ID” listed. Make sure to save this somewhere as we will need it later.
2. Install the GitHub App
    1. On the left-hand side go to “Install App” and install the app where you want to manage repositories.
    2. Follow the guide and once finished you will end up on the installation configuration page. On this page, have a look at the URL and extract the number behind `/installations/<installation ID>`. Make sure to save this somewhere as we will need it later.
3. [**Create a GitHub App Private Key**](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps)
    1. Save this file somewhere convenient as we will also need it later.

### Creating the Repository Building Block Definition

To make things easy, we will use the [meshStack Hub](https://hub.meshcloud.io) to create the new building block definition.

1. Open the Github Repository Creation Definition in the meshStack hub [here](https://hub.meshcloud.io/definitions/github-repository).
2. Click on “Add to meshStack” and enter your meshStack URL (if not given already).
3. Continue the flow in meshStack.
    1. Right away you will be asked for a “Type”. Pick “Workspace Building Block” here.
    2. Continue until you reach the “Inputs” page. On this page you will be forced to fill in the following:
        1. `GITHUB_APP_ID` - This is the value saved under “Preparation” step 1b.
        2. `GITHUB_APP_INSTALLATION_ID` - This is the value saved under “Preparation” step 2b.
        3. `GITHUB_APP_PEM_FILE` - This is the value saved under “Preparation” step 3a. Take the entire content of the file and paste it in here.
4. Finish the flow and create the building block definition.

🎉 The GitHub Repository Building Block Definition is ready!

## 2. GitHub Actions Connector

### Preparing the GitHub Actions Connector

This building block definition will interact with both GitHub & AKS, so we need authorization for both.

For GitHub, you can simply reuse what we set up before.

For AKS, you will need to run the Terraform code in the backplane that will set up all necessary preparation such as preparing service principals with the right permissions. You can find this Terraform code [here](https://github.com/meshcloud/meshstack-hub/blob/main/modules/aks/github-connector/backplane).

Make sure you save the `config_tf` output and save it as a file called `config.tf`. We will use it later.

### Creating the GitHub Actions Connector Building Block Definition

We will again use the [meshStack Hub](https://hub.meshcloud.io) to create the new building block definition.

1. Open the Github Actions Integration with AKS definition in the meshStack hub [here](https://hub.meshcloud.io/definitions/aks-github-connector).
2. Click on “Add to meshStack” and enter your meshStack URL (if not given already).
3. Continue the flow in meshStack.
    1. Right away you will be asked for a “Type”. Pick “Tenant Building Block” here and select “AKS” as the supported platform.
    2. Continue until you reach the “Dependencies” page. On this page, select the “Github Repository Creation” building block definition that you created before.
    3. Continue until you reach the “Inputs” page. On this page you will be forced to fill in the following:
        1. `namespace` - This refers to the AKS namespace. Open this up and set the “Source” to “Platform Tenant ID”.
        2. `github_repo` - This refers to the GitHub repository to connect to. Open this up and set the “Source” to “Parent Building Block Output” and set the corresponding output to “repo_name”.
        3. `branch` - This is the branch to use for deployments. If not provided, defaults to 'main'. If a custom branch is provided, it will be created if it doesn't exist.
        3. `GITHUB_APP_ID` - This is the value saved under “Preparation” step 1b from the previous building block definition
        4. `GITHUB_APP_INSTALLATION_ID` - This is the value saved under “Preparation” step 2b from the previous building block definition
        5. `GITHUB_APP_PEM_FILE` - This is the value saved under “Preparation” step 3a from the previous building block definition. Take the entire content of the file and paste it in here.
        6. Create a new input called `config.tf` and set the Source to “Static” and the Type to “File”. Mark the input as encrypted and upload the config.tf file from the preparation step.
4. Finish the flow and create the building block definition.

🎉 The GitHub Actions Connector Building Block Definition is ready!

## 3. Starter Kit

The last piece of the puzzle in the guide is the starter kit that will bundle up all previously created resources into one, easy-to-use package for application teams.

### Preparation

We will create resources within meshStack. This means we need an API Key to interact with meshStack in our Terraform code.

- Create a new API Key in meshStack in the Admin Area. Make sure you save the **API key ID** & **API key secret** somewhere, as you’ll need it later.
- Give it the following permissions:
  - “Admin: Create and Update Building Blocks in any Workspace”
  - “Admin: List Building Blocks in any Workspace”
  - “Admin: Create and Update Projects in any Workspace”
  - “Admin: List Projects in any Workspace”
  - “Admin: Create and Update Project Role Bindings in any Workspace”
  - “Admin: List Project Role Bindings in any Workspace”
  - “Admin: Create and update Tenants in any Workspace as well as import existing platform tenants”
  - “Admin: List Tenants in any Workspace”

### Creating the Building Block Definition

As the starter kit is very individual to your meshStack (project tags, definition IDs, platform IDs) it is not possible to directly reference a public example, but we provide a template below where you can fill in the missing information.

You can also change the behavior if you want in this starter kit. In its current behavior it will create a workspace building block GitHub repository, two projects with an AKS Namespace and a GitHub Actions connector

- Take the following Terraform code snippet and place it in a Git repository of choice that you can access from your meshStack. Make sure you fill in locals with your own values.

```hcl
locals {
  # TODO: fill in the values here
  github_repo_definition_uuid = "TODO" # UUID of the GitHub repo definition
  github_repo_definition_version_uuid = "TODO" # UUID of the GitHub repo definition version
  github_connector_definition_uuid = "TODO" # UUID of the GitHub connector definition
  github_connector_definition_version = TODO # Version number of the GitHub connector definition
  aks_platform_identifier = "aks.my-aks-location" # Full Platform Identifier for the AKS platform
  landing_zone_identifier = "aks-lz" # Landing zone identifier for the AKS platform

  # Create a purely alphanumeric identifier from the display name
  # Remove special characters, convert to lowercase, and replace spaces/hyphens with nothing
  identifier = lower(replace(replace(var.name, "/[^a-zA-Z0-9\\s\\-\\_]/", ""), "/[\\s\\-\\_]+/", "-"))
}

# main.tf
resource "meshstack_project" "dev" {
  metadata = {
    name               = "${local.identifier}-dev"
    owned_by_workspace = var.workspace_identifier
  }
  spec = {
    display_name = "${var.name}-dev"
    # Add any tags here if you use tags on projects
    # tags = {
    #  "environment"          = ["dev"]
    # }
  }
}

resource "meshstack_project" "prod" {
  metadata = {
    name               = "${local.identifier}-prod"
    owned_by_workspace = var.workspace_identifier
  }
  spec = {
    display_name = "${var.name}-prod"
    # Add any tags here if you use tags on projects
    # tags = {
    #  "environment"          = ["prod"]
    # }
  }
}

resource "meshstack_project_user_binding" "creator_dev_admin" {
  count = var.creator.type == "USER" && var.creator.username != null ? 1 : 0

  metadata = {
    name = uuid()
  }

  role_ref = {
    name = "Project Admin"
  }

  target_ref = {
    owned_by_workspace = var.workspace_identifier
    name               = meshstack_project.dev.metadata.name
  }

  subject = {
    name = var.creator.username
  }
}

resource "meshstack_project_user_binding" "creator_prod_admin" {
  count = var.creator.type == "USER" && var.creator.username != null ? 1 : 0

  metadata = {
    name = uuid()
  }

  role_ref = {
    name = "Project Admin"
  }

  target_ref = {
    owned_by_workspace = var.workspace_identifier
    name               = meshstack_project.prod.metadata.name
  }

  subject = {
    name = var.creator.username
  }
}

resource "meshstack_tenant" "dev" {
  metadata = {
    owned_by_workspace  = var.workspace_identifier
    owned_by_project    = meshstack_project.dev.metadata.name
    platform_identifier = local.aks_platform_identifier
  }

  spec = {
    landing_zone_identifier = local.landing_zone_identifier
  }
}

resource "meshstack_tenant" "prod" {
  metadata = {
    owned_by_workspace  = var.workspace_identifier
    owned_by_project    = meshstack_project.prod.metadata.name
    platform_identifier = local.aks_platform_identifier
  }

  spec = {
    landing_zone_identifier = local.landing_zone_identifier
  }
}

resource "meshstack_building_block_v2" "repo" {
  spec = {
    building_block_definition_version_ref = {
      uuid = local.github_repo_definition_version_uuid
    }

    display_name = "GitHub Repo ${var.name}"

    target_ref = {
      kind       = "meshWorkspace"
      identifier = var.workspace_identifier
    }

    inputs = {
      repo_name = {
        value_string = local.identifier
      }
      repo_owner = {
        value_string = var.github_username != null ? var.github_username : "null"
      }
      use_template = {
        value_bool = true
      }
      template_owner = {
        value_string = "likvid-bank"
      }
      template_repo = {
        value_string = "aks-starterkit-template"
      }
    }
  }
}

# takes a while until github repo and aks namespace are ready
resource "time_sleep" "wait_45_seconds" {
  depends_on = [meshstack_building_block_v2.repo]

  create_duration = "45s"
}

# Fetch the GitHub building block after creation to get outputs
data "meshstack_building_block_v2" "repo_data" {
  depends_on = [time_sleep.wait_45_seconds]

  metadata = {
    uuid = meshstack_building_block_v2.repo.metadata.uuid
  }
}

resource "meshstack_buildingblock" "github_actions_dev" {
  depends_on = [time_sleep.wait_45_seconds]

  metadata = {
    definition_uuid    = local.github_connector_definition_uuid
    definition_version = local.github_connector_definition_version
    tenant_identifier  = "${meshstack_tenant.dev.metadata.owned_by_workspace}.${meshstack_tenant.dev.metadata.owned_by_project}.${local.aks_platform_identifier}"
  }

  spec = {
    display_name = "GitHub Actions Connector"
    parent_building_blocks = [{
      buildingblock_uuid = meshstack_building_block_v2.repo.metadata.uuid
      definition_uuid    = local.github_repo_definition_uuid
    }]
  }
}

resource "meshstack_buildingblock" "github_actions_prod" {
  depends_on = [meshstack_building_block_v2.repo, meshstack_buildingblock.github_actions_dev]

  metadata = {
    definition_uuid    = local.github_connector_definition_uuid
    definition_version = local.github_connector_definition_version
    tenant_identifier  = "${meshstack_tenant.prod.metadata.owned_by_workspace}.${meshstack_tenant.prod.metadata.owned_by_project}.${local.aks_platform_identifier}"
  }

  spec = {
    display_name = "GitHub Actions Connector"
    parent_building_blocks = [{
      buildingblock_uuid = meshstack_building_block_v2.repo.metadata.uuid
      definition_uuid    = local.github_repo_definition_uuid
    }],
    inputs = {
      branch = {
        value_string = "release"
      }
    }
  }
}

output "summary" {
description = "Summary with next steps and insights into created resources"
value       = <<-EOT
# AKS Starter Kit

✅ **Your environment is ready!**

This module has successfully created the following resources for your application in workspace `${var.workspace_identifier}`:

-  **GitHub Repository**: <a href="${data.meshstack_building_block_v2.repo_data.status.outputs.repo_html_url.value_string}" target="_blank">${local.identifier}</a>
-  **Development Project**: <a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.dev.metadata.name}/tenants" target="_blank">${meshstack_project.dev.spec.display_name}</a>
- **AKS Namespace**: <a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.dev.metadata.name}/i/aks.eu-de-central/overview/azure_kubernetes_service" target="_blank">${meshstack_tenant.dev.metadata.owned_by_workspace}.${meshstack_tenant.dev.metadata.owned_by_project}.aks.eu-de-central</a>
  - **GitHub Actions Connector**
- **Production Project**: <a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.prod.metadata.name}/tenants" target="_blank">${meshstack_project.prod.spec.display_name}</a>
- **AKS Namespace**: <a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.prod.metadata.name}/i/aks.eu-de-central/overview/azure_kubernetes_service" target="_blank">${meshstack_tenant.prod.metadata.owned_by_workspace}.${meshstack_tenant.prod.metadata.owned_by_project}.aks.eu-de-central</a>
- **GitHub Actions Connector**

## Next Steps

Your GitHub repository has been created and is automatically connected to both your development and production AKS namespaces through GitHub Actions.
The GitHub Actions pipeline deploys the docker container (Dockerfile in your repository) from the repository to the respective AKS namespaces.

### Deploy Your Application
1. **Push your application code** including the required Dockerfile to the created GitHub repository main branch
2. **Your app will be deployed automatically** to the development AKS namespace via GitHub Actions when a commit is pushed to the main branch
3. **To deploy to production**, create a Pull Request to merge the main branch into the release branch and merge the Pull Request.
The GitHub Actions workflow will automatically deploy the application to the production AKS namespace.
4. **Monitor deployments** in the <a href="${data.meshstack_building_block_v2.repo_data.status.outputs.repo_html_url.value_string}/actions" target="_blank">GitHub Actions tab</a> of your repository

### Access Your AKS Namespaces
You can find instructions how to access your AKS namespaces via the meshstack UI:

<a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.dev.metadata.name}/i/aks.eu-de-central/overview/azure_kubernetes_service" target="_blank">Development AKS Namespace</a> | <a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.prod.metadata.name}/i/aks.eu-de-central/overview/azure_kubernetes_service" target="_blank">Production AKS Namespace</a>

### User Permissions
- **You have access** to both development and production projects in meshStack and therefore also to the respective AKS namespaces.
- **Invite team members** to collaborate by adding them to the respective projects
- User Management: <a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.dev.metadata.name}/access-management/role-mapping/overview" target="_blank">Development project</a> |
<a href="/#/w/${var.workspace_identifier}/p/${meshstack_project.prod.metadata.name}/access-management/role-mapping/overview" target="_blank">Production project</a>
- **Access to the GitHub repository** must be managed directly in GitHub. ${var.github_username != null ? "**${var.github_username} has admin access** to the created GitHub repository." : ""} Depending on your organization policies, all organization members may
have access to the repository or you have to add every contributor individually.

Happy coding! 🎉
EOT
}

output "github_repo_url" {
description = "URL of the created GitHub repository"
value       = data.meshstack_building_block_v2.repo_data.status.outputs.repo_html_url.value_string
}

# providers
terraform {
  required_providers {
    meshstack = {
      source  = "meshcloud/meshstack"
      version = ">= 0.5.5"
    }

    time = {
      source  = "hashicorp/time"
      version = "0.12.1"
    }
  }
}

provider "meshstack" {}

# variables
variable "workspace_identifier" {
  type = string
}

variable "name" {
  type        = string
  description = "Display Name of of the projects and resources created."
}

variable "creator" {
  type = object({
    type        = string
    identifier  = string
    displayName = string
    username    = optional(string)
    email       = optional(string)
    euid        = optional(string)
  })
  description = "Information about the creator of the resources who will be assigned Project Admin role"
}

variable "github_username" {
  type        = string
  default     = null
  description = "GitHub username that shall be granted admin rights on the created repository"
}
```

- Create a new building block definition in meshStack. Make sure you set the following:
  - Type = Workspace Building Block
  - Implementation Type = Terraform
  - Make sure to enable `Store Terraform State in meshStack’s http backend`
  - As the Deletion Mode pick `Purge in meshStack`, so the created resources continue living without the Starterkit. The Starterkit is only intenbded as a bootstrap.
  - For the inputs you will have to enter an API key ID & API key secret for the meshStack API user you created before.
  - Define the assignment types of the two outputs as follows:
    - github_repo_url: Resource Url
    - summary: Summary

## What’s Next?

- [Publish all building blocks](marketplace.platform-builder.md#publishing) so anyone in the organization can use it and provision namespaces in self-service.
