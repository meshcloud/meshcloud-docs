---
id: meshstack.gcp.landing-zones
title: Landing Zones
---

In GCP, a [Landing Zone](./meshcloud.landing-zones.md) is defined via folder the project will be assigned to. Policies can be applied
to these folders.

The [Landing Zone](./meshcloud.landing-zones.md) can be configured in the `Administration` section. If a project is selected to have an GCP location a Landing Zone must be selected by the user. By choosing a landing zone, platform specific configuration can be set (in this case for GCP). The options for GCP are:

## Folder ID

All newly created meshProjects get their corresponding GCP project assigned to this [Folder](https://cloud.google.com/resource-manager/docs/creating-managing-folders) in the [Organization Resource Hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy).

Folders and the application of organization constrains on the projects contained in them through the use of [Organization Policy Service](https://cloud.google.com/resource-manager/docs/organization-policy/overview) can be setup outside of meshcloud by an Operator.

## Cloud Function URL

If you specify a Cloud Function URL this function will get invoked during a project replication. This can happen several times and thus your function invocation must be idempotent. The function gets variables provided via HTTP headers similar to the [Azure Function](./meshstack.azure.landing-zones.md#azure-function).

Please make sure the GCP service user of the replicator is allowed to access this function.

The following HTTP headers are provided to the Cloud Function:

| HTTP Header Name           | Description                                                |
| -------------------------- | :--------------------------------------------------------- |
| x-mesh-customer-identifier | Customer Identifier                                        |
| x-mesh-costcenter          | ID of the CostCenter defined for this meshProject.         |
| x-mesh-project-identifier  | The project identifier                                     |
| x-mesh-project-id          | The ID of the GCP project associated with this meshProject |
