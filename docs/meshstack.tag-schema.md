---
id: meshstack.tag-schema
title: Metadata Tags
---

Operators can configure meshStack to collect, attach and distribute organization-specific metadata to [meshModel](meshcloud.index.md) objects using [metadata tags](./meshcloud.tag-schema.md).

## Use Cases for Metadata Tags

meshStack often acts as an organization's central registry of cloud environments and services. It therefore needs to cover
a wide range of use cases for orchestrating organizational processes across multiple clouds, for example

- centralized management and configuration of [cloud platforms](./meshcloud.platform-location.md)
- life-cycle management for [cloud tenants](meshcloud.tenant.md) and [security policy automation](./meshcloud.landing-zones.md)
- centralized Identity and Access Management (IAM) via [multi-cloud identity federation](meshstack.identity-federation.md)
- unified [chargeback process](./meshcloud.project-metering.md) across all cloud platforms and services

Many of these use cases can require organizational metadata to be shared across different systems. Common examples of
such metadata include:

- IT System identifiers that can link cloud tenants to an enterprise configuration management database
- Cost Center and department information
- Security and Operations contacts for a project
- Data Confidentiality Levels

Operators can model this metadata as **tags** using a [tag schema](#tag-schemas). When a meshStack implementation has configured [tag schemas](#tag-schemas) it makes metadata tags available to orchestration and reports.

## Tag Schemas

[Configured tag-schemas](meshstack.tag-schema.md) describe the tags available on each meshModel entity and
their associated validation rules. These rules can describe for example if a tag is required or optional.

> meshStack currently supports tag schemas on [meshCustomers](meshcloud.customer.md), [meshProjects](meshcloud.project.md) and [meshLandingZones](meshcloud.landing-zones.md).

For each supported entity, meshStack can maintain two separate tag-schemas: **unrestricted** and **restricted** tags.

### Unrestricted Tags

Entity owners can edit tag values for **unrestricted tags** in self-service via meshPanel. For example, a user with a [Customer Admin](./meshcloud.customer.md#assign-meshcustomer-roles) role can edit tags values on the [meshCustomer](meshcloud.customer.md) as well as the [meshProjects](meshcloud.project.md) owned by that customer.

### Restricted Tags

Only [Partners](./administration.index.md) can edit tag values for **restricted tags** indirectly via authoritative external system.
This is useful if an organization needs to maintain metadata but doesn't want users to edit these values in self-service. For example, an organization can use restricted tags to implement a "segregation of duty" control to ensure that a partner
user confirmed a project's data classification.

## Configuring Tag Schemas

### Defining Tag Schemas

Operators define tag-schemas using JSON Schema. As described earlier on this page, meshStack uses metadata tags in a wide range of use
cases like providing parameters to Landing Zones. To ensure compatibility with different interfaces, tags must be simple
key-value pairs of strings only. A list of strings is also allowed, e.g. `environment = ['qa', 'production']`.

The tag schema must therefore ensure all values are `string` or `string[]` values only. Operators who want to represent numbers can
restrict the string value via an appropriate `pattern`.

> Please be aware that meshStack currently supports version [draft-04](http://json-schema.org/draft-04/schema#) of the JSON schema specification.

As an **example**, the following meshCustomer tag schema defines the following metadata tags:

- `costCenter`: a required string with exactly 4 digits
- `customerOwner`: an optional string designating the responsible owner
- `dataClassification`: a restricted option (designated by `restricted: true` on the property description)
- `environment`: a list that indicates what types of staging environments are used in the meshCustomer. (this is a good example of an array of strings)

> By convention, tag names must always use `camelCase` notation.

```JSON
{
  "$id": "https://schemas.meshcloud.io/customer-tags",
  "type": "object",
  "properties": {
    "costCenter": {
      "$id": "/properties/costCenter",
      "type": "string",
      "title": "Cost Center",
      "description": "Must be exactly 4 digits.",
      "default": "1001",
      "maxLength": 4,
      "pattern": "^\\d{4}$",
      "examples": [
        "2860"
      ]
    },
    "customerOwner": {
      "$id": "/properties/customerOwner",
      "type": "string",
      "title": "Customer Owner",
      "description": "Person responsible for this customer.",
      "default": "Anna Admin"
    },
    "dataClassification": {
      "$id": "/properties/dataClassification",
      "type": "string",
      "title": "Data Classification (by admin)",
      "description": "As recorded during the approval process",
      "restricted": true,
      "oneOf": [
        {
          "description": "Internal",
          "enum": ["internal"]
        },
        {
          "description": "Confidential",
          "enum": ["confidential"]
        },
        {
          "description": "Top Secret",
          "enum": ["top-secret"]
        }
      ],
      "default": "internal"
    },
    "environment": {
      "$id": "/properties/environment",
      "type": "array",
      "title": "Environment",
      "description": "The environment(s) the customer uses.",
      "minItems": 1,
      "items": {
        "type": "string",
        "oneOf": [
          {
            "description": "Development",
            "enum": [
              "dev"
            ]
          },
          {
            "description": "Test",
            "enum": [
              "test"
            ]
          },
          {
            "description": "QA",
            "enum": [
              "qa"
            ]
          },
          {
            "description": "Production",
            "enum": [
              "prod"
            ]
          }
        ]
      },
      "widget": "multiselect",
      "default": ["dev"],
      "restricted": true
    }
  },
  "required": [
    "costCenter"
  ]
}
```

### Configuration Model

Operators can configure tag schemas in the [meshStack configuration model](meshstack.configuration.md) under `meshfed.web` as follows:

```dhall
{
  customerTagSchema = Some "./my-customer-tag-schema.json"
, projectTagSchema = Some "./my-project-tag-schema.json"
, landingZoneTagSchema = Some "./my-landing-zone-tag-schema.json"
}
```

The schemas need to be available in the configuration repository.

### Payment Methods

[Payment Methods](meshcloud.payment-methods.md) can also provide metadata information. For example,
the default "cost center" payment method provides the `costCenter` tag.

Operators can also add additional metadata information to [Payment Methods](meshcloud.payment-methods.md).
This is useful if your organization needs additional metadata like e.g. contract or budget numbers to chargeback cloud costs.

> It's currently not possible to validate payment method metadata using a tag schema. This feature is only available to Payment Methods created via the [meshStack API](./meshstack.api.md).


## Tags in Landing Zones

meshStack makes metadata available to [Landing Zones](./meshcloud.landing-zones.md), for example by providing it as parameters to an [Azure Blueprint](meshstack.azure.landing-zones.md). The Landing Zone documentation for each of meshStack's supported platforms describes how meshStack makes **meshTenant metadata** available.

### meshTenant Metadata

> meshTenant metadata is part of a tenant's desired state. meshStack will therefore automatically reconcile any change to metadata with the actual tenant state.

meshStack automatically derives [metadata tags](./meshcloud.tag-schema.md) for [meshTenants](./meshcloud.tenant.md) based on the metadata tags set on the [meshProject](./meshcloud.project.md), the [payment method](./meshcloud.payment-methods.md) configured on the meshProject and
the [meshCustomer](./meshcloud.customer.md) it belongs to.

It's possible that these sources provide different values for the same tag key. For example, both the meshCustomer and
meshProject [tag schema](#tag-schemas) could define a `cmdb-id` tag. Setting the `cmdb-id` tag value on the
meshCustomer provides it as a "default" value to all tenants owned by that meshCustomer. A user can then override
this default value on an individual meshProject by providing a value for the optional `cmdb-id` tag on the meshProject.

When merging the tag sources for a meshTenant, meshStack therefore applies the following precedence rule:

```text
meshProject tags > payment method tags > meshCustomer tags
```

### HTTP Header Interface

Some Landing Zone assets like [GCP Cloud Functions](meshstack.gcp.landing-zones.md) or [Azure Functions](./meshstack.azure.landing-zones.md) receive metadata tags from meshStack using HTTP Headers. meshStack invokes these Landing Zone assets using the following HTTP headers:


| HTTP Header Name                 | Description                                                                                                                                                      |
| -------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-mesh-customer-identifier`     | meshCustomer Identifier                                                                                                                                          |
| `x-mesh-project-identifier`      | meshProject identifier                                                                                                                                           |
| `x-mesh-costcenter` *deprecated* | If available, ID of the CostCenter selected for this meshProject. Please use `x-mesh-tag-cost-center` or another [Payment Method tag](#payment-methods) instead. |
| `x-mesh-tag-${format(tagName)}`  | metadata tags as defined in tag schema                                                                                                                           |

Headers for *metadata tags* are formatted to an http-header name by converting `camelCase` tag names into a dashed string i.e. `camel-case` and prefixing them with `x-mesh-tag-`.
As a full example, a tag named `myCustomerTag` would be provided as an HTTP header with name `x-mesh-tag-my-customer-tag`.

## Tags in Cloud Tenants

Certain cloud platforms allow you to tag resources in order to help organize them. It is possible to use the metadata tags from meshStack to control how these resources are tagged during project replication. The whole lifecycle of this tags is managed. This means tags on the cloud platform are updated and removed depending on the underlying metadata of the replicated meshProject. In order to properly track meshStack managed tags, every tag is usually prefixt with a tag prefix (e.g. the `meshstack_` prefix in the tag label `meshstack_costcenter:12345`).

<!--snippet:mesh.platform.tenantTags#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let TenantTags =
    {-
      namespace-prefix:
        Every tag managed by meshstack is prefixed so meshstack can detect deleted tags and clean them up.
        Using a prefix to identify this enables the customer to use own tags on resources which are not touched
        by meshstack.

      tag-definitions[].name:
        The name of the tag on the target platform. Every platform might have different limitations about the
        tag names.

      tag-definitions[].value-pattern:
        Define a pattern which is used to generate the tag value on the platform. Every platform might have different
        limitations about the tag values. For a list about the placeholder you can use please check the meshstack
        documentation. Currently its not possible to use more then one identifier per valuePattern.
    -}
      { namespace-prefix : Text
      , tag-definitions : List { name : Text, value-pattern : Text }
      }
```
<!--Example-->
```dhall
let example =
        { namespace-prefix = "meshstack_"
        , tag-definitions =
          [ { name = "cident", value-pattern = "prefix-\${customerIdentifier}" }
          ]
        }
      : TenantTags
```
<!--END_DOCUSAURUS_CODE_TABS-->

The tag definition configuration describes on a per platform basis how these tags are extracted and transformed into cloud platform tags.
The following tags values can be used in such a tag definition configuration:

| Tag Key                    | Description                                                                                                                                       |
| -------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `${projectIdentfier}`      | The meshProject identifier                                                                                                                        |
| `${customerIdentifier}`    | The meshProject's customer identifier                                                                                                             |
| `${tagTagNameInCamelCase}` | These are the custom tags controlled by the customer when setting up the meshStack installation. Possible would be for example `${tagCostCenter}` |

> Currently only one such placeholder can be used per tag value.

Depending on the platform some limitations apply for maximum tag length or legal characters. The following platforms are supported:

### Azure Tags

The following resources are tagged:

- Subscriptions

The following limitations apply:

- Maximum number of tags on a single resource is 50, you can work around this by combining multiple values into a single tag.
- Tag names can have up to 512 characters
- Tag values can have up to 256 characters
- Tag names can not start with either `microsoft`, `azure`, `windows`
- Tags are not case-sensitive
- Tag keys can **not** contain any of: `<`, `>`, `%`, `&`, `/` or `?`

For more information about Azure Tags [see the Azure Docs](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources#rest-api).

During replication non conform tag keys and values are possibly adapted to the platform limitations by:

- If tag names are longer then 512 characters the remaining characters are discarded
- If tag values are longer then 256 characters, the remaining characters are discarded
- Illegal characters are replaced with a `_`
- If a configuration would force a tag key to start with a forbidden prefix we signal an error and wont replicate this project

### AWS Tags

The following resources are tagged:

- Accounts

The following limitations apply:

- Key length between 1 and 128. Pattern: `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`.
- Value length between 0 and 256. Pattern: `^([\p{L}\p{Z}\p{N}_.:/=+\-@]*)$`.

For more information about AWS tags see the [API docs](https://docs.aws.amazon.com/organizations/latest/APIReference/API_TagResource.html) and the [general documentation](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tagging.html).

During replication non conform tag keys and values are possibly adapted to the platform limitations by:

- If tag names are longer then 128 characters the remaining characters are discarded
- If tag values are longer then 256 characters, the remaining characters are discarded
- Illegal characters are replaced with a `_`

### GCP Tags

The following resources are tagged:

- Projects

The following limitations apply:

- Maximum number of tags on a single resource is 64.
- Keys have a minimum length of 1 character and a maximum length of 63 characters, and cannot be empty.
- Values can be empty, and have a maximum length of 63 characters.
- Key pattern: `[a-z]([_-a-z0-9]*[a-z0-9])?`
- Value pattern: `([_-a-z0-9]*[a-z0-9])?`

For more information about GCP Labels [see the GCP Docs](https://cloud.google.com/resource-manager/docs/creating-managing-labels).

During replication non conform tag keys and values are possibly adapted to the platform limitations by:

- If tag names are longer then 64 characters the remaining characters are discarded
- If tag values are longer then 64 characters, the remaining characters are discarded
- Keys and values are forced to be lowercase
- Illegal characters are replaced with a `_`

## Tags in Reports

meshStack includes meshCustomer, meshProject and Payment Method metadata tags as extra columns in relevant reports, e.g. [Chargeback Statements](./meshcloud.project-metering.md#chargeback-statements).
