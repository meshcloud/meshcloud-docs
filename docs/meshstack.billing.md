---
id: meshstack.billing
title: Metering and Billing
---

Pay-per-use is a core principle of cloud computing. Without pay-per-use, there's no incentive for developer times to elastically scale their resource consumption with demand.

meshStack includes sophisticated metering & billing capabilities to help developers, platform operators and controllers monitor resource consumption for their multi-cloud setup managed by meshStack. We divide these capabilities into three sections of a end-to-end
integrated process that serves all stakeholders (platform owners, project owners, controllers).

```text
Metering ⟶ Billing ⟶ Chargeback
```

## Metering

> Metering is the process of collecting and calculating cloud resource usage. Metering also involves pricing this resource usage to calculate cost.

Cloud Platforms record events and other information about deployed cloud resources. Some of these events are relevant
for metering. For example, starting and stopping a virtual machine may generate a corresponding stream of events that describes how long the virtual machine was running. For example, we can use data from the cloud platform to calculate how much RAM-hours and vCPU-hours a virtual machine consumed in a given period.

Cloud resources have many different traits, i.e. we saw that a virtual machine has RAM and vCPU.
A Product Catalog defines which of these traits are relevant for metering and how their usage is calculated. Typically
usage is the product of a quantity and a duration, i.e. a single vCPU used for an hour. But their may be other usage units as well that consist only of quantities (i.e. bytes transferred over the network) or a duration (i.e. resource usage hour).

A product catalog also contains pricing rules that determine the cost for a particular resource usage.

## Billing

> Billing is the process of attributing resource usage to cloud tenants and creating appropiate invoices.

There are two principal steps to the billing process. The first is creating periodic (e.g. monthly) [Tenant Usage Reports](meshcloud.project-metering.md) that
aggregate cloud resource usage data for tenants. meshStack makes [Tenant Usage Reports](meshcloud.project-metering.md) available to all
involved users, i.e. customer & project owners, platform operators and partners.

The second is invocing the customer according to agreed terms for this usage. This may also involve applying additional
pricing and discount rules to aggregated usage reports, i.e. volume discounts.

### Public cloud billing with meshcloud

Public cloud providers like AWS, Azure and GCP provide their own metering and billing processes. These can be very intricate
and involve complex pricing rules. However, a common theme is that they all provide the enterprise with a single invoice
for its aggregated cloud spend. These invoices list the cloud spend by individual cloud tenants. Putting all tenants on
 a single invoice leads to attractive volume discounts, however it necessitates breaking down that invoice into
 different Tenant Usage Reports and feeding them to a [chargeback](#chargeback)
 process to correctly attribute costs to the individual cloud consumers.

### Private cloud billing with meshcloud

Private cloud platforms like OpenStack, OpenShift and Cloud Foundry usually do not provide built-in metering and biling capabilities.
While they may have APIs or facilities to expose basic usage information, they do not come with metering and pricing capabilities
that match the expectations developers and project managers have grown accustomed to from public cloud billing.

One core aspect is that metering data must be made plausible for the consumers. Consumers demand resource-level usage
reporting so that they can verify how each of their deployed cloud resources contributes to the total usage.
meshStack includes a sophisticated private-cloud metering engine that allows operators to define their own product catalogs
and create accurate metering data.

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
            The id of the seller to charge this discount to. A positive discount netAmounot will be credited to this
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

Discount rules specify how a discount is computed.

meshStack currently provides only a single discount rule. Future releases could provide additional discount rule options.

<!--snippet:mesh.kraken.productcatalog.discountrule#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let DiscountRule =
      let FixedPercentageDiscountRule =
          {-
            Calculates the discount as a fixed percentage of a source amount using the formula
            ```
                discountNetAmount = sourceNetAmount * discountPercentage / 100
            ```

              sourceNetAmountBySellerId:
                  The discount is calculated on a source amount computed by summing the usage line item net amounts
                  filtered by this seller id. This is typcially used so that the discount only applies to usages
                  generated by cloud consumption.

              discountPerccentage:
                  The discount percentage to apply. Use positive rates to generate additional fees, use negative rates
                  to deduct charges.
          -}
            { sourceNetAmountBySellerId : Text
            , discountPercentage : Double
            }

      in  < fixedPercentage : FixedPercentageDiscountRule >
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


## Chargeback

> Chargeback is the process of allocating IT cost to consumers and feeding it into the company-wide finance and controlling processes.

Each project in meshStack is associated with a Chargeback Account. meshStack periodically generates [chargeback statements](meshcloud.project-metering.md#chargeback-statements).

The attributes that shall be part of the billing info on the chargeback statements can be configured as follows.

<!--snippet:mesh.kraken.api.statements-->

The following configuration options are available at `mesh.kraken.api.statements`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Statements =
    {-
      relevantMetaKeys:
        A list of metadata and tag keys that shall appear in chargeback statements as billing info.
        General payment information can be accessed via paymentName, paymentIdentifier, paymentExpirationDate
        and paymentAmount. Custom Tags can be referenced via their property name in the according tag JSON schema.
        Custom Tags are customer tags, project tags and payment tags.
    -}
      { relevantMetaKeys : List Text }
```
<!--Example-->
```dhall
let example
    -- these relevantMetaKeys reference all statically available payment information
    : Statements
    = { relevantMetaKeys =
        [ "paymentName"
        , "paymentIdentifier"
        , "paymentExpirationDate"
        , "paymentAmount"
        ]
      }

let example2
    -- these relevantMetaKeys reference tags that can be defined individually per meshImplementation
    : Statements
    = { relevantMetaKeys = [ "customTag1", "customTag2" ] }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Budgeting

> under construction, get in touch for more details
