---
id: meshstack.cloudfoundry.metering
title: Metering
---

meshStack supports metering and billing for all versions of Cloud Foundry.

## Prerequisites

- Cloud Foundry user with `GlobalAuditor` role
- CloudFoundry APIs are accessible by meshStack metering collector components

## Supported Resources

Resources with the following traits are addressable in the [Product Catalog](meshstack.billing-configuration.md#defining-a-custom-product-catalog). Platform Engineers can use the traits of these resources to define fine-granular product and pricing rules.

### Service Instance
<!--snippet:mesh.kraken.productcatalog.traits.cloudfoundry.service.instance#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let ServiceInstanceTraits =
    {-
      planId:
        Id of the service plan.

      type:
        Type of the service instance. One of MANAGED_SERVICE_INSTANCE, USER_PROVIDED_SERVICE_INSTANCE, UNKNOWN.
    -}
      { planId : Optional Text, type : Text }
```
<!--Example-->
```dhall
let example
    : ServiceInstanceTraits
    = { planId = Some "c3d68603-6fbb-43cf-a2cc-b134dafca178"
      , type = "MANAGED_SERVICE_INSTANCE"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Application
<!--snippet:mesh.kraken.productcatalog.traits.cloudfoundry.app#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AppResourceTraits =
    {-
      appState:
        Application state. One of RUNNING, STOPPED

      event:
        Last recorded application event. One of STARTED, STOPPED, TASK_STARTED, TASK_STOPPED, BUILDPACK_SET or UNKNOWN.

      instances:
        Number of application instances.

      ramMb:
        RAM per application instance in MiB.

      size:
        Application size, the product of application instances * RAM. In MiB.
    -}
      { appState : Optional Text
      , event : Text
      , instances : Integer
      , ramMb : Integer
      , size : List Integer
      }
```
<!--Example-->
```dhall
let example
    : AppResourceTraits
    = { appState = Some "RUNNING"
      , event = "STARTED"
      , instances = +2
      , ramMb = +1024
      , size = [ +1, +1024 ]
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->
