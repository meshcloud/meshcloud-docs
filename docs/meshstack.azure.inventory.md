---
id: meshstack.azure.inventory
title: Cloud Inventory
---

For the purpose of listing resources running on the Azure platform, meshStack fetches Azure virtual machine information from the Azure Resource Graph API.

## Permission Model

In order to retrieve information about the virtual machines, the metering principal should be assigned a role that has the following permissions.

- Microsoft.Network/publicIPAddresses/read
- Microsoft.Network/networkInterfaces/read
- Microsoft.Compute/virtualMachines/*/read
