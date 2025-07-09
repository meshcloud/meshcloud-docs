---
id: new-concept-platform
title: Platform
---

A Platform represents a connected cloud or service platform (e.g., AWS, Azure, GCP, OpenStack, Cloud Foundry) that can be managed and integrated with the system. Platforms are registered and configured by administrators and provide the foundation for provisioning Tenants.

A **Platform Type** refers to the general category of cloud or service platform, such as AWS, Azure, GCP, OpenStack, or Cloud Foundry. It defines the capabilities, integration methods, and supported features for that kind of platform.

A **Platform Instance** is a specific, configured connection to a particular environment or account within a Platform Type. For example, an organization may have multiple AWS accounts or Azure subscriptions, each represented as a separate Platform Instance. Each instance is registered with its own credentials, configuration, and metadata, allowing meshStack to manage and provision resources in that specific environment.
