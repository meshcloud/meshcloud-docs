---
id: meshstack.monitoring
title: Monitoring & Telemetry
---

Our [managed service](meshstack.managed-service.md) team
relies on monitoring & telemetry to operate meshStack installations for our customers. The integration of these systems are a mandatory pre-requisite for using our managed services.

This page documents what data we collect and for what purposes we process it. All customer data we collect and store is handled with confidentiality in accordance with our information security management system as described in our [FAQ](./faq.md).

## Customer data

Customer data is any data entered into meshStack via meshPanel or the API and also includes any data that meshStack retrieves from the customer's cloud platforms like cloud tenant metadata or usage reports.

## Metrics

Metrics are labelled, numerical time-series data.

- operating-system level metrics like CPU and disk usage
- application-service metrics like database, queue and load-balancer performance
- meshStack application metrics like API performance and statistics about meshObjects like meshWorkspaces, meshProjects etc.

Application-level metrics can contain labels that include customer data such as meshWorkspace and meshPlatform identifiers.

## Logs

meshStack collects various logs as described in [Logging & Auditing](./meshstack.logging.md). Logs can contain customer data and also PII like user identifiers.

Log data is therefore not part of telemetry data we collect.

## Product Usage Data

In order to continuously improve our product we collect product usage data and feedback. 
Product usage data collection can be explicitly enabled by an operator after prior confirmation of the customer. 

meshPanel uses the privacy-preserving and open source web-analytics library plausible.io for collecting anonymous usage data as described in the [plausible data policy](https://plausible.io/data-policy). 
The system we use is operated by meshcloud and the data collected will remain within the secure meshcloud environment and will not be shared or processed externally. 

### What data is collected?

Rest assured, the data we collect will not include any Personally Identifiable Information (PII).
Data that we collect includes the following:

- Satisfaction Ratings: To gauge user satisfaction, we will implement a star rating system. After completing an activity within the product, such as creating a meshProject, users will be prompted to provide a rating based on their experience.
- Usage Metrics: We will collect data on the frequency and manner in which functionalities are utilized within meshStack. This will help us identify patterns and understand how our product is being used, allowing us to make informed decisions for further improvement.

### Enabling Product Usage Data Collection

<!--snippet:mesh.panel.environment#Plausible-->

The following configuration options are available at `mesh.panel.environment#Plausible`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Plausible =
    {-
        activatePlausibleTracking:
            Enable product usage analysis and telemetry using the plausible JavaScript library.
    -}
      { activatePlausibleTracking : Bool }
```
<!--Example-->
```dhall
let example = { activatePlausibleTracking = True } : Plausible
```
<!--END_DOCUSAURUS_CODE_TABS-->

When enabled, meshPanel will send usage data to this meshStack's meshPanel domain, which means there will be
no third-party domains accessed from user's browsers.

## Telemetry

meshcloud transmits and processes metrics data to a central monitoring system operated by meshcloud (meshOperations center) responsible for performance monitoring and alerting.

Customers can find more details including a full list of metrics transmitted in meshStack's security documentation.

When enabled, [product usage data](#product-usage-data) is relayed from meshPanel's web server to a central plausible server instance operated by meshcloud.

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
