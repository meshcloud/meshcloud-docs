---
id: meshstack.azure.metering
title: Metering
---

meshStack imports metering data from Azure via the Azure Cost Management API. It collects data for the previous and the current month.
Azure only provides data for the previous day, so Azure Usage Reports shown in meshStack will not provide data for the current day.

## Permission Model

In order to read resource usages, a metering principal is needed (creation steps of service princials are defined [here](./meshstack.azure.index.md#replicator)). It requires the following permissions/roles on all resources which should be accessed by the meshstack's metering service:

- `Cost Management Reader`
