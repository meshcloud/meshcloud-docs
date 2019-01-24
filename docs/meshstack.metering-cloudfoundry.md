---
id: meshstack.metering-cloudfoundry
title: Cloud Foundry Metering
---

meshStack supports metering and billing for all versions of Cloud Foundry.

## Prerequisites

- Cloud Foundry user with `GlobalAuditor` role
- CloudFoundry APIs are accessible by meshStack metering collector components

## Supported Resources

Resources with the following traits are addressable in the Product Catalog.

### Apps

```text
id: cf.app
traits:
 - SIZE (Instances * RAM)
 - EVENT
 - APP_STATE
```

### Marketplace

```text
id: cf.service.instance
traits:
  - SERVICE
  - PLAN
  - TYPE
  - STATE
```

### Spaces

The Space resource is useful for attaching prices directly to a Cloud Foundry Space, regardless of any actual resource consumption.

> Common use cases include using `cf.space` for chargeback of PCF licensing fees to consumers of a cloud platform.

```text
id: cf.space
traits: []
```