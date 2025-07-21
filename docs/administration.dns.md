---
id: administration.dns
title: "DNS and SSL Certificates"
---

During the setup of your meshStack you can choose which endpoints should be used.

## Domains

Common choices include for the meshStack domain include:

- my.organization.cloud
- portal.organization.cloud
- cloudportal.organization.com

Once you have settled on a `$domain`, we recommend to use:

- `$domain`
- `api.$domain` (API of the meshStack)
- `kraken.$domain` (Cost collection component)
- `sso.$domain` (Identity broker component)
- `sonar.$domain` (Monitoring component; used by meshcloud to monitor your meshStack)

The DNS records needed for those domains are provided to you by meshcloud during the setup of your meshStack.

## SSL certificates

> Providing SSL certificates is only required for [meshStack Enterprise](meshstack.managed-service.md#meshstack-saas-on-prem). For [meshStack SaaS](meshstack.managed-service.md#meshstack-saas) manages SSL certificates automatically.

meshStack supports wildcard certificates and certificates with Subject Alternative Name (SAN).
SAN certificates need to contain FQDN for all hosts.
Certificates must include the full chain, including root certs issued by your organization.
