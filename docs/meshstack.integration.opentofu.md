---
id: meshstack.integration.opentofu
title: meshStack and OpenTofu
---

OpenTofu is a tool for provisioning, managing, and deploying infrastructure resources. OpenTofu is an open-source fork of Terraform.

## What

OpenTofu allows developers to declaratively create, modify, and delete infrastructure. This approach has proven itself for teams that are end-to-end responsible for developing and operating applications.

However, not all resources can be managed end-to-end by application teams within a single platform. A common example are centrally networking services like a VPC with an IP address range that is routable to on-prem or firewall rules. In this case, multiple teams (security, networking) and platforms (cloud platform, on-prem networking appliances, IP address management system, dedicated firewalls) are involved to implement the service.

meshStack enables platform teams to define building blocks. Application teams order building blocks via API or UI from meshStack. Depending on the implementation, the building block executes OpenTofu or other IaC tools to deliver the service.

## Why

Platforms teams are increasinbly offering on-demand services via API and UI avoid waiting times for their customers and tedious manual tasks for themselves.

## How

If you are starting out with a new platform, we recommend to use the built-in platform support for managing the lifecycle of tenants. To use a built-in platform, follow our [platform integration guide](meshstack.how-to.integrate-meshplatform.md).
Once a platform is integrated, you can define building blocks to expand additional services.

If you have existing automation or want to integrate a platform for which meshStack does not offer built-in support we recommend to create a platform. To get started, follow our [guide](meshstack.how-to.create-your-own-platform.md).
