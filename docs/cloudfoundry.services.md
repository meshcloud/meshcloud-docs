---
id: cloudfoundry.services
title: Services
---

Services on our PaaS offering enable application developers to easily bind their applications to Databases, Document Stores, Queuing and other backend Services. As you may know, containers are stateless. However, most applications, require some persistent components, such as databases or message queues. With our Cloud Foundry Service Brokers you are able to bind persistent services to your stateless application.

## Cloud Foundry Marketplace

In the Cloud Foundry Marketplace you will find all currently available Service Brokers. You access the market place by typing `cf marketplace` into your Terminal/PowerShell, once you accessed your Cloud Foundry space. Each service has correlated service plans that define the size and performance of a service.

To get more information on a specific service, enter `cf marketplace -s SERVICE_NAME`.

To see currently running services, enter `cf services`.

## Service Types

Our platform differentiates between several Services types:

* Platform Services
* User Provided Services

### Platform Services

Meshcloud offers a marketplace of services, from which users can provision reserved resources on-demand. Platform Services include Database Services like MariaDB \(MySQL\), MongoDB, RabbitMQ and many more. Meshcloud offers different flavors of Platform Services, from small for testing and development, over dedicated up to clustered. The different types of service can be identified by:

* S - Shared Service on a Cluster with a limited amount of storage and connections
* D - Dedicated Service on a single VM, with the VM being the limitation of storage and connections
* DC - Dedicated Cluster Service, deployed on multiple VM for high availability and fault tolerance of your data

### User Provided Services

User-provided service instances enable developers to use services that are not available in the marketplace with their applications running on Meshcloud PaaS.

They enable application developers to use the credentials of a Service deployed in Meshcloud IaaS, or 3rd party service being used as if they were "native" Platform Services.

## Creating a new Service

To create a new service, type 
```bash
cf create-service SERVICE_NAME SERVICE_PLAN YOUR_SERVICE_NAME
```

For example, you can create a MongoDB database for the with 
```bash
cf create-service MongoDB S musicdb
```

The service will automatically start running, you can check the status with `cf service musicdb`. Here, you will also see that there are no applications bound to it yet.

## Binding a Service to your Application

Binding a service gives application instances access to the service, for example by providing connection credentials to a database (in case of a database service.)

`cf bind-service APP_NAME SERVICE_NAME`.

To make sure all changes are effective, you should restage your application with `cf restage APP_NAME`.

Typing `cf services` you will now see all your services and the bound application. You should find your test application with your newly created service here.

You may find more information on services in the official [Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind).
