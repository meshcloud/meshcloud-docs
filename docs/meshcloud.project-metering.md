---
id: meshcloud.project-metering
title: Project Metering
---

meshStack provides central [multi-cloud billing](meshstack.billing.md). It can automatically collect usage information from all your cloud platforms and provides central access to cost and usage data.

Project owners can get a detailed overview about when and how long your resources were running and how much this costs.

## Project Payment Information

Project owners associate their project with payment information. This is used for the chargeback process.

### Company & Billing Addresses

You can configure company addresses for your meshCustomer as contact addresses. If this address shall also be used for billing, you are done when having configured a Customer Address.

You can also define additional Billing Addresses, that can be used for your meshProjects. You can select from these configured addresses per meshProject.

### Payment Methods

External systems which are responsible for financial information can provide payment methods that carry metadata information via the [meshStack API](./meshstack.api.md).
meshStack operators can also provide payment methods for a customer via "Admin Area -> Customers -> Payment Methods".

[Metadata](./meshcloud.metadata-tags.md) on the payment method is helpful to e.g. provide contract or budget numbers to chargeback cloud costs.

Payment Methods can have an expiration date set. Expired payment methods can not be assigned to meshProjects anymore (see [payment method handling on meshProjects](meshcloud.project.md#editing-payment-and-project-settings)).

Additionally an amount can be set on the payment method, which indicates how much money is available on that payment method (e.g. to represent a budget).

## Reviewing Metering Data

### Tenant Usage Reports

A tenant usage report provides usage information of one tenant (project representation in a specific platform). E.g. all resources like VMs, Storage, Public IPs, etc are shown in this report.

Tenant Usage Reports can be accessed from the Project Tenant screen via the menu entry "Usage Reports". For every period (e.g. a month),
a tenant usage report is created. You also have access to the current period (e.g. the current month), to always have full control of
your resources and their usage.

From a Tenant Usage Report you can also access a Detailed Report to see every single usage the resources created. That means you can e.g. see whether a resource was running for 3 hours, stopped for 5 hours and then started again for another 6 hours.

Partner accounts can access tenant usage reports for all their assigned meshCustomers in the Administration Area via "Platforms" -> "Usage Reports".

Note that unit costs for Azure and GCP services are not supported.
Therefore, the unit costs are not available in the Tenant Usage Reports for those platforms.

### Chargeback Statements

Each project in meshStack is associated with a Chargeback Account. Tenant Usage Reports are booked into these
Chargeback Accounts as soon as they are processed by meshStack.

meshStack periodically (on the 6th of a month at midnight) generates account statements, called chargeback statements. These list all the charges incurred by
tenants for this project that were booked in the selected period.

> Note that chargeback statements aggregate usage reports by their **entry date** when they were charged to the chargeback account. This date is typically after the **report date** (i.e. time when the report was generated) of the usage reports booked. It's therefore possible that the chargeback statement for the month of June includes usage reports for the month of May etc.

A chart in the project dashboard shows the total amount charged as of the last chargeback statements to get a quick overview of your project cost.

Customer Admins also have access to an overview of the chargeback statements of all their projects in the Account Area via "Projects" -> "Chargeback Statements".
Also Partner accounts can access the chargeback statements for all their assigned meshCustomers in the Administration Area via "Projects" -> "Chargeback Statements".
It is possible to do an export from these views by clicking on the "CSV Export" button. This export will contain the line items of all the chargeback statements currently in the view.
Chargeback Statements also contain billing information per line item. It can be [configured](meshstack.billing.md#chargeback) per meshImplementation which information shall be shown there. This info will occur in the UI when looking at the line items of a chargeback statements.
It will also be part of the CSV export. General payment information like payment name, identifier, expiration date and amount as well as any customer tags, project tags and payment tags can be [configured](meshstack.billing.md#chargeback) as a billing-related property.

> Note that this billing information is applied when the chargeback statement is generated. This implies that e.g. the payment method that is active on the project at the
point in time when the chargeback statement is generated will be used for all line items in the chargeback statement. This also applies to tags. As chargeback statements are
always generated on the 6th of a month, it must be ensured that metadata (like payment method) that shall be used for a chargeback statement is still active until at least the
6th day of the month after the reporting period. This must be considered when defining an expiration date of a [payment method](meshcloud.payment-methods.md) (it should always be after the 6th of a month).
