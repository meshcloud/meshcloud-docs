---
id: meshstack.gcp.metering
title: Metering
---

meshStack imports metering data from [GCP Cloud Billing data BigQuery Export](https://cloud.google.com/billing/docs/how-to/export-data-bigquery). Any data that was exported to the BigQuery dataset before the start of the month in which meshStack GCP metering was enabled will not be collected.

meshStack also periodically collects the currently active projects in order to apply the per tenant fee.

## Configuration

[Connection information](meshstack.how-to.integrate-meshplatform-gcp-manually.md#set-up-the-service-account-for-metering) and metering behavior can be configured via the [Platform Connection Configuration](administration.platforms.md#platform-connection-config). 

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
(SELECT _PARTITIONTIME as PARTITIONTIME, billing_account_id,service, sku, STRUCT(project.id as id, project.ancestry_numbers as ancestry_numbers) as project, labels, system_labels,
        location, cost, currency, usage, credits, invoice, cost_type, adjustment_info
        from `project-name-root.billing_export.gcp_billing_export_general`)
UNION ALL
(SELECT  _PARTITIONTIME as PARTITIONTIME,billing_account_id,service, sku, STRUCT(project.id as id, project.ancestry_numbers as ancestry_numbers) as project, labels, system_labels,
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
