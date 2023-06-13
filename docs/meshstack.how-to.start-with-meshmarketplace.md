---
id: meshstack.how-to.start-with-meshmarketplace
title: How to start with the meshMarketplace
---

## Welcome to the meshMarketplace

The meshStack marketplace enables you to serve and manage your services in the meshPanel.

Offering your services in the central cloud foundation portal has the following benefits:

- easier reach users which already are approaching cloud services
- out-of-the-box billing capabilities
- (optional) user assignment through the cloud foundation portal

We suggest you to set up your Service Broker using meshcloud's open-source [UniPipe Service Broker](https://github.com/meshcloud/unipipe-service-broker). UniPipe will enable you a quick setup, development and time-to-market.
UniPipe will reduce your own code development efforts as it provides the basic functionality required by the [Open Service Broker API](https://www.openservicebrokerapi.org/) reference.

## Requirements

If you want to offer a service in the marketplace you have to meet the following requirements:

- You have your own meshWorkspace in the meshPanel where you can add your Open Service Broker.
- You have a running Service Broker that implements the [Open Service Broker API](https://www.openservicebrokerapi.org/).
  - To learn more about the OSB API, read the complete the [API spec](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md).

## How to start using UniPipe

### UniPipe Wiki

The [UniPipe Wiki](https://github.com/meshcloud/unipipe-service-broker/wiki) will provide you most information to start and set up your own service broker in a short time.

### How to deploy UniPipe

Once you implemented your service broker, you can deploy it. The UniPipe Wiki has a detailed description on [how to deploy UniPipe](https://github.com/meshcloud/unipipe-service-broker/wiki/How-To-Guides#-how-to-deploy-unipipe-service-broker)

## How to set up your Service Broker in the meshMarketplace

Service development in the meshMarketplace is documented in [meshcloud docs](./meshstack.meshmarketplace.development.md).

- Log in into the meshPanel.
- Open the Workspace Overview.
- Select the tab Marketplace and the sub-tab Service Brokers.
- Click on '+ Register'

![Add Service Broker](./assets/marketplace/marketplace-service-broker-overview.png)

- Register the Service Broker by entering the required parameters.

![Register Service Broker](./assets/marketplace/marketplace-register-service-broker.png)

You can now start booking and using your services within your own meshWorkspace. This is useful for testing and verifying whether your service broker works as intended.

Once you are ready for other teams to book your offered services, you can [publish](./meshstack.meshmarketplace.development.md#publish-your-service-broker) your service broker.
