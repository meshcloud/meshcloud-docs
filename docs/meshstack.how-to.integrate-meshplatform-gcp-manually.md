---
id: meshstack.how-to.integrate-meshplatform-gcp-manually
title: How to manually integrate GCP as meshPlatform
---

> The recommended way to set up GCP as a meshPlatform is via the public terraform [GCP meshPlatform Module](https://github.com/meshcloud/terraform-gcp-meshplatform). The steps below are not needed if you decide to use it.

## Set up the Service Account for Replication

meshStack needs a well-defined set of permissions for its automation. meshStack is designed so that it **does not require
access to workload**. We highly recommend that permissions are configured according to the "least privilege" principle.

Platform Operators need to define a [Custom IAM Role](https://cloud.google.com/iam/docs/understanding-custom-roles) called `meshfed-service` at the **Organization Level** with the following permissions

```text
resourcemanager.folders.get
resourcemanager.folders.list
resourcemanager.organizations.get
resourcemanager.projects.create
resourcemanager.projects.get
resourcemanager.projects.getIamPolicy
resourcemanager.projects.list
resourcemanager.projects.move
resourcemanager.projects.setIamPolicy
resourcemanager.projects.update
resourcemanager.projects.createBillingAssignment
resourcemanager.projects.deleteBillingAssignment
billing.resourceAssociations.create
serviceusage.services.enable
serviceusage.services.get
deploymentmanager.deployments.delete
deploymentmanager.deployments.create
deploymentmanager.deployments.update
deploymentmanager.deployments.get
```

### Configure the Root Project

meshStack requires a project in GCP for some of the resources it uses. It is reserved for use by meshstack and Platform Operators. For this guide, we’ll call the project `meshstack-root`.

### Enable APIs

Enable the following APIs on the `meshstack-root` project from the API Library

- [Admin SDK](https://console.cloud.google.com/apis/api/admin.googleapis.com/overview)
- [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/overview)
- [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com/overview)

### Create meshfed-service Service Account

Create a `meshfed-service` [Service Account](https://cloud.google.com/iam/docs/service-accounts) in the `meshstack-root` project.

- Enable the Service Account for “G Suite Domain-wide Delegation” and note the generated `Client Id`
- Generate and Download a [Service Account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

The Service Account will be identified by an email address like

```text
meshfed-service@meshstack-root.iam.gserviceaccount.com
```

#### Grant Resource Permissions

The Service Account will be used by meshStack to perform project replication. Operators thus need to grant it the permissions of the
`meshfed-service` IAM role on those folders of the [GCP resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy)
that make up the [Landing Zones](meshstack.gcp.landing-zones.md) for client projects.

> It's a best practice to segregate "user" and "infrastructure" projects in GCP using the resource hierarchy.
> By setting granular permissions (instead of organization-wide permissions) this can limit the access of meshStack's replicator
> to only the parts of the resource hierarchy that it needs to actively manage (principle of least privilege).

#### Grant Billing Account Permissions to the Service Account

In order to associate created projects with a Billing Account, the replicator needs to be granted the
`billing.resourceAssociations.create` permission on the Billing Account. This is best achieved by assigning the
`meshfed-service` IAM Role to the `meshfed-service` Service Account on the Billing Account in [the Billing Account's permissions](https://cloud.google.com/billing/docs/how-to/billing-access#update-cloud-billing-permissions).

#### Optional: Billing Account owned by a different organization

In order to use a billing account that is owned by a different organization the permissons for `meshfed-service` user need to be adjusted.

Platform Operators create a custom role `meshfed-billing-creator` in the organization that owns the target billing account with the following permisson

```text
billing.resourceAssociations.create
```

The `meshfed-service` user needs to be granted the `meshfed-billing-creator` role in the organization that owns the target billing account.

Following the principle of least privilege, operators should remove the `billing.resourceAssociations.create` permisson from the custom role `meshfed-service` created in [meshfed-service IAM Role](#set-up-the-service-account-for-replication).

## Set up Cloud Identity

### Authorize the Service Account

In order to perform certain group related administrative tasks the previously created `meshfed-service` service account needs the "Groups Admin" role from the Admin Console (G Suite).

To authorize the Service Account **via the Google Admin Console** navigate to `@Account` in the sidebar and then `Admin Roles -> Groups Admin` and click `Assign Service Accounts`. In the prompt that appears, enter the service account email, which looks like `user@project.iam.gserviceaccount.com`.

You can alternatively authorize the Service Account **via the Cloud Identity Groups API**. Please find the instructions in for this in the official [Google guide](https://cloud.google.com/identity/docs/how-to/setup#auth-no-dwd).

## Set up the Service Account for Metering

meshStack needs a separate service account to provide metering functionality. Create a new service account `kraken-service` and
assign it the following [predefined roles](https://cloud.google.com/bigquery/docs/access-control):

```text
roles/bigquery.jobUser (on the project of the ServiceAccount)
roles/bigquery.dataViewer (on the project that holds the bigquery billing/carbon export dataset)
```

To enable meshStack to periodically collect active projects, create an IAM role with the following permissions and assign it to the service account.

```text
resourcemanager.folders.get
resourcemanager.folders.list
resourcemanager.projects.get
resourcemanager.projects.list
```

### Set up GCP Billing data export

Complete the GCP instructions to set up [Cloud Billing data export to BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery#setup).
We recommend using the "standard usage cost data" export with meshStack.

Once billing export has been setup as explained in the GCP documentation linked above, set up the `kraken-service` service account with
access to the exported billing dataset. You can set up this permission either on the project containing the dataset
or directly on the dataset itself.

```text
roles/bigquery.dataViewer
```

### Optional: Provide a custom BigQuery table

Beyond the default BigQuery Billing Export, meshStack can also support custom BigQuery tables. You might want to apply
some custom transformations or logic on the data. As long as the view or table is given in the same format as the
default BigQuery Billing Export, meshStack can handle and process the data.

Below, the columns are listed that are required by meshStack, and in which format. Make sure that the data types are
the same as the default export.

- invoice.month
- project.id
- service.id
- service.description
- sku.id
- sku.description
- currency
- usage.pricing_unit
- cost
- credits.amount
- usage.amount_in_pricing_units
- cost_type
- Partition Time*

*Since BigQuery doesn't allow column names that start with an underscore character, you have to map the `_PARTITIONTIME`
column to a different name (see example query [below](#example-multiple-billing-accounts-for-the-same-gcp-organization)). This column name has to be configured in the platform configuration
under 'Partition Time Column'.

Make sure that the `kraken-service` service account has permission on the table or view as described above.
Then, enter the BigQuery reference in the GCP meshPlatform configuration in meshStack, which you can find under
'Metering Configuration' -> 'BigQuery Table'.

#### Example: multiple billing accounts for the same GCP organization

There can be situations where you want the projects inside a single GCP meshPlatform to be associated with multiple
billing accounts. One such example is when you have one billing account which has
[Spend-based committed use discounts](https://cloud.google.com/docs/cuds-spend-based) applied and another billing account
which contains free credit applied. To ensure that meshStack collects data from both the accounts, you can to create
a view in BigQuery which is a union of the two billing data exports from the two billing accounts. Such a union can be
created with a query which looks similar to the following.

```sql
(SELECT _PARTITIONTIME as PARTITIONTIME, billing_account_id,service, sku, STRUCT(project.id as id, project.ancestry_numbers as ancestry_numbers) as project, labels, system_labels,
        location, cost, currency, usage, credits, invoice, cost_type, adjustment_info
        from `project-name-root.billing_export.gcp_billing_export_general`)
UNION ALL
(SELECT  _PARTITIONTIME as PARTITIONTIME,billing_account_id,service, sku, STRUCT(project.id as id, project.ancestry_numbers as ancestry_numbers) as project, labels, system_labels,
        location, cost, currency, usage, credits, invoice, cost_type, adjustment_info
        from `project-name.billing_export.gcp_billing_export_credit`)
```

Configure this view as mentioned in the section above and meshStack will start using this data for cost collection.

### Optional: Filter billable projects from the export

The GCP platform configuration offers an "additional filter" setting. meshStack will include configured filters in the
`WHERE` clause of its query to read billing data from the export table. This enables scenarios like excluding projects
under a certain part of the organizational hiearchy from meshStack.

The following example excludes all projects nested underneath folder `123456789` in your resource hierarchy.

```sql
AND "123456789" IN UNNEST(SPLIT(project.ancestry_number, "/"))
```

### Optional: Enable GCP Cloud Carbon Footprint Export

meshStack metering supports general environmental reports based on GCP Cloud Carbon Footprint data.
To enable this feature,set up a big query data set containing the carbon footprint export data, see
[Export your carbon footprint](https://cloud.google.com/carbon-footprint/docs/export#bigquery) on the GCP documentation.

Then enable the `kraken-service` service account to read this dataset.

```text
roles/bigquery.dataViewer
```

Finally configure the table id containing the exported carbon data in the meshPlatform configuration.

> Setting up GCP Big Query Transfer configuration will execute the transfer job on behalf of the user setting up
> the transfer config. The user must therefore grant permission to the big query service to access their account.
> This is a [limitation](https://cloud.google.com/bigquery/docs/use-service-accounts) of the big query data transfer service authorization model.

## Optional: Enable Audit Logs for meshfed-service User

The actions of the `meshfed-service` User can be monitored via [Audit Logs](https://cloud.google.com/logging/docs/audit/). This allows an in-depth view meshStack activities for GCP project at any moment.

### Enable Audit Logs

> Enabling Audit Logs may incur charges.

meshcloud recommends to enable Audit Logs on the organizational level for monitoring `meshfed-service` User. This is achivied by following these steps:

1. Navigate to the organizational level in [GCP Cloud Console](https://console.cloud.google.com/)
2. Navigate to [IAM & Admin --> Audit logs](https://console.cloud.google.com/iam-admin/audit)
3. Filter the table for `Cloud Resource Manager API` and select the resulting entry
4. Enable all log types

You may want to check the [official Google instructions](https://cloud.google.com/logging/docs/audit/configure-data-access#config-console-enable) on enabling Auit Logs for further information.

The below screen shot show how to set up the Audit Logs for the organization `dev.meshcloud.io`

![GCP Audit Logs](assets/gcp-enable-audit-logs.png)

### Query Audit Logs in Google Cloud Console

Please consult [Google docs](https://cloud.google.com/logging/docs/audit#viewing_audit_logs) for options to querying Audit Logs.

