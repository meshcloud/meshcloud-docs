---
id: meshstack.meshmarketplace.development
title: Marketplace Development
---

> Only users with the role [Customer Admin](meshcloud.customer.md#assign-meshcustomer-roles) or [Customer Owner](meshcloud.customer.md#assign-meshcustomer-roles) have access to the administrative functionality described in this section.

You can provide your own services (e.g. databases, message brokers, filesystems, etc) in the [meshMarketplace](marketplace.index.md) via the **Marketplace** >  **Service Brokers** on your [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer). This requires you have a running Service Broker, an application that manages these services by the means of [Open Service Broker API](https://www.openservicebrokerapi.org/). Services provided by you can then be consumed by other users in the meshPanel. A short overview and some specifics that should be considered when writing a Service Broker for the meshMarketplace are described [here](meshstack.meshmarketplace.index.md).

meshStack supports OSB Version 2.14 and is on the way to support OSB 2.15.

## Marketplace

You can find the **Marketplace** tab on your [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer). Via **Service Brokers** tab, you get to the maintenance area for your service brokers. You can register and publish your Service Broker. [Analytics](#debugging-your-service-broker) screens that provide you with Usage and Logging Data are also available.

### Register your Service Broker

Registering your Service Broker does not publish your Service Broker directly for all users. Initially only your meshCustomer will have access to this Service Broker. We call this type of Service Broker a **private Service Broker**. It allows you to test and develop your Service Broker via the meshMarketplace development from the first steps on. A new Marketplace Platform for your Customer will be available for your [projects](meshcloud.project.md#adding-meshtenants) after registering a Service Broker. When you select it for a project, your own Marketplace will be available on the project.


1. Open **Marketplace** on your [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer).
2. Navigate to the **Service Brokers** tab.
3. Click `+ Register` in the upper right corner.

The following information must be provided for the registration:

- **Name**: Give a name to the service broker you want to register. It is mainly used as a display name for your administrative Screens.
- **Identifier**: Globally unique, immutable identifier for your Service Broker, used in API requests and logs by meshStack. Choose wisely as *this identifier cannot be changed later* on. We advise to use meaningful and expressive identifiers.
- **Endpoint**: Root URL to your Service Broker's API endpoint. It must start with "http(s)://". Below this API endpoint the **/v2/catalog** endpoint must be available, as described in the [Open Service Broker API](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#catalog-management).
- **Basic Auth Username**: Communication between the meshMarketplace and your Service Broker is secured via HTTP Basic Auth. Therefore username and password have to be defined here, so the meshMarketplace can authenticate successfully to your Service Broker. Enter the username for HTTP Basic Auth here. The username can be changed at any time.
- **Basic Auth Password**: Enter the password for your HTTP Basic Auth. A set password will never be shown to you again. This password will be stored encrypted in the database. You can set a new password at any time. No restrictions regarding the characters used in your password are applied. Please be sure to always use a secure password!
- **Development Mode**: As all communication should be secured via SSL by using an https endpoint, it might be too complicated to provide a valid certificate during development. Therefore SSL validation of your Service Broker's certificate can be disabled via this **Development Mode**. This is only possible for the Development Service Broker only your meshCustomer has access to. [Published Service Brokers](#publish-your-service-broker) always need a valid certificate!

### Edit Service Broker Registrations

Data entered when [registering](#register-your-service-broker) your service broker can also be edited afterwards. Only the identifier cannot be changed anymore.

### Refresh Service Broker Catalog

Service Brokers provide the catalog of all available service according to the [Open Service Broker API](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#catalog-management). The meshMarketplace periodically calls the catalog endpoint and updates the available services internally. To force this refresh of your Service Broker's catalog, you can click the **Refresh Catalog** button in the list of your Service Brokers.

## Publish your Service Broker

As soon as your Service Broker is production-ready, you can publish it to the public meshMarketplaces, so all users of meshStack can use it. You should provide a new deployment of your Service Broker in order to publish it. Your private service broker configuration will remain untouched when publishing the service broker. The private Service Broker will still be available for your meshCustomer.

To publish your Service Broker, click the **Publish Service Broker** button for the according Service Broker.

You can choose which public Marketplace you want to publish your Service Broker to. For many services, like databases, storage, etc, it makes sense to provide the Service Broker in the same Location the applications consuming the service are running. This enables best latency, security and performance for using your services. But there are also other Service Brokers like a service that provides user credentials for using an internet proxy, which are independent of the Location. In these cases the Service Broker can simply be published to the **Global** Location.

Location-based Service Brokers should be running independently of each other in all Locations they are published to. Therefore different endpoints and credentials have to be configured for every Location. Endpoints of published Service Brokers must always use an **https** endpoint, because that's the way how security can be established for the communication between the meshMarketplace and your Service Broker.

When you publish your Service Broker it won't be available in the meshMarketplace. A Partner Admin has to [approve](administration.service-brokers.md#approve-service-broker) your Service Broker first.

### How to publish your Service Broker

Please execute the following steps:

1. Open the Marketplace controls on the meshCustomer level.
2. Navigate to "Service Brokers".
3. Choose "Published Service Brokers" for the Service Broker you want to publish.

   ![image](https://user-images.githubusercontent.com/67903933/167908168-a8c7ff34-d3cd-40c4-b731-10c5c798239d.png)

4. Now add the configuration and the Service Broker by pressing "+".

   ![image](https://user-images.githubusercontent.com/67903933/167908972-1df80355-7982-4f39-8abc-97875cd4ff07.png)

### Refresh Catalog of Published Service Broker

Like for your private Service Broker, you can also actively [refresh the catalog](#refresh-service-broker-catalog) of your published Service Broker. You can click on **Refresh Catalog** button in the Publishing List of your Service Broker.

The Analytics functionality for Service Owners is available to Customer Admins, who already [registered a Service Broker](meshstack.meshmarketplace.development.md#register-your-service-broker).

## Debugging your Service Broker

### Reviewing failed Service Instances

From the [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer), you can access an overview of all failed service instances of your service brokers under the "Failed Instances" sub-page which can be found under the "Marketplace" tab. This allows a quick error analysis of failed service broker calls. The list shows you an overview about all failed Service Instances with the specific local id, name, service plan and the last operation.

### Service Communication Logs

Especially when an error occurs during a service broker call, detailed information about the request that was made from the meshMarketplace to the service broker helps in analyzing the reason why a call failed. But the communication logs are not only available in error cases, they are available for all requests that were made from the meshMarketplace to the Service Broker. Instead of implementing a detailed request and response logging in every service broker, the meshMarketplace provides this information for all service brokers.

All relevant information like the request date and the type of operation that was executed, all request and response headers as well as the body of the request and in case of an error also the response from the service broker, are available. The duration of the call and information about the used Service Plan and [Service Instance](marketplace.service-instances.md) are also available. This information, combined with the application logs of the service broker should provide all information for a successful error analysis.

The communication logs are available for [private](meshstack.meshmarketplace.development.md#register-your-service-broker) and [published](meshstack.meshmarketplace.development.md#publish-your-service-broker) service brokers via the **Communication Logs** button in the according service broker list. In case of private service brokers the communication logs can provide you with helpful insights during the development phase or the marketplace integration phase of your service broker.

A searchable overview of all communication logs is the starting point for analyzing communication logs. When more details about a specific log is needed, the **info** icon in the list of logs provides you with all details that are available to a specific call that was made.

### Searching the Communication Logs

Searching the communication logs to e.g. find a specific issue that was reported or to have a look at a specific call that was made is an essential feature of the communication logs. The search is executed automatically while entering your search criteria. You can search by the following criteria:

- **Request Date**: When e.g. a user reported that an issue occurred at 10 o'clock at a specific day, you can quickly find the related communication log by searching for the request date. The date you search for will be interpreted as the latest request date to find. So you will retrieve all communication logs before this date. As the ordering of the list is descending, the communication log that is closest to the requested date will appear at the top of the list. The date must be entered in format yyyy-MM-dd HH:mm:ss (e.g. 2019-01-01 10:00:00). Enter the date in your local timezone here.
- **Operation Type**: You can filter by the different operation types, that are defined by the [OSB specification](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md). A dropdown with the different operation types like FETCH_CATALOG or PROVISION_INSTANCE is available for selection.
- **Response Code**: The response code (HTTP Status Code) is an often used filter criteria as you can search e.g. for all error responses by entering ">399", which will return all requests that failed with a client (4xx) or server (5xx) HTTP response code. But you can also search for a specific response codes like "403".
- **Service Plan**: When you know that there was an issue with a specific service plan, you can search for all service plan related requests by entering the id of the service plan, that you defined in your [service broker catalog](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#catalog-management).
- **Service Instance**: When you know that an error occurred for a specific [Service Instance](marketplace.service-instances.md), you can search for all related logs by entering the id of the service instance.


## Deletion of Service Brokers

The deletion of a Service Broker is only allowed if it has not been [published](#publish-your-service-broker) and [approved](administration.service-brokers.md#approve-service-broker). As soon as an approved Service Broker exists users can create Service Instances from your services. The deletion of a Service Broker could affect productive data of other users and is therefore not possible.

Unpublished, unapproved Service Brokers can be deleted from the list of Service Brokers via the **trash** button. A safety dialogue pops up, where you have to enter the name of the Service Broker for confirmation. The deletion will only delete the Service Broker in the meshStack. **No deprovisioning** will be triggered in the Service Broker! You have to clean up existing Service Instances in your Service Broker by yourself!

After you have published your Service Broker you can also revoke this publishing by clicking the **trash** icon in the Publishing list of your Service Broker as long as it has not been approved.


## Deactivation of Service Brokers

If a Service Broker has been [published](#publish-your-service-broker) and [approved](administration.service-brokers.md#approve-service-broker) it can no longer be deleted because there may already be provisioned service instances. Instead, a published Service Broker can be **deactivated**. Deactivating a Service Broker does not delete any service instances or bindings but ensures that no new service instances can be created. Marketplaces will no longer show any services offered by this broker and if the Service Broker uses a dashboard client it will no longer be available.

> Deactivating a Service Broker is permanent and irreversible!
