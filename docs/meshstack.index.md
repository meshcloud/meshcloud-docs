---
id: meshstack.index
title: Overview
---
<h3 style="margin-top: 0">Welcome to the meshStack Documentation!</h3>

meshStack is the name of our technology that powers the meshcloud solution. This document is targeted at cloud architects and SREs and introduces the components of meshStack and their interaction.

It is a modular software platform solution that connects organizational processes like project and access management with cloud technology. It provides a unified administration interface to the organization while replicating configuration into attached cloud platforms.

It is NOT a meta-layer across clouds. Users access native cloud APIs for their deployments, but meshStack helps them to ensure a proper and common configuration across cloud technologies with additional functionality such as metering, billing, surveillance and others.

![meshStack Context and Components](assets/meshstack-chart.svg)

## Mesh-Entity Mapping to Cloud Platform Concepts

Different Cloud technologies often introduce their own terms for similiar technological principles. In order to match them against each other and also show how this namings and technologies map to meshcloud's terminology of business entities. The connections are shown in the following matrix table:

|  meshStack   | Cloud Foundry |      OpenStack       |     AWS      |          Azure        |   Kubernetes    |  OpenShift  |
| :----------: | :-----------: | :------------------: | :----------: | :-------------------: | :-------------: | :---------: |
| meshCustomer | Organization  |        Domain        | Organization |            -          |        -        |    Group    |
| meshProject  |     Space     |       Project        |   Account    |      Subscription     |    Namespace    |   Project   |
|   meshUser   |     User      | Keystone Shadow User | Rolebinding  |      Azure AD User    |   Rolebinding   | Rolebinding |
| Service User | Service User  |    Platform User     |  IAM Policy  |            -          | Service Account |      -      |
