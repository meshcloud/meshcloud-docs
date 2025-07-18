---
id: meshstack.metadata-tags
title: Managing Tags
---

Operators can configure meshStack to collect, attach and distribute organization-specific metadata to various meshObjects using [metadata tags](meshcloud.metadata-tags).

> To get more insight into how your cloud foundation can improve the use of metadata tags,
> read about [Cloud Tenant Tagging on cloudfoundation.org](https://cloudfoundation.meshcloud.io/maturity-model/security-and-compliance/cloud-tenant-tagging.html).

## Use Cases for Tags

> meshStack currently supports tags on [workspaces](meshcloud.workspace), [projects](meshcloud.project), [landing zones](meshcloud.landing-zones), [building block definitions](administration.building-blocks) and [payment methods](meshcloud.payment-methods).
> Additionally, it is also possible to supply [default tags on meshUsers](#tags-on-meshusers) and [workspace user groups](meshstack.workspace-group-sync) are freely taggable via the meshStack API.

meshStack acts as an organization's central registry of cloud environments and services. It therefore needs to cover
a wide range of use cases for orchestrating organizational processes across multiple clouds, including;

- centralized management and configuration of [cloud platforms](meshcloud.platforms)
- life-cycle management for [cloud tenants](meshcloud.tenant) and [security policy automation](meshcloud.landing-zones)
- centralized Identity and Access Management (IAM) via [multi-cloud identity federation](meshstack.identity-federation)
- unified [chargeback process](meshcloud.cost-management) across all cloud platforms and services

Many of these use cases can require organizational metadata to be shared across different systems. Common examples of
such metadata include:

- IT System identifiers that can link cloud tenants to an enterprise configuration management database
- Cost Center and department information
- Security and Operations contacts for a project
- Data Confidentiality Levels
- Project Staging Environment, e.g. QA or production

## Maximum Length for Tag Values

Tag values in meshStack can be up to 255 characters long. Different platforms have their own limits on tag length, character support, and quantity, so ensure they support the tags you want to replicate.

## How to view and define available tags?

> All actions below will require the partner role.

Navigate to **Compliance** > **Tags** in the **Administration** Area:

![Tag List](assets/metadata_tags/admin_area_tags_list.png)

This page will show you all tags that are currently active on supported meshObjects. If you would like to know more details about a tag, or create, edit, or delete a tag, you can do so by clicking on the large arrow ▶️ on the right for a meshObject.
The next page will show you more details about a tag such as the title, description or data type of the tag and allow you to modify existing and define new tags.

### How to modify an existing tag?

1. Navigate to **Compliance** > **Tags**.
2. Click on ▶️ of the meshObject type you want to modify the tag of. A list of active tags of the meshObject type will appear.
3. Click on the pencil icon in the 'Actions' column of the tag you want to edit in the list of active tags.

![Tag Edit](assets/metadata_tags/edit_button.png)


### How to define a new tag?

1. Navigate to **Compliance** > **Tags**.
2. Click on ▶️ of the meshObject type you want to define new the tag for. A list of active tags of the meshObject type will appear.
3. Click on `+ Create Tag` button in the top right corner.

You will be prompted with a new page where you can enter a lot of information. We will briefly explain what each fields means and why you should use it.

> Hint: after entering a name, you can view the tag input as if it were shown to the end user. You can do this on the right-side of the screen where it says 'Tag Preview'.
> This can help you get an idea of how it will look when end-users fill in the tag value.

- **Display Name**: This is the text that will be shown above the input field which the user reads. Note that is **not** the name of the tag itself.
- **Name**: This is the actual name of the tag as it will be displayed in the green bubble. It is also the name that is used for uniquely identifying the tag and when exporting it or when [using it within a landing zone](#exposing-tags-via-landing-zones). This name cannot be changed later (at the moment). We recommend using a name that is similar or the same as the Display Name. Keep in mind that the use of spaces is not allowed since the tag name is used for technical purposes.
- **Description (optional)**: This is the description of the tag that will be displayed in small grey text above the tag input. It is useful for giving extra information to the user when the name of the tag is not explanatory enough.
- **Tag Type**: This is the data type of the tag and also decides what kind of input the user will see. It will depend what you will fill in here depending on your needs. You can see the actual input in the Tag Preview on the right if you are curious how it looks.
- **Regular Expression (optional)**: This is only available for `e-mail` and `string` tag types and can be used to enforce that users enter a certain data format. Also make sure to mention this in the description to help users what to enter.
- **Default Value (optional)**: This can be used to give a default value to the user for contextual help or for filling in a default.
- **Mandatory**: If a tag is mandatory, it means the user cannot create a new meshObject without first filling in this tag value.
- **Restricted**: If a tag is restricted, it means only admin users can enter this tag value. The input will also not be shown to the end-user when creating a new meshObject. This is useful if an organization doesn't want users to edit these values in self-service. For example, an organization can use restricted tags to implement a "segregation of duty" control to ensure that an admin user confirmed a project's data classification.
- **Immutable**: If a tag is immutable, it means tag values can be assigned only during the creation of a meshObject. Afterwards it is not longer possible to change the tag values.

> Replication is not supported for meshLandingZones

#### Replicate Tags to Cloud Platforms

- **Replication**:  If a tag has replication enabled, it will be used to tag an actual tenant in the cloud platform.
  - **Replication Tag Key**: Although we recommend using the exact same value as **Name** here, it's possible to use a slightly different tag key when it is used for replication. Also, keep in mind that the tag key will be prefixed, depending on what is configured for [tenant tags](#tags-in-cloud-tenants). When a tag key or value does not meet the cloud platforms' requirements, it will automatically be [sanitized](#tag-sanitization)


## How to delete a tag?

1. Navigate to **Compliance** > **Tags**.
2. Click on ▶️ of the meshObject type you want to delete the tag for. A list of active tags of the meshObject type will appear.
3. Click on the trash icon in the 'Actions' column of the meshPolicy you want to delete in the list of active tags. A prompt will appear.
4. Confirm the deletion by entering the tag key in the input field of the prompt. After the deletion of your tag is finalized your list of active tags will be updated.

> You can only delete a tag which it is not used by any [meshPolicies](meshcloud.policies).

## Tags on meshUsers

meshUsers are defined globally in meshStack and therefore their tags are identical within all meshWorkspaces. As described in [meshPolicies](meshcloud.policies.md#meshpolicies-for-meshUsers/Groups) there are use cases where it makes sense to just apply a set of default tags to all meshUsers. I.e. you want to allow to assign all users to "dev" and "qa" projects, but not to "prod" projects.

<!--snippet:mesh.web.user-->

The following configuration options are available at `mesh.web.user`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let UserTagsConfig =
    {-
          tags:
            Default tags will be applied to every active user in meshStack on every startup of meshStack and
            whenever a new user is added to a meshWorkspace or imported via API
    -}
      { tags : List { mapKey : Text, mapValue : List Text } }
```
<!--Example-->
```dhall
let example
    : UserTagsConfig
    = { tags = [ { mapKey = "environment", mapValue = [ "dev", "qa" ] } ]
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Exposing Tags via Landing Zones

meshStack makes metadata available to [Landing Zones](meshcloud.landing-zones), for example by providing it as parameters to an [Azure Blueprint](meshstack.azure.landing-zones). The Landing Zone documentation for each of meshStack's supported platforms describes how meshStack makes **meshTenant metadata** available.

### meshTenant Metadata

> meshTenant metadata is part of a tenant's desired state. meshStack will therefore automatically reconcile any change to metadata with the actual tenant state.

meshStack automatically derives [metadata tags](meshcloud.metadata-tags) for [meshTenants](meshcloud.tenant) based on the metadata tags set on the [meshProject](meshcloud.project), the [payment method](meshcloud.payment-methods) configured on the meshProject and
the [meshWorkspace](meshcloud.workspace) it belongs to.

It's possible that these objects have tags with the same tag key. For example, both the meshWorkspace and
meshProject could contain a `cmdb-id` tag. Setting the `cmdb-id` tag value on the
meshWorkspace provides it as a "default" value to all tenants owned by that meshWorkspace. A user can then override
this default value on an individual meshProject by providing a value for the optional `cmdb-id` tag on the meshProject.

When merging the tag sources for a meshTenant, meshStack therefore applies the following precedence rule:

```text
meshProject tags > payment method tags > meshWorkspace tags
```

You can find an example in the table below which explains this behavior:

| meshObject        | Tag Name | Tag Value |
| ----------------- | -------- | --------- |
| meshWorkspace     | cmdb-id  | 12        |
| meshPaymentMethod | cmdb-id  | 34        |
| meshProject       | cmdb-id  | 56        |

This example would result in `cmdb-id` being equal to `56` as the meshProject has the highest priority.

### HTTP Header Interface

Some Landing Zone assets like [GCP Cloud Functions](meshstack.gcp.landing-zones) or [Azure Functions](meshstack.azure.landing-zones) receive metadata tags from meshStack using HTTP Headers. meshStack invokes these Landing Zone assets using the following HTTP headers:


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

## Tags in Cloud Tenants

Beside having tags in meshStack, it is also useful for cloud-native users to be aware of the metadata within e.g. Azure. This is why meshStack
supports the ability to "replicate" the tags into the actual cloud platforms. The entire lifecycle of these tags can be managed by meshStack. This means tags on the cloud platform are updated and removed depending on the underlying metadata of the replicated meshProject. meshStack manages all tags of a prefixed namespace (e.g. the `meshstack_` prefix in the tag label `meshstack_costcenter:12345` indicates that this is a meshStack managed tag).

Use the config tab in the [platform control plane](administration.platforms#platform-control-plane) and the [tag definition user interface](#how-to-define-a-new-tag) to enable automatic replication of tags to cloud tenants.

![Tag Configuration Header](assets/platform_maintenance/tag-config-1.png)

![Tag Configuration](assets/platform_maintenance/tag-config-2.png)

Every platform might have different limitations about the tag names and values, which are described in the following sections.

### Extra metadata

The tag definition configuration describes on a per-platform basis how these tags are extracted and transformed into cloud platform tags.
The following extra metadata can be used in such a tag definition configuration:

| Tag Key                       | Description                                                                                                                                               |
| ----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${projectIdentifier}`        | The project identifier                                                                                                                                    |
| `${workspaceIdentifier}`      | The project's workspace identifier                                                                                                                        |
| `${workspaceName}`            | The projects's workspace name                                                                                                                             |
| `${projectName}`              | The project display name                                                                                                                                  |
| `${landingZoneName}`          | The name of the applied [landing zone](meshcloud.landing-zones). It contains `no-landingzone` if the tenant does not have a landing zone applied       |
| `${landingZoneIdentifier}`    | The identifier of the applied [landing zone](meshcloud.landing-zones). It contains `no-landingzone` if the tenant does not have a landing zone applied |
| `${paymentIdentifier}`        | The identifier of the payment method that is assigned to the project                                                                                      |
| `${paymentName}`              | The display name of the payment method that is assigned to the project                                                                                    |
| `${paymentExpirationDate}`    | The expiration date of the payment method that is assigned to the project. It contains `none` if no expiration date is set for the payment method         |
| `${paymentAmount}`            | The amount of the assigned payment method. It is `none` if no payment method is set                                                                       |
| `${contactMail}`              | The email of workspace owner of this project. It is `none` if no owner is set                                                                             |
| `${ownerUsername}`            | The username of the workspace owner of this project. It is `none` if no owner is set                                                                      |
| `${ownerFirstName}`           | The first name of the workspace owner of this project. It is `none` if no owner is set                                                                    |
| `${ownerLastName}`            | The last name of the workspace owner of this project. It is `none` if no owner is set                                                                     |
| `${additionalOwnerUsername}`  | The username of the additional workspace owner of this project. It is `none` if no additional owner is set                                                |
| `${additionalOwnerFirstName}` | The first name of the additional workspace owner of this project. It is `none` if no additional owner is set                                              |
| `${additionalOwnerLastName}`  | The last name of the additional workspace owner of this project. It is `none` if no additional owner is set                                               |

### Tag sanitization

Depending on the platform some limitations apply for maximum tag length or legal characters. You can learn more about these restrictions on [our blog post](https://www.meshcloud.io/2020/09/29/tags-and-labels-on-cloud-platforms-cheat-sheet-2020/).
To ensure that no replication fails because of these restrictions we automatically adapt the tags to ensure they comply with platform requirements. The following behavior happens for the cloud platforms:

### Azure Tags

The following resources are tagged:

- Subscriptions

During replication non conform tag keys and values are possibly adapted to the platform limitations by:

- If tag names are longer then 512 characters, the remaining characters are discarded
- If tag values are longer then 256 characters, the remaining characters are discarded
- Illegal characters are replaced with a `_`
- If a configuration would force a tag key to start with a forbidden prefix we signal an error and won't replicate this project

### AWS Tags

The following resources are tagged:

- Accounts

During replication non conform tag keys and values are possibly adapted to the platform limitations by:

- If tag names are longer then 128 characters, the remaining characters are discarded
- If tag values are longer then 256 characters, the remaining characters are discarded
- Illegal characters are replaced with a `_`

### GCP Tags

The following resources are tagged:

- Projects

During replication non conform tag keys and values are possibly adapted to the platform limitations by:

- If tag names are longer then 64 characters the remaining characters are discarded
- If tag values are longer then 64 characters, the remaining characters are discarded
- Keys and values are forced to be lowercase
- Illegal characters are replaced with a `_`

## Tags in Reports

meshStack includes meshWorkspace, meshProject and Payment Method metadata tags as extra columns in relevant reports, e.g. [Chargeback Statements](meshstack.billing-configuration#chargeback).
