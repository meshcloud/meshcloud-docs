---
id: key-concepts-guide
title: Key Concepts Guide
---

## Introduction

Welcome to the **meshStack Key Concepts guide**! This guide provides a step-by-step introduction to meshStack's most important concepts.

## Goals

By the end of this guide, you will have:

1. Learned about key concepts like [workspaces](../concepts/workspace.md) and [building blocks](../concepts/building-block.md)
2. A good mental model of how these concepts fit together to build powerful developer platforms

## Key Concepts Overview

### Workspaces and Building Blocks

Every application team using meshStack has their own [workspace](../concepts/workspace.md). A workspace is a logical container for all resources related to a specific application or software project. 

A [building block](../concepts/building-block.md) is the primitive unit of automation in meshStack. A building block has a number of inputs, an implementation, and outputs. Application teams can add building blocks to their workspace by referencing a [building block definition](../concepts/building-block.md#building-block-definition) published by the platform team.

Building block definitions are versioned contracts that define how an automation receives input values and produces outputs. The most common way to implement a building block is using [OpenTofu](https://opentofu.io/), but as definitions are just versioned contracts, it's also possible to swap in other implementation types like [GitHub Actions](../concepts/building-block.md#github-actions) or [GitLab CI/CD](../concepts/building-block.md#gitlab-cicd) pipelines.

:::tip
**Example**: The platform team has published a [GitHub Repository building block definition](https://hub.meshcloud.io/platforms/github/definitions/github-repository). Application teams can add this building block to their workspace and provide the necessary input values like their desired repository name. The building block implementation is a Terraform module that will then create the repository in GitHub and return the repository URL as an output.
:::

### Building Block Dependencies

Very often, platform teams need to model dependencies between building blocks. For example, a building block that creates a Kubernetes namespace might depend on another building block that provisions the Kubernetes cluster itself. Platform teams can therefore define dependencies between building block definitions that prescribe how inputs and outputs are wired together into a directed acyclic graph (DAG).

meshStack automatically orchestrates the reconciliation of building blocks based on these dependencies. The orchestration engine ensures that building blocks are applied in the correct order and that any input/output value changes are propagated through the dependency graph.

:::tip
**Example**: The platform team wants to offer a [building block that enables deployments from GitHub Actions to Kubernetes](https://hub.meshcloud.io/definitions/aks-github-connector). This building block depends on the "GitHub Repository" building block to receive the repository URL as an input. An application team can easily add that new building block to their workspace, and meshStack will help wire everything together.
:::

### The Marketplace

We now know how to model simple platform engineering use cases using building blocks, dependencies and workspaces. Most platform teams need to offer a comprehensive set of building blocks to application teams. The [marketplace](../concepts/marketplace.md) is the central service catalog in meshStack where application teams can discover building blocks. Platform teams can publish building block definitions to the marketplace and curate additional metadata like documentation, categories, and tags to make them easier to find.

:::tip
**Example**: Application teams can browse the marketplace to find building blocks that are relevant to them. They can search for specific building blocks, filter by categories like "CI/CD" or "Kubernetes," and read documentation to understand how to use each building block. They can even ask [meshStack Copilot](../concepts/copilot.md) for recommendations based on their needs.
:::

### Tenants and Projects

The marketplace can quickly grow to a large number of building blocks, and relationships between building blocks can become overwhelmingly complex. To help manage this complexity, meshStack includes additional structuring concepts for common use cases.

Most cloud platforms like AWS or Azure have the concept of an "account" or "subscription" that provides a boundary in the resource hierarchy between different workloads. Kubernetes provides a weaker isolation model using namespaces. Because these boundaries are such a central concept that many building blocks need to reference, meshStack explicitly models them as [tenants](../concepts/tenant.md). 

Application teams can associate building blocks directly with a specific tenant. This allows building blocks to automatically receive tenant-specific information like an AWS account ID as an input without having to model a separate "AWS Account" building block and adding it as a dependency to every other building block. You can think of tenants as an easy way to cluster building blocks together and wrap them in a shared context.

This clustering is useful because most application teams need to manage multiple stages for their software projects, e.g., "development" and "production". It is a security best practice to use separate infrastructure for these, so many application teams will need "two of everything" in their workspaces. Tenants provide a natural way for platform teams to model these clusters.

But what if an application team needs more than a single tenant per stage? For example, if they have a hybrid cloud application that needs both AWS and Azure resources for each stage? A [project](../concepts/project.md) provides a logical grouping of tenants with additional metadata like a project name, description, and tags. Application teams can create multiple projects in their workspace and assign tenants to each project.

:::tip
**Example**: An application team wants to create a Kubernetes application. They set up two projects in their workspace: "development" and "production," with each project containing a tenant representing a separate Kubernetes namespace. Each tenant can have its own building blocks for resources like databases, storage, and networking that are specific to that namespace.
:::

### Platforms and Landing Zones

So far, we have introduced the concept of a tenant but have not explained how tenants are created and managed. Most platform teams want to enforce certain standards and policies for tenants to ensure security and compliance. This process is sometimes referred to as "account vending" or "subscription provisioning". To help with this, meshStack provides two important concepts to structure tenant creation and management: [platforms](../concepts/platform.md) and [landing zones](../concepts/landing-zone.md).

A platform is an integration between meshStack and a cloud platform like an AWS Organization, a Microsoft Entra Tenant, or a Kubernetes cluster. Platform teams have two choices for how to integrate a platform with meshStack. They can leverage first-party integrations natively supported by meshStack or define a [custom platform](../guides/developer-portal/how-to-provide-your-own-platform.md). For native integrations, meshStack has built-in automation for creating and managing tenants on the target platform as well as additional capabilities for IAM and tagging. For custom platforms, platform teams can define a building block that provisions the tenant on the target platform.

With either approach, platform teams can define a [landing zone](../concepts/landing-zone.md) that prescribes how new tenants are set up. A landing zone is a collection of building blocks that are automatically applied whenever a new tenant is created. This allows platform teams to enforce organizational standards and policies by including building blocks for things like identity and access management, networking, and monitoring in the landing zone.

:::tip
**Example**: A platform team has set up a platform for AWS using the native AWS Organizations integration. They have defined a landing zone that includes building blocks for setting up IAM roles, VPCs, and CloudTrail logging. Whenever an application team creates a new tenant in their workspace, meshStack automatically applies the landing zone building blocks to set up the AWS account according to the organization's standards.
:::

### Golden Paths and Compositions

To simplify the onboarding experience for application teams, platform teams often want to define a golden path. A golden path is a curated experience that guides application teams through the process of setting up their workspace and deploying their applications.

In meshStack, platform teams can define golden paths using compositions. A composition is a predefined set of building blocks and their configurations that represent a common use case or architecture pattern. Unlike the other concepts introduced so far, compositions are not a first-class concept in meshStack but rather a convention that platform teams can use to bundle building blocks together. In simple terms, a composition is a building block that uses the [meshStack terraform provider](https://registry.terraform.io/providers/meshcloud/meshstack/latest/docs) to create and manage other resources like projects, tenants, and building blocks in a workspace. 

Compositions can be published to the marketplace like regular building block definitions. Application teams can then add a composition to their workspace and provide high-level configuration values. The composition will then take care of creating and configuring all the necessary building blocks, tenants, and projects in the background. This is a very powerful approach because it allows platform teams to flexibly define golden paths using the full expressiveness of Terraform while still leveraging all the benefits of meshStack like dependency management, orchestration, and the marketplace.

:::tip
**Example**: A platform team wants to offer a golden path for deploying a standard web application on a shared AKS managed centrally by the platform team. They call this the [AKS Starterkit](https://hub.meshcloud.io/definitions/aks-starterkit). The starterkit is a composition that sets up a workspace-level "GitHub Repository" building block for hosting the application code and two projects with Kubernetes namespace tenants (development and production). Each of these tenants gets a "GitHub Actions Connector" building block that creates a Service Account for GitHub Actions to deploy to the respective namespace. The repository is already seeded with a template GitHub Actions workflow that deploys to the correct namespace based on the branch. Application teams can now easily onboard to this golden path by adding the composition to their workspace and providing a few configuration values like their desired repository name.
:::