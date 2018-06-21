---
id: osb.service-keys
title: Service Keys
---

Cloud Foundry enables you to inject service data directly to your running application. However, you might want to access your database from a local client or from applications running outside of Cloud Foundry. In these cases you will need credentials to your services. They are calles Service Keys.

## Creating a Service Key via the Service Dashboard

1. [Access the Service Dashboard](/paas/services/dashboards.md) for which you want to create a Service Key

2. Navigate to **Service Key** in the top menu

3. You will see an overview on existing Service Keys and you are able to create a new Service key by clicking on the button

4. Click on the **Details **button of your newly created Service Key to access credentials and further information

5. Congratulations. You created a Service Key.

## Creating a Service Key via CLI

1. Login to your CLI

2. Access your desired space/project

3. `cf services` will list your existing services

4. `cf create-service-key yourService yourKeyname` will create a key for your service

## List existing Service Keys for your Service

1. `cf service-keys yourService` will list all existing keys for your service

## Get Credentials for a Service Key

1. `cf service-key yourService yourKeyname` will display the credentials for your service



