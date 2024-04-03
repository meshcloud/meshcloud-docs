---
id: administration.dns
title: "DNS and SSL Certificates"
---

During the setup of your meshStack you can choose which endpoints should be used.

## Recommended Setup

Common choices include for the meshStack domain include:

- my.organization.cloud
- portal.organization.cloud
- cloudportal.organization.com

Once you have settled on a `$domain`, we recommend to use:

- `$domain`
- `api.$domain` (API of the meshStack)
- `kraken.$domain` (Cost collection component)
- `sonar.$domain` (Monitoring component; used by meshcloud employees only)

## SSL certificates

meshStack supports wildcard certificates and certificates with Subject Alternative Name (SAN).

SAN certificates need to contain FQDN for hosts

- `$domain`
- `api.$domain`
- `kraken.$domain`
- `sonar.$domain`

Certificates must include the full chain, including root certs issued by your organization.
