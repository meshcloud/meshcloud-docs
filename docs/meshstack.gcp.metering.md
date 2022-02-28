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
roles/bigquery.jobUser (on the project of the ServiceAccount)
roles/bigquery.dataViewer (on the project that holds the bigquery dataset)
```

To enable meshStack to periodically collect active projects, create an IAM role with the following permissions and assign it to the service account.

```text
resourcemanager.folders.get
resourcemanager.folders.list
resourcemanager.projects.get
resourcemanager.projects.list
```

## How to query multiple billing accounts for the same GCP organization

Create GCP Cloud Billing data BigQuery Exports are available for all billing accounts. Use the same location for all datasets.

Create a view of the union over two base billing account exports.

An example query for creating a view

```sql
  CREATE VIEW mydataset.meshcloud_billing_view AS
    (
      (SELECT
        *,
        _PARTITIONTIME as PARTITIONTIME
      FROM
        project-id-a.billing.gcp_billing_export_v1_01234A_5678C_1A23B
    )
    UNION ALL
    (
      SELECT
      *,
      _PARTITIONTIME as PARTITIONTIME
    FROM
      project-id-b.billing.gcp_billing_export_v1_98765Z_4321X_9Z87Y
    )
```

Grant Service Account Permissions on the dataset as described in [Service Account Configuration](#service-account-configuration).

## Configuration Reference

This section describes the configuration of a GCP Platform Instance in the meshStack [configuration model](./meshstack.index.md#configuration)
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
        Format must be: $project-id.$dataset-id.$table-id

      service-account-credentials-b64:
        base64 encoded credentials.json file for a GCP ServiceAccount. meshStack uses this Service Account
        to collect billing data from the BigQuery export table.

      additional-filter:
        Additional big query predicates to append to meshStack's queries. This allows operators to restrict
        what type of data is imported, e.g. to only include data for a specific organization or folder path.

      partition-time-column:
        If you are using the export of billing data from GCP directly as it is, then this should be set to
        "_PARTITIONTIME". Overriding this is useful if you want to collect data from two billing exports and
        provide a UNION view of the two. Since GCP BigQuery doesn't allow views to contain a column starting
        with an underscore, the _PARTITIONTIME column would have to be mapped to another name. You should specify
        that column name here.
    -}
      { platform : Text
      , bigquery-table : Text
      , service-account-credentials-b64 : Secret
      , additional-filter : Optional Text
      , partition-time-column : Text
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
      , partition-time-column = "_PARTITIONTIME"
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
      , partition-time-column = "_PARTITIONTIME"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Billing Data Import

The data is collected incrementally from the exported billing data by filtering by the `export_time` attribute.
Any entries with `cost_type` `tax` are ignored in the metering process.
The monthly totals are calculated by aggregating by the `invoice.month` attribute.


## Support for Multiple Billing Accounts

There can be situations where you want the projects inside a single GCP meshPlatform to be associated with multiple
billing accounts. One such example is when you have one billing account which has
[Spend-based committed use discounts](https://cloud.google.com/docs/cuds-spend-based) applied and another billing account
which contains free credit applied. To ensure that meshStack collects data from both the accounts, you have to create
a view in BigQuery which is a union of the two billing data exports from the two billing accounts. Such a union can be
created with a query which looks similar to the following

```sql
(SELECT _PARTITIONTIME as PARTITIONTIME, billing_account_id,service, sku, project, labels, system_labels,
        location, cost, currency, usage, credits, invoice, cost_type, adjustment_info
        from `project-name-root.billing_export.gcp_billing_export_general`)
UNION ALL
(SELECT  _PARTITIONTIME as PARTITIONTIME,billing_account_id,service, sku, project, labels, system_labels,
        location, cost, currency, usage, credits, invoice, cost_type, adjustment_info
        from `project-name.billing_export.gcp_billing_export_credit`)

```

Since BigQuery doesn't allow column names that start with an underscore character, you have to map the _PARTITIONTIME
column to a different name as shown in the query. This column name has to be configured as shown in the configuration
reference using the property `partition-time-column`.

## Configuring Seller Information

If you would like to see the GCP costs attributed to a seller in the [chargeback statments](./meshcloud.project-metering.md#chargeback-statements), a product needs to be created manually in the meshcloud [Product Catalog](meshstack.billing-configuration.md#defining-a-custom-product-catalog). This product should have a `resourceType` of `sellerInfo` and should be scoped to a `platformType` of `Gcp`. An example is shown below.

```json
{
    "resourceType": "sellerInfo",
    "displayName": "GCP Seller Info",
    "scope": {
        "platformType": "Gcp",
        "location": null,
        "platformInstance": null,
        "localProjectId": null
    },
    "usageTypes": [],
    "description": "",
    "sellerId": "GCP",
    "sellerProductGroup": null,
    "@metadata": {
        "@collection": "Products",
        "Raven-Java-Type": "io.meshcloud.kraken.core.metering.Product"
    }
}
```
