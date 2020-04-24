---
id: meshstack.gcp.landing-zones
title: Landing Zones
---

In GCP, a [Landing Zone](./meshcloud.landing-zones.md) is defined via folder the project will be assigned to. Policies can be applied
to these folders.

The [Landing Zone](./meshcloud.landing-zones.md) can be configured in the `Administration` section. If a project is selected to have an GCP location a Landing Zone must be selected by the user. By choosing a landing zone, platform specific configuration can be set (in this case for GCP). The options for GCP are:

## Resource Manager Folder Id

All newly created meshProjects get their corresponding GCP project assigned to this [Folder](https://cloud.google.com/resource-manager/docs/creating-managing-folders) in the [Organization Resource Hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy).

Folders and the application of organization constrains on the projects contained in them through the use of [Organization Policy Service](https://cloud.google.com/resource-manager/docs/organization-policy/overview) can be setup outside of meshcloud by an Operator.

## Template Config URL

You can define an URL pointing to a template configuration for the Deployment Manager. These template, will be fetched and deployed during the execution process. These can be used to setup projects with certain pre-sets of resources.

In contrast to the official GCP documentation you **must leave out** the imports in your config file. It should have the following format:

```yaml
resources:
- name: enable_api
  type: gs://likvid-gdm-templates/single_vm2/enable_api.jinja
- name: vm_template
  type: gs://likvid-gdm-templates/single_vm2/vm_template.py
  properties:
    zone: europe-west1-b
```

> The maximum filesize currently is 1MB please [contact us](mailto:support@meshcloud.io) if you need support for bigger template configurations.

The replicator needs to assign the project service accounts read access to the bucket so the templates can be fetched. Its therefore necessairy to give the `meshfed-service` role the **Storage Admin** permission on this bucket. The replicator then assignes read access for the projects service accounts which have the form of `<PROJECT_ID>@cloudservices.gserviceaccount.com`.

The name of the template deployment is `template-<CUSTOMER_IDENTIFER>-<PROJECT_IDENTIFIER>` cut to a maximum length of 63 chars.

If the URL is changed or the underlying template updated the projects will automatically get an update of the template. Please make sure that the templates can be deployed without errors beforehand.

Please note that you probably want to enable all the necessary APIs on the GCP project in order to allow deployment of this template. Templates can enable APIs via the virtual template type `deploymentmanager.v2.virtual.enableService`. For more information see the official [Deployment Manager docs](https://cloud.google.com/deployment-manager/docs/configuration/supported-resource-types).

The properties of the provided configuration file will be expanded with properties from meshcloud and these can be used inside the template itself. The following properties are provided:

| Template Property  | Description                                                |
| ------------------ | :--------------------------------------------------------- |
| customerIdentifier | Customer Identifier                                        |
| tagCostCenter      | ID of the CostCenter defined for this meshProject.         |
| projectIdentifier  | The project identifier                                     |
| projectId          | The ID of the GCP project associated with this meshProject |

In addition, any payment settings, project tags or customer tags are also provided to the template.
For example, a tag named `myCustomerLabel` would be provided as a property with name `mesh-tag-my-customer-label`.

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

In addition, any payment settings, project tags or customer tags are also provided to the Cloud Function, after formatting the tag name to an http header name.
For example, a tag named `myCustomerLabel` would be provided as an HTTP header with name `x-mesh-tag-my-customer-label`.
