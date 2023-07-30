---
id: meshstack.gcp.index
title: Integration
---

Google Cloud Platform (GCP) is a public cloud platform provided by Google.
meshStack supports project creation, configuration, access control and cost management for GCP.

## Integration Overview

> The recommended way to set up GCP as a meshPlatform is via the public terraform [GCP meshPlatform Module](https://github.com/meshcloud/terraform-gcp-meshplatform). If you decide to use it, you do not need the steps below.

To enable integration with GCP, operators configure one or multiple `meshPlatform`s of `PlatformType` GCP in the [Platform Administration](./administration.platforms.md) in meshPanel.

Google Cloud Platform relies on [Google Cloud Identity (GCI)](https://cloud.google.com/identity/) for authentication and authorization. meshStack can seamlessly integrate with GCI and various hybrid identity setups.
Organizations already using Google Cloud Directory Sync or Google Workspace can use meshStack with an [externally provisioned identities](./meshstack.identity-federation.md) configuration.

meshcloud helps organizations implement Google Cloud Platform in line with [governance best-practices](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations) by integrating with the GCP [Organization Resource Hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) and [Organization Policy Service](https://cloud.google.com/resource-manager/docs/organization-policy/overview) using [Landing Zones](./meshstack.gcp.landing-zones.md).

In order to plan and execute a successful integration of GCP using meshcloud, organizations need to consider the following parts described in the sections below.

> As part of an integration project meshcloud typically delivers a configuration tailored to your organization's specific requirements using infrastructure as code (IaC) tools. The descriptions below serve as a general reference.

## Cloud Identity Setup

Cloud Identity "Free" is sufficient for automated GCP IAM management through meshStack. meshStack does not require Cloud Identity Premium nor Google Workspace features.

We recommend using [externally provisioned identities](./meshstack.identity-federation.md) with GCP.

## Organization Setup

Operators need to set up a GCP Organization to be used by meshStack. Please review the official GCP documentation on [creating and managing organizations](https://cloud.google.com/resource-manager/docs/creating-managing-organization).


## How to integrate GCP as a meshPlatform into meshStack

This is described in the Guide section under [How to integrate a meshPlatform into meshStack](meshstack.how-to.integrate-meshplatform.md).
