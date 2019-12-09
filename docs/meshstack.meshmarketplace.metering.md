---
id: meshstack.meshmarketplace.metering
title: Metering
---

meshStack supports metering of meshMarketplace services.

## Prerequisites

- A marketplace service with a valid catalog, that includes cost information on plan level. The cost information must be provided as described in the [OSB spec](https://github.com/openservicebrokerapi/servicebroker/blob/v2.15/profile.md#service-metadata)
- The marketplace service must be registered via a service broker in the [Marketplace Development](meshstack.meshmarketplace.development.md).

### Supported Unit Types

The following unit types are supported. Other unit types provided in the service catalog will be ignored.

- HOURLY,
- WEEKLY,
- MONTHLY,
- YEARLY

## Reviewing Metering Data

If the metering Component of meshStack is available in your installation, Metering & Usage information is available for your Service Brokers from the "Marketplace Development" area in your customer Account.

You see a list of all plans  of your Service Broker's services provisioned in projects per period (usually monthly). This information is available individually per Marketplace you published your Service Broker to. Click the "Metering & Usage" Button of the according Service Broker to see the Metering & Usage data. You can filter by several criteria like period or service name.

The screen provides you with information about:

- Which customers and projects are using your services?
- How long have certain plans been used in projects?
- What are the costs per plan and project for one period?

## Seller Usage Report (CSV Export)

All the metering usage data for your services can be downloaded as CSV. This is called a seller usage report in meshcloud because the service owner acts as a seller on the meshMarketplace.

The download can be triggered directly from Metering & Usage information page. The data transformations like sorting and filtering are also included. Additional meta information can be configured beneath the metering usage information. This information will only be visible within the exported CSV document.
