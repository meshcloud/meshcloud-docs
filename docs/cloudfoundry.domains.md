---
id: cloudfoundry.domains
title: Private Domains
---

If another domain name as the predefined shared domains should be used a so called Private Domain can be registered with Cloud Foundry. This domain can then be used to create a route to a deployed app similiar to what would be possible with the predefined shared domains.

## Configure your own Private Domain

In order to configure a private domain go to

1. Click on Account
2. In the sidebar click on **Domains**
3. Enter the desired domain name for your apps and click on the `+` sign
4. If the domain could be created update your DNS setting at your provider and you can start to create apps with an own domain

More information about Private Domains can be found in the Cloud Foundry [reference documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#private-domains).

## Use a Private Domain as route

In order for your apps to receive traffic under the newly registered domain you need to map them to a route. To do this for an already existing app

1. Open a [Cloud Foundry CLI terminal](cloud-foundry-cli-access.md)
2. Enter `$ cf map-route APPNAME private-domain-example.com --hostname test`
3. Your domain test.private-domain-example.com will routed to this app

There are many other options for route binding for example the app can directly be binded via a `Manifest` entry during a `cf-push` operation. For other options regarding the route binding see the Cloud Foundry [route documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#map-route).


## Delete a Private Domain

**Please note**: Before you can delete a Private Domain all routes containing this domain must be deleted beforehand. Deleting the app is not enough to release the created routes again. 

1. Open a [Cloud Foundry CLI terminal](cloud-foundry-cli-access.md)
2. Issue a `cf delete-route private-domain-example.com --hostname test` to delete the previously created domain (in your case the correct syntax might differ since the command must equal the options used to create the route in the first place)

Please see the Cloud Foundry [route delete documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/routes-domains.html#delete-route) for more information.

Tip: To quickly delete all routes no longer bound to an app use `cf delete-orphaned-routes`.

## DNS Setup

Registering a Private Domain will not associate it with a external DNS system. In order to correctly receive and forward incoming traffic for the private domain to your Apps, you need to setup DNS records. You can either setup DNS records for each hostname under your domain individually or use DNS wildcard records so that Cloud Foundry.

To receive HTTP traffic, set a DNS CNAME record to point to a shared domain of the Cloud Foundry platform hosting your apps, for example `cf.eu-de-darz.msh.host`. You can list the shared domains of a Cloud Foundry platform using `cf domains`.

The best way to receive HTTPS traffic is to provision a load-balancer as a service (LBaaS) from the Cloud Foundry marketplace. An LBaaS Service Instance will have a static IP address. You will need to create a DNS A record for your domain to this loadbalancer.