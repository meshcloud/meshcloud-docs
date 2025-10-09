---
id: all-meshobjects
title: All meshObjects
---

## meshUser

If tags are provided on a meshUser, they should be consistent with tags defined on meshWorkspaceUserGroups,
as meshUsers and meshWorkspaceUserGroups are handled as if they are the same. This is especially important when making use
of meshPolicies on these two types of objects.

### YAML

```yaml
apiVersion: v2
kind: meshUser
metadata:
  name: john-doe
spec:
  email: john.doe@example.com
  firstName: John
  lastName: Doe
  euid: john-doe-123 # External User Identifier, this is an optional field.
  tags: # optional field.
    environment:
      - dev
      - qa
      - prod
    anotherTag:
      - myValue
```

### JSON

```json
{
  "apiVersion": "v2",
  "kind": "meshUser",
  "metadata": {
    "name": "john-doe"
  },
  "spec": {
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "euid": "john-doe-123",
    "tags": {
      "environment": [
        "dev",
        "qa",
        "prod"
      ],
      "anotherTag": [
        "myValue"
      ]
    }
  }
}
```

## meshWorkspace

We strongly recommend assigning a single Workspace Owner when importing a meshWorkspace.
You can assign a Workspace Owner via the [meshWorkspaceUserBinding](#meshworkspaceuserbinding).
Having a Workspace Owner is a best practice advocated by meshcloud.
It allows you to have a clear responsibility and ownership of the meshWorkspace.
This is useful when you want to get in touch with someone from a particular meshWorkspace and you need a clear contact person.

### YAML

```yaml
apiVersion: v1
kind: meshWorkspace
metadata:
  name: my-mobile-app-team # this must be unique, so it can be used as a unique reference to the meshWorkspace.
spec:
  displayName: Mobile App Team # The name of the meshWorkspace can be any length and contain any characters.
  tags:   # optional field
    environment:
      - dev
      - qa
      - prod
    anotherTag:
      - myValue
```

### JSON

```json
{
  "apiVersion": "v1",
  "kind": "meshWorkspace",
  "metadata": {
    "name": "my-mobile-app-team"
  },
  "spec": {
    "displayName": "Mobile App Team",
    "tags": {
      "environment": [
        "dev",
        "qa",
        "prod"
      ],
      "anotherTag": [
        "myValue"
      ]
    }
  }
}
```

## meshPaymentMethod

If you want to assign this payment method to a project, you can do so using the [meshProject](#meshproject) object.

### YAML

```yaml
apiVersion: v2
kind: meshPaymentMethod
metadata:
  name: mobile-app-budget-2021 # must be unique across entire meshstack
  ownedByWorkspace: my-mobile-app-team
spec:
  displayName: Mobile App Budget 2021
  amount: 50000 # optional field, must be a number
  expirationDate: 2021-12-31 # optional field
  tags: # optional field
    costCenter:
      - 1332
    anotherTag:
      - myValue
      - someOtherValue
```

### JSON

```json
{
  "apiVersion": "v2",
  "kind": "meshPaymentMethod",
  "metadata": {
    "name": "mobile-app-budget-2021",
    "ownedByWorkspace": "my-mobile-app-team"
  },
  "spec": {
    "displayName": "Mobile App Budget 2021",
    "amount": 50000,
    "expirationDate": "2021-12-31",
    "tags": {
      "costCenter": [
        1332
      ],
      "anotherTag": [
        "myValue",
        "someOtherValue"
      ]
    }
  }
}
```

## meshProject

The optional payment method identifiers can be used to link the meshProject with
meshPaymentMethods. If meshPaymentMethods are already assigned to an
existing meshProject the assignments will be updated on meshProject re-import.
It is not valid to specify only a `substitutePaymentMethodIdentifier` without defining a
`paymentMethodIdentifier`.

### YAML

```yaml
apiVersion: v2
kind: meshProject
metadata:
  name: mobile-app-prod
  ownedByWorkspace: my-mobile-app-team
spec:
  displayName: Mobile App Production
  tags: # optional field
    environment:
      - prod
  paymentMethodIdentifier: payment-id # optional field
  substitutePaymentMethodIdentifier: substitute-payment-id # optional field
```

### JSON

```json
{
  "apiVersion": "v2",
  "kind": "meshProject",
  "metadata": {
    "name": "mobile-app-prod",
    "ownedByWorkspace": "my-mobile-app-team"
  },
  "spec": {
    "displayName": "Mobile App Production",
    "tags": {
      "environment": [
        "prod"
      ]
    },
    "paymentMethodIdentifier": "payment-id",
    "substitutePaymentMethodIdentifier": "substitute-payment-id"
  }
}
```

## meshWorkspaceUserGroup

A meshWorkspaceUserGroup is a user group which can be owned by a meshWorkspace/meshPartner.

### YAML

```yaml
apiVersion: v1
kind: meshWorkspaceUserGroup
metadata:
  name: my-user-group
  ownedByWorkspace: my-mobile-app-team
spec:
  displayName: My User Group
  egid: sample-egid # External Group Identifier, this is an optional field.
  members: # list of usernames
    - john-doe
    - jane-doe
  tags: # optional field
    environment:
      - dev
      - qa
      - prod
    anotherTag:
      - myValue
```

### JSON

```json
{
  "apiVersion": "v1",
  "kind": "meshWorkspaceUserGroup",
  "metadata": {
    "name": "my-user-group",
    "ownedByWorkspace": "my-mobile-app-team"
  },
  "spec": {
    "displayName": "My User Group",
    "egid": "sample-egid",
    "members": [
      "john-doe",
      "jane-doe"
    ],
    "tags": {
      "environment": [
        "dev",
        "qa",
        "prod"
      ],
      "anotherTag": [
        "myValue"
      ]
    }
  }
}
```

## meshWorkspaceUserBinding

A meshWorkspaceUserBinding is an assignment of users to a meshWorkspace/meshPartner.
The subjects array contains a list of users, where each name represents the username of an user assigned to the workspace.

### YAML

```yaml
apiVersion: v1
kind: meshWorkspaceUserBinding
roleRef:
  name: Workspace Manager
targetRef:
  name: my-mobile-app-team
subjects:
  - name: john-doe # Username of the user
  - name: jane-doe # Username of the user
```

### JSON

```json
{
  "apiVersion": "v1",
  "kind": "meshWorkspaceUserBinding",
  "roleRef": {
    "name": "Workspace Manager"
  },
  "targetRef": {
    "name": "my-mobile-app-team"
  },
  "subjects": [
    {
      "name": "john-doe"
    },
    {
      "name": "jane-doe"
    }
  ]
}
```

## meshWorkspaceGroupBinding

Assigns a meshWorkspaceUserGroup to a meshWorkspace/meshPartner with the specified role. All users in the group will receive the rights from the role.
The subjects array contains a list of groups, where each name represents the group identifier of a group assigned to the workspace.
The Workspace Owner role cannot be assigned to groups. It is only possible to assign users directly to that role.
4-eye-principle is not supported when creating a meshWorkspaceGroupBinding via this API.

### YAML

```yaml
apiVersion: v1
kind: meshWorkspaceGroupBinding
roleRef:
  name: Workspace Manager
targetRef:
  name: my-mobile-app-team
subjects:
  - name: my-user-group # Group Identifier
  - name: and-another-user-group # Group Identifier
```

### JSON

```json
{
  "apiVersion": "v1",
  "kind": "meshWorkspaceGroupBinding",
  "roleRef": {
    "name": "Workspace Manager"
  },
  "targetRef": {
    "name": "my-mobile-app-team"
  },
  "subjects": [
    {
      "name": "my-user-group"
    },
    {
      "name": "and-another-user-group"
    }
  ]
}
```

## meshProjectUserBinding

### YAML

```yaml
apiVersion: v3
kind: meshProjectUserBinding
metadata:
  name: user-binding-name
roleRef:
  name: Project Admin
targetRef:
  name: mobile-app-prod
  ownedByWorkspace: my-mobile-app-team
subject:
  name: jane-doe
```

### JSON

```json
{
  "apiVersion": "v3",
  "kind": "meshProjectUserBinding",
  "metadata": {
    "name": "user-binding-name"
  },
  "roleRef": {
    "name": "Project Admin"
  },
  "targetRef": {
    "name": "mobile-app-prod",
    "ownedByWorkspace": "my-mobile-app-team"
  },
  "subject": {
    "name": "jane-doe"
  }
}
```

## meshProjectGroupBinding

### YAML

```yaml
apiVersion: v3
kind: meshProjectGroupBinding
metadata:
  name: group-binding-name
roleRef:
  name: Project Employee
targetRef:
  name: mobile-app-prod
  ownedByWorkspace: my-mobile-app-team
subject:
  name: my-user-group
```

### JSON

```json
{
  "apiVersion": "v3",
  "kind": "meshProjectGroupBinding",
  "metadata": {
    "name": "group-binding-name"
  },
  "roleRef": {
    "name": "Project Employee"
  },
  "targetRef": {
    "name": "mobile-app-prod",
    "ownedByWorkspace": "my-mobile-app-team"
  },
  "subject": {
    "name": "my-user-group"
  }
}
```

## meshTenant

See attribute definitions in the GET endpoint section.

The **platformTenantId** property is optional. This means that a new tenant will be created within the specific platform if no platformTenantId was specified.
The **landingZone** property may be skipped, e.g., for platforms that do not support landing zones.

The quotas must only contain keys that exist in the platform quota definitions for the respective platform, otherwise the import for the meshTenant will fail.
Values of omitted quota keys defined in the platform quota definitions will be automatically set to the quotas of the specified landing zone.

### YAML

```yaml
apiVersion: v3
kind: meshTenant
metadata:
  ownedByProject: mobile-app-prod
  ownedByWorkspace: my-mobile-app-team
  platformIdentifier: platform-identifier.location-identifier
spec:
  localId: test-tenant # (optional) The tenant id, e.g. AWS account id or Azure subscription id.
  landingZoneIdentifier: test-landing-zone-id # (optional) The identifier of the landing zone.
  quotas: # Only for platforms that support quotas
    - key: limits.cpu
      value: 2000
    - key: limits.memory
      value: 100000
```

### JSON

```json
{
  "apiVersion": "v3",
  "kind": "meshTenant",
  "metadata": {
    "ownedByProject": "mobile-app-prod",
    "ownedByWorkspace": "my-mobile-app-team",
    "platformIdentifier": "platform-identifier.location-identifier"
  },
  "spec": {
    "localId": "test-tenant",
    "landingZoneIdentifier": "test-landing-zone-id",
    "quotas": [
      {
        "key": "limits.cpu",
        "value": 2000
      },
      {
        "key": "limits.memory",
        "value": 100000
      }
    ]
  }
}
```

You can also use the v4-preview API, if you want to try it out. Be aware, that incompatible changes can still be applied
to the preview version.

### YAML (v4-preview)

```yaml
apiVersion: v4-preview
kind: meshTenant
metadata:
  uuid: b7a77a7f-4579-42fc-b39a-462fe596063f
  ownedByWorkspace: my-mobile-app-team
  ownedByProject: mobile-app-prod
spec:
  platformIdentifier: aws.aws-meshstack-dev
  platformTenantId: 2f3561e8-51f4-451f-bc92-9e5c8c6dd98f # (optional) e.g. AWS account id or Azure subscription id.
  landingZoneIdentifier: test-landing-zone-id # (optional) The identifier of the landing zone.
  quotas: # Only for platforms that support quotas
    - key: limits.cpu
      value: 2000
    - key: limits.memory
      value: 100000
```

### JSON (v4-preview)

```json
{
  "kind": "meshTenant",
  "apiVersion": "v4-preview",
  "metadata": {
    "uuid": "b7a77a7f-4579-42fc-b39a-462fe596063f",
    "ownedByWorkspace": "my-mobile-app-team",
    "ownedByProject": "mobile-app-prod"
  },
  "spec": {
    "platformIdentifier": "aws.aws-meshstack-dev",
    "landingZoneIdentifier": "test-landing-zone-id",
    "platformTenantId": "2f3561e8-51f4-451f-bc92-9e5c8c6dd98f",
    "quotas": [
      {
        "key": "limits.cpu",
        "value": 2000
      },
      {
        "key": "limits.memory",
        "value": 10000
      }
    ]
  }
}
```

## meshServiceInstance

### YAML

```yaml
apiVersion: v2
kind: meshServiceInstance
metadata:
  ownedByProject: mobile-app-prod
  ownedByWorkspace: my-mobile-app-team
  marketplaceIdentifier: global # You can find the marketplace identifier in the meshWorkspace service brokers list in the meshPanel
  instanceId: f78ab615-75a4-446f-b8fe-a6db672c039a # will be used when creating bindings (see meshServiceBinding example below)
spec:
  displayName: My Service Instance
  serviceId: 0164a5b6-f909-434b-9015-46939e993797
  planId: c6d93bf8-642c-48a7-a629-91869a5180c3
  creator: john-doe # username of the user to use for creating the service instance
  parameters: # parameters may also be mitigated by providing an empty object: {}
    myParam: myValue
```

### JSON

```json
{
  "apiVersion": "v2",
  "kind": "meshServiceInstance",
  "metadata": {
    "ownedByProject": "mobile-app-prod",
    "ownedByWorkspace": "my-mobile-app-team",
    "marketplaceIdentifier": "global",
    "instanceId": "f78ab615-75a4-446f-b8fe-a6db672c039a"
  },
  "spec": {
    "displayName": "My Service Instance",
    "serviceId": "0164a5b6-f909-434b-9015-46939e993797",
    "planId": "c6d93bf8-642c-48a7-a629-91869a5180c3",
    "creator": "john-doe",
    "parameters": {
      "myParam": "myValue"
    }
  }
}
```

## meshServiceInstanceBinding

### YAML

```yaml
apiVersion: v1
kind: meshServiceInstanceBinding
metadata:
  ownedByServiceInstance: f78ab615-75a4-446f-b8fe-a6db672c039a
  bindingId: 32a3eb92-a210-48c4-b734-0b6f5874abc0
spec:
  displayName: My Service Instance Binding
  parameters: {} # empty in this example
```

### JSON

```json
{
  "apiVersion": "v1",
  "kind": "meshServiceInstanceBinding",
  "metadata": {
    "ownedByServiceInstance": "f78ab615-75a4-446f-b8fe-a6db672c039a",
    "bindingId": "32a3eb92-a210-48c4-b734-0b6f5874abc0"
  },
  "spec": {
    "displayName": "My Service Instance Binding",
    "parameters": {}
  }
}
```

When binding to a tenant aware service you must also specify the tenant:

### YAML (with Tenant)

```yaml
apiVersion: v1
kind: meshServiceInstanceBinding
metadata:
  ownedByServiceInstance: f78ab615-75a4-446f-b8fe-a6db672c039a
  bindingId: 32a3eb92-a210-48c4-b734-0b6f5874abc0
spec:
  displayName: My Binding With Tenant
  parameters:
    param: value
  tenant:
    localId: d4932d8f-2b31-4df7-be87-29a7ccd90a4d # e.g. AWS account id or Azure subscription id
    platformIdentifier: aws.test-location
```

### JSON (with Tenant)

```json
{
  "apiVersion": "v1",
  "kind": "meshServiceInstanceBinding",
  "metadata": {
    "ownedByServiceInstance": "f78ab615-75a4-446f-b8fe-a6db672c039a",
    "bindingId": "32a3eb92-a210-48c4-b734-0b6f5874abc0"
  },
  "spec": {
    "displayName": "My Binding With Tenant",
    "parameters": {
      "param": "value"
    },
    "tenant": {
      "localId": "d4932d8f-2b31-4df7-be87-29a7ccd90a4d",
      "platformIdentifier": "aws.test-location"
    }
  }
}
```

## meshExchangeRate

This API is used when you intend to provide your own exchange rates, instead of using the exchange rates
from [Frankfurter API](https://frankfurter.dev/) which meshStack uses by default.

If you choose to use this API to provide your own exchange rates, it is **your responsibility** to ensure that
meshStack always has up-to-date exchange rates available. When TenantUsageReports for a given period are created, meshStack
looks for the most recent exchange rate within the monthly period. For example, if a TenantUsageReport
has a period of 2025-05, and you have previously provided exchange rates dated 2025-05-01 and 2025-05-02,
meshStack will use the exchange rates dated on 2025-05-02. However, if the most recent exchange
rate is dated 2025-04-30, then no suitable exchange rate for 2025-05 will be found, and meshStack will apply
a fallback exchange rate of 1:1. Therefore, it is important to always provide up-to-date exchange rates to prevent
the fallback rate from being applied.

### YAML

```yaml
apiVersion: v1
kind: meshExchangeRate
date: 2023-05-31
rates:
  - sourceCurrency: EUR
    targetCurrency: USD
    rate: 1.0647
  - sourceCurrency: USD
    targetCurrency: EUR
    rate: 0.93923
```

### JSON

```json
{
  "apiVersion": "v1",
  "kind": "meshExchangeRate",
  "date": "2023-05-31",
  "rates": [
    {
      "sourceCurrency": "EUR",
      "targetCurrency": "USD",
      "rate": 1.0647
    },
    {
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "rate": 0.93923
    }
  ]
}
```
