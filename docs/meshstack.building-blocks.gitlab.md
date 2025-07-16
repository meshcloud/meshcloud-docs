---
id: meshstack.building-blocks.gitlab
title: GitLab Building Blocks
---

With meshStack, you can publish your GitLab CI/CD Pipelines directly to the marketplace with meshStack
[building blocks](administration.building-blocks). This allows application teams
to easily access and initiate your automation in a user-friendly, structured format in a central place.
By providing triggers for your automation in the marketplace, you enable teams to leverage these workflows without needing in-depth Git expertise.

> **Note:** This type of building block does not track pipeline status automatically.
> You are responsible for updating the building block status in meshStack (success/failure)
> from within your GitLab pipeline using the meshStack API. We have templates available to help you with this (more on this below).

## How It Works

When a GitLab CI/CD building block is executed:

1. meshStack triggers your GitLab pipeline using a **pipeline trigger token**.
2. Your pipeline will be run in your GitLab project.
3. The pipeline calls back into meshStack to update the execution status of the building block (this is something you have to implement in your pipeline)
4. ✅ The pipeline is finished and the application team can see the result in their workspace.

## How to Create a GitLab Building Block

Start by creating a new building block definition in meshStack. Choose the type **GitLab CI/CD** and fill in all required fields.
A few important details to note during this process:

- meshStack authenticates to your GitLab instance using a [pipeline trigger token](https://docs.gitlab.com/ci/triggers/#create-a-pipeline-trigger-token). This token is generated in your GitLab project settings.
- If your pipeline takes in any inputs, you can define these in the building block definition step "Inputs".
  Make sure you provide these as "GitLab CI/CD Inputs" (this is the default).
  Alternatively, you can also provide them as "Environment Variables", if required.

### Adapting your Pipeline to Provide Status Updates

To ensure that the building block status is updated correctly in meshStack, you need to modify your GitLab pipeline to
include steps that call back the meshStack API to update the status. We recommend using our
[GitLab CI/CD Components](https://gitlab.com/meshcloud/meshstack-integration) for this. Alternatively, you
can also completely build this yourself using the [meshBuildingBlockRun API](pathname:///api/index.html#mesh_buildingblockrun)

<!-- TODO HENRY TEMPLATES -->
