---
id: meshstack.tag-schema
title: Tag Schema
---

meshStack provides the option to configure Tag Schemas. This allows the integration of additional meta information.
We differentiate between restricted and unrestricted tags.

- Restricted Tags:
    - Restricted tags can only be edited by Administrators
    - Customer Admins can not see restricted tags
- Unrestricted Tags:
    - Unrestricted Tags can only be edited by Customer Admins
    - Administrators can not see unrestricted tags

Currently we support this functionality for meshCustomer and meshProjects.

## Customer Tag Schema

The Customer Tag Schema can define for example a costCenter and customerOwner. These tags can be edited as Administrator in the customers overiew. There exists for each customer the option to edit also the specifc tags.

**Example**:

```YAML
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
    "costCenterByAdmin": {
      "$id": "/properties/costCenterByAdmin",
      "type": "string",
      "title": "Cost Center (by admin)",
      "description": "must be exactly 4 digits",
      "maxLength": 4,
      "pattern": "^\\d{4}$",
      "restricted": true
    }
  },
  "required": [
    "costCenter"
  ]
}
```
