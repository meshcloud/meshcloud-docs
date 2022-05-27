---
id: meshcloud.project-metering
title: Project Metering
---

meshStack provides central [multi-cloud billing](meshstack.billing.md). It can automatically collect usage information from all your cloud platforms and provides central access to cost and usage data.

Project owners can get a detailed overview about when and how long your resources were running and how much this costs.

## Project Payment Information

Project owners associate their project with payment information. This is used for the chargeback process.

### Payment Methods

External systems which are responsible for financial information can provide payment methods that carry metadata information via the [meshStack API](./meshstack.api.md).
meshStack operators can also provide payment methods for a customer via [`Create/Edit Payment Methods`](meshcloud.payment-methods.md#creating-a-payment-method-via-the-meshpanel) button on the customer in the **Admin Area** > **Customers**.

[Metadata](./meshcloud.metadata-tags.md) on the payment method is helpful to e.g. provide contract or budget numbers to chargeback cloud costs.

Payment Methods can have an expiration date set. Expired payment methods can not be assigned to meshProjects anymore (see [payment method handling on meshProjects](meshcloud.project.md#editing-payment-and-project-settings)).

Additionally an amount can be set on the payment method, which indicates how much money is available on that payment method (e.g. to represent a budget).

## Reviewing Metering Data

### Tenant Usage Reports

![Tenant Usage Reports](assets/tenant-usage-report-example.png)

A tenant usage report provides usage information of one tenant (project representation in a specific platform). E.g. all resources like VMs, Storage, Public IPs, etc are shown in this report.

Tenant Usage Reports can be accessed in the tenant control plane under **Finacials** > **Usage Reports**. For every period (e.g. a month),
a tenant usage report is created. You also have access to the current period (e.g. the current month), to always have full control of
your resources and their usage.

From a Tenant Usage Report you can also access a Detailed Report to see every single usage the resources created. That means you can e.g. see whether a resource was running for 3 hours, stopped for 5 hours and then started again for another 6 hours.

Partner accounts can access tenant usage reports for all their assigned meshCustomers in the Administration Area via **Platforms** > **Usage Reports**.

Note that unit costs for Azure and GCP services are not supported.
Therefore, the unit costs are not available in the Tenant Usage Reports for those platforms.

### Chargeback Statements

Each project in meshStack is associated with a Chargeback Account. Tenant Usage Reports are booked into these
Chargeback Accounts as soon as they are processed by meshStack. meshStack periodically generates chargeback account statements, called chargeback statements.
A chargeback statement lists all tenant usage reports that were booked in the selected period.

As an anology from banking you can think of a 
chargeback account like a credit account and the chargeback statement like a credit card statement you receive at the
end of the month about all transactions charged to the card.

> Note that chargeback statements list usage reports by their **entry date** when they were booked to the chargeback account. This date is typically after the **report date** (i.e. time when the report was generated) of the usage reports booked. It's therefore possible that the chargeback statement for the month of June includes usage reports for the month of May etc.

#### Tags and Payment Methods

Chargeback statements capture the billing information associated with the chargeback account at the time
the chargeback statement is generated. This implies that e.g. the payment method that is active on the project at the
point in time when the chargeback statement is generated will be charged for all line items in the chargeback statement
The same also applies to tags (i.e. meshProject and meshCustomer tags).

Depending on meshStack's configuration, chargeback statements are generated e.g. on the 6th of a month. 
Customer admins should ensure that their project metadata (like payment method, tags) is up to date at that point
and their payment method is still active on that date.

> Controllers should consider this when defining an expiration date of a [payment method](meshcloud.payment-methods.md). E.g. a payment method valid for the year of 2021 should expire in Janaury 2022 *after* the end of the chargeback period.
 

#### Chargeback Statement Previews

meshStack also generates and updates a preview of the next chargeback statement. This preview includes all tenant usage 
reports, including tenant usage report previews, that meshStack expects to be finalized before the end of the chargeback period. This preview is periodically updated and contains only reports available up until that point.

> Note that meshStack currently only generates a preview for the currently active chargeback period. 
> A tenant usage report that will finalize in the next chargeback period will not be included in the current period's preview.

#### Viewing Chargeback Statements

A chart under **Financials** > **Chargeback Statements** in the project control plane shows the total amount charged as of the last chargeback statements to get a quick overview of your project cost.

Customer Admins also have access to an overview of the chargeback statements of all their projects in the customer control plane via  **Financials** > **Chargeback Statements**.
Also Partner accounts can access the chargeback statements for all their assigned meshCustomers in the Administration Area via **Projects** > **Chargeback Statements**.
It is possible to do an export from these views by clicking on the "CSV Export" button. This export will contain the line items of all the chargeback statements currently in the view.
Chargeback Statements also contain billing information per line item. It can be [configured](meshstack.billing.md#chargeback) per meshImplementation which information shall be shown there. This info will occur in the UI when looking at the line items of a chargeback statements.
It will also be part of the CSV export. General payment information like payment name, identifier, expiration date and amount as well as any customer tags, project tags and payment tags can be [configured](meshstack.billing.md#chargeback) as a billing-related property.
