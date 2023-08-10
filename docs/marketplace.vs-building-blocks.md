---
id: marketplace.service-brokers-vs-building-blocks
title: Service Brokers vs. Building Blocks
---

[Building Blocks](administration.building-blocks.md) are the newest capability of meshStack to repetitively roll out infrastructure
by your workspace users. Building Blocks are considered the future of doing so, and this page explains the current gaps, and
pros and cons of using Building Blocks or the meshMarketplace, and should help you make a decision which is the better fit
for your use case!

Keep in mind that even though Building Blocks are currently more actively being worked on, the Service Broker-based meshMarketplace
will continue to be supported in the future. In the future Building Blocks will offer further technical implementation types such as Service Brokers.

The table below describes each capability and to what extent it is supported by the respective feature (Building Blocks or Service Brokers)

✅ - supported

🟨 - works to some extent

⏰ - not supported yet

❌ - not supported and not planned for the future

|                                           | Building Blocks                                                                   | Service Brokers                                                                                                                       |
|-------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Provision resources with Terraform        | ✅ This works very easily                                                          | 🟨 Works using [UniPipe Service Broker](https://github.com/meshcloud/unipipe-service-broker), but requires more implementation effort |
| Run Custom Processes outside of Terraform | ⏰                                                                                 | ✅ Service Brokers run on OSB API which means you can build anything you want as long as the interface is compliant with OSB API       |
| Automated Deletion of Resource            | ✅ Terraform Building Blocks can run `tf destroy` automatically                    | 🟨 Possible but logic needs to be implemented in the service broker                                                                   |
| Request User Configuration                | ✅ Further variable types such as "select" are planned                             | ✅ Works with JSON schema and allows for a lot of different variations                                                                 |
| Manage Instances via API                  | ⏰                                                                                 | ✅ But missing deletion of meshServiceInstances                                                                                        |
| Manage Definitions via API                | ⏰                                                                                 | ❌                                                                                                                                     |
| Custom Pricing Models                     | ⏰                                                                                 | ✅They can make this a part of the definition                                                                                          |
| Sandbox Development Process               | ⏰ After creating a new Building Block, it is directly available to all workspaces | ✅ Developers can create a private service broker that cannot be booked by any other workspaces                                        |
| Allow non-admins to contribute            | ⏰ Only Admins can create Building Block definitions                               | ✅ Workspace users can create a service broker and get it approved by an Admin to be used by other workspaces in the meshStack         |
| Versioning                                | 🚧 In progress and coming soon                                                    | ❌ Not possible. There is no such thing as service versions                                                                            |
| Works without cloud platforms             | ⏰ Building Blocks always attach to a cloud tenant                                 | ✅ Service Brokers work without having a cloud tenant                                                                                  |
| View all consumption in Admin Area        | ✅ There is a list with all building blocks in the Admin Area                      | ❌ There is only a list of service brokers but not service instances                                                                   |
| Tag and Policy Support                    | ⏰                                                                                 | ❌                                                                                                                                     |
| Integration on Landing Zones              | ✅ Can be set as recommended or mandatory on a landing zone                        | 🟨 For tenant-aware services                                                                                                          |
| Define Interdependencies                  | ✅                                                                                 | ❌                                                                                                                                     |
| Share Instances between Projects          | ⏰                                                                                 | ✅ Service Instances can be shared between meshProjects                                                                                |
