---
id: new-concept-platform
title: Platform
---

Platforms can be be connected to meshStack to provide a cohesive experience to application teams. Platform teams register and configure platforms, enabling the provisioning and lifecycle management of tenants via meshStack.

## Platform Types and Instances

A **Platform Type** refers to the general category of platform, such as AWS, Azure, GCP, OpenStack, or Cloud Foundry.

A **Platform Instance** is associated with a platform type:

- **Public Cloud**: e.g. Azure (platform type) and Azure Tenant (platform instance). You may use multiple instances of the same platform type to represent different business units within your organization.

- **Private Cloud**: e.g. OpenShift (platform type) and OpenShift Dev Cluster (platform instance).

## Supported Platforms

meshStack supports various platforms out of the box:

- **Amazon Web Services (AWS)**
- **Microsoft Azure**
- **Azure Resource Groups**
- **Google Cloud Platform (GCP)**
- **OpenStack**
- **Cloud Foundry**
- **Kubernetes**
- **OpenShift**
- **AKS (Azure Kubernetes Service)**
- **GKS (Google Kubernetes Service)**

Furthermore we provide the option to onboard you very own platforms. For more information on how to establish a custom platform, refer to the [How to Establish a Custom Platform](new-guide-how-to-establish-a-custom-platform.md) guide.

## Restricted Platforms

A restricted platform is a platform instance that has limited access or usage within meshStack. Only authorized application teams or workspaces can provision tenants of restricted platforms. Platform Engineers can configure the workspaces individually under the platform settings in the platform builder.

## Your Own Platform - Custom Platforms

Although meshStack supports a wide range of platforms out of the box, you may have specific requirements that necessitate the use of custom platforms. 

There are two main reasons to use custom platforms:

1. **Offer self-built platforms**: You can build a business platform that hosts one or more business applications and their teams, and offer it to various departments internally. Examples include a Data Science Platform, AI Platform, or a digital production platform that runs the production line of your factories.

2. **Offer unsupported platforms**: Integrate managed platforms that are not supported out of the box by meshStack.

:::note 💡Tip
 We already built some cloud platform integrations with Terraform that we open sourced. You can find them in [meshStack Hub](https://hub.meshcloud.io)!
:::

![Platform Concept Diagram](./assets/new_concept/concept_platform.png)

## Related Resources

### Concepts

- [Building Blocks](/docs/new-concept-building-blocks)
- [Tenant](/docs/new-concept-tenant)
- [Platform Builder](/docs/new-concept-meshstackareas#platform-builder)
- [Resource Quota](/docs/new-concept-resource-quota)
- [Landing Zone](/docs/new-concept-landing-zone)
- [meshHub](/docs/new-concept-meshhub)

### Guides

- [How to Provide Your Own Platform](/docs/new-guide-how-to-provide-your-own-platform)
