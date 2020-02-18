---
id: meshstack.api
title: meshStack APIs
---

meshStack provides several APIs that can be consumed by third-party applications. This allows the integration of meshStack into established company processes provided by other applications. Typical examples include migration from legacy cloud management processes and integration with ITSM/CMDB Tools.

> This document only provides an overview of the available APIs and their use cases. Operators can find the technical API documentation in their meshStack implementation via the "API" footer link in meshPanel.

## meshObject API

To import existing cloud tenants provisioned through existing company processes, meshStack provides an import API for [meshModel objects](meshcloud.index.md) like meshCustomer, meshProject etc.

The meshObject API allows external systems to use the `PUT` request method for importing meshObject definitions as YAML.

## Customer Registration API

The Customer Registration API enables third-party applications to handle sign-up/registration flows for meshStack.
This is useful if your organization requires a highly customized onboarding experience e.g. involving budget or collection of regulatory documents. These kind of processes are typically already modeled in existing enterprise systems like ITSM Portals or Workflow Automation software.
