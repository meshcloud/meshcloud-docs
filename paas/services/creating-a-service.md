# Binding a Service to your Application {#binding-a-service-to-your-application}

As you may know, containers are stateless. However, most applications, require some persistent components, such as databases or message queues. With our Cloud Foundry Service Brokers you are able to bind persistent services to your stateless application.

We've just deployed the spring-music sample app provided by Cloud Foundry \(see how in this article\).

For now it works with local storage, however, restarting the app will result in the loss of your changes to the database. That's why you should have a persistent storage that stays alive even when your container dies.

## Cloud Foundry Marketplace {#cloud-foundry-marketplace}

In the Cloud Foundry Marketplace you will find all currently available Service Brokers. You access the market place by typing`cf marketplace`into your Terminal/PowerShell, once you accessed your Cloud Foundry space. Each service has correlated service plans that define the size and performance of a service.

To get more information on a specific service, enter `cf marketplace -s SERVICE_NAME`.

To see currently running services, enter `cf services`.

## Creating a new Service {#creating-a-new-service}

To create a new service, type `cf create-service SERVICE_NAME SERVICE_PLAN YOUR_SERVICE_NAME`. You can create a MongoDB database for the spring-music application with `cf create-service MongoDB S musicdb`. The service will automatically start running, you can check the status with `cf service musicdb`. Here, you will also see that there are no applications bound to it yet.

## Binding a Service to an Application {#binding-a-service-to-an-application}

In [this article](https://meshcloud.gitbooks.io/meshcloud/content/paas/deploying-an-application-to-cloud-foundry.html), we showed how to deploy a sample application with Cloud Foundry. We will use this application now, to bind our newly created service to it.

`cf bind-service APP_NAME SERVICE_NAME`.

To make sure all changes are effective, you should restage your application with `cf restage APP_NAME`.

Typing `cf services`you will now see all your services and the bound application. You should find your test application with your newly created service here.

If you access the application in the browser and make changes to the music collection, these changes will now be stored in the MongoDB database. They will **not **be lost, when restarting the application.+

You may find more information on services in the official [Cloud Foundry documentation](https://docs.cloudfoundry.org/devguide/services/managing-services.html#bind).



