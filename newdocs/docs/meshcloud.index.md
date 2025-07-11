---
id: meshcloud.index
title: Overview
slug: /
---

## Introduction

Welcome to the meshStack documentation! This part of the documentation is intended for end users
of the meshStack platform. Be aware that meshStack might be rebranded in your organization and has a different name,
but everything you find in the documentation will apply to the meshStack you are using as well.

meshStack is useful for anyone who wants to use platform services in their organization and manage their costs.
Maybe you are an Application team that wants to create a few cloud projects in Microsoft Azure or Google Cloud,
use an organization-specific service like an On-Premise network connector, or maybe you are a Project Manager that
wants to manage the budget of a cloud project.

The actual cloud platforms and services that are available to you depend on the setup of the meshStack and your organization.
One organization might only offer Microsoft Azure, but another might offer all major cloud providers. Your meshStack will automatically
reflect whatever is available in your case.

## Concepts

To work with meshStack, the following concepts are of importance:

- [Workspace](./meshcloud.workspace.md): The workspace is the highest level that you will work with. In here, you will invite
  your entire team of managers, developers and more. In the workspace you will create one or more projects.
- [Project](./meshcloud.project.md): The project is a cloud-agnostic concept which usually maps to an environment of an application
  that you and your team are developing. The project will have a payment method assigned that acts as the budget. On the project
  you invite team members that are needed for that environment, e.g. for a production project you will invite your SRES. Within
  the project, you will have one or more cloud tenants.
- [Tenant](./meshcloud.tenant.md): The tenant is an isolated and tangible place in an actual cloud provider. It depends on what cloud
  you use what this maps to. For example for AWS this maps to an `Account`, for Azure this is a `Subscription` and for Google Cloud
  it is a `Project`. meshStack can easily let you log in and redirect you to the tenant in the respective cloud provider.
- [Landing Zone](./meshcloud.landing-zones.md): The landing zone is a template created by your organization that you pick
  when you create a new tenant. It cannot be changed afterward. The idea of the landing zone is that you already get a set
  of policies and perhaps resources to start using the cloud right away according to the compliance and best practices
  of your organization.
- [Building Blocks](./administration.building-blocks.md): A building block is a piece of infrastructure that can be booked
  by you on top of a tenant. The library of Building Blocks is fully maintained by your administration team, so it depends on
  what is available to you. You can view the library in the meshPanel.
- [Platform](./meshcloud.platforms.md): The platform is the actual cloud platform that you can use to create a new tenant
  and start consuming the cloud. When you create a new project, you can select which platform(s) you want to use and the
  respective tenants will be created in the background.

## meshPanel

The meshPanel is the self-service user interface for meshStack and provides different control planes to manage various aspects of your workspace depending on your rights:

- [workspace control plane](./meshcloud.workspace.md#managing-your-meshworkspace): Manage the access of your team members in your [meshWorkspace](./meshcloud.workspace.md), change the tags or check the available payment methods for your meshWorkspace.

- [project control plane](./meshcloud.project.md#manage-meshprojects): Get an overview of all tenants of your [meshProject](./meshcloud.project.md). Add new team members to it or change the payment methods of your project.

- [tenant control plane](./meshcloud.tenant.md#using-your-tenant): Access the platform of your [meshTenant](./meshcloud.tenant.md), request Quotas for it or check the [usage reports](./meshcloud.project-metering.md#tenant-usage-reports).

The above description serves as an example what you are able to do as Workspace Manager. Workspace Members will have a lot less
access rights. Check out [Workspace Roles](./meshcloud.workspace.md#meshworkspace-roles) for more details.

> If you are an administrator, please be aware that there are a lot more user interfaces available
> to you. Read more in the [Admin Docs](./meshstack.index.md)

### Supported Browsers

- Firefox ESR
- last 2 Firefox versions
- last 2 Chrome versions

If you experience problems with other browsers like Edge (Chromium), Safari or with mobile browser let us know.
We are interested to make that work as well!

## Contributing

This documentation is open source! Please feel free to hit the `Edit` button any time and help us [improve](https://github.com/meshcloud/meshcloud-docs/blob/master/CONTRIBUTING.md) the documentation. Your feedback is very welcome.

## Getting Updates

We release regularly and provide weekly updates. If you want to stay on top of changes in meshStack you can use the following: 

- Have a look at the roadmap on the website under [www.meshcloud.io](https://www.meshcloud.io/en/product/).
- Subscribe to the [Product Newsletter](https://share.hsforms.com/1AbELCsdRRP6EaCkm1UeATwc0hrp) which is sent out every two weeks summarizing the most important changes.
- Have a look at the [release notes](/blog) or follow either one of [RSS](/blog/feed.xml) or [atom](/blog/atom.xml) directly. 
