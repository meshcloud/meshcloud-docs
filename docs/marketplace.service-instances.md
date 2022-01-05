---
id: marketplace.service-instances
title: Service Instances
---

You can find the marketplace when selecting a project in the meshPanel. Click on the **Marketplace** in the navigation on the left. You find a list of all available services here. Choose the one you are interested in. On the details page you will get additional information about the service.

## Provision Service Instance

In order to provision a service instance for your project you first have to choose the Service Plan that best fits your needs. A service plan is a certain variant of the service, i.e. it has a certain amount of RAM available or storage, or network bandwidth, etc. So pick the matching plan whose resource coverages best matches your requirements by clicking on the `+` icon of the plan. A dialog opens up. Please enter a name here. Additionally parameters can be entered (see "Service Parameters" section below). Click `Create` to start the provisioning of the service. This may take a while.

### Service Parameters

If the service fully supports parameters you see input fields for all parameters of the service. Sometimes services do not fully support parameters, but you know which parameters a service requires. In that case, use the textarea to enter the parameters in JSON format.

## Maintain Service Instances

In order to see the status of your instances, add a binding, or remove a provisioned instance go to the **Instances** section under **Marketplace** in the navigation on the left. You find a list of all your service instances and can also access their dashboards via the dashboard icon on the right.

### Add a Binding

To finally get your connection information and credentials you have to add a binding to the service instance. You have to enter a name for the binding. When the binding has been created you can see the access information and connect to the service from within your application.

### Update Service Instance

Via the `pen` icon you can edit the service instance. Changing the name is always available. Just enter a new name if you want to change it. If the service supports an upgrade of plans, a dropdown with all plans of the service is displayed. You can select another plan if you want to change the plan for the given service instance. You can also change the parameters of the service (see [Service Parameters](#service-parameters) section below). Only enter the parameters you want to change. Empty parameters will be ignored.

### Tenant Bindings

Some services require to bind a meshTenant. In that case you have to select one of your meshTenants when creating a binding.

If the service is located in the "Global" meshLocation, you can select all meshTenants of your meshProject. If the service is located in a Location-specific meshMarketplace, you can only select tenants of this meshLocation.

It is not possible to select the same meshTenant for multiple bindings of the same service instance.

### Share Service Instance

If the Service Broker [supports](meshstack.meshmarketplace.profile.md#sharable-service-instances) it, service Instances can be shared between meshProjects of the same meshCustomer. It is only sharable to projects, if the meshLocation the Service Instance relates to exists in the meshProject the instance shall be shared with. This is currently only supported for the global marketplace.

Shared Instances are read-only. Only “own” bindings can be created/updated/deleted. This means that only bindings of the current project are shown and can be created/updated/deleted.

Sharing of a service instance can also be revoked. This can be done in the sharing as well as the shared with meshProject.
