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

**Note**: If an S3 bucket is not already set up, it should be created as specified in [AWS documentation](https://docs.aws.amazon.com/cur/latest/userguide/cur-s3.html)

The following parameters are required to configure meshStack to process the AWS Cost and Usage Reports [[More Details](#configuration-reference)]

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

## IAM User Configuration

### Policies

In order for meshStack to process AWS Cost and Usage Reports, following policies are required:

1. **Bucket Access Policy**: This policy allows the Metering IAM user to fetch AWS cost and usage reports
2. **Organization Access Policy**: This policy allows the Metering IAM user to list all accounts in the organization
3. **Assume Role Policy**: This policy allows Metering IAM user to assume the IAM Role `MeteringRole`

<!--DOCUSAURUS_CODE_TABS-->
<!--Bucket Access Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::my-cur-bucket-name",
                "arn:aws:s3:::my-cur-bucket-name/*"
            ]
        }
    ]
}
```
<!--Organization Access Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "organizations:ListAccounts",
            "Resource": "*"
        }
    ]
}
```
<!--Assume Role Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::123456789123:role/MeteringRole"
        }
    ]
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Role

The 3 policies in the [previous section](#policies) should be attached to this role.

In order for the Metering IAM user to assume this role, following trust policy is required:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789123:user/Metering"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

## Configuration Reference

This section describes the configuration of a AWS Platform Instance in the meshStack [configuration model](./meshstack.configuration.md)
at `mesh.platforms` for AWS metering.

<!--snippet:mesh.platforms.aws.kraken#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AwsPlatformKrakenConfiguration =
      { platform :
          {- The combination of meshPlatform and meshLocation identifiers, i.e. <platform-id>.<location-id> -}
          Text
      , region :
          {- The region of the IAM user -}
          Text
      , meshfed-service-user :
          {-
              Metering IAM user credentials
                  access-key: "<AWS_ACCESS_KEY>"
                  secret-key: "<AWS_SECRET_KEY>"
          -}
          { access-key : Secret, secret-key : Secret }
      , cost-and-usage-report :
          {-
              Parameters required to process AWS cost and usage reports
                  name: The name of the report
                  bucket-name: The name of the S3 bucket where the report is written
                  bucket-region: The region of the S3 bucket
                  report-key-prefix: The report path prefix.
                                     Generated reports will be located at <bucket-name>/<report-key-prefix>
          -}
          { name : Text
          , bucket-name : Text
          , bucket-region : Text
          , report-key-prefix : Text
          }
      , organization-root-account-role :
          {- The role assigned to the metering IAM user -}
          Text
      , organization-root-account-external-id :
          {- The external ID passed to "sts:AssumeRole" when used in privileged context -}
          Optional Text
      , cost-item-write-batch-size :
          {- Cost items written per batch -}
          Natural
      , max-report-file-processing-retries :
          {- The maximum number of attempts to process or download a single file in a report -}
          Natural
      , report-file-process-retry-delay-millis :
          {- Time in milliseconds before an operation (report file processing) is retried -}
          Natural
      , max-bulk-insert-retries :
          {- The maximum number of attempts to process a batch of cost items to the database -}
          Natural
      , bulk-insert-retry-delay-millis :
          {- Time in milliseconds before an operation (cost item batch processing) is retried -}
          Natural
      , cost-item-read-page-size :
          {-
              Cost items to read per query when generating tenant usage reports.
              This setting is useful to prevent read timeout errors in the case of accounts with
              a large number of cost items.
          -}
          Natural
      }
```
<!--Example-->
```dhall
let example
    : AwsPlatformKrakenConfiguration
    = { platform = "aws.aws-location"
      , region = "eu-central-1"
      , meshfed-service-user =
        { access-key = Secret.Native "AWS_ACCESS_KEY_KRAKEN"
        , secret-key = Secret.Native "AWS_SECRET_KEY_KRAKEN"
        }
      , cost-and-usage-report =
        { name = "my-cur-name"
        , bucket-name = "my-cur-bucket-name"
        , bucket-region = "eu-central-1"
        , report-key-prefix = "/my-cur-prefix"
        }
      , organization-root-account-role =
          "arn:aws:iam::123456789123:role/MeteringRole"
      , organization-root-account-external-id = Some
          "abcd1234-12ab-12ab-12ab-abcdef123456"
      , cost-item-write-batch-size = 10000
      , max-report-file-processing-retries = 5
      , report-file-process-retry-delay-millis = 120000
      , max-bulk-insert-retries = 5
      , bulk-insert-retry-delay-millis = 5000
      , cost-item-read-page-size = 2000
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->