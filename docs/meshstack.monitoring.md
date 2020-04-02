---
id: meshstack.monitoring
title: Metrics & Monitoring
---

In addition to [Logging & Auditing](./meshstack.logging.md), meshStack supports metric monitoring of production
deployments using [Prometheus](https://prometheus.io/). Our [managed service](meshstack.managed-service.md) team
relies on this monitoring to operate meshStack installations.

## Prometheus Scraping

Prometheus scrapes metrics from nodes as well as from all meshStack configuration.
Scraping is secured using HTTPS Basic auth. The credentials are managed as part of the deployment.

## Additional Alert Inboxes

meshStack comes with pre-configured alerting rules. These alerts are typically only addressed to our [managed service](meshstack.managed-service.md) team, but can also be sent to additional alert inboxes if required.

These email inboxes be configured in the [meshStack configuration model](meshstack.configuration.md) under `monitor` as follows:

```haskell
{
, additionalAlertAddresses = [ "alerts@example.com" ]
}
```


## Sonar

meshStack includes a component called **Sonar** that runs live smoke tests in your meshStack implementation.
These smoke test simulate real end-to-end user interactions with meshStack via the external API.
These tests also include end-to-end interaction with [meshPlatforms](meshcloud.platform-location.md) like tenant replication.

> Setting up Sonar requires a [meshCustomer](meshcloud.customer.md) and [meshProject](meshcloud.project.md) as well as a technical user in meshIdB.
> Depending on the [Enterprise IdP](meshstack.identity-federation.md) and IAM configuration in your
> meshStack implementation this setup may not be possible.

Sonar can be configured in the [meshStack configuration model](meshstack.configuration.md) under `monitor.sonar` as follows:

```haskell
{
  -- Credentials for a technical user in meshIdB
  username = Text
, password = Secret
 -- Identifiers for a meshCustomer
  customer : Text
, project : Text
-- The scan interval in seconds
, scanInterval : Natural
-- The targets to scan (meshPlatform identifier and meshTenant `/access` URL)
, targets : List { platformName : Text, url : Text }
}
```
