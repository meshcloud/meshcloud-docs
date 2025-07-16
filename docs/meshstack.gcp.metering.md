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

## Configuring Seller Information

If you would like to see the GCP costs attributed to a seller in the [chargeback statments](meshcloud.project-metering.md#chargeback-statements), a product needs to be created manually in the meshcloud [Product Catalog](meshstack.billing-configuration.md#defining-a-custom-product-catalog). This product should have a `resourceType` of `sellerInfo` and should be scoped to a `platformType` of `Gcp`. An example is shown below.

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

## Additional Filter

Filter the costs meshStack collect via the `Additional Filter` option.

Example for a filter for projects in organization `632614034120` and folder `493343334220`:

`and STARTS_WITH(project.ancestry_numbers, '/632614034120/493343334220')`
