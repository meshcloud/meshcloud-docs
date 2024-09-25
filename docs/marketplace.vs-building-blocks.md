---
id: marketplace.service-brokers-vs-building-blocks
title: Service Brokers vs. Building Blocks
---

[Building Blocks](administration.building-blocks.md) are the meshStack's standard mechanism to repetitively roll out infrastructure
across workspaces. Building Blocks are the recommended way of doing so. Besides Building Blocks, meshStack also supports OSB Services, which can be relevant if you have an existing investment into OSB Services. This page aims to help you understand how these two mechanisms compare.

Building Blocks are currently more actively being worked on, but the Service Broker-based on OSB Services Platform (old meshMarketplace)
will continue to be supported in the future.

The table below describes each capability and to what extent it is supported by the respective feature (Building Blocks or Service Brokers)

✅ - supported

🟨 - works to some extent

⏰ - not supported yet

❌ - not supported and not planned for the future

|                                           | Building Blocks                                                                   | Service Brokers                                                                                                                       |
|-------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Provision resources with Terraform        | ✅ This works very easily                                                          | 🟨 Works using [UniPipe Service Broker](https://github.com/meshcloud/unipipe-service-broker), but requires more implementation effort |
| Run Custom Processes outside of Terraform | ✅ Async provisioning is supported and allows writing back status updates from external systems into meshStack                                                                                 | ✅ Service Brokers run on OSB API which means you can build anything you want as long as the interface is compliant with OSB API       |
| Automated Deletion of Resource            | ✅ Terraform Building Blocks can run `tf destroy` automatically                    | 🟨 Possible but logic needs to be implemented in the service broker                                                                   |
| Request User Configuration                | ✅ You can define a form for your users via the UI                           | ✅ Works with JSON schema and allows for a lot of different variations                                                                 |
| Manage Instances via API                  | ✅                                                                                 | ✅ But missing deletion of meshServiceInstances                                                                                        |
| Manage Definitions via API                | ⏰                                                                                 | ❌                                                                                                                                     |
| Custom Pricing Models                     | ✅ via [meshResourceUsageReports API](https://docs.meshcloud.io/billing-api/index.html#_put_meshresourceusagereports)                                                                                | ✅ Can be made part of the definition                                                                                          |
| Sandbox Development Process               | ✅ Developers can test drafts of building blocks that cannot be booked by any other workspaces | ✅ Developers can create a private service broker that cannot be booked by any other workspaces                                        |
| Allow non-admins to contribute            | ✅ Workspace users offer building blocks via the service management area and get it approved by an Admin to be used by other workspaces in the meshStack                              | ✅ Workspace users integrate service broker and get it approved by an Admin to be used by other workspaces in the meshStack         |
| Versioning                                | ✅                                   | ❌ Not possible. There is no such thing as service versions                                                                            |
| Works without cloud platforms             | ✅ Building Blocks can create a tenant as part of a custom platform                                 | ✅ Service Brokers work without having a cloud tenant                                                                                  |
| View all consumption in Admin Area        | ✅ There is a list with all building blocks in the Admin Area                      | ❌ There is only a list of service brokers but not service instances                                                                   |
| Tag and Policy Support                    | ✅                                                                                  | ❌                                                                                                                                     |
| Integration on Landing Zones              | ✅ Can be set as recommended or mandatory on a landing zone                        | 🟨 For tenant-aware services                                                                                                          |
| Define Interdependencies                  | ✅                                                                                 | ❌                                                                                                                                     |
| Share Instances between Projects          | ⏰                                                                                 | ✅ Service Instances can be shared between Projects                                                                                |
