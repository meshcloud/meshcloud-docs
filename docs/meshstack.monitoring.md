---
id: meshstack.monitoring
title: Metrics & Monitoring
---

In addition to [Logging & Auditing](./meshstack.logging.md), Meshstack supports metric monitoring of production
deployments using [Prometheus](https://prometheus.io/). The following components and services therefore expose
`/prometheus` URL endpoints for metrics scraping.

- meshfed-api
- meshfed-replicator-aws

## Configuration

Prometheus endpoints are secured via `Basic Auth`. To enable prometheus monitoring, configure a user for Prometheus
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

You must use the username and password in your Prometheus scraper.