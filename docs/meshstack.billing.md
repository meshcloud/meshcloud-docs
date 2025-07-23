---
id: meshstack.billing
title: Cost Management
---

meshStack's cost management functionality enables developers to track resource usage, while platform teams can monitor overall costs and allocate them to specific teams. These cost management capabilities can be broken down into three key sections: metering, billing, and chargeback.


> Learn more about how your platform team can enable cloud cost management in
> the [Cloud Foundation Maturity Model](https://cloudfoundation.meshcloud.io/maturity-model/cost-management/)


## Metering

> Metering is the process of collecting and calculating cloud resource usage. Metering also involves pricing this resource usage to calculate cost.

meshStack collects all usage information from public cloud providers, each of which has its own metering processes. For private clouds like OpenStack, OpenShift, and Cloud Foundry, meshStack has its own metering system to for example accurately calculate how many RAM hours and vCPU hours a virtual machine consumes over a given period.

Cloud resources exhibit various traits. For instance, a virtual machine typically includes both RAM and vCPU. A crucial component of meshStack is the Product Catalog, which is a list of traits that are relevant for you and prices for them. With the Product Catalog, you can set not only usage prices but also additional prices to cover licensing costs and maintenance of a Platform. Please read more information about the Product Catalog [here](meshstack.billing-configuration.md#setting-internal-prices).


## Billing

> Billing is the process of attributing resource usage to cloud tenants and creating appropriate invoices.

meshStack is creating monthly [Tenant Usage Reports](meshcloud.cost-management.md) that aggregate cloud resource usage data for each tenant over a specific period. These reports not only summarize resource consumption but can also include additional pricing information, as mentioned earlier, along with discounts, such as volume discounts.

Furthermore, instead of providing a single, large invoice as cloud providers do, meshStack prepares invoices tailored to dedicated teams based on their usage, so that they will have a clear overview of cloud costs. This invoice is called a chargeback statement, which is also used to correctly allocate costs to teams. 


> To learn more about enabling a solid private cloud billing process, check [private cloud pay-per-use chargeback](https://cloudfoundation.meshcloud.io/maturity-model/cost-management/private-cloud-pay-per-use-chargeback.html) section in the Cloud Foundation Maturity Model

## Chargeback 

> Chargeback is the process of distributing cloud costs from a consolidated bill to the specific teams or departments that incurred those expenses. This ensures that each team is accurately charged for the resources they consumed, promoting cost accountability.

This chargeback statement is attached to each project in meshStack and each chargeback statement is composed of tenant usage reports. For example, if your project uses both AWS and GCP, you will have one chargeback that combines two tenant usage reports. If you would liket o learn more about chargeback, check [here](meshcloud.cost-management.md)
