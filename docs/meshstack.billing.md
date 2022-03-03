---
id: meshstack.billing
title: Architecture
---

Pay-per-use is a core principle of cloud computing. Without pay-per-use, there's no incentive for developer times to elastically scale their resource consumption with demand.

meshStack includes sophisticated metering & billing capabilities to help developers, platform operators and controllers monitor resource consumption for their multi-cloud setup managed by meshStack. We divide these capabilities into three sections of a end-to-end
integrated process that serves all stakeholders (platform owners, project owners, controllers).

```text
Metering ⟶ Billing ⟶ Chargeback
```

> Learn more about how your cloud foundation team can enable cloud cost management in
> the [Cloud Foundation Maturity Model](https://cloudfoundation.meshcloud.io/maturity-model/cost-management/)

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

> To learn more about enabling a solid private cloud billing process, read the Cloud Foundation Building Block
> on [private cloud pay-per-use chargeback](https://cloudfoundation.meshcloud.io/maturity-model/cost-management/private-cloud-pay-per-use-chargeback.html).
