---
id: meshstack.meshmarketplace.broker-tutorial
title: "Tutorial: Implement a Broker"
---

This tutorial will show you how to setup a service broker deploys services using CI/CD tools you already know.

## Open Service broker

The [Open Service Broker API](https://www.openservicebrokerapi.org/) project allows independent software vendors, SaaS providers and developers to easily provide backing services to workloads running on cloud native platforms. The specification, which has been adopted by many platforms and thousands of service providers, describes a simple set of API endpoints which can be used to provision, gain access to and managing service offerings.

- The Open Service Broker is designed in a modular way and multiple services can be hosted by one service broker.
- On top of the Open Service Broker API, Service Broker provides additional features about Billing, Backup/Restore.
- Services can be provisioned synchronously and/or asynchronously and the goal of this project is to provide a framework with which any service can easily be provisioned.

## What is service broker?

Service brokers manage the lifecycle of services, and platforms interact with service brokers to provision, get access to and manage the services they offer. The Open Service Broker API defines these interactions, and therefore allows software providers to offer their services to anyone, regardless of the technology or infrastructure those software providers wish to utilise.

Each service broker built to the Open Service Broker API specification has the same intuitive set of lifecycle commands. These commands do useful things such as:

- **Fetching the catalog of backing services that a service broker offers**
The catalog describes all of the services that can be provisioned through a service broker, and  each service is made up of plans. Plans typically represent the costs and benefits for a given variant of the service. Many services use plans to ‘T-Shirt size’ the service offering (such as “small”, “medium”, and “large”).
- **Provisioning new service instances**
A service instance is a provisioned instance of a service and plan as described in the service broker’s catalog.
- **Connecting and disconnecting applications and containers from those service instances(Bind/Unbind)**
Once a service instance is provisioned, you’ll want your application or container to start communicating with that instance. From a service broker’s perspective, this is called a service binding.
- **Deprovisioning service instances**
This action simply deletes all the resources created upon the initial provisioning of the service instance.

## Quickstarts

To get started with existing projects.

- We provide an example implementation of a Service broker called [Unipipe Service Broker](https://github.com/meshcloud/unipipe-service-broker). It connects to a git repository that holds the catalog. The git repository is also used to store information about services instances and their bindings. Unipipe service broker relies on a CI/CD pipeline for managing service instances. Experimental CI/CD pipelines that integrate with Unipipe Service Broker using [`concourse-ci`](https://github.com/Meshcloud/example-osb-ci) &  [`github actions`](https://github.com/meshcloud/unipipe-osb-cicd-github-actions).

- [Open Service Broker API based on Spring Boot & Groovy](https://github.com/swisscom/open-service-broker): It enables platforms such as Cloud Foundry & Kubernetes to provision and manage services.

- [osb-service-broker-example](https://github.com/evoila/osb-example):
An empty Cloud Foundry Service Broker missing concrete implementation of a distinct service.
Supports deployment to OpenStack. Uses MongoDB Database for management. Configuration files and deployment scripts must be added. Concrete Service logic and binding logic has to be added.

- [osb-starter-pack](https://github.com/pmorie/osb-starter-pack):
A go project that lets you easily deploy and iterate on a new service broker.
Uses the [`osb-broker-lib`](https://github.com/pmorie/osb-broker-lib) and
[go-open-service-broker-client](https://github.com/pmorie/go-open-service-broker-client)
projects.

## Service Broker Libraries

To help developers make there own service broker here are few libraries.

***Java***

- [Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker):
Spring Cloud Open Service Broker provides a framework based on Spring Boot that
enables you to quickly create a service broker for your own managed service on
platform that support the Open Service Broker API.

- [spring-cloud-app-broker](https://github.com/spring-cloud/spring-cloud-app-broker):
Spring Cloud App Broker is a framework for building Spring Boot applications that implement the Open Service Broker API to dynamically deploy Cloud Foundry applications.

***Go***

- [brokerapi](https://github.com/pivotal-cf/brokerapi):
A Go package for building Open Service Broker API Service Brokers.

- [osb-broker-lib](https://github.com/pmorie/osb-broker-lib):
A go library that provides the REST API implementation for the OSB API. Users
implement an interface that uses the types from the
[go-open-service-broker-client](https://github.com/pmorie/go-open-service-broker-client).

- [Cloud service broker](https://github.com/pivotal/cloud-service-broker/):
This service broker uses Terraform to provision and bind services.

***.NET***

- [Open Service Broker API for .NET](https://github.com/AXOOM/OpenServiceBroker):
.NET libraries for client and server implementations of the Open Service Broker API. The client library allows you to call Service Brokers that implement the API using idiomatic C# interfaces and type-safe DTOs. The server library implements the API for you using ASP.NET Core. You simply need to provide implementations for a few interfaces, shielded from the HTTP-related details.

***Python***

- [Python package](https://pypi.org/project/openbrokerapi/): A Python package for building Service Brokers supporting API version 2.13+.

## Implementation Recommendations

This section has some implementation recommendations based on experience:

- Follow the [Open Service Broker API](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md) specification closely.
- Use consistent Ids for services and plans, do not change them after announcing them from the catalog.
- Implement proper error handling for all operations, return the correct response codes.
- Properly implement synchronous/asynchronous operations.
- Deal with orphaned Service Instances.
- “The platform marketplace is the source of truth for service instances and bindings. Service brokers are expected to have successfully provisioned all the service instances and bindings that the marketplace knows about, and none that it doesn't.”
- Consider supporting multiple service bindings per service instance, prefer to create separate credentials for each binding.
- Consider checking your service implementation using the official [checker tool (experimental)](https://github.com/openservicebrokerapi/osb-checker).

## Testing open service broker

- [API swagger documentation](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/openservicebrokerapi/servicebroker/v2.16/openapi.yaml#/): The Open Service Broker API defines an HTTP(S) interface between Platforms and Service Brokers. This would help developers to make test cases for there endpoints.

- CLI that interacts with any Open Service Broker API [eden](https://starkandwayne.com/blog/welcome-to-eden-a-cli-for-every-open-service-broker-api/). The eden CLI is useful for users of a service broker, and also for developers' own dev/test.

## Service owner responsibility

- Define and manage the catalog. Service Broker authors are expected to be cautious when removing Service Offerings and Service Plans from their catalogs, as Platforms might have provisioned Service Instances of these Service Plans. For example, Platforms might restrict the actions that users can perform on existing Service Instances if the associated Service Offering or Service Plan is deleted. Consider your deprecation strategy.

- Service broker authors should also be aware of all the possible scenarios to maintain the service broker and should provide extra endpoints to handle erroneous states of the service broker. Some example scenarios can be found [here](https://github.com/swisscom/open-service-broker) under admin actions section.

## OSBAPI Compliant Products

- The community-driven catalog shows some of publicly available service brokers that have been built using the Open Service Broker API standard. [OSB API Compliant Service Brokers](https://www.openservicebrokerapi.org/compliant-service-brokers)

## Open Service Broker Client App

- [go-open-service-broker-client](https://github.com/pmorie/go-open-service-broker-client):
This library is a golang client for communicating with service brokers,
useful for Platform developers.

- [HPE](https://github.com/reddypramod85/hpe-openservicebroker-clientapp): This project is a client platform for accessing services via the Open Service Broker API.

- [Service Broker Dashboard](https://github.com/evoila/osb-dashboard): This project is intended to be the fundamental implementation of Dashboard, which could be applied to any Service Broker.
