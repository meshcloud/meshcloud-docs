---
id: meshcloud.project-metering
title: Project Metering
---

meshStack provides central [multi-cloud billing](meshstack.billing.md). It can automatically collect usage information from all your cloud platforms and provides central access to cost and usage data.

Project owners can get a detailed overview of when and how long your resources were running and how much this costs.

## Project Payment Information

Project owners associate their projects with payment information. This is used for the chargeback process.

### Payment Methods

External systems which are responsible for financial information can provide payment methods that carry metadata information via the [meshStack API](./meshstack.api.md).
meshStack operators can also provide payment methods for a customer via [`Create/Edit Payment Methods`](meshcloud.payment-methods.md#creating-a-payment-method-via-the-meshpanel) button on the customer in the **Admin Area** > **Customers**.

[Metadata](./meshcloud.metadata-tags.md) on the payment method is helpful to e.g. provide contract or budget numbers to chargeback cloud costs.

Payment Methods can have an expiration date set. Expired payment methods can not be assigned to meshProjects anymore and are removed from meshProject when expired. (see [payment method handling on meshProjects](meshcloud.project.md#editing-payment-and-project-settings)).

Additionally an amount can be set on the payment method, which indicates how much money is available on that payment method (e.g. to represent a budget).

## Reviewing Metering Data

### Tenant Usage Reports

![Tenant Usage Reports](assets/tenant-usage-report-example.png)

A tenant usage report provides usage information of one tenant (project representation in a specific platform). This report shows for example all resources like VMs, Storage, Public IPs, etc.

Tenant Usage Reports can be accessed in the tenant control plane under **Financials** > **Usage Reports**.
meshStack generates a tenant usage report for every usage period (monthly).

> meshStack defines **usage period** as starting from the first day of a month to the last day of the month in UTC.

You also have access to a preview report of the current period (e.g. the current month), to always have full control of
your resources and their usage.

From a Tenant Usage Report you can also access a Detailed Report to see every single resource consumption.
That means you can e.g. see whether a resource was running for 3 hours, stopped for 5 hours and then started again for another 6 hours.

Partner accounts can access tenant usage reports for all their assigned meshCustomers in the Administration Area via **Platforms** > **Usage Reports**.

Note that unit costs for Azure and GCP services are not supported.
Therefore, the unit costs are not available in the Tenant Usage Reports for those platforms.

### Chargeback Statements

Each project in meshStack is associated with a Chargeback Account. Tenant Usage Reports are booked into these
Chargeback Accounts as soon as they are processed by meshStack. meshStack periodically generates chargeback account
statements, called chargeback statements. A chargeback statement includes booking entries on the chargeback account for
usage reports that were entered before the end of the chargeback period and have not been included in a previous
chargeback statement.

> meshStack defines the **chargeback period** as a monthly period with a configurable offset (e.g. 6 days)
> allowing cloud providers to finish processing of usage reports for the usage period.

As an analogy from banking, you can think of a chargeback account like a credit account and the chargeback statement like
a credit card statement you receive at the end of the month about all transactions charged to the card. Credit card
statements do as well show charges with a booking and valuta date.

> Note that chargeback statements list usage reports by their **entry date** when they were booked to the chargeback
> account. This date is typically after the **report date** (i.e. time when the report was generated) of the usage
> reports booked. It's therefore possible that the chargeback statement for the month of June includes usage reports
> for the month of May etc.

#### Tags and Payment Methods

Chargeback statements capture the billing information associated with the chargeback account at the end of the report period
of its line items. This implies that the payment method that is active on the project at the
end of the report period of a line item will be set for the according line item.
The same also applies to tags (i.e. meshProject and meshCustomer tags). For example, a June 2022 chargeback statement line item
will always have the tags and metadata set that were present at the end of June 30th.

Always using the project metadata and tags that were set at the end of the report period (usually end of a month) allows easy
handling of payment method expiration and usage of tags that were set in the according report period. If e.g. a
payment method expires on the 1st of January 2022 it shall be used for the December chargeback statement no matter when
the chargeback statement is generated.

> Controllers should consider this when defining an expiration date of a [payment method](meshcloud.payment-methods.md).
> For example, a payment method valid for the year of 2021 should expire on the 1st of January 2022, not on the 31st of December.

#### Chargeback Statement Previews

meshStack also generates and updates a preview of the next chargeback statement. This preview includes all tenant usage
reports, including tenant usage report previews, that meshStack expects to be finalized before the end of the chargeback
period. This preview is periodically updated and contains only reports available up until that point.

> Note that meshStack currently only generates a preview for the currently active chargeback period.
> A tenant usage report that will finalize in the next chargeback period will not be included in the current period's
> preview.

#### Viewing Chargeback Statements

A chart under **Financials** > **Chargeback Statements** in the project control plane shows the total amount charged as of the last chargeback statements to get a quick overview of your project cost.

Chargeback statements consist of **line items** showing the individual booking entries made into a chargeback account.
When booking a tenant usage report, meshStack splits up the report's `netAmount` by seller and product group into
individual entries. This split allows cloud foundation teams to process chargeback for different kinds of usage
like cloud provider cost vs. internal overhead fees.

Customer Admins also have access to an overview of the chargeback statements of all their projects in the customer control plane via  **Financials** > **Chargeback Statements**.
Also Partner accounts can access the chargeback statements for all their assigned meshCustomers in the Administration Area via **Projects** > **Chargeback Statements**.

#### Exporting Chargeback Statements

It is possible to do an export from these views by clicking on the "CSV Export" button.
This export will contain the line items (see above) of all the chargeback statements currently in the view.
The line item data is suitable for feeding into chargeback processing, e.g. importing it to an ERP System to transfer
budgets between cost centers.

Chargeback Statements also contain billing information per line item. Your Cloud Foundation team can [configure](meshstack.billing.md#chargeback)
which information meshStack should include as billing information in chargeback statements.

> Cloud Foundation teams typically configure billing information to payment method name, identifier, expiration date and amount as well as any customer tags, project tags and payment method tags.

Users can review this billing information in meshPanel when opening chargeback statement. CSV Exports of chargeback statements also include the configured billing information.

#### Retroactive Chargeback Statements
When no payment method is active on a meshProject, chargeback statements are not created at the end of a month. Only when an active payment method is applied at a later point in time does the chargeback statements generation resume. For missing months, where no payment method was applied the next chargeback statement with a valid payment method will contain the usage reports of the missing months.

