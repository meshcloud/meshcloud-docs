---
id: meshstack.building-pipeline-integration
title: Connecting meshStack and a Pipeline
---

In this section you may find information about how to:

1. Trigger a pipeline via meshStack to deploy and delete resources
2. Update users on the progress of an external automation 

## Trigger a Pipeline

Please find below the steps that are required to trigger an external automation via meshStack.

### 1. Preparation

At the moment we don't provide a native integration into any CI/CD tooling but we offer a neat way to trigger external systems via Building Blocks. In order to trigger a pipeline you may use the Terraform Building Block template below as a place to start. The module below can be used to trigger Github actions, we call this module "Trigger Module".

The strucutre of the module is as follows:

- [**main.tf**](./assets/terraform_examples/pipeline_main): Calls webhooks that are used to trigger Github actions via terraform apply and terraform destroy
- [**variables.tf**](./assets/terraform_examples/pipeline_var): Variables necessary for the integration with GitHub

Host your version of the module in a repository of your choice.

### 2. Creating the Building Block Definition

In order to provide an existing automation you already got covered in a pipeline triggered by meshStack you need to prepare a Building Block Definition. We advise to create this Definition in one of the workspaces that have "service management" enabled. Make sure to use the Building Block Definition of type Terraform/OpenTofu and provide the information for the repository hosting your version of the "Trigger Module".

We advise to use a distinct name for the Building Block Definition that describes the outcome of the automation in the pipeline.

### 3. Publish to the Marketplace

Now you may [publish](./marketplace.service-management-area.md#publishing) the Building Block to the **marketplace**. Now a new service will appear in the marketplace that when ordered will trigger your pipeline.

## Update Status of a Building Block

With meshStack you have the ability to provide custom status to you users to update them about the progress of the pipeline execution e.g. AWS bucket was create or inform them about issues during the execution. 

> In order to do that you must have [API keys](meshstack.how-to-API-keys.md) for workspaces enabled. If this is not the case please reach out to your administrators.

### Building Block Run and Steps

In meshStack the execution of a Building Block from beginning till end is called a **run**. A run can have multiple **steps**. You have complete freedom about the granularity of information you share with your users.

We have issued API documentation [here](./apis.index.md).

#### Available States for Runs and Steps

meshStack comes with some defined statuses for Building Block runs and steps that provide users insights about the current situation. You can use them as you see fit. Available statuses are:

- IN_PROGRESS: When a Building Block run has been started and is in progress
- SUCCEEDED: When a Building Block run or step has been successfully completed
- FAILED: When a Building Block run or step has failed to complete
- PENDING: When a Building Block run has been started but is waiting for an external system

When ever a run was successful but meshStack did not receive a success for one or more steps meshStack shows a warning to the operator and user.

#### Operator and User Messages

Besides a status meshStack can also show custom user message in the workspace consuming the service and operator messages to the provider of the Building Block Definition.