---
id: meshstack.azure.metering
title: Metering
---

meshStack imports metering data from Azure via the [Azure Cost Management API](https://docs.microsoft.com/en-us/rest/api/cost-management/). It collects data for the previous and the current month.
Azure only provides data for the previous day, so Azure Usage Reports shown in meshStack will not provide data for the current day.

## Configuring Seller Information

If you would like to see the Azure costs attributed to a seller in the [chargeback statments](meshcloud.cost-management.md#chargeback-statements), a product needs to be created manually in the meshcloud [Product Catalog](meshstack.billing-configuration.md#defining-a-custom-product-catalog). This product should have a `resourceType` of `sellerInfo` and should be scoped to a `platformType` of `Azure`. An example is shown below.

```json
{
    "resourceType": "sellerInfo",
    "displayName": "Azure Seller Info",
    "scope": {
        "platformType": "Azure",
        "location": null,
        "platformInstance": null,
        "localProjectId": null
    },
    "usageTypes": [],
    "description": "",
    "sellerId": "Azure",
    "sellerProductGroup": null,
    "@metadata": {
        "@collection": "Products",
        "Raven-Java-Type": "io.meshcloud.kraken.core.metering.Product"
    }
}
```
