---
id: meshstack.gcp.landing-zones
title: Landing Zones
---

In GCP, a [Landing Zone](meshcloud.landing-zones) is defined via folder the project will be assigned to. Policies can be applied
to these folders.

The [Landing Zone](meshcloud.landing-zones) can be configured in the `Administration` section. If a project is selected to have a GCP tenant a Landing Zone must be selected by the user. By choosing a landing zone, platform specific configuration can be set (in this case for GCP). The options for GCP are:

## Resource Manager Folder Id

All newly created meshProjects get their corresponding GCP project assigned to this [Folder](https://cloud.google.com/resource-manager/docs/creating-managing-folders) in the [Organization Resource Hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy).

Folders and the application of organization constrains on the projects contained in them through the use of [Organization Policy Service](https://cloud.google.com/resource-manager/docs/organization-policy/overview) can be setup outside of meshcloud by a platform engineer.

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

GCP uses a built-in service account called [Google APIs Service Agent](https://cloud.google.com/iam/docs/service-accounts#google-managed) to execute GDM templates.
This service account needs to have permission to access the bucket storing the GDM template. It's therefore necessairy to give the meshfed service account the following permissions on the storage bucket:

```text
storage.buckets.setIamPolicy
storage.buckets.getIamPolicy
storage.objects.get
storage.objects.list
storage.buckets.list
storage.buckets.get
```

We suggest to create a custom role containing these permissions.

As part of replication, meshStack will grant this permission to the "Google APIs Service Agent" service account. Reviewing the IAM permission of the bucket, platform engineers will thus notice additional assignments of the `roles/storage.objectViewer` role to service accounts of the form `<PROJECT_ID>@cloudservices.gserviceaccount.com`.

The name of the template deployment is `template-<CUSTOMER_IDENTIFER>-<PROJECT_IDENTIFIER>` cut to a maximum length of 63 chars.

If the URL is changed or the underlying template updated the projects will automatically get an update of the template. Please make sure that the templates can be deployed without errors beforehand.

Please note that you probably want to enable all the necessary APIs on the GCP project in order to allow deployment of this template. Templates can enable APIs via the virtual template type `deploymentmanager.v2.virtual.enableService`. For more information see the official [Deployment Manager docs](https://cloud.google.com/deployment-manager/docs/configuration/supported-resource-types).

### Available Google Deployment Manager Properties

The properties of the provided configuration file will be expanded with properties from meshcloud and these can be used inside the template itself. The following properties are provided:

| Template Property  | Description                                                                   |
|--------------------| :---------------------------------------------------------------------------- |
| customerIdentifier | Workspace Identifier                                                          |
| tagCostCenter      | ID of the CostCenter defined for this meshProject.                            |
| projectIdentifier  | The project identifier                                                        |
| projectId          | The ID of the GCP project associated with this meshProject                    |
| tagCostCenter      | Example for a [metadata tag](meshstack.metadata-tags) named `costCenter` |

As the example `tagCostCenter` in the above table indicates, any payment settings, project tags or workspace tags are also provided to the template.
The following modifications are applied to metdata tag keys by meshstack before making them available as properties:

- Parameters are prefixed with `tag`
- First letter of metadata tag key is capitalized

In the example, a metadata tag named `costCenter` would be provided as a property with name `tagCostCenter`.
See [metadata tags](meshstack.metadata-tags) for more information.

> If you are planning on converting any of the template properties into GCP labels, please be aware of the limits and requirements
> that GCP has [described in their docs](https://cloud.google.com/compute/docs/labeling-resources#restrictions).
>
> Key takeaways here:
>
> - A resource can have a maximum of 64 labels
> - Keys and values can only contain lowercase letters, numeric characters, underscores and hyphens.
> - Label keys must start with a lowercase letter

## meshRole to Platform Role Mapping

The meshProject roles must be mapped to GCP specific roles. You are able to control this mapping with a Landing Zone setting. You can specifiy these mappings by adding role mappings and supplying a GCP Role. You can both use custom roles which look like `organizations/123123123123/roles/meshstack.project_developer` or predifined GCP roles like `roles/editor`.

You can specify multiple GCP roles for each meshRole. All defined GCP roles are added to the user group. Additional roles can be managed for the user group outside of meshStack. meshStack does not remove roles from a user group. It only adds the mapped roles specified in the landing zone definition.

## Cloud Function URL

If you specify a Cloud Function URL this function will get invoked during a project replication. This can happen several times and thus your function invocation must be idempotent. The function gets variables provided via HTTP headers similar to the [Azure Function](meshstack.azure.landing-zones#azure-function).

Please make sure the GCP service user of the replicator is allowed to access this function.

Please review the [meshStack Landing Zone Http Header interface](meshstack.metadata-tags#http-header-interface) for metadata meshStack makes available to Azure Functions.

In addition to the headers referenced above, meshStack provides the following GCP-specific HTTP headers:

| HTTP Header Name  | Description                                                |
| ----------------- | :--------------------------------------------------------- |
| x-mesh-project-id | The ID of the GCP project associated with this meshProject |
