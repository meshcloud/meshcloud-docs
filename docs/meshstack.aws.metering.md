---
id: meshstack.aws.metering
title: Metering
---

meshStack imports metering data from [AWS Cost and Usage Reports](https://aws.amazon.com/aws-cost-management/aws-cost-and-usage-reporting/)

An AWS Cost and Usage Report should be created as specified in the [documentation](https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html) with the following properties

* Daily time granularity
* gzip compression
* txt/csv file format
* Should include resource ids
* Versioning should be setup to overwrite existing report

The following parameters are required to configure meshStack to process the AWS Cost and Usage Reports

* AWS credentials that can access the S3 bucket where the reports are written
* The name of the S3 bucket where the report is written
* The region of the S3 bucket
* The name of the report
* The "Report path prefix" configured when creating the report

When processing the AWS Cost and Usage Report to generate the Usage Report in the meshPanel,

* Only the line items with [line item type](https://docs.aws.amazon.com/cur/latest/userguide/Lineitem-columns.html#l-L)
`DiscountedUsage`, `Fee`, `Usage` and `SavingsPlanCoveredUsage` are taken into the calculation.
In other words, `Credit`, `Refund`, `RIFee`, `Tax` `SavingsPlanUpfrontFee`, `SavingsPlanRecurringFee` and `SavingsPlanNegation` are excluded.
* Only the line items with [bill type](https://docs.aws.amazon.com/cur/latest/userguide/billing-columns.html#b-B)
`Anniversary` are taken into the calculation. In other words, line items with bill type `Purchase` and `Refund` are excluded.
* For each line item, we take the [effective cost](https://docs.aws.amazon.com/cur/latest/userguide/reservation-columns.html#r-E)
when available and [unblended cost](https://docs.aws.amazon.com/cur/latest/userguide/Lineitem-columns.html#l-U) otherwise
