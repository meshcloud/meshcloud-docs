---
id: meshstack.managed-service
title: Managed Service
---

meshcloud will operate your meshStack as a managed service for you.
Some aspects of the managed service operation apply to all meshStacks (mentioned under [meshStack General](#meshstack-general)),
but other aspects apply only to specific plans. Please have a look at the dedicated section of your plan,
which can be either [meshStack SaaS](#meshstack-saas) or [meshStack SaaS On-Prem](#meshstack-saas-on-prem).

## meshStack General

### Configuration

Most of meshStack's configuration can be done in self-service via the meshPanel in the Administration area.
However, some advanced product functionality is currently only available via a configuration as code model based on [dhall](https://dhall-lang.org/).

When applicable to your chosen meshStack plan, meshcloud can make the configuration model of your meshStack instance available to you as a git repository.
This is useful to track configuration changes, for example to integrate with a change management process.

To request advanced configuration changes for your meshStack instance, please contact your contact from customer success or support@meshcloud.io.

### Versioning & Continuous Delivery

meshcloud continuously releases new versions of meshStack to provide more value to our users.
As can be seen by viewing our [release notes](/blog), this can happen multiple times a week.
Our managed service ensures that your installation and configuration is up-to-date at all
times when delivering new releases to your meshStack environment(s).

#### Versioning Scheme

All meshStack releases have a version number based on the schema `$year.$minor.$patch`:

- `$year` is the year in which the release was done.
- `$minor` is a number that increments with every **feature release**.
  Feature releases can contain new functionality and introduce non-backwards compatible changes.
- `$patch` is a number that increments with every **patch release**.
  Patch releases provide fixes or minor improvements for existing functionality.
  Patch releases always refer to a particular feature release (i.e. they are backwards compatible to that
  release – except, potentially, for bug fixing) and do not introduce new functionality.

All releases contain [release notes](/blog) describing the changes to the product in the respective release.

#### Versioning Example

`2023.42.0` indicates the 42nd **minor release** of meshStack released, in the **year** 2023.
This release may be followed by a **patch release** `2023.42.1`, which indicates the 1st patch release
for the `2023.42.0` minor release.

#### Supported Versions

meshcloud maintains meshStack as a rolling release. This means that releases follow a "fix-forward" paradigm and
do not support (nor require) rollbacks. Any release is generally considered "End of Life" (EOL) as soon as a release
with a higher version number becomes available. meshcloud's managed service supports operation for EOL releases for
a limited time period (upgrade window) before the customer is expected to approve an update to the next release.

For meshStack SaaS On-Prem users, meshcloud can offer extended support for feature releases that have officially
reached end of life as part of an individual managed service agreement. Extended support covers managed operation
of an EOL release as well as a commitment to providing further patch releases for critical bugs and security
issues found in a given feature release.

### Compliance

meshcloud provides customers with comprehensive security and compliance documentation for meshStack.
This includes documentation of the security measures and controls implemented in the system.
Based on this documentation, meshcloud can assist customers in evaluating and documenting compliance
of their individually configured meshStack installation to various industry standard control
frameworks such as ISO 27001 and ISO 27017.

### Monitoring and Support

Every meshStack installation includes sophisticated [logging](./meshstack.logging.md)
and [monitoring](./meshstack.monitoring.md) infrastructure. meshcloud uses these tools
to monitor system availability and diagnose any possible issues.

The monitoring infrastructure of your installations can be made available to your own operations teams on request.
For meshStack SaaS On-Prem users, it is also possible to integrate meshStack with a Security Operations Center (SOC).
For more details, please contact our experts.

## meshStack SaaS

The meshStack SaaS plan is always subject to a generic customer agreement.
This agreement will be provided upon purchasing a meshStack SaaS plan.

### SaaS: Infrastructure

Each meshStack SaaS installation is managed in a standardized way, and it is not possible to deviate from this
standard unless the installation is upgraded to the [meshStack SaaS On-Prem plan](#meshstack-saas-on-prem).

meshStack SaaS is hosted on a Google Cloud-managed kubernetes cluster (this service is known as GKE).
Each individual meshStack SaaS environment is hosted in its own so-called Kubernetes namespace, secured
with a network policy blocking traffic from other meshStacks.
This means that communication and access between different meshStacks is impossible.

### SaaS: Environment

Each meshStack SaaS customer will have one environment which is always the production environment
and this environment is fully managed by meshcloud on the infrastructure mentioned above.

### SaaS: Rollouts

meshStack SaaS environments are automatically updated to the newest version of the meshStack software
depending on the maintenance window of the customer agreement.
The rollout of these updates can be one of the following:

- Weekly, on Mondays between 5 PM and 9 PM CEST.
- Weekly, on Thursdays between 5 PM and 9 PM CEST.

## meshStack SaaS On-Prem

The meshStack SaaS On-Prem plan comes with an individual customer agreement.
This agreement will be created and provided when signing up for a meshStack SaaS On-Prem plan.

### SaaS On-Prem: Infrastructure

The infrastructure of a meshStack SaaS On-Prem installation always depends on what is agreed upon with the customer.

meshcloud supports both on-premise installations and public cloud (AWS, Azure & Google Cloud) installations
that are owned by the customer. meshcloud's operations team will need access to the environment and will fully
manage the meshStack installation from there.

### SaaS On-Prem: Artifact Delivery

It is possible for meshcloud to push artifacts for new meshStack releases to a customer-provided artifact store.
This enables meshcloud to fulfill software admission/delivery and archival requirements that you might have.

### SaaS On-Prem: Environments

#### Staging / QA Environment

When on the meshStack SaaS On-Prem plan, it is possible to get a staging environment (on top of a production environment)
for quality checks & testing purposes, which is useful for testing new releases or new integrations.
The staging environment will be automatically managed by meshcloud.

#### Production Environment

The production environment of meshStack SaaS On-Prem is the real environment where all your users will be consuming
your cloud foundation services.
The production environment is managed by meshcloud.
The timeline of rolling out new releases can be decided by the customer (more on that below).

### SaaS On-Prem: Rollouts

#### Rolling out Staging Environment

A CI/CD pipeline (either one provided by meshcloud or provided by you) automatically rolls out new releases to the staging / QA environment.
This allows you to test new releases as soon as possible. The timing of rollouts can be decided as desired,
e.g. as soon as possible or at a certain time window.

#### Rolling out Production Environment

Production releases are also automated via a CI/CD pipeline but rollouts are typically not automatically triggered by meshcloud.
Instead, you can provide a manual approval or gating process before updates are rolled out to the production environment.

### SaaS On-Prem: Configuration Copy

For meshStack SaaS On-Prem plans we offer the possibility to get a copy of the configuration as code repository.
This might be useful for e.g. auditing reasons. Contact support@meshcloud.io to get this set up.