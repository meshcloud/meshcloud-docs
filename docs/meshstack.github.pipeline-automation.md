---
id: meshstack.github.pipeline-automation
title: GitHub Actions Building Blocks
---

With meshStack, you can publish your GitHub Action Workflows directly to the marketplace, allowing application teams to easily access and initiate automation in a user-friendly, structured format in a central place. By providing triggers for automation in the marketplace, you enable teams to leverage these workflows without needing in-depth Git expertise.

Platform engineers can offer "GitHub Actions Building Blocks" that trigger a GitHub Action Workflow. These building blocks can be published to the marketplace, creating a seamless experience for teams to use existing automations.

## Getting Started

> Prerequisites: Your organization should be using GitHub SaaS, GitHub Enterprise, or GitHub Enterprise Server.
> Furthermore in order to integrate the GitHub Platform and execute this guide you need organization owner rights within GitHub.
> Additionally, to add individual GitHub Action Workflows, you need Read and Write access for Actions under the repository permissions.

**Note:** Follow Steps 1 and 2 only the first time you set up a GitHub Action Workflow integration. After the initial setup, you can go directly to Step 3 for additional triggers.

## Step 1: Set Up the GitHub Platform in meshStack

To set up GitHub as a platform, go to the Admin area in meshStack, select **Platforms**, and click on **Create New Platform** at the top right. Complete the required fields and select **GitHub** as the platform type.

## Step 2: Configure Pipeline Automation

Once your GitHub platform is created you will need to configure it. Do so by going to **Settings → Configuration → Pipeline Automation**.

First of all you will need a so-called GitHub App. This is what meshStack uses to [authenticate to GitHub](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) to talk to the GitHub API.

[Click here](https://github.com/settings/apps/new?name=meshStack-action-trigger&description=Provide%20meshStack%20with%20the%20ability%20to%20trigger%20GitHub%20Action%20Workflows&public=false&actions=write&url=https%3A%2F%2Fmeshcloud.io&webhook_active=false) to create a new GitHub App with the right permissions.

Once you have your GitHub App, meshStack needs to know the following to be integrated with GitHub:

- the owner of the GitHub organization
- the ID of the GitHub App
- the app’s private key (this is a .pem file)

Those values are available to you once you [installed the GitHub App to a repository](https://docs.github.com/en/apps/using-github-apps/installing-your-own-github-app) and [generated a private key](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps#generating-private-keys).

> If you are using an enterprise version you will need to change the base URL to GitHub’s API from `https://api.github.com` to whatever is the URL you use.

Once you entered the above configuration you can test your configuration by clicking the "Test Configuration" button. Please note that testing the configuration is only possible at the time you upload the private key. Coming back later to the form will require you to re-upload the key to meshStack in order to test the integration again.

Once you saved your configuration it can be enabled by clicking the **Turn On** button on the bottom of this page.

## Step 3: Create a Workflow Trigger

To make a GitHub Action Workflow trigger available in the marketplace, create a building block definition that references the specific workflow. Follow these steps:

1. In the Admin Area or Platform Builder, navigate to **Building Block Definitions** and click **Create New Definition** on the top right.
2. Choose **GitHub Actions** as the implementation type.
3. Provide all required configuration details for the trigger.
4. On the Implementation page enter:
   - The name of the repository where the workflow file lives
   - The Git reference (branch or commit hash) that contains the workflow file
   - The name of the workflow file within the repository (you don't have to enter the .github/workflows/ prefix, just the file name)
   - If desired you can also have a specific workflow triggered when the building block gets deleted.
     If you want to do so, set "Deletion Mode" to "Delete Resources" and enter the name of the destroy workflow file below.
5. Continue with the rest of the building block definition creation process.

The dispatch event meshStack sends to GitHub in order to trigger the workflow will look like this:

```json
{
   "ref": "<ref>",
   "inputs": {
      "buildingBlockRun": "<encodedRun>"
   }
}
```

The value for `<ref>` is the Git reference specified in the configuration, e.g. the branch name or a commit hash.
The value for `<encodedRun>` is a Base64 encoded version of a building block run object.
Please consider the following example for a run:

```json
{
  "kind": "meshBuildingBlockRun",
  "apiVersion": "v1",
  "metadata": {
    "uuid": "19fe93f0-36d0-4019-9453-7f6f4ce490b4"
  },
  "spec": {
    "runNumber": 7,
    "buildingBlock": {
      "uuid": "3f7ee35a-a1d0-43d1-8ca7-dedbf9fd44b6",
      "spec": {
        "displayName": "name-of-buildingBlock",
        "workspaceIdentifier": "workspace-identifier",
        "projectIdentifier": "project-identifier",
        "fullPlatformIdentifier": "full-tenant-identifier",
        "inputs": [
          {
            "key": "input-key",
            "value": "test",
            "type": "STRING",
            "isSensitive": false,
            "isEnvironment": false
          }
        ],
        "parentBuildingBlocks": []
      }
    },
    "buildingBlockDefinition": {
      "uuid": "4334947b-f48f-4cf2-bb75-0f24b2ada6e0",
      "spec": {
        "version": 6,
        "implementation": {
          "type": "GITHUB_WORKFLOW"
        }
      }
    },
    "behavior": "APPLY"
  },
  "status": "IN_PROGRESS",
  "_links": {
    "registerSource": {
      "href": "https://federation.dev.meshcloud.io/api/meshobjects/meshbuildingblockruns/19fe93f0-36d0-4019-9453-7f6f4ce490b4/status/source"
    },
    "updateSource": {
      "href": "https://federation.dev.meshcloud.io/api/meshobjects/meshbuildingblockruns/19fe93f0-36d0-4019-9453-7f6f4ce490b4/status/source/{sourceId}"
    },
    "meshstackBaseUrl": {
      "href": "https://federation.dev.meshcloud.io"
    }
  }
}
```

The GitHub workflow needs to specify exactly one input like this:

```yaml
on:
  workflow_dispatch:
    inputs:
      buildingBlockRun:
        description: "Building Block Run Object"
        required: true
```

This setup allows application teams to quickly and efficiently access automation workflows from the marketplace, enhancing their productivity and reducing the need for Git expertise.

### Status Updates

meshStack does not monitor the status of the GitHub Action Workflow. This means by default the pipeline will stay "In Progress" indefinitely after triggering the workflow. This is because meshStack does not have a built-in mechanism to track the completion or failure of GitHub Actions workflows.

However, you can use the meshStack API to update the status during and after the execution of the workflow. We highly recommend using our pre-built GitHub Actions workflow steps to do so.

You will need an [API Key](meshstack.how-to-API-keys) to authenticate with the meshStack API.

You should do two things within the pipeline to update the status of the run:

- Register Sources. This is something you do at the beginning of a run. It lets meshStack know what step(s) can be expected by the pipeline
- Update Status. This updates the status of a single step in the process.

We highly recommend having a look at [this example](https://github.com/likvid-bank/likvid-cloudfoundation/blob/main/.github/workflows/ionos-cp-workflow.yml) where you can see all of these steps being done.
