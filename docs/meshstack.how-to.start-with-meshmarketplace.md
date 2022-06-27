---
id: meshstack.how-to.start-with-meshmarketplace
title: How to start with the meshMarketplace
---

## Welcome to the meshMarketplace

The meshStack marketplace enables you to serve and manage your services in the meshPanel.

Offering your services in the central cloud foundation portal has the following benefits:

- easier reach customers which already are approaching cloud services
- out-of-the-box billing capabilities
- (optional) user assignment through the cloud foundation portal

We suggest you to setup your Service Broker using meshcloud open-source project "Unipipe-Service-Broker". The Unipipe-Service-Broker will enable you fast and quick demo setup, quick iterative service development and a quick time-to-market.
The Unipipe-Service-Broker will reduce your own code development efforts as it provides the basic functionality required by the Open Service Broker API reference.

## Requirements

Service Owner need to implement their service according to the [Open Service Broker API](https://www.openservicebrokerapi.org/).
The complete API design ist detailed in the [Open Service Broker API spec](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md).

If you want to offer a service in the marketplace you need meet the following requirements:

- Your own meshCustomer in the meshPanel where you can add your Open Service Broker
- Your Open Service Broker implementation including a catalog definition


## How to start using Unipipe-Service-Broker

### Unipipe-Service-Broker Wiki

The [Unipipe-Service-Broker Wiki](https://github.com/meshcloud/unipipe-service-broker/wiki) will provide you most infromation to start and setup your own service broker in a short time.

### How to deploy the Unipipe-Service-Broker

Follow the official Unipipe-Service-Broker documentation [How to deploy Unipipe-Service-Broker](https://github.com/meshcloud/unipipe-service-broker/wiki/How-To-Guides#-how-to-deploy-unipipe-service-broker)

## How to setup your Service Broker in the meshMarketplace

Service development in the meshMarketplace is documented in [meshcloud docs](./meshstack.meshmarketplace.development.md).

- Login into the meshPanel.
- Open the Customer Overview.
- Select the tab Marketplace and the sub-tab Service Brokers.
- Click on '+ Register'

![Add Service Broker](./assets/marketplace/marketplace-service-broker-overview.png)

- Register the Service Broker by entering the required parameters.

![Register Service Broker](./assets/marketplace/marketplace-register-service-broker.png)
