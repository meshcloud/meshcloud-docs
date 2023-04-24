---
id: meshstack.monitoring
title: Metrics & Monitoring
---

In addition to [Logging & Auditing](./meshstack.logging.md), meshStack supports metric monitoring of production
deployments using [Prometheus](https://prometheus.io/). Our [managed service](meshstack.managed-service.md) team
relies on this monitoring to operate meshStack installations.

## Prometheus Scraping

Prometheus scrapes metrics from nodes (for IaaS deployments) as well as from meshStack components.
Scraping is secured using HTTPS Basic auth. The credentials are managed as part of the deployment. Information about metrics can be found in [Metrics Metadata](./meshstack.monitoring.metrics.md).

## Health endpoint

meshStack configures a health endpoint which returns the current status and also the status of database connections. These information are available under path `/actuator/health`.

Example:

```json
{
    "status": "UP",
    "components": {
        "db": {
            "status": "UP",
            "details": {
                "database": "MariaDB",
                "result": 1,
                "validationQuery": "SELECT 1"
            }
        }
    }
}
```

## Uptime

meshStack configures an uptime endpoint to request the exact process instance uptime. This information is available under path `/actuator/metrics/process.uptime`.

Example:

```json
{
    "name": "process.uptime",
    "description": "The uptime of the Java virtual machine",
    "baseUnit": "seconds",
    "measurements": [
        {
            "statistic": "VALUE",
            "value": 2396.331
        }
    ],
    "availableTags": []
}
```

## Version

meshStack configures a version endpoint to request the current version and commit-hash. This information is available under path `<meshPanel>/version`.

Example:

```json
{
    "package": "7.7.7",
    "git": "123456789a",
    "branch": "HEAD"
}

```
