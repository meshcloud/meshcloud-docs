---
id: meshstack.managed-service
title: Managed Service
---

meshcloud will typically operate your meshStack installation as a managed service for you.

> Our managed service is always subject to an individual customer agreement. This document provides a high-level overview
> of the typical components of this service.

## Infrastructure

Our managed installations are always "on-prem". In addition to a deployment on OpenStack, "on-prem" can also be a public cloud tenant, e.g. an AWS Account or Azure subscription owned by the customer. meshcloud's operation team will need access to this environment, e.g. using VPN and similar solutions.

We do explicitly support and encourage to operate meshStack on a cloud environment that's managed by meshStack itself.
This makes all of meshStack's advantages (IAM, Policies and Governance, Cost Management) available to our own operations.
It is also a great opportunity for multi-cloud management teams to experience the multi-cloud infrastructure they provide
from a product owner perspective.

## Configuration

meshcloud can assist in selecting the right integration and configuration options for your unique requirements.
All [configuration](./meshstack.configuration.md) for your installation is managed in a git repository and thus readily
available for audit and review.

### Compliance

meshcloud provides customers with comprehensive security and compliance documentation for meshStack. This includes documentation of the security measures and controls implemented in the system. Based on this documentation, meshcloud can assist customers in evaluating and documenting compliance of their individually configured meshStack installation to various industry standard control frameworks such as ISO 27001 and ISO 27017.

## Continuous Delivery

meshcloud releases new versions of meshStack on a continuous schedule. As you can see by reviewing our [release notes](/blog), this can happen multiple times a week. Our managed service ensures that your installation and configuration is kept up to date at all times when delivering new releases to your staging and production environments.

### Artefact Delivery

meshcloud pushes artefacts for new releases to a customer-provided artefact store. This enables us to fulfill software admission/delivery and archival requirements you may have.

Similarly, we deliver configuration and infrastructure as code for your installations to a customer-provided git repository.

### Staging Environment

An on-premise CI/CD pipeline automatically rolls out new releases to a staging environment. This allows customers to test
new functionality, bug fixes or configuration changes.

### Production Environment

Production releases are also automated via a CI/CD pipeline but are typically not automatically triggered by meshcloud.
Instead, customers need to provide a manual approval or gating process before updates are rolled out to a production environment.

## Monitoring and Support

Every meshStack installation includes sophisticated [logging](./meshstack.logging.md) and [monitoring](./meshstack.monitoring.md) infrastructure. meshcloud uses these tools to monitor system availability and diagnose any possible issues.

The monitoring infrastructure of your installations can be made available to your own operations teams on request.
It's also possible to integrate meshStack with a Security Operations Center (SOC). For more details, please contact our
experts.
