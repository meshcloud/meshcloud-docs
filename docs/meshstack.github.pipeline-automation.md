---
id: meshstack.github.pipeline-automation
title: Pipeline Automation
---

With meshStack, you can publish automation workflows in other platforms directly to the marketplace, allowing application teams to easily access and initiate automation in a user-friendly, structured format in a central place. By providing triggers for automation in the marketplace, you enable teams to leverage these workflows without needing in-depth Git expertise.

Platform engineers can offer "Pipeline Building Blocks" to trigger GitHub Action Workflows directly when added to a tenant. These building blocks can be published to the marketplace, creating a seamless experience for teams to use existing automations.

## Getting Started

> Prerequisites: Your organization should be using GitHub SaaS, GitHub Enterprise, or GitHub Enterprise Server.

**Note:** Follow Steps 1 and 2 only the first time you set up a GitHub Action Workflow integration. After the initial setup, you can go directly to Step 3 for additional triggers.

## Step 1: Set Up the GitHub Platform in meshStack

To set up GitHub as a platform, go to the Admin area in meshStack, select **Platforms**, and click on **Create New Platform** at the top right. Complete the required fields and select **GitHub** as the platform type.

## Step 2: Configure Pipeline Automation

Once GitHub is set up as a platform, you can configure pipeline automations to streamline the process under Settings → Configuration.

meshStack will utilize the GitHub API to [authenticate as an APP installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation). 

In order to do so meshStack needs to know

- the owner of the GitHub organization,
- the id of the GitHub App and
- the app’s private key to generate authentication tokens (JWT).

Those values are available to you once you [registered a GitHub app](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) and [installed it to a repository](https://docs.github.com/en/apps/using-github-apps/installing-your-own-github-app).\
In case you are using an enterprise version you will need to change the base URL to GitHub’s API from [https://api.github.com](https://api.github.com/) to whatever is the URL you use.

On the platform control plane you can select **Settings → Configuration** and the enter your data within the section for **Pipeline Automation.** You will find a button to test your configuration. Please note that testing the configuration is only possible at the time you upload the private key. Coming back later to the form will require you to re-upload the key to meshStack in order to test the integration again. Once you saved your configuration it can be enabled by clicking the **Turn On** button on the bottom of this page.

## Step 3: Create a Workflow Trigger

To make a GitHub Action Workflow trigger available in the marketplace, create a building block definition that references the specific workflow. Follow these steps:

1. In the Admin area, navigate to **Building Block Definitions** and click **Create New Definition** in the top right.
2. Provide the required configuration details for the trigger.
3. On the Implementation page:
    - Select the platform associated with the trigger (e.g., choose **AWS** if you are triggering an S3 bucket creation within AWS).
    - Choose **Pipeline Automation** in the **Implementation Type** dropdown.
    - Ensure you configure any necessary input fields to support the automation.

The dispatch event meshStack sends to GitHub in order to trigger the workflow will look like this:
```json
{
   "ref": "<ref>",
   "inputs": {
      "buildingBlockRun": "<encodedRun>"
   }
}
```
The value for `<ref>` is the Git reference specified in the configuration, e.g. the branch name or a commit hash.\
The value for `<encodedRun>` is a Base64 encoded version of a building block run object.\
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

This setup allows application teams to quickly and efficiently access automation workflows from the marketplace, enhancing their productivity and reducing the need for Git expertise.