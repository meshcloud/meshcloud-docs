# Marketplace

## What is the Mesh Marketplace?

The Marketplace provides users with a set of services they can spin up for their projects (i.e. databases, message brokers, filesystems, etc). Platform operators can connect any service that implements the [Open Service Broker API](https://www.openservicebrokerapi.org/) to the marketplace and make it available to their users.

Using the marketplace, users can provision service instances (e.g. a database) and get connection information and credentials to use in their applications. This allows users to easily provision services for any application, independent of the hosting platform. For example, users can use the Mesh Markeptlace to share a message queue between an application deployed to IaaS and an application deployed to Cloud Foundry PaaS in the same project.

## How to use it

You can find the marketplace when selecting a project in the Meshpanel. Click on the **Marketplace** in the navigation on the left. You find a list of all available services here. Choose the one you are interessted in. On the details page you will get additional information about the service.

### Provision Service Instance

In order to provision a service instance for your project you at first have to choose the Service Plan, that fits best to your needs. A service plan is a certain variation of the service. I.e. it could have more RAM available or a larger storage, more network bandwidth, etc. When you found the best matching plan, just click on the **plus** icon of the plan. The service will now be provisioned. This may take a while.

### Maintain Service Instances

In order to see the status of your instances, add a binding or remove a provisioned instance go to the **Instances** section below the **Marketplace** in the navigation on the left. You find a list of all your service instances and can also access their dashboards via the dashboard icon on the right.

### Add a Binding

To finally get your connection information and credentials you have to add a binding to the service instance. You have to enter a name for the binding. When the binding has been created you can see the access information and connect to the service from within your application.
