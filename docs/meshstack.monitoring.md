---
id: meshstack.monitoring
title: Metrics & Monitoring
---

In addition to [Logging & Auditing](./meshstack.logging.md), meshStack supports metric monitoring of production
deployments using [Prometheus](https://prometheus.io/). Our [managed service](meshstack.managed-service.md) team
relies on this monitoring to operate meshStack installations.

## Prometheus Scraping

Prometheus scrapes metrics from nodes (for IaaS deployments) as well as from meshStack components.
Scraping is secured using HTTPS Basic auth. The credentials are managed as part of the deployment.

## Additional Alert Inboxes

meshStack comes with pre-configured alerting rules. These alerts are typically only addressed to our [managed service](meshstack.managed-service.md) team, but can also be sent to additional alert inboxes if required.

These email inboxes be configured in the [meshStack configuration model](meshstack.index.md#configuration) under `monitor` as follows:

```dhall
{
, additionalAlertAddresses = [ "alerts@example.com" ]
}
```

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

## Sonar

meshStack includes a component called **Sonar** that runs live smoke tests in your meshStack implementation.
These smoke test simulate real end-to-end user interactions with meshStack via the external API.
These tests also include end-to-end interaction with [meshPlatforms](meshcloud.platforms.md) like tenant replication.

> Setting up Sonar requires a [meshCustomer](meshcloud.customer.md) and [meshProject](meshcloud.project.md) as well as a technical user in meshIdB.
> Depending on the [Enterprise IdP](meshstack.identity-federation.md) and IAM configuration in your
> meshStack implementation this setup may not be possible.

### Configuration

Sonar can be configured in the [meshStack configuration model](meshstack.index.md#configuration) under `monitor.sonar` as follows:

<!--snippet:mesh.sonar#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{ scopes : List SonarScope }
```
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:mesh.sonar.scope-->

The following configuration options are available at `mesh.sonar.scope`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let SonarScope =
    {-
        username:
            The username of a technical user in meshIdB

        password:
            The password of a technical user in meshIdB

        customer:
            Identifier of a meshCustomer to test against

        projects:
            A list of projects - each project holds a projectName and a list of targets

        projectName:
            The identifier of a meshProject to test against

        targets:
            A list of targets to scan - each target holds a platformName and a url

        platformName:
            The identifier of a meshPlatform

        url:
            meshTenant `/access` URL
    -}
      { username : Text
      , password : Secret.Type
      , customer : Text
      , projects :
          List
            { projectName : Text
            , targets : List { platformName : Text, url : Text }
            }
      }
```
<!--Example-->
```dhall
let example =
        { username = "username@example.com"
        , password = Secret.fromEnv "PASSWORD"
        , customer = "example-customer"
        , projects =
          [ { projectName = "p0"
            , targets =
              [ { platformName = "p0-platform0"
                , url =
                    "https//<meshfed-fqdn>/projects/<p0-identifier>/locations/<locationID>/platformInstances/<platform0-identifier>/access"
                }
              , { platformName = "p0-platform1"
                , url =
                    "https//<meshfed-fqdn>/projects/<p0-identifier>/locations/<locationID>/platformInstances/<platform1-identifier>/access"
                }
              ]
            }
          , { projectName = "p1"
            , targets =
              [ { platformName = "p1-platform0"
                , url =
                    "https//<meshfed-fqdn>/projects/<p1-identifier>/locations/<locationID>/platformInstances/<platform0-identifier>/access"
                }
              ]
            }
          ]
        }
      : SonarScope
```
<!--END_DOCUSAURUS_CODE_TABS-->
