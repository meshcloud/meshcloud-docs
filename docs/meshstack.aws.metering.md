---
id: meshstack.aws.metering
title: Metering
---
meshStack imports metering data from [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/).
It is recommended to have a daily report update interval in order to keep the costs of calling the API low. This can be
configured via the `awsStateCollectionInterval` property.

The `amortized cost` is used when generating the tenant usage reports.

## Configuration

[Connection information](meshstack.how-to.integrate-meshplatform-aws-manually.md#set-up-iam-user-for-metering) and metering behavior can be configured via the [Platform Connection Configuration](administration.platforms.md#platform-connection-config). Besides the option of considering or excluding taxes charged on the AWS bill, the main behavior that can be steered here is the [handling of Reserved Instances and Savings Plans](meshstack.how-to.integrate-meshplatform-aws-manually.md#leverage-reserved-instances--savings-plans).

## Configuring Seller Information

If you would like to see the AWS costs attributed to a seller in the [chargeback statments](./meshcloud.project-metering.md#chargeback-statements), a product needs to be created manually in the meshcloud [Product Catalog](meshstack.billing-configuration.md#defining-a-custom-product-catalog). This product should have a `resourceType` of `sellerInfo` and should be scoped to a `platformType` of `Aws` . An example is shown below.

```json
{
    "resourceType": "sellerInfo",
    "displayName": "AWS Seller Info",
    "scope": {
        "platformType": "Aws",
        "location": null,
        "platformInstance": null,
        "localProjectId": null
    },
    "usageTypes": [],
    "description": "",
    "sellerId": "AWS",
    "sellerProductGroup": null,
    "@metadata": {
        "@collection": "Products",
        "Raven-Java-Type": "io.meshcloud.kraken.core.metering.Product"
    }
}
```
