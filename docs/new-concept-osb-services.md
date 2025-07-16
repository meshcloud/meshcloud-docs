---
id: new-concept-osb-services
title: OSB Services
---

Besides building blocks there is another way to provide services in meshStack with the help of OSB services. Those services are published to the marketplace and can be consumed by application teams in the meshPanel.

> **Note:** meshStack supports OSB Version 2.14 and 2.15.

## Service Brokers

A service broker is a component that creates an instance of a specific service and allows management of such service instances via the OSB API. An example would be a service broker for MariaDB services which allows you to request a MariaDB instance, potentially from a range of different sizes.

## Service Instances

A service instance is a specific deployed service that you can include in your application, e.g. a database created by the service broker.

## Service Bindings

A service binding is a set of credentials you need to access your service instance, e.g. the connection string to access your database instance. Service bindings can come with an expiration in which case they will be deleted after a set amount of days.

## Service Plans
In order to provision a service instance for your project you first have to choose the Service Plan that best fits your needs. A service plan will be shown in the details screen of the Marketplace Catalog and it is a certain variant of the service, i.e. it has a certain amount of RAM available or storage, or network bandwidth, etc. So pick the matching plan whose resource coverages best matches your requirements.

Service Broker may have one or more plans each. A service plan captures a variation of a service offering. Taking a MySQL service as an example, an “S” plan could offer 50GB of database storage whereas an “L” plan could offer 500GB.

## OSB Services Platform

The OSB Services Platform allows users to manage service instances attached to a meshProject. The OSB Services Platform uses the official Open Service Broker API standard to communicate with Service Brokers, which are responsible for the actual provisioning of service instances through their service implementation.

## Locality of Services

The OSB Services Platform provides support for global and local services. Service Providers must choose which type of Service they want to offer so that the service is appropriately integrated into the user interface.

### Global Service

- global entry point for consumers (API), reachable from all networks
- Service is provided in a location agnostic manner
- Service may offer configuration of data locations etc. through configuration/dashboards
- Examples: CDN, DNS, Backup

### Local Service

- Local entry point for consumers (API), may be reachable only within a specific location
- Service is provided from a single location only
- Location of data etc. is important
- Examples: DBaaS

## OSB API Profile

meshcloud implements an extended [OSB API Profile](meshstack.meshmarketplace.profile) that allows brokers a deeper integration with meshStack. Please review the documentation to learn more about the use-cases this API profile enables.

## Authentication & Authorization

### Marketplace to Service Broker

All communication between the OSB Services platform and Service Brokers is secured using HTTPS Basic Auth and a pre-shared key. Service owners that also develop brokers for platforms like Cloud Foundry or OpenShift will be familiar with this model.

### Replicating Authorization Information

OSB Services platform supports two different options for authenticating and authorizing users.

- (Enterprise Plans only) use an OIDC client in meshIdB as described in the [OSB dashboard tutorial](meshstack.OSB.dashboard-tutorial)
- replicate permissions to Azure Active Directory groups ([learn more](#aad-permission-replication))

If the above options do not work for your use case, you can also consider extracting the authorization information from meshStack
using the [meshObject API](pathname:///api/).

<!--
## Related Resources
- [meshStack Marketplace Documentation](marketplace.index)
- [Building Block Concept](new-concept-buildingblock)
- [meshStack Service Broker Documentation](administration.service-brokers)
-->
