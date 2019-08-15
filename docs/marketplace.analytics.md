---
id: marketplace.analytics
title: Analytics
---
The Analytics functionality for Service Owners is available to Customer Admins, who already [registered a Service Broker](marketplace.development.md#register-your-service-broker).

## Service Communication Logs

Especially when an error occurs during a service broker call, detailed information about the request that was made from the meshMarketplace to the service broker helps in analyzing the reason why a call failed. But the communication logs are not only available in error cases, they are availbale for all requests that were made from the meshMarketplace to the Service Broker. Instead of implementing a detailed request and response logging in every service broker, the meshMarketplace provides this information for all service brokers.

All relevant information like the request date and the type of operation that was executed, all request and response headers as well as the body of the request and in case of an error also the response from the service broker, are available. The duration of the call and information about the used Service Plan and [Service Instance](marketplace.service-instances.md) are also available. This information, combined with the application logs of the service broker should provide all information for a successful error analysis.

The communication logs are available for [private](marketplace.development.md#register-your-service-broker) and [published](marketplace.development.md#publish-your-service-broker) service brokers via the **Communication Logs** button in the according service broker list. In case of private service brokers the communication logs can provide you with helpful insights during the development phase or the marketplace integration phase of your service broker.

A searchable overview of all communication logs is the starting point for analyzing communication logs. When more details about a specific log is needed, the **info** icon in the list of logs provides you with all details that are available to a specific call that was made.

### Searching the Communication Logs

Searching the communication logs to e.g. find a specific issue that was reported or to have a look at a specific call that was made is an essential feature of the communication logs. The search is executed automatically while entering your search criteria. You can search by the following criteria:

- **Request Date**: When e.g. a user reported that an issue occurred at 10 o'clock at a specific day, you can quickly find the related communication log by searching for the request date. The date you search for will be interpreted as the latest request date to find. So you will retrieve all communication logs before this date. As the ordering of the list is descending, the communication log that is closest to the requested date will appear at the top of the list. The date must be entered in format yyyy-MM-dd HH:mm:ss (e.g. 2019-01-01 10:00:00). Enter the date in your local timezone here.
- **Operation Type**: You can filter by the different operation types, that are defined by the [OSB specification](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md). A dropdown with the different operation types like FETCH_CATALOG or PROVISION_INSTANCE is available for selection.
- **Response Code**: The response code (HTTP Status Code) is an often used filter criteria as you can search e.g. for all error responses by entering ">399", which will return all requests that failed with a client (4xx) or server (5xx) HTTP response code. But you can also search for a specific response codes like "403".
- **Service Plan**: When you know that there was an issue with a specific service plan, you can search for all service plan related requests by entering the id of the service plan, that you defined in your [service broker catalog](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#catalog-management).
- **Servcie Instance**: When you know that an error occurred for a specific [Service Instance](marketplace.service-instances.md), you can search for all related logs by entering the id of the service instance.

## Metering & Usage

If the Metering Component of meshStack is available in your installation, Metering & Usage information is available for your Service Brokers. You see a list of all plans  of your Service Broker's services provisioned in projects per period (usually monthly). This information is available individually per Marketplace you published your Service Broker to. Click the "Metering & Usage" Button of the according Service Broker to see the Metering & Usage data. You can filter by several criteria like period or service name.

The screen provides you with information about:

- Which customers and projects are using your services?
- How long have certain plans been used in projects?
- What are the costs per plan and project for one period?
