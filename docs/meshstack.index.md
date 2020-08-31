---
id: meshstack.index
title: Overview
---
<h3 style="margin-top: 0">Welcome to the meshStack Documentation!</h3>

meshStack is the name of our technology that powers the meshcloud solution. This document is targeted at cloud architects and SREs and introduces the components of meshStack and their interaction.

It is a modular software platform solution that connects organizational processes like project and access management with cloud technology. It provides a unified administration interface to the organization while replicating configuration into attached cloud platforms.

It is NOT a meta-layer across clouds. Users access native cloud APIs for their deployments, but meshStack helps them to ensure a proper and common configuration across cloud technologies with additional functionality such as metering, billing, surveillance and others.

![meshStack Context and Components](assets/meshstack-chart.svg)

## Integrations

Integrating a cloud platform with meshStack generally consists of these steps:

- prepare the cloud platform for integration (Service Accounts, [Identity Federation](./meshstack.identity-federation.md))
- configure & [register the platform](./meshstack.platform-location.md) in meshStack
- provide Landing Zone implementations
- configure [Metering & Billing](./meshstack.billing.md)

Please review the detailed documentation for each cloud platform type in the sidebar for more details.

### meshModel mapping to Cloud Platform Concepts

Different Cloud technologies often introduce their own terms for similiar technological principles. In order to match them against each other and also show how this namings and technologies map to meshcloud's terminology of business entities.
These mappings can be customized. For more details, please consult documentation of the platforms.

The connections are shown in the following matrix table:

|               | [meshCustomer](./meshcloud.customer.md) | [meshProject](./meshcloud.project.md) | [meshUser](./meshcloud.profile.md) | [Landing Zone](./meshcloud.landing-zones.md) |
| :-----------: | :-------------------------------------: | :-----------------------------------: | :--------------------------------: | :-----------------------------------------: |
|   OpenStack   |              Domain (optional)          |                Project                |        Keystone Shadow User        |                    Quota                    |
| Cloud Foundry |              Organization               |                 Space                 |              UAA User              |                    Quota                    |
|  Kubernetes   |                    -                    |               Namespace               |            Rolebinding             |               YAML Templates                |
|   OpenShift   |                    -                    |                Project                |                User                |               YAML Templates                |
|      AWS      |                    -                    |                Account                |              IAM Role              |      CF StackSets / Organization Units      |
|     Azure     |                    -                    |             Subscription              |              AAD User              |        Blueprints / Management Groups        |
|      GCP      |                    -                    |                Project                |              GCD User              |     Organization Policy / GDM Template      |
