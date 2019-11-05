---
id: meshstack.monitoring
title: Metrics & Monitoring
---

In addition to [Logging & Auditing](./meshstack.logging.md), meshStack supports metric monitoring of production
deployments using [Prometheus](https://prometheus.io/). The following components and services therefore expose
`/prometheus` URL endpoints for metrics scraping.

- meshfed-api
- meshfed-replicator-aws

## Configuration

Prometheus endpoints are secured via HTTP Basic Auth. To enable Prometheus monitoring, configure a user for Prometheus
in the `application.yml` of the service.

```yml
auth:
  basic:
    realm: <COMPONENT>
    users:
      - username: <USERNAME>
        password: <PASSWORD>
        authorities:
          - ACTUATOR
```

Realm is the [RFC-1945](https://tools.ietf.org/html/rfc1945#section-11) part of the authorization challenge and can be an arbitrary value for the Prometheus page.
The entered username and password must be used set in your Prometheus scraper configuration.
