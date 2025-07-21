---
id: meshstack.monitoring
title: Monitoring & Telemetry
---

Our [managed service](/docs/meshstack.managed-service) team relies on monitoring and telemetry to operate meshStack installations for our customers. Integrating these systems is a must-have before you can use our managed services.

This page explains what data we collect and why we process it. We treat all customer data with care and confidentiality, following our information security management system as described in our [Security FAQ](/docs/faq).

## Customer data

Customer data is any information entered into meshStack via meshPanel or the API. It also includes data meshStack retrieves from your cloud platforms, like cloud tenant metadata or usage reports.

## Metrics

Metrics are labeled, numerical time-series data.

- Operating system-level metrics like CPU and disk usage
- Application service metrics like database, queue, and load balancer performance
- meshStack application metrics like API performance and stats about meshObjects such as meshWorkspaces and meshProjects

Application-level metrics can include labels with customer data, like meshWorkspace and meshPlatform identifiers.

## Logs

meshStack collects various logs as described in [Logging & Auditing](/docs/meshstack.logging). Logs can contain customer data and personally identifiable information (PII) like user identifiers.

Log data isn’t part of the telemetry data we collect.

## Telemetry

meshcloud sends and processes metrics data in a central monitoring system operated by meshcloud (meshOperations Center) for performance monitoring and alerting.

You’ll find more details, including a full list of metrics sent, in meshStack’s security documentation.

When enabled, collected [product feedback and usage data](/docs/administration.product-feedback-collection) is relayed from meshPanel’s web server to a central Plausible server instance operated by meshcloud.

## Health endpoint

meshStack provides a health endpoint that returns the current status and database connection status. You’ll find this info at `/actuator/health`.

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

## Version

meshStack provides a version endpoint to request the current version and commit hash. You’ll find this info at `<meshPanel>/version`.

Example:

```json
{
    "package": "7.7.7",
    "git": "123456789a",
    "branch": "HEAD"
}

```
