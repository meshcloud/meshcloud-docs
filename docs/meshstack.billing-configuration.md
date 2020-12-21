---
id: meshstack.billing-configuration
title: Configuration
---

## Supported Currencies

In order to simplify multi-cloud governance, cloud foundation teams should prefer standardising on a single chargeback currency.
However, Cloud Foundation teams sometimes encounter situations in which they need to process billing or chargeback in multiple
currencies. For example GCP might charge your organization for cloud consumption in EUR while Azure charges consumption in USD.

In case standardisation on a single currency is not possible, meshStack supports chargeback in multiple currencies. The
following product funcitonalities fully support multi-currency scenarios:

- **Private Cloud billing**: Operators can define products and usage rates in any currency.
- **Public Cloud billing**: meshStack preserves the original currency when importing cost and consumption data from the cloud provider.
- **meshMarketplace**: Service owners can define prices for their services using the OSB Catalog in any currency.
- **Tenant Usage Reports**: Tenant usage reports support line items in multiple currencies and aggregates net amounts in each currency separately.
- **Chargeback Statements**: Chargeback statements support multiple currencies and aggregate net amounts in each currency separately.
- **Tenant Fees**: Operators can define tenant fees in any currency.
- **Discounts**: Discounts support any currency. Discounts calculated from a source amount (e.g. percentage discounts) use the same currency as the source amount.

The following product functionalitities do currently not support multi-currency scenarios:

- **Detailed Tenant Usage Report**: Detailed tenant usage reports (available for OpenShift, OpenStack, Cloud Foundry and
  meshMarketplace) offer additional detail on a Tenant Usage Report. However, the net amount aggregation assumes all line items
  are in EUR. This can create confusion if the underlying Tenant Usage Report uses a different or multiple currencies.
- **Payment Methods**: Amounts specified on payment methods are currently assumed to be in EUR.

> meshcloud will revisse support for multi-currency billing and chargeback in these areas as part of the upcoming [Cost Management Roadmap Feature](https://www.meshcloud.io/product/).

## Defining a custom Product Catalog

The following sections will introduce features of the meshStack product catalog.

### Core Concepts

#### Scope Selectors

Every cloud resource has a scope in meshcloud, defined by the meshTenant in belongs to.
ScopeSelectors are hierarchical selectors that allow Product Catalog entries to specify the resource scopes they apply to. ScopeSelectors can target all platforms of a certain platform type, a specific meshPlatform or an individual meshTenant.

Using ScopeSelectors, Operators can for example define different prices for platforms running in different locations.

<!--snippet:mesh.kraken.productcatalog.scopeselector#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let ScopeSelector =
    {-
      The Scope Selector specifies the cloud resource scopes that a product catalog entry applies to.
      Fields, depending on the type of scope selected:

        platformType:
            The PlatformType to target

        location:
            The meshLocation identifier to target

        platformInstance:
            The meshPlatform identifier to target

        localProjectId:
            The platform identifier for the meshTenant, e.g. an Azure Subscription Id.
    -}

      let ByPlatformType = { platformType : PlatformType }

      let ByPlatformInstance =
            ByPlatformType ⩓ { location : Text, platformInstance : Text }

      let ByTenant = ByPlatformInstance ⩓ { localProjectId : Text }

      in  < PlatformType : ByPlatformType
          | PlatformInstance : ByPlatformInstance
          | Tenant : ByTenant
          >
```
<!--Example-->
```dhall
let example =
    -- this ScopeSelector targets all platforms of type "Azure"
      ScopeSelector.PlatformType { platformType = PlatformType.Azure }

let example2 =
    -- this scope selector targets a specific OpenStack platform
      ScopeSelector.PlatformInstance
        { platformType = PlatformType.OpenStack
        , location = "eu.de-central"
        , platformInstance = "pike"
        }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Discounts

Discounts allow Operators to add or deduct charges to Tenant Usage Reports. A common use case for Platform Operators is to configure a discount with a positive rate to charge projects with a "management fee" based on the project's actual cloud consumption.

<!--snippet:mesh.kraken.productcatalog.discount#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Discount =
    {-
        scope:
            Specifies the scope this discount applies to, see ScopeSelector

        discountRule:
            Specifies the type of discount rule used to calculate the discount.

        displayName:
            The name to display for this discount on the tenant usage report.

        description:
            The description to display for this discount on the tenant usage report.

        sellerId:
            The id of the seller to charge this discount to. A positive discount netAmount will be credited to this
            seller during chargeback, while a negative netAmount will be charged to this seller.

        sellerProductGroup:
            A product group identifier for the seller. Specifying this field allows sellers to aggregate
            charges and credits by different categories for reporting purposes.
    -}
      { scope : ScopeSelector
      , discountRule : DiscountRule
      , displayName : Text
      , description : Text
      , sellerId : Text
      , sellerProductGroup : Text
      }
```
<!--Example-->
```dhall
let example
    : Discount
    =
      -- This Discount charges a 5% Management Fee on all Azure consumption and is credited to the operations team
      { scope =
          ScopeSelector.PlatformType { platformType = PlatformType.Azure }
      , sellerId = "azure-cloud-foundation"
      , sellerProductGroup = "fees"
      , displayName = "Azure Management Fee"
      , description =
          "Management Fee for Azure Cloud Operations Team, based on usage"
      , discountRule =
          DiscountRule.fixedPercentage
            { discountPercentage = 5.0
            , sourceNetAmountBySellerId = "Azure"
            }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### Discount rules

Discount rules specify how a discount is computed.

meshStack currently provides two discount rules. Future releases could provide additional discount rule options.

<!--snippet:mesh.kraken.productcatalog.discountrule#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let DiscountRule =
      < fixedPercentage : FixedPercentageDiscountRule
      | tieredPercentage : TieredPercentageDiscountRule
      >
```
<!--END_DOCUSAURUS_CODE_TABS-->

##### Fixed Percentage Discount Rule

The fixed percentage discount rules calculates the fee as a percentage of the total consumption.

<!--snippet:mesh.kraken.productcatalog.fixedpercentagediscountrule#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let FixedPercentageDiscountRule =

    {-
      Calculates the discount as a fixed percentage of a source amount using the formula
      ```
          discountNetAmount = sourceNetAmount * discountPercentage / 100
      ```

        sourceNetAmountBySellerId:
            The discount is calculated on a source amount computed by summing the usage line item net amounts
            filtered by this seller id. This is typically used so that the discount only applies to usages
            generated by cloud consumption.

        discountPercentage:
            The discount percentage to apply. Use positive rates to generate additional fees, use negative rates
            to deduct charges.
    -}
      { sourceNetAmountBySellerId : Text, discountPercentage : Double }
```
<!--Example-->
```dhall
let example
    : FixedPercentageDiscountRule
    = {-
      This fee adds 5% to to all azure consumption.
      -}
      { discountPercentage = 5.0, sourceNetAmountBySellerId = "Azure" }
```
<!--END_DOCUSAURUS_CODE_TABS-->

##### Tiered Discount Rule

The tiered discount rule defines tiers of cloud resource consumption. For each tier a discount percentage is used to calculate the discount to be used.

<!--snippet:mesh.kraken.productcatalog.tieredpercentagediscountrule#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let TieredPercentageDiscountRule =
    {-
      Calculates the discount as percentage of a source amount using the formula
      ```
          discountNetAmount = sourceNetAmount * "discountPercentage of activated tier" / 100
      ```

        sourceNetAmountBySellerId:
            The discount is calculated on a source amount computed by summing the usage line item net amounts
            filtered by this seller id. This is typically used so that the discount only applies to usages
            generated by cloud consumption.

        discountPercentageTiersByLowerThresholds:
            lowerThreshold:
                Specify tiers by their threshold.
                    - If source amount is not greater than any lowerThreshold, no discount is given.
                    - If source amount is greater than more than one lowerThreshold, the tier with the highest threshold is activated.
                      Up to one tier is activated at a time.
            discountPercentage:
                The discount percentage to apply. Use positive rates to generate additional fees, use negative rates
                to deduct charges.
    -}
      { sourceNetAmountBySellerId : Text
      , discountPercentageTiersByLowerThresholds :
          List { lowerThreshold : Double, discountPercentage : Double }
      }
```
<!--Example-->
```dhall
let example
    : TieredPercentageDiscountRule
    =
       {-
          This TieredPercentageDiscountRule is applied on all Azure consumption.

          The applicable fee depends on the source amount.

          Using interval notation the explicitly defined tiers can be described as:
              - source amount in [5,10) -> 2.5% fee
              - source amount in [10,∞) -> 1% fee

          Because the smallest lowerThreshold of the defined tiers is greater than 0 the TieredPercentageDiscountRule implicitly
          defines a tier with discountPercentage 0% for every source amount strictly less than the smallest tier.
          This results in the following fee
              - source amount in [0,5)  -> 0% fee
      -}
      { sourceNetAmountBySellerId = "Azure"
      , discountPercentageTiersByLowerThresholds =
        [ { lowerThreshold = 5.0, discountPercentage = 2.5 }
        , { lowerThreshold = 10.0, discountPercentage = 1.0 }
        ]
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Configuration


<!--snippet:mesh.kraken.productcatalog-->

The following configuration options are available at `mesh.kraken.productcatalog`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{ discounts : List Discount }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Common Chargeable Resources

This section describes the resources that do not strictly belong to a specific cloud platform, that can be defined in the catalog.
Products referring to these resources can be defined for all or multiple cloud platforms.

### meshTenant

Represents a meshTenant. Currently available for Azure, AWS and GCP platforms.

```text
id: mesh.tenant
traits:
  - landingZoneName
  - platformType
```

You can define products based on this resource type to charge fees based on the Landing Zone that is in use by a meshTenant
or to simply charge a fee on the meshTenant itself.

## Chargeback

> Chargeback is the process of allocating IT cost to consumers and feeding it into the company-wide finance and controlling processes.

Each project in meshStack is associated with a Chargeback Account. meshStack periodically generates [chargeback statements](meshcloud.project-metering.md#chargeback-statements).

The attributes that shall be part of the billing info on the chargeback statements can be configured.

### Available metadata keys

The following metadata keys are derived from meshStack metadata and therefore available on every meshStack implementation

| Key                   | Description                                      |
|-----------------------|:-------------------------------------------------|
| tenantLandingZone     | Name of the Landing Zone used by the Tenant      |
| last_modified         | Date when metadata was last modified             |
| contactMail           | email address of the project owner               |
| ownerUsername         | Username of the project owner                    |
| ownerFirstName        | First name of the project owner                  |
| ownerLastName         | Last name of the project owner                   |
| tenant_local_id       | The id of the tenant as provided by the platform |
| paymentName           | Name of the payment method                       |
| paymentIdentifier     | Identifier of the payment method                 |
| paymentExpirationDate | Expiration date of the payment method            |
| paymentAmount         | Amount available for payment method              |

### Available tag keys

Custom tags can be referenced via their property name in the according [tag schema](meshstack.metadata-tags.md#tag-schemas).

### Configuration example

<!--snippet:mesh.kraken.api.statements-->

The following configuration options are available at `mesh.kraken.api.statements`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Statements =
    {-
      relevant-meta-keys:
        A list of metadata and tag keys that shall appear in chargeback statements as billing info.
        General payment information can be accessed via paymentName, paymentIdentifier, paymentExpirationDate
        and paymentAmount. Custom Tags can be referenced via their property name in the according tag JSON schema.
        Custom Tags are customer tags, project tags and payment tags.

      period-offset-days:
        It is the offset of days after which chargeback statements are generated.
        This time should always be set to a higher value than the finalizeReportsAfterDays
        that are configured for kraken-worker, as only finalized reports are considered in chargeback statements.
    -}
      { relevant-meta-keys : List Text, period-offset-days : Natural }
```
<!--Example-->
```dhall
let example
    -- these relevant-meta-keys reference all statically available payment information
    : Statements
    = { relevant-meta-keys =
        [ "paymentName"
        , "paymentIdentifier"
        , "paymentExpirationDate"
        , "paymentAmount"
        ]
      , period-offset-days = 10
      }

let example2
    -- these relevant-meta-keys reference tags that can be defined individually per meshImplementation
    : Statements
    = { relevant-meta-keys = [ "customTag1", "customTag2" ]
      , period-offset-days = 10
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Budgeting

> under construction, get in touch for more details
