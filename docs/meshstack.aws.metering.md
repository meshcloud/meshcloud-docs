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
