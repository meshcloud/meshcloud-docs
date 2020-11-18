---
id: meshstack.gcp.metering
title: Metering
---

meshStack imports metering data from [GCP Cloud Billing data BigQuery Export](https://cloud.google.com/billing/docs/how-to/export-data-bigquery). Any data that was exported to the BigQuery dataset before the start of the month in which meshStack GCP metering was enabled will not be collected.

meshStack also periodically collects the currently active projects in order to apply the per tenant fee.

## Service Account Configuration

Once billing export has been setup as explained in the GCP documentation linked above, meshStack should be configured with the credentials of a GCP service account that has permission to access the exported billing dataset. This service account must also have the permission to run jobs.

Assign the service account the following [predefined roles](https://cloud.google.com/bigquery/docs/access-control):

```text
roles/bigquery.jobUser
roles/bigquery.dataViewer
```

To enable meshStack to periodically collect active projects, create an IAM role with the following permissions and assign it to the service account.

```text
resourcemanager.folders.get
resourcemanager.folders.list
resourcemanager.projects.get
resourcemanager.projects.list
```

## Configuration Reference

This section describes the configuration of a GCP Platform Instance in the meshStack [configuration model](./meshstack.configuration.md)
at `mesh.platforms` for GCP metering.

<!--snippet:mesh.platforms.gcp.kraken#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let GcpPlatformKrakenConfiguration =
    {-
      platform:
        The meshPlatform identifier

      bigQueryTable:
        The big query table name containing the GCP Cloud Billing BigQuery export.
        See https://cloud.google.com/billing/docs/how-to/export-data-bigquery

      service-account-credentials-b64:
        base64 encoded credentials.json file for a GCP ServiceAccount. meshStack uses this Service Account
        to collect billing data from the BigQuery export table.

      additional-filter:
        Additional big query predicates to append to meshStack's queries. This allows operators to restrict
        what type of data is imported, e.g. to only include data for a specific organization or folder path.
    -}
      { platform : Text
      , bigquery-table : Text
      , service-account-credentials-b64 : Secret
      , additional-filter : Optional Text
      }
```
<!--Example-->
```dhall
let exampleAllData
    : GcpPlatformKrakenConfiguration
    =
      -- configures meshStack to import all available billing data
      { platform = "my.gcp"
      , bigquery-table =
          "project-id.billing.gcp_billing_export_v1_01234A_5678C_1A23B"
      , service-account-credentials-b64 = Secret.Native "..."
      , additional-filter = None Text
      }

let exampleOnlyFolder
    : GcpPlatformKrakenConfiguration
    =
      -- configures meshStack to only import billing data for projects that live in the GCP resource hierarchy
      -- under folder id '345' in the organization with id '123'.
      { platform = "my.gcp"
      , bigquery-table =
          "project-id.billing.gcp_billing_export_v1_01234A_5678C_1A23B"
      , service-account-credentials-b64 = Secret.Native "..."
      , additional-filter = Some
          "and STARTS_WITH(project.ancestry_numbers, '/123/345')"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Billing Data Import

The data is collected incrementally from the exported billing data by filtering by the `export_time` attribute.
Any entries with `cost_type` `tax` are ignored in the metering process.
The monthly totals are calculated by aggregating by the `invoice.month` attribute.
