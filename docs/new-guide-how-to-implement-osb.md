---
id: meshstack.meshmarketplace.broker-tutorial
title: Tutorial: Implement a Broker
---

:::note What is this guide about?
This tutorial walks you through setting up a service broker that deploys services using CI/CD tools you already know. You'll learn about the Open Service Broker API, available libraries, and practical recommendations for implementation and testing.
:::

## Prerequisites

- Familiarity with cloud-native platforms and basic service provisioning concepts.
- Access to a CI/CD pipeline and a supported programming language (Java, Go, .NET, or Python).
- Understanding of your organization's requirements for service lifecycle management.

## Step by Step Guide

### 1. Understand the Open Service Broker API

The [Open Service Broker API](https://www.openservicebrokerapi.org/) enables software vendors and developers to provide backing services to workloads running on cloud-native platforms. It defines a set of RESTful endpoints for provisioning, binding, and managing service offerings.

- One broker can host multiple services.
- The API supports synchronous and asynchronous provisioning.
- Service brokers can add features like billing and backup/restore.

### 2. Choose an Implementation Approach

You can start with an existing project or library, or build your own broker from scratch.

#### Quickstarts

- **[Unipipe Service Broker](https://github.com/meshcloud/unipipe-service-broker):**  
  Example implementation that connects to a Git repository for catalog and instance management. Integrates with CI/CD pipelines.
- **[Spring Boot & Groovy OSB API](https://github.com/openservicebrokerapi/servicebroker):**  
  For Java/Spring developers.
- **[osb-service-broker-example](https://github.com/evoila/osb-example):**  
  Cloud Foundry-focused, requires custom logic for your service.
- **[osb-starter-pack](https://github.com/pmorie/osb-starter-pack):**  
  Go-based starter for rapid prototyping.

#### Libraries

- **Java:**  
  [Spring Cloud Open Service Broker](https://spring.io/projects/spring-cloud-open-service-broker)  
  [spring-cloud-app-broker](https://github.com/spring-cloud/spring-cloud-app-broker)
- **Go:**  
  [brokerapi](https://github.com/pivotal-cf/brokerapi)  
  [osb-broker-lib](https://github.com/pmorie/osb-broker-lib)  
  [Cloud service broker](https://github.com/pivotal/cloud-service-broker/)
- **.NET:**  
  [Open Service Broker API for .NET](https://github.com/AXOOM/OpenServiceBroker)
- **Python:**  
  [openbrokerapi](https://pypi.org/project/openbrokerapi/)

### 3. Implement the Required Endpoints

Each service broker must implement the OSBAPI endpoints:

- **Catalog:** Returns the list of services and plans.
- **Provision:** Creates a new service instance.
- **Bind/Unbind:** Connects/disconnects applications to service instances.
- **Deprovision:** Deletes a service instance.

Follow the [OSBAPI specification](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md) closely for request/response formats and error handling.

### 4. Test Your Service Broker

- Use the [API Swagger documentation](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/openservicebrokerapi/servicebroker/v2.16/openapi.yaml#/) to understand and test endpoints.
- Try the [eden CLI](https://starkandwayne.com/blog/welcome-to-eden-a-cli-for-every-open-service-broker-api/) for local development and testing.
- Consider the [osb-checker tool](https://github.com/openservicebrokerapi/osb-checker) for compliance checks.

### 5. Integrate with meshStack and CI/CD

- If using Unipipe, connect your broker to a Git repository and configure your CI/CD pipeline to manage service instances.
- For other implementations, ensure your broker is reachable by meshStack and supports the required endpoints.

### 6. Maintain and Evolve Your Broker

- Use consistent IDs for services and plans.
- Implement proper error handling and support both synchronous and asynchronous operations.
- Plan for deprecation and removal of services or plans.
- Support multiple bindings per instance and create separate credentials for each binding.
- Provide admin endpoints for handling error states and orphaned resources.

:::tip
Check out the [OSB API Compliant Service Brokers](https://www.openservicebrokerapi.org/compliant-service-brokers) catalog for inspiration and reference implementations.
:::

## Related Resources

### Concepts

- [OSB Services](new-concept-osb-services.md)
- [Marketplace](new-concept-marketplace.md)

### Guides

- [How to Manage OSB Services](new-guide-how-to-manage-osb.md)
- [How to Manage a Project](new-guide-how-to-manage-a-project.md)
- [How to Manage a Workspace](new-guide-how-to-manage-a-workspace.md)