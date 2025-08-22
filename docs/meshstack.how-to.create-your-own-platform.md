---
id: meshstack.how-to.create-your-own-platform
title: How to create your own platform
---

## Introduction

meshStack comes with quite some platform integrations out of the box, like the hyperscalers (AWS, Azure & GCP), and also some private clouds like OpenShift.
But in some cases, those integrations might not be enough and you want to have another integration to a cloud platform that is not supported out of the box.

Luckily, this is possible in meshStack! You can completely create your own platform through three different layers and give your workspace users the same
great experience of tenant creation, permission management & more.

Automated platform integrations have the following requirements:

- There is some kind of platform/tenancy organization model in the cloud platform, just like e.g. Azure has an AAD (platform) and Subscriptions (tenant).
- The above can be created & automated with Terraform.
- (optional) Users and groups can be assigned to the tenant via Terraform (this allows you to do permission management as well)

> **💡Tip**: we already built some cloud platform integrations with Terraform that we open sourced. You can find them in [meshStack Hub](https://hub.meshcloud.io)!

On a high level, you need the following and your platform integration is done:

1. Create a platform with its own name and icon.
2. Create a Building Block that does the automation in the background using Terraform
3. Create a Landing Zone that does the roll out of the Building Block.

In this guide, you will read step-by-step how you can achieve the above.

> If you want to have a real-world Terraform example at hand throughout this guide, have a look
> [here](https://github.com/meshcloud/meshstack-hub/tree/main/modules/github/repository/). 
> This module manages GitHub repositories as a tenant in meshStack.

## Step 1: Create a platform

1. Go to your meshStack Admin Area and click on "Platforms -> Platforms" on the left-hand side.
2. Click on "Create Platform".
3. For the field "Platform Type", open the dropdown and click "Create new Platform Type".
4. In this modal, enter a fitting name and identifier for your new platform type.
5. Also make sure you upload an image of your cloud platform that matches the given requirements.
6. Click on "Create" and continue the platform creation wizard.

✅ You now created a new platform with its own type. But it does not have any automation or landing zone, so it
is not usable yet. Let's continue...

## Step 2: Create a Building Block

1. Go to the meshStack Admin Area and click on "Marketplace -> Building Block Definitions" on the left-hand side.
2. Click on "Create new Definition" and fill in some general information like name and description.
3. On the next page, set the following:
   - Supported Platform: select the platform type you created in Step 1.3
   - How often assigned: Once
   - Implementation Type: Terraform
   - OpenTofu Version: enter what version you used to write the OpenTofu
   - Git Repository URL: point this to the Git repository where your Terraform is
   - Git Repository Path: if your Terraform files are under a directory in the repository, enter that path here
   - Git Commit Hash: if you want, enter a Git commit hash so that meshStack will always use the Terraform files at this commit
   - SSH Key: if the repository is private, enter an SSH Key here so meshStack can get access
   - Known Hosts: if the Git instance is a self-hosted version, make sure to enter instance's hostname here so meshStack can securely authenticate with it.
   - Deletion Mode: pick "Delete Resources" if you want meshStack to perform a `tf destroy` in the background when a user deletes a tenant for your platform.
4. Go to the next page and skip the Dependency selection.
5. For the Inputs section, make sure you add all necessary inputs that the Terraform needs to perform properly like variables but also authentication environment variables.
   This section highly depends on your Terraform so make sure you inspect it well. If you took the example from the GitHub repository mentioned above, you would enter 
   the inputs for each variable in the `variables.tf` file.
6. Go the next page, which is outputs, and create a new output which represent a uniquely identifiable property of a tenant in your platform. For the example
   of the GitHub repository, it would be the name of the repository, which you can see in the `outputs.tf` under `repo_name`.
   Set the "Assignment Type" of this output to `Platform Tenant ID`.
   - Optionally, you can also add another output that represent a direct link to the tenant in the cloud platform. This has the benefit that meshStack
     will render this link and users can click it to open the tenant directly in their browser. In the GitHub example this is represented in the `outputs.tf` under `repo_html_url`.
     To do so, create a new output that matches the Terraform output and set the "Assignment Type" to `Sign in URL`.
7. Create the new Building Block definition.

🎉 The automation is now in place! It is time for the last step: we need to roll out the automation as part of a new landing zone.

## Step 3: Create a Landing Zone

1. Go to the meshStack Admin Area and click on "Platform -> Platforms" on the left-hand side.
2. Open up the new Platform you created in Step 1.
3. Open the list of Landing Zones and click "Create new Landing Zone".
4. Enter a fitting name, description and tags (if applicable).
5. Under "Building Blocks" pick your newly created Building Block Definition and set it to "Mandatory".
6. Click "Save".

🙌 That's it! You created your own platform integration!

Workspace users will now be able to create new tenants using your new platform just like they do for any other platform in meshStack.
