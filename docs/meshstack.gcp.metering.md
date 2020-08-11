---
id: meshstack.gcp.metering
title: Metering
---

meshStack imports metering data from [GCP Cloud Billing data BigQuery Export](https://cloud.google.com/billing/docs/how-to/export-data-bigquery)

Once billing export has been setup as explained in the GCP documentation, meshStack should be configured with the credentials of a GCP service account that has permission to access the exported billing dataset.
This service account should also have the permission to run jobs. From the [predefined roles](https://cloud.google.com/bigquery/docs/access-control) these permissions are available in
`roles/bigquery.jobUser` and `roles/bigquery.dataViewer`. The credentials should be exported in JSON format as mentioned in the [GCP Documentation](https://cloud.google.com/docs/authentication/production).
This JSON content should be base 64 encoded in the meshstack configuration.

meshStack requires the full path to the BigQuery table where the billing data is stored, so that it can be queried to fetch the billing data.

The full configuration format for GCP metering is as follows.

```dhall
{ platform : Text
, bigqueryTable : Text
, credentialsB64 : Secret
, additionalFilter : Optional Text
}
```

The configuration parameter `additionalFilter` is appended to the BigQuery query and can be used to further filter the data that is collected.
This can be used if you want to collect billing information only for a specific organization or folder.

The data is collected incrementally from the exported billing data by filtering by the `export_time` attribute.
Any entries with `cost_type` `tax` are ignored in the metering process.
The monthly totals are calculated by aggregating by the `invoice.month` attribute.
