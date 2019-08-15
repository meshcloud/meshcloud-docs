---
id: meshstack.metering-meshmarketplace
title: meshMarketplace Metering
---

meshStack supports metering of meshMarketplace services.

## Prerequisites

- A marketplace service with a valid catalog, that includes cost information on plan level. The cost information must be provided as described in the [OSB spec](https://github.com/openservicebrokerapi/servicebroker/blob/v2.15/profile.md#service-metadata)
- The marketplace service must be registered via a service broker in the [Marketplace Development](marketplace.development.md).

## Supported Unit Types

The following unit types are supported. Other unit types provided in the service catalog will be ignored.

- HOURLY,
- WEEKLY,
- MONTHLY,
- YEARLY
