---
id: meshstack.how-to.integrate-meshplatform-gcp-manually
title: How to manually integrate GCP as meshPlatform
---

> The recommended way to set up GCP as a meshPlatform is via the public terraform [GCP meshPlatform Module](https://github.com/meshcloud/terraform-gcp-meshplatform). The steps below are not needed if you decide to use it.

## Service Account Configuration

meshStack needs a well-defined set of permissions for its automation. meshStack is designed so that it **does not require
access to workload**. We highly recommend that permissions are configured according to the "least privilege" principle.

Operators need to define a [Custom IAM Role](https://cloud.google.com/iam/docs/understanding-custom-roles) called `meshfed-service` at the **Organization Level** with the following permissions

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

## Root Project Configuration

For some resources we need a “root” project for meshStack in GCP. This project is reserved for use by meshstack and operators. For this guide, we’ll call the root project `meshstack-root`.

### Enable APIs

Enable the following APIs on the `meshstack-root` project from the API Library

- [Admin SDK](https://console.cloud.google.com/apis/api/admin.googleapis.com/overview)
- [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/overview)
- [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com/overview)

### meshfed-service Service Account

Create a `meshfed-service` [Service Account](https://cloud.google.com/iam/docs/service-accounts) in the `meshstack-root` project.

- Enable the Service Account for “G Suite Domain-wide Delegation” and note the generated `Client Id`
- Generate and Download a [Service Account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

The Service Account will be identified by an email address like

```text
meshfed-service@meshstack-root.iam.gserviceaccount.com
```

#### Granting Resource Permissions

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

## Cloud Identity Configuration

### Authorizing the Service Account

In order to perform certain group related administrative tasks the previosly created service account needs an additional role from the Admin Console (G Suite). In order to add this role you need to get the `unique ID` of the Service Account first.

Please follow the official [Google guide](https://cloud.google.com/identity/docs/how-to/setup#auth-no-dwd) in order to:

1. Find the `roleID` of the `Group Administrator` role in your Admin SDK.
2. Use the [Role Assignments API](https://developers.google.com/admin-sdk/directory/v1/reference/roleAssignments/insert) and assign this role to the service account with help of its unique id. The HTTP POST payload looks like:

```json
{
  "assignedTo": "SERVICE_ACCOUNT_UNIQUE_ID",
  "roleID": "ROLE_ID",
  "scopeType": "CUSTOMER"
}
```

## Audit Logs for meshfed-service User

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
