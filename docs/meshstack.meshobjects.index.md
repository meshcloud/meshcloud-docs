---
id: meshstack.meshobjects.index
title: Overview
---

To import existing cloud tenants provisioned through existing company processes, meshStack provides an import API for meshObjects like meshCustomer, meshProject, etc.

## Import

This endpoint allows external systems to use the PUT request method for importing meshObject definitions within a YAML definition. Each section of the definition describes a specific account component. All supported meshDefinitions can be found under [Supported definitions](./meshstack.meshobjects.supported-definitions.md).

### Example Request

```http
PUT /external/meshobjects/v1 HTTP/1.1
Content-Type: application/text;charset=UTF-8
Authorization: Basic ****
Host: mesh-backend-url
Content-Length: 516

apiVersion: v1
kind: meshUser
metadata:
  name: test-user
spec:
  email: test-user@meshcloud.io
  firstName: test-user-first-name
  lastName: test-user-last-name
---
apiVersion: v1
kind: meshCustomer
metadata:
  name: test-customer
spec:
  displayName: test-display-name
  costCenter: 1111
  address:
    email: address-email
    companyName: address-company-name
    division: address-division
    street: address-street
    houseNumber: 1
    zipCode: 1111
    city: address-city
    country: address-country
```
