---
id: marketplace.vs-building-blocks
title: Marketplace vs. Building Blocks
---

[Building Blocks](administration.building-blocks.md) are the newest capability of meshStack to repetitively roll out infrastructure
by your workspace users. Building Blocks are considered the future of doing so, and this page explains the current gaps, and
pros and cons of using Building Blocks or the meshMarketplace.

The table below describes each capability and to what extent it is supported by the respective feature (Building Blocks or Marketplace)

✅ - supported and works well

🟨 - works to some extent

❌ - not supported at all

|                                           | Building Blocks                                                                  | meshMarketplace                                                                                                       |
|-------------------------------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Provision resources with Terraform        | ✅ This works very easily                                                         | 🟨 Works with [UniPipe Service Broker](https://github.com/meshcloud/unipipe-service-broker), but is more work         |
| Run Custom Processes outside of Terraform | ❌                                                                                | ✅ The marketplace runs on OSB API which means you can build anything you want as long as it is compliant with OSB API |
| Automated Deletion of Resource            | ✅ Terraform Building Blocks can run `tf destroy` automatically                   | 🟨 Can work, but requires your own implementation                                                                     |
| Request User Configuration                | ✅ Works, although more variable types (e.g. select) are missing at the moment    | ✅ Works with JSON schema and allows for a lot of different variations                                                 |
| Manage Instances via API                  | ❌                                                                                | ✅ But missing deletion of meshServiceInstances                                                                        |
| Manage Definitions via API                | ❌                                                                                | ❌                                                                                                                     |
| Custom Pricing Models                     | ❌                                                                                | ✅They can make this a part of the definition                                                                          |
| Sandbox Development Process               | ❌ When creating a new Building Block, it is directly available to all workspaces | ✅ Developers can create a private service broker that cannot be booked by anyone else                                 |
| Allow non-admins to contribute            | ❌ Only Admins can create Building Block definitions                              | ✅ Workspace users can create a service broker and get it approved to be used by everyone else in the meshStack        |
| Versioning                                | 🚧 In progress and coming soon                                                   | ❌ Not possible. There is no such thing as service versions                                                            |
| Works without cloud platforms             | ❌ Building Blocks always attach to a cloud tenant                                | ✅ The marketplace works without having a cloud tenant                                                                 |
| View all consumption in Admin Area        | ✅ There is a list with all building blocks in the Admin Area                     | ❌ There is only a list of service brokers but not service instances                                                   |
| Tag and Policy Support                    | ❌                                                                                | ❌                                                                                                                     |
| Integration on Landing Zones              | ✅ Can be set as recommended or mandatory on a landing zone                       | ✅ for tenant-aware services, but ❌ for regular services                                                               |
| Define Interdependencies                  | ✅                                                                                | ❌                                                                                                                     |
| Share Instances between Projects          | ❌                                                                                | ✅ Service Instances can be shared between meshProjects                                                                |
