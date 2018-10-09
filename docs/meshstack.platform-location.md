---
id: meshstack.platform-location
title: Platforms & Locations
---

Meshstack operators can configure the [Platforms & Locations](meshcloud.platform-location.md) available to
users. See the Platforms section in the sidebar for details on the platforms supported by meshstack.

## Restricting Access

Meshstack provides simple and effective means to implement access policies, for example to control data
sovereignty and access to public cloud platforms. Operators are also able to define "boundaries" on various
levels and allow controlled delegation to self-service while retaining full control over policies.

### Customer-level

Operators can restrict the [Customer](meshcloud.customer.md) accounts that are allowed to access a particular [Location](meshcloud.platform-location.md). This could for example be used to restrict access to a public cloud
provider only to customer accounts that passed a certain data-protection clearance process.

### Project-level

Customers can crate [Projects](meshcloud.project.md) that use the Locations available to their Customer account.
Configuring the locations avaiable to a project is typically restricted to users with the [Customer Admin Role](meshcloud.roles.md), providing a further level of possible delegation.
