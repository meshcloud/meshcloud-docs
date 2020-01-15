---
id: meshstack.meshobjects.supported-definitions
title: Supported definitions
---

Currently, we support meshUser, meshCustomer, meshProject, meshTenant, meshCustomerUserBinding, and meshProjectUserBinding.

## meshUser

```yaml
apiVersion: v1
kind: meshUser
metadata:
  name: test-user
spec:
  email: test-user-email
  firstName: test-first-name
  lastName: test-last-name
```

## meshCustomer

```yaml
apiVersion: v1
kind: meshCustomer
metadata:
  name: test-customer # this must be unique, so we can use this as customer identifier
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

## meshProject

```yaml
apiVersion: v1
kind: meshProject
metadata:
  name: test-project
  ownedByCustomer: test-customer
spec:
  displayName: test-project-display-name
  tags:
    costCenter: 2222
```

## meshTenant

```yaml
apiVersion: v1
kind: meshTenant
metadata:
  ownedByProject: test-project
  ownedByCustomer: test-customer
  platformIdentifier: platform-identifier.location-identifier
spec:
  localId: 12345678
  landingZone: test-landing-zone
```

## meshCustomerUserBinding

```yaml
apiVersion: v1
kind: meshCustomerUserBinding
roleRef:
  name: Customer Admin
targetRef:
  name: test-customer
subjects:
  - name: test-user
```

## meshProjectUserBinding

```yaml
apiVersion: v1
kind: meshProjectUserBinding
roleRef:
  name: Project Admin
targetRef:
  name: test-project
  ownedByCustomer: test-customer
subjects:
  - name: test-user
```
