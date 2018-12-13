---
id: osb.lbaas
title: Load Balancer Service (osb-lbaas)
---

Cloud Foundry offers shared and private [domains](cloudfoundry.domains.md). To successfully use private domains with HTTPS, users need to [provision a private domain](cloudfoundry.domains.md) and a load-balancer that terminates SSL and forwards it to Cloud Foundry's platform router. The recommended way to achieve this is to use this LBaaS service.

The LBaaS service supports various HTTPS certificate options

- Configure your own certificate
  - single domain certificates
  - SAN certificates
  - wildcard certificates
- Let's encrypt certificates
  - single or multiple domains

> It does not matter in which CF Space a user provisions an LBaaS service instance. Once the LBaaS instance is provisioned and configured correctly, CF Apps in any of your spaces can receive HTTPS traffic on routes for this domain.

## Configuring LBaaS

After [creating an instance](cloudfoundry.services.md#creating-a-new-service) of the LBaaS Service, navigate to the [dashboard](osb.dashboards.md) to configure the service.

### DNS

Each LBaaS instance has a static IP address displayed on its dashboard. You will need to create a DNS A record to this address for all domains handled by this loadbalancer. When you use wildcard certs, you can also use a DNS wildcard record.

### Configure your own Certificate

When you want to use your own static certificate, navigate to the "Configure your own Certificate" tab on the dashboard and copy & paste your certicate and the certificate's private key into the corresponding fields.

Most typically you should also add any intermediate and root-certificates into the certifcate field. Include them in the following order:

- The Certificate for your domain
- The intermediates in ascending order to the Root CA
- A Root CA, if any (usually none)

Please keep in mind that you need to manually renew configured certificates before they expire.

### Let's Encrypt

Navigate to the "Let's Encrypt" tab on the dashboard and enter one or multiple domains in the domains fields. Before saving the configuration and requeting certificates from Let's Encrypt, the dashboard will validate that the user has correctly configured DNS for the specified domains.

LBaaS will automatically renew the certificate with Let's Encrypt before they expire.

## Using LBaaS from your Apps

See the documentation on [private domains](cloudfoundry.domains.md) for instructions how to bind your apps to a route on a private domain.