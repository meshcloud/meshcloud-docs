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

## Cloud Template Configuration URL

You can specify an URL pointing to a GCP Bucket under your control which contains a YAML template config file. During project replication this file is read and then deployed as a template in the target project.

In contrast to the official GCP documentation you **must leave out** the imports in your config file. It should have the following format:

```yaml
resources:
- name: vm_template
  type: gs://likvid-gdm-templates/single_vm/vm_template.py
```

Best practice is to keep the file as small and simple as possible and put more complex template logic inside the referenced Python of Jinja templates.

> The YAML config file maximum size is 1 MB.

The replicator needs to assign the project service accounts read access to the bucket so the templates can be fetched. Its therefore necessairy to give the `meshfed-service` role the **Storage Admin** permission on this bucket. The replicator then assignes read access for the projects service accounts which have the form of `&gt;PROJECT_ID&lt;@cloudservices.gserviceaccount.com`.

The name of the template deployment is `template-<CUSTOMER_IDENTIFER>-<PROJECT_IDENTIFIER>` cut to a maximum length of 63 chars.

When the template is deployed parameters are provided as properties for the referenced template files. The provided parameters are:

| Parameter Name     | Description                                                                                           |
| ------------------ | :---------------------------------------------------------------------------------------------------- |
| customerIdentifier | Customer Identifier                                                                                   |
| costcenter         | **(Deprecated, please use tagCostCenter instead)** ID of the CostCenter defined for this meshProject. |
| projectIdentifier  | The project identifier                                                                                |
| projectId          | The ID of the GCP project associated with this meshProject                                            |

In addition, any payment settings, project tags or customer tags are also provided to the template. For example, a tag named `myName` would be provided under the name `tagMyName`.

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
For example, a tag named myCustomerTag would be provided as an HTTP header with name x-mesh-tag-my-customer-tag.
