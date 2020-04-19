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

#### Invoice

The invoice payment method simply results in an invoice, that is send to your billing address. No automation for the payment process is applied here.

#### Cost Center

When meshcloud is used inside a company, cloud resources may have to be billed to different cost centers of the company. You can configure a default cost center for your meshCustomer, which will initially be applied to your meshProjects. It can also be changed per meshProject.

#### Custom Payment / Limited Payment Methods

Operators can also provide custom payment methods that carry additional metadata information via the [meshStack API](./meshstack.api.md).

This is useful if your organization needs additional [metadata](./meshcloud.tag-schema.md) like e.g. contract or budget numbers to chargeback cloud costs.

## Reviewing Metering Data

### Tenant Usage Reports

A tenant usage report provides usage information of one tenant (project representation in a specific platform). E.g. all resources like VMs, Storage, Public IPs, etc are shown in this report.

Tenant Usage Reports can be accessed from the Project Tenant screen via the menu entry "Usage Reports". For every period (e.g. a month),
a tenant usage report is created. You also have access to the current period (e.g. the current month), to always have full control of
your resources and their usage.

From a Tenant Usage Report you can also access a Detailed Report to see every single usage the resources created. That means you can e.g. see whether a resource was running for 3 hours, stopped for 5 hours and then started again for another 6 hours.

Partner accounts can access tenant usage reports for all their assigned meshCustomers in the Administration Area via "Platforms" -> "Usage Reports".

### Chargeback Statements

Each project in meshStack is associated with a Chargeback Account. Tenant Usage Reports are booked into these
Chargeback Accounts as soon as they are processed by meshStack.

meshStack periodically generates account statements, called chargeback statements. These list all the charges incurred by
tenants for this project that were booked in the selected period.

> Note that chargeback statements aggregate usage reports by their **entry date** when they were charged to the chargeback account. This date is typically after the **report date** (i.e. time when the report was generated) of the usage reports booked. It's therefore possible that the chargeback statement for the month of June includes usage reports for the month of May etc.

A chart in the project dashboard shows the total amount charged as of the last chargeback statements to get a quick overview of your project cost.

Customer Admins also have access to an overview of the chargeback statements of all their projects in the Account Area via "Projects" -> "Chargeback Statements".
Also Partner accounts can access the chargeback statements for all their assigned meshCustomers in the Administration Area via "Projects" -> "Chargeback Statements".
It is possible to do an export from this view by clicking on the "CSV Export" button. This export will contain the line items of all the chargeback statements currently in the view.
The export can be configured so that each row contains any customer tags, project tags or payment settings.
