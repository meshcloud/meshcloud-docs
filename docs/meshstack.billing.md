---
id: meshstack.billing
title: Metering and Billing
---

Pay-per-use is a core principle of cloud computing. Thus, meshStack includes sophisticated metering & billing capabilities to help developers, platform operators and controllers monitor resource consumption for their multi-cloud setup managed by meshStack.

The figure below outlines the principal components of the multi-cloud metering process in meshStack:

```text
Cloud Platforms ⟶ Metering ⟶ Usage Reporting ⟶  Billing ⟶ Invoicing ⟶ Chargeback
Product Catalog ⭧         Public Cloud Reports ⭧
```

- **Cloud Platforms** produce metering events and records. For example, starting and stopping a virtual machine in OpenStack generates a corresponding stream of events.
- The **Product Catalog** defines the cloud resources and their usage components. For example, a virtual machine may be metered by the amount of RAM and CPU consumed.
- **Metering** is the process of collecting and processing the event stream produced by the *Cloud Platforms* in accordance with the *Product Catalog* to produce resource consumption data.
- **Usage Reporting** is the process of aggregating all resource consumption of a meshProject across all of its connected cloud tenants. This typically also involves creating periodic (e.g. monthly) usage reports for each project.
- **Public Cloud Reports** also integrate into the *Usage Reporting* process. Because public cloud providers define their own product catalogs and metering, their data is ingested unaltered into the usage reporting step.
- **Billing** is the process of applying pricing rules from the product catalog onto a *Usage Report* to produce a set of chargeable line items.
- **Invoicing** combines line items and project metadata like billing address and cost center to produce an invoice for a usage period.
- **Chargeback** is the process of collecting payments for invoices
