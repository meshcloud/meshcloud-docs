---
id: meshstack.platform-location
title: Platforms & Locations
---

meshStack operators can configure the [Platforms & Locations](meshcloud.platform-location.md) available to
users. See the Platforms section in the sidebar for details on the platforms supported by meshstack.

## Restricting Access

meshStack provides simple and effective means to implement access policies, for example to control data sovereignty and access to public cloud platforms. Operators are also able to define "boundaries" on various levels and allow controlled delegation to self-service while retaining full control over policies.

### Customer-level

Operators can restrict the [Customer](meshcloud.customer.md) accounts that are allowed to access a particular [Platform Instance inside any Location](meshcloud.platform-location.md).

If a Platform Instance is set to private (currently the UI interface for doing so is missing) only allowed meshCustomers can access the resources in this instance.

This feature can be used for example to restrict access to a public cloud provider only to customer accounts that passed a certain data-protection clearance process.

### Project-level

Customers can create [Projects](meshcloud.project.md) that use the Locations available to their Customer account.
Configuring the locations available to a project is typically restricted to users with the [Customer Admin Role](meshcloud.groups.md), providing a further level of possible delegation.
