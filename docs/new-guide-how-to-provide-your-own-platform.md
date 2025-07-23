---
id: new-guide-how-to-provide-your-own-platform
title: How to Provide Your Own Platform
---

:::note What is this guide about?
This guide will show you how to offer your own platform to application teams using meshStack and terraform. This enables you to provide platforms in an easy fashion including cost management, lifecycle management, self-service provisioning and enforce a compliant level of security and governance.

Please be aware that you can also integrate your own platforms using other types of building blocks e.g. GitHub action or GitLab CI. This guide focuses on the Terraform implementation as it is the most common way to integrate platforms into meshStack.

:::

On a high level, you need the following and your platform integration is done:

1. Create a platform with its own name and icon.
2. Create a Building Block that does the automation in the background using Terraform
3. Create a Landing Zone that does the roll out of the Building Block.

## Prerequisites

- You have access to the Platform Builder in meshStack.
- You have the necessary platform credentials and configuration details.
- Terraform knowledge is helpful, as meshStack relies on Terraform for custom platform integrations.
- There is some kind of platform/tenancy organization model in the cloud platform, just like e.g. Azure (platform) has isolated Subscriptions (tenant).
- The above can be created & automated with Terraform.
- (optional) Users and groups can be assigned to the tenant via Terraform (this allows you to do permission management as well)

## Step-by-Step Guide

### 1. Create a platform

Follow [Create a Platform](new-guide-how-to-manage-a-platform.md) to create a new platform in meshStack.

Make sure to:

- Create a new platform type that matches your platform.
- Make sure you customize the platform with a fitting name and and icon.

✅ You now created a new platform with its own type.

### 2. Create a Building Block

Follow [Create a Building Block](new-guide-how-to-manage-buildingblocks.md) to create a new Building Block that will do the automation for your platform.

Make sure to configure the following details:

- Supported Platform: select the platform type you created in the previous step.
- How often assigned: Once
- Implementation Type: Terraform
- Terraform Version: enter what version you used to write the Terraform
- Git Repository URL: point this to the Git repository where your Terraform is
- Git Repository Path: if your Terraform files are under a directory in the repository, enter that path here
- Git Commit Hash: if you want, enter a Git commit hash so that meshStack will always use the Terraform files at this commit
- SSH Key: if the repository is private, enter an SSH Key here so meshStack can get access
- Known Hosts: if the Git instance is a self-hosted version, make sure to enter instance's hostname here so meshStack can securely authenticate with it.
- Deletion Mode: pick "Delete Resources" if you want meshStack to perform a `tf destroy` in the background when a user deletes a tenant for your platform.
- For the Inputs section: If you took the example from the GitHub repository mentioned above, you would enter 
   the inputs for each variable in the `variables.tf` file.
- For the Outputs section:
  - First, create a new output which represent a uniquely identifiable property of a tenant in your platform. For the example of the GitHub repository, it would be the name of the repository, which you can see in the `outputs.tf` under `repo_name`. Set the "Assignment Type" of this output to `Platform Tenant ID`.
  - Optionally, you can also add another output that represent a direct link to the tenant in the cloud platform. This has the benefit that meshStack will render this link and users can click it to open the tenant directly in their browser. In the GitHub example this is represented in the `outputs.tf` under `repo_html_url`. To do so, create a new output that matches the Terraform output and set the "Assignment Type" to `Sign in URL`.
  - Add the necessary Terraform code to the `main.tf` file in your Git repository that will create the tenant in your platform. Make sure to use the outputs you created above to return the tenant ID and sign-in URL.


🎉 The automation is now in place! It is time for the last step: we need to roll out the automation as part of a new landing zone.

### 3. Create a Landing Zone

1. Go to the Platform Builder area in meshPanel.
2. Open up the new Platform you created in Step 1.
3. Open the list of Landing Zones and click "Create new Landing Zone".
4. Enter a fitting name, description and tags (if applicable).
5. Under "Building Blocks" pick your newly created Building Block Definition and set it to "Mandatory".
6. Click "Save".

Application teams will now be able to see the new platform in the marketplace and create tenants like they do for any other platform in meshStack.

🙌 That's it! You created your own platform integration!

## Related Resources

### Concepts

- [Platform](new-concept-platform.md)
- [Building Block](new-concept-buildingblock.md)
- [Landing Zone](new-concept-landingzone.md)

### Guides

- [How to Manage Platforms](new-guide-how-to-manage-a-platform.md)