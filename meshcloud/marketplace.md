# Marketplace

## What is the Mesh Marketplace?

The Marketplace provides you with a set of services you can spin up for your project (i.e. databases, message brokers, filesystems, etc). You get connection information and credentials, that you can use in your application to connect to the service. This allows you to easily provision services for your IaaS applications or in general for all applications that cannot access the CloudFoundry marketplace.

## How to use it

You can find the marketplace when selecting a project in the Meshpanel. Click on the **Marketplace** in the nevigation on the left. You find a list of all available services here. Choose the one you are interessted in. On the details page you will get additional information about the service.

### Provision Service Instance

In order to provision a service instance for your project you at first have to choose the Service Plan, that fits best to your needs. A service plan is a certain variation of the service. I.e. it could have more RAM available or a larger storage, more network bandwidth, etc. When you found the best matching plan, just click on the **plus** icon of the plan. The service will now be provisioned. This may take a while.

### Maintain Service Instances

In order to see the status of your instances, add a binding or remove a provisioned instance go to the **Instances** section below the **Marketplace** in the navigation on the left. You find a list of all your service instances and can also access their dashboards via the dashboard icon on the right.

### Add a Binding

To finally get your connection information and credentials you have to add a binding to the service instance. You have to enter a name for the binding. When the binding has been created you can see the access information and connect to the service from within your application.