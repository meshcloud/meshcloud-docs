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

meshcloud releases new versions of meshStack on a continuous schedule. As you can see by reviewing our [release notes](/blog), this can happen multiple times per week. Our managed service ensures that your installation and configuration is up to date at all times when delivering new releases to your [staging](#staging-environment) and [production environments](#production-environment).

### Artefact Delivery

meshcloud pushes artefacts for new releases to a customer-provided artefact store. This enables us to fulfill software admission/delivery and archival requirements you may have.

Similarly, we deliver configuration and infrastructure as code for your installations to a customer-provided git repository.

### Staging Environment

An on-premise CI/CD pipeline automatically rolls out new releases to a staging environment. This allows customers to test
new functionality, bug fixes or configuration changes.

### Production Environment

Production releases are also automated via a CI/CD pipeline but are typically not automatically triggered by meshcloud.
Instead, customers need to provide a manual approval or gating process before updates are rolled out to a production environment.

### Versioning

All meshStack releases have a version number based on the schema `$year.$version.$patch`:

- `$year` is a number that indicates the year of the feature release.
- `$version` is a number that increments with every **feature release**. Feature releases can contain new functionality and introduce non-backwards compatible changes.
- `$patch` is a number that increments with every **patch release**. Patch releases provide fixes or minor improvements for existing functionality. Patch releases always refer to a particular feature release and don't introduce non-backwards compatible changes (except for fixing bugs).

All releases contain [release notes](/blog) describing the changes to the product in the respective release.

> Note: meshStack used a [semantic versioning](https://semver.org/) scheme up until version 7.14.
> However, meshStack is made up of many different components that can change indepenently. meshcloud therefore adopted
> a simplified versioning scheme for meshStack while simultaneously introducing semantic versioning for individual meshStack components
> like our APIs.

#### Versioning Example

`2020.7.0` indicates the 7th **feature release** of meshStack released in 2020. This release may be followed by a **patch release** `2020.7.1`, which indicates the 1st patch release for the `2020.7` feature release. Note that a patch release usually has a release date later than the original feature release. However, this does not change the `$year.$version` portion of the version number as it always refers to the original feature release.

#### Supported Versions

meshcloud maintains meshStack as a rolling release. This means that releases follow a "fix-forward" paradigm and
don't support (nor require) rollbacks. Any release is generally considered "End of Life" (EOL) as soon as a release
with a higher version number becomes available. meshcloud's managed service supports operation for EOL releases for
a limited time period (upgrade window) before the customer is expected to approve an update to the next release.

meshcloud can offer extended support for feature releases that have officialy reached end of life as part of an individual managed service agreement. Extended support covers managed operation of an EOL release as well as a
commitment to providing further patch releases for critical bugs and security issues found in a given feature release.

## Monitoring and Support

Every meshStack installation includes sophisticated [logging](./meshstack.logging.md) and [monitoring](./meshstack.monitoring.md) infrastructure. meshcloud uses these tools to monitor system availability and diagnose any possible issues.

The monitoring infrastructure of your installations can be made available to your own operations teams on request.
It's also possible to integrate meshStack with a Security Operations Center (SOC). For more details, please contact our
experts.
