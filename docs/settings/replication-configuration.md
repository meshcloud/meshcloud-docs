---
id: replication-configuration
title: Replication Configuration
---

Certain aspects of the replication configuration are similiar accross all platforms. This keeps complexity low and makes it easier to setup a meshStack installation. The concepts are described in this section.

## String Templating

Some properties for the different platforms allow you to use string templates to control the creation of e.g. Azure Subscription names or creates user group names in the target platform.
These string pattern work like the following example:

```text
#{workspaceIdentifier}.#{projectIdentifier:%.7s}-test.#{tenantPlatformNumber:%03d}
```

The engine will substitute `#{PLACEHOLDER}` with the actual contextual value (see table below). Optionally you can provide a `String.format()` pattern after the `:` which will be used to transform the value provided for the placeholder. Consider a case where the workspace ID is 'my-workspace', the project ID is 'my-project', and the tenantPlatformNumber is 4. In the example above `%.7s` will use the first seven characters of the project identifier of the current project and pattern `%03d` applied to 4 will produce 004. The above string would evaluate into this:

```text
my-workspace.my-proj-test.004
```

For further details on the patterns supported by `String.format()`, please consult the Java official documentation.

The template engine allows you to use the following placeholders if not described otherwise in the corresponding documentation:

| Placeholder          | Type   | Description                                                                                                                            |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| workspaceIdentifier  | string | Workspace Identifier                                                                                                                   |
| projectIdentifier    | string | Project Identifier                                                                                                                     |
| meshProjectId        | number | Internal ID of the meshProject. Every project is guaranteed to have a unique ID, but tenants on different platforms can share this ID. |
| platform             | string | Platform Identifier                                                                                                                    |
| rand                 | string | A string of up to 100 random alpha numeric characters.                                                                                 |
| tenantPlatformNumber | number | A sequential number of the tenant on this very platform.                                                                               |
| tagPlaceholder       | string | The value of a tag. The placeholders for these are generated automatically. For example, if you have a tag in meshStack called `projectOwner`, the template engine placeholder for this would be `tagProjectOwner`. |

> **Attention** For some cloud platforms certain strings must be globally unique (for example the AWS account alias). The `projectIdentifier` is not unique in meshstack. A combination of at least the `workspaceIdentifier` and `projectIdentifier`
> is highly recommended to avoid name collisions. For platforms with globally unique requirements like GCP or AWS a randomized part or a unique static prefix can also help to prevent sporadic replication problems.

## HTTP Header Interface

Some Landing Zone assets like [GCP Cloud Functions](../integrations/gcp/landing-zones.md#cloud-function-url) or [Azure Functions](../integrations/azure/landing-zones.md#azure-function-invocation) receive metadata tags from meshStack using HTTP Headers. meshStack invokes these Landing Zone assets using the following HTTP headers:

| HTTP Header Name                 | Description                                                                                                                   |
|----------------------------------|:------------------------------------------------------------------------------------------------------------------------------|
| `x-mesh-customer-identifier`     | meshWorkspace Identifier                                                                                                      |
| `x-mesh-project-identifier`      | meshProject identifier                                                                                                        |
| `x-mesh-costcenter` *deprecated* | If available, ID of the CostCenter selected for this meshProject. Please use `x-mesh-tag-cost-center` or another tag instead. |
| `x-mesh-tenant-platform-number`  | A increasing sequence number for a meshProject tenant on a specific platform.                                                 |
| `x-mesh-landing-zone-identifier` | landing zone identifier                                                                                                       |
| `x-mesh-tag-${format(tagName)}`  | metadata tags as defined in the tags screen in the admin area                                                                 |

Headers for *metadata tags* are formatted to an http-header name by converting `camelCase` tag names into a dashed string i.e. `camel-case` and prefixing them with `x-mesh-tag-`.
As a full example, a tag named `myCustomerTag` would be provided as an HTTP header with name `x-mesh-tag-my-customer-tag`.