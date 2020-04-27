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

## Consuming Metadata in Landing Zones

meshStack makes metadata available to [Landing Zones](./meshcloud.landing-zones.md), for example by providing it as parameters to an [Azure Blueprint](meshstack.azure.landing-zones.md). The Landing Zone documentation for each of meshStack's supported platforms describes how meshStack makes **meshTenant metadata** available.

### meshTenant Metadata

> meshTenant metadata is part of a tenant's desired state. meshStack will therefore automatically reconcile any change to metadata with the actual tenant state.

meshStack automatically derives [metadata tags](./meshcloud.tag-schema.md) for [meshTenants](./meshcloud.tenant.md) based on the metadata tags set on the [meshProject](./meshcloud.project.md), the [payment method](./meshcloud.project-metering.md#payment-methods) configured on the meshProject and
the [meshCustomer](./meshcloud.customer.md) it belongs to.

It's possible that these sources provide different values for the same tag key. For example, both the meshCustomer and
meshProject [tag schema](#tag-schemas) could define a `cmdb-id` tag. Setting the `cmdb-id` tag value on the
meshCustomer provides it as a "default" value to all tenants owned by that meshCustomer. A user can then override
this default value on an individual meshProject by providing a value for the optional `cmdb-id` tag on the meshProject.

When merging the tag sources for a meshTenant, meshStack therefore applies the following precedence rule:

```text
meshProject tags > payment method tags > meshCustomer tags
```

### Http Header Interface

Some landing zone assets like [GCP Cloud Functions](meshstack.gcp.landing-zones.md) or [Azure Functions](./meshstack.azure.landing-zones.md) receive metadata tags from meshStack using HTTP Headers. meshStack invokes these landing zone assets using the following http headers:


| HTTP Header Name                 | Description                                                                                                                                                      |
| -------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `x-mesh-customer-identifier`     | meshCustomer Identifier                                                                                                                                          |
| `x-mesh-project-identifier`      | meshProject identifier                                                                                                                                           |
| `x-mesh-costcenter` *deprecated* | If available, ID of the CostCenter selected for this meshProject. Please use `x-mesh-tag-cost-center` or another [Payment Method tag](#payment-methods) instead. |
| `x-mesh-tag-${format(tagName)}`  | metadata tags as defined in tag schema                                                                                                                           |

Headers for *metadata tags* are formatted to an http-header name by converting `camelCase` tag names into a dashed string i.e. `camel-case` and prefixing them with `x-mesh-tag-`.
As a full example, a tag named `myCustomerTag` would be provided as an HTTP header with name `x-mesh-tag-my-customer-tag`.

## Consuming Metadata in Reports

meshStack includes meshCustomer, meshProject and Payment Method metadata tags as extra columns in relevant reports, e.g. [Chargeback Statements](./meshcloud.project-metering.md#chargeback-statements).

## Tag Schemas

[Configured tag-schemas](meshstack.tag-schema.md) describe the tags available on each meshModel entity and
their associated validation rules. These rules can describe for example if a tag is required or optional.

> meshStack currently supports tag schemas on [meshCustomers](meshcloud.customer.md) and [meshProjects](meshcloud.project.md) only.

For each supported entity, meshStack can maintain two separate separate tag-schemas: **unrestricted** and **restricted** tags.

### Unrestricted Tags

Entity owners can edit tag values for **unrestricted tags** in self-service via meshPanel. For example, a user with a [Customer Admin](./meshcloud.customer.md#assign-meshcustomer-roles) role can edit tags values on the [meshCustomer](meshcloud.customer.md) as well as the [meshProjects](meshcloud.project.md) owned by that customer.

### Restricted Tags

Only [Partners](./administration.index.md) can edit tag values for **restricted tags**. This is useful if an organization
needs to maintain metadata but doesn't want users to edit these values in self-service. For example, an organization can use restricted tags to implement a "segregation of duty" control to ensure that a partner
user confirmed a project's data classification.

## Configuring Tag Schemas

### Defining Tag Schemas

Operators define tag-schemas using JSON Schema.

> Please be aware that meshStack currently only supports version [draft-04](http://json-schema.org/draft-04/schema#) of the JSON schema specification.

As an **example**, the following meshCustomer tag schema defines the following metadata tags:

- `costCenter`: a required string with exactly 4 digits
- `customerOwner`: an optional string designating the responsible owner
- `dataClassification`: a restricted option (designated by `restricted: true` on the property description)

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
    }
  },
  "required": [
    "costCenter"
  ]
}
```

### Configuration Model

Operators can configure tag schemas in the [meshStack configuration model](meshstack.configuration.md) under `meshfed.web` as follows:

```haskell
{
  customerTagSchema = Some "./my-customer-tag-schema.json"
, projectTagSchema = Some "./my-project-tag-schema.json"
}
```

The schemas need to be available in the configuration repository.

### Payment Methods

[Payment Methods](meshcloud.project-metering.md#payment-methods) can also provide metadata information. For example,
the default "cost center" payment method provides the `costCenter` tag.

Operators can also add additional metadata information to [Payment Methods](meshcloud.project-metering.md#payment-methods).
This is useful if your organization needs additional metadata like e.g. contract or budget numbers to chargeback cloud costs.

> It's currently not possible to validate payment method metadata using a tag schema. This feature is only available to Payment Methods created via the [meshStack API](./meshstack.api.md).
