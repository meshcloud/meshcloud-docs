---
id: meshstack.gcp.metering
title: Metering
---

meshStack imports metering data from [GCP Cloud Billing data BigQuery Export](https://cloud.google.com/billing/docs/how-to/export-data-bigquery)

Once billing export has been setup as explained in the GCP documentation, meshStack should be configured with the credentials of a GCP service user that has permission to access the exported billing dataset.
This service user should also have the permission to run jobs. From the [predefined roles](https://cloud.google.com/bigquery/docs/access-control) these permissions are available in
`roles/bigquery.jobUser` and `roles/bigquery.dataViewer`. The credentials should be exported in JSON format as mentioned in the [GCP Documentation](https://cloud.google.com/docs/authentication/production).

Additionally, meshStack requires the full path to the BigQuery table where the billing data is stored, so that it can be queried to fetch the billing data.

