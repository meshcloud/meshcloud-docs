---
id: meshstack.replication-configuration
title: Replication Configuration
---

Certain aspects of the replication configuration are similiar accross all platforms. This keeps complexity low and makes it easier to setup a meshStack installation. The concepts are described in this section.

## String Templating

Some properties for the different platforms allow you to use string templates to control the creation of e.g. Azure Subscription names or creates user group names in the target platform.
These string pattern work like the following example:

```text
#{customerIdentifier}.#{projectIdentifier:%.7s}-test.#{tenantPlatformNumber:%03d}
```

The engine will substitute `#{PLACEHOLDER}` with the actual contextual value (see table below). Optionally you can provide a `String.format()` pattern after the `:` which will be used to transform the value provided for the placeholder. In the example `%.7s` will use the first seven characters of the project identifier of the current project. The above string would evaluate into this:

```text
my-customer.my-proj-test.004
```

The template engine allows you to use the following placeholders if not described otherwise in the corresponding documentation:

| Placeholder          | Type   | Description                                                                                                                            |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| customerIdentifier   | string | Customer Identifier                                                                                                                    |
| projectIdentifier    | string | Project Identifier                                                                                                                     |
| meshProjectId        | number | Internal ID of the meshProject. Every project is guaranteed to have a unique ID, but tenants on different platforms can share this ID. |
| platform             | string | Platform Identifier                                                                                                                   |
| rand                 | string | A string of up to 100 random alpha numeric characters.                                                                                 |
| tenantPlatformNumber | number | A sequential number of the tenant on this very platform.                                                                               |
