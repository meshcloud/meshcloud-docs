---
id: platforms.cloudfoundry
title: Cloud Foundry
---

## Supported Services

The meshPanel contains a convenient user interface for the most common Cloud Foundry operations. The panel talks directly
to the Cloud Foundry API, which thus needs to allow CORS.

- Space Summary (start, stop, scale apps, review bindings)
- Service Marketplace (browse available services and create instances)

## Service Users

meshcloud allows creation of [Service Users](meshcloud.service-user.md) for Cloud Foundry.

## Quota Management

Partners can enforce detailed per-project quotas for Cloud Foundry via meshcloud.


## Private Domains

If another domain name as the predefined shared domains should be used a so called Private Domain can be registered with Cloud Foundry. This domain can then be used to create a route to a deployed app similiar to what would be possible with the predefined shared domains.

### Configure your own Private Domain

In order to configure a private domain go to

1. Click on **Settings** in the [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer)
2. In the row of sub-tabs click on **Cloud Foundry Domains**
3. Enter the desired domain name for your apps and click on the `+` sign
4. If the domain could be created update your DNS setting at your provider and you can start to create apps with an own domain

More information about Private Domains can be found in the Cloud Foundry [reference documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#private-domains).

### Use a Private Domain as route

In order for your apps to receive traffic under the newly registered domain you need to map them to a route. To do this for an already existing app

1. Open a Cloud Foundry CLI terminal
2. Enter `$ cf map-route APPNAME private-domain-example.com --hostname test`
3. Your domain test.private-domain-example.com will routed to this app

There are many other options for route binding for example the app can directly be binded via a `Manifest` entry during a `cf-push` operation. For other options regarding the route binding see the Cloud Foundry [route documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#map-route).

### Delete a Private Domain

**Please note**: Before you can delete a Private Domain all routes containing this domain must be deleted beforehand. Deleting the app is not enough to release the created routes again.

1. Open a Cloud Foundry CLI terminal
2. Issue a `cf delete-route private-domain-example.com --hostname test` to delete the previously created domain (in your case the correct syntax might differ since the command must equal the options used to create the route in the first place)

Please see the Cloud Foundry [route delete documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#delete-route) for more information.

Tip: To quickly delete all routes no longer bound to an app use `cf delete-orphaned-routes`.

### DNS and Load-Balanacer Setup

Registering a Private Domain will not associate it with a external DNS system. In order to correctly receive and forward incoming traffic for the private domain to your Apps, you need to setup DNS records and you may also have to provision a load-balancer/reverse-proxy service.
Please contact your platform operator for details.
