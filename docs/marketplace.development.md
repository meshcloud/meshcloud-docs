---
id: marketplace.development
title: Marketplace Development
---
## What is Marketplace Development?

You can provide your own services in the [meshMarketplace](marketplace.index.md) via the Marketplace Development. The functionality is currently
only available for [Customer Admins](meshcloud.customer.md#manage-groups-of-assigned-users).
You can provide your service (e.g. databases, message brokers, filesystems, etc) by implementing the [Open Service Broker API](https://www.openservicebrokerapi.org/). Your implementation of an application that manages these services is called a Service Broker. Services provided by you can be consumed by other users of the meshPortal. A short overview and some specifics that should be considered when writing a Service Broker for the meshMarketplace are described [here](meshstack.osb-overview.md).

## How to use it

You can find the **Marketplace Development** in your Account Area. Via the **Service Broker** section in the navigation on the left, you get to the maintenance area for your service brokers. You can register and publish your Service Broker. [Analytics](marketplace.analytics.md) screens that provide you with Usage and Logging Data are also available.

### Register your Service Broker

Registering your Service Broker does not publish your Service Broker directly for all users. Initially only your meshCustomer will have access to this Service Broker. We call this type of Service Broker a **private Service Broker**. It allows you to test and develop your Service Broker via the meshMarketplace development from the first steps on. A new Marketplace Location for your Customer will be available for your [projects](meshcloud.project.md#add-remove-locations-from-a-meshproject) after registering a Service Broker. When you select it for a project, your own Marketplace will be available on the project.

You can register your service broker via the **Register Service Broker** button. The following information must be provided for this:

- **Name**: Give a name to the service broker you want to register. It is mainly used as a display name for your administrative Screens.
- **Identifier**: Globally unique, immutable identifier for your Service Broker, used in API requests and logs. Choose wisely as *this identifier cannot be changed later* on.
- **Endpoint**: Root URL to your Service Broker's API endpoint. It must start with "http(s)://". Below this API endpoint the **/v2/catalog** endpoint must be available, as described in the [Open Service Broker API](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#catalog-management).
- **Basic Auth Username**: Communication between the meshMarketplace and your Service Broker is secured via HTTP Basic Auth. Therefore username and password have to be defined here, so the meshMarketplace can authenticate successfully to your Service Broker. Enter the username for HTTP Basic Auth here. The username can be changed at any time.
- **Basic Auth Password**: Enter the password for your HTTP Basic Auth. A set password will never be shown to you again. This password will be stored encrypted in the database. You can set a new password at any time. No restrictions regarding the characters used in your password are applied. Please be sure to always use a secure password!
- **Development Mode**: As all communication should be secured via SSL by using an https endpoint, it might be too complicated to provide a valid certificate during development. Therefore SSL validation of your Service Broker's certificate can be disabled via this **Development Mode**. This is only possible for the Development Service Broker only your meshCustomer has access to. [Published Service Brokers](#publish-your-service-broker) always need a valid certificate!

### Edit Service Broker Registrations

Data entered when [registering](#register-your-service-broker) your service broker can also be edited afterwards. Only the identifier cannot be changed anymore.

### Refresh Service Broker Catalog

Service Brokers provide the catalog of all available service according to the [Open Service Broker API](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#catalog-management). The meshMarketplace periodically calls the catalog endpoint and updates the available services internally. To force this refresh of your Service Broker's catalog, you can click the **Refresh Catalog** button in the list of your Service Brokers.

## Publish your Service Broker

As soon as your Service Broker is production-ready, you can publish it to the public meshMarketplaces, so all users of the meshPortal can use it. You should provide a new deployment of your Service Broker in order to publish it. Your private service broker configuration will remain untouched when publishing the service broker. The private Service Broker will still be available for your meshCustomer.

To publish your Service Broker, click the **Publish Service Broker** button for the according Service Broker.

You can choose which public Marketplace you want to publish your Service Broker to. In most cases a Marketplace is available for every [Location](meshstack.platform-location.md) that is configured in your meshStack installation. For many services, like databases, storage, etc, it makes sense to provide the Service Broker in the same Location the applications consuming the service are running. This enables best latency, security and performance for using your services. But there are also other Service Brokers like a service that provides user credentials for using an internet proxy, which are independent of the Location. In these cases the Service Broker can simply be published to the **Global** Location.

Location-based Service Brokers should be running independently from each other in all Locations they are published to. Therefore different endpoints and credentials have to be configured for every Location. Endpoints of published Service Brokers must always use an **https** endpoint, because that's the way how security can be established for the communication between the meshMarketplace and your Service Broker.

When you publish your Service Broker it won't be available in the meshMarketplace you published it to directly. A meshAdmin has to [approve](administration.service-brokers.md#approve-service-broker) your Service Broker first.

### Refresh Catalog of Published Service Broker

Like for your private Service Broker, you can also actively [refresh the catalog](#refresh-service-broker-catalog) of your published Service Broker. This is done via the **Refresh Catalog** button in the Publishing list of your Service Broker.

## Deletion of Service Brokers

The deletion of a Service Broker is only allowed if it has not been [published](#publish-your-service-broker) and [approved](administration.service-brokers.md#approve-service-broker). As soon as an approved Service Broker exists users can create Service Instances from your services. The deletion of a Service Broker could affect productive data of other users and is therefore not possible.

Unpublished, unapproved Service Brokers can be deleted from the list of Service Brokers via the **trash** button. A safety dialogue pops up, where you have to enter the name of the Service Broker for confirmation. The deletion will only delete the Service Broker in the meshPortal. **No deprovisioning** will be triggered in the Service Broker! You have to clean up existing Service Instances in your Service Broker by yourself!

After you have published your Service Broker you can also revoke this publishing by clicking the **trash** icon in the Publishing list of your Service Broker as long as it has not been approved.
