---
id: meshstack.aks-developer-platform-quickstart-guide
title: AKS Developer Platform Guide
---

## Introduction

Welcome to the **Azure Developer Platform Guide**!
This guide provides step-by-step instructions to help you set up your developer platform experience
incorporating Azure Subscriptions, GitHub & GitHub Actions to deliver an easy-to-use starter kit to your application teams.

## Goals

By the end of this guide, you will have built a complete starter kit for your users that will provide:

- A new GitHub repository
- A meshStack project with:
  - a Azure subscription
  - a GitHub actions workflow with credentials to the Azure subscription

## Prerequisites

Before starting, ensure you have the following:

- You have a basic understanding of building blocks in meshStack.
  - *If you don’t, we recommend running through the [AWS S3 guide](./meshstack.building-aws-quickstart-guide.md) to learn how building blocks work.*
- You have integrated Azure as a platform in meshStack.
  - *If you don’t, we recommend running through the [Platform Setup guide](./meshstack.how-to.integrate-meshplatform.md) where you are guided to create an Azure platform in meshStack*

## What Will We Do in This Guide?

Shortly put, we will set up the following in this guide:

- A building block definition that allows application teams to provision new GitHub repositories.
- A building block definition that adds a GitHub Action workflow with the right credentials for the Azure subscription so application teams have an out-of-the-box working Azure CI/CD.
- A building block definition that combines all these elements & more into a single packaged starter kit.

## 1. GitHub Repository

### Preparing GitHub Repository

<-- Internal note: this part is completely copied from the AKS Dev Platform guide -->

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

<-- TODO this Step 2 section is unfinished because Azure starter kit is not in hub yet! -->

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
  - “Admin: Create and update Tenants in any Workspace as well as import existing platform tenants”
  - “Admin: List Tenants in any Workspace”

### Creating the Building Block Definition

As the starter kit is very individual to your meshStack (project tags, definition IDs, platform IDs) it is not possible to directly reference a public example, but we provide a template below where you can fill in the missing information.

You can also change the behavior if you want in this starter kit. In its current behavior it will create a workspace building block GitHub repository, one project with an Azure Subscription and a GitHub Actions connector.

- Take the following Terraform code snippet and place it in a Git repository of choice that you can access from your meshStack. Make sure you fill in locals with your own values.

    ```hcl
    locals {
      # TODO: fill in the values here
      # github_repo_definition_uuid = "TODO" # UUID of the GitHub repo definition
      github_repo_definition_version_uuid = "TODO" # UUID of the GitHub repo definition version
      github_connector_definition_uuid = "TODO" # UUID of the GitHub connector definition
      azure_platform_identifier = "azure" # Platform identifier for the Azure platform
      azure_location_identifier = "my-azure-location" # Location identifier for the Azure platform
      landing_zone_identifier = "azure-lz" # Landing zone identifier for the Azure platform
    }
    
    # main.tf
    resource "meshstack_project" "project" {
      metadata = {
        name               = var.project_name
        owned_by_workspace = var.workspace_identifier
      }
    
      spec = {
        display_name = var.project_name
        
        # Fill in project tags with your own values (if needed)
        # tags = {
        #   "environment"          = ["dev"]
        # }
      }
    }

    resource "meshstack_tenant" "azure" {
      metadata = {
        owned_by_workspace  = var.workspace_identifier
        owned_by_project    = meshstack_project.project.metadata.name
        platform_identifier = "${locals.azure_platform_identifier}.${locals.azure_location_identifier}"
      }
    
      spec = {
        landing_zone_identifier = locals.landing_zone_identifier
      }
    }
    
    resource "meshstack_building_block_v2" "repo" {
      spec = {
        building_block_definition_version_ref = {
          uuid = locals.github_repo_definition_version_uuid
        }

        display_name = "GitHub Repo ${var.repo_name}"
        target_ref = {
          kind       = "meshWorkspace"
          identifier = var.workspace_identifier
        }

        inputs = {
          repo_name = {
            value_string = var.repo_name
          }

          template_owner = {
            value_string = "likvid-bank"
          }

          template_repo = {
            value_string = "starterkit-template-azure-static-website"
          }

          use_template = {
            value_bool = true
          }
        }
      }
    }

    resource "time_sleep" "wait" {
      depends_on = [meshstack_building_block_v2.repo]

      create_duration = "2m"
    }

    resource "meshstack_buildingblock" "github_actions_terraform_setup" {
      depends_on = [time_sleep.wait]

      metadata = {
        definition_uuid    = locals.github_connector_definition_uuid
        definition_version = 3 # TODO this seems flaky
        tenant_identifier  = "${var.workspace_identifier}.${var.project_name}.${locals.azure_platform_identifier}.${locals.azure_location_identifier}"
      }

      spec = {
        display_name = "GitHub Actions Terraform Setup"

        # TODO: clarify with Henry, this is not modelled via dependencies but by reentering the repo name.
        inputs = {
          repo_name = { value_string = var.repo_name }
        }
      }
    }
    ```

- Create a new building block definition in meshStack. Make sure you set the following:
  - Type = Workspace Building Block
  - Implementation Type = Terraform
  - For the inputs you will have to enter an API key ID & API key secret for the meshStack API user you created before.

## What’s Next?

- [Publish all building blocks](./marketplace.service-management-area.md#publishing) so anyone in the organization can use it and provision namespaces in self-service.
