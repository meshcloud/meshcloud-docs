---
id: meshstack.gcp.index
title: Integration
---

meshcloud can automatically provision GCP Projects as Tenants for [meshProjects](./meshcloud.project.md) and configure them according to your organiziations policies using [Landing Zones](./meshcloud.landing-zones.md).

## Integration Overview

To enable integration with GCP, operators need to deploy and configure the meshStack GCP Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.GCP`. This makes GCP available to meshProjects like any other cloud platform in meshStack.

Google Cloud Platform relies on Google Cloud Identity (GCI) for authentication and authorization. meshStack can seamlessly integrate with GCI and various hybrid identity setups.
Organizations already using Google Cloud Directory Sync or G-Suite can use meshStack with an [externally provisioned identities](./meshstack.identity-federation.md) configuration.

meshcloud helps organizations implement Google Cloud Platform in line with [Governance best-practices](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations) by integrating with the GCP [Organization Resource Hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) and [Organization Policy Service](https://cloud.google.com/resource-manager/docs/organization-policy/overview) using [Landing Zones](./meshstack.gcp.landing-zones.md)

In order to plan and execute a successful integration of GCP using meshcloud, organizations need to consider the following parts described in the sections below.

> As part of an integration project meshcloud typically delivers a configuration tailored to your organization's specific requirements using infrastructure as code (IaC) tools. The descriptions below serve as a general reference.

## Cloud Identity Setup

Cloud Identity "Free" is sufficient for automated GCP IAM management through meshStack. meshStack does not require Cloud Identity Premium nor G-Suite features.

We recommend using [externally provisioned identities](./meshstack.identity-federation.md) with GCP.

## Organization Setup

Operators need to setup a GCP Organization to be used by meshStack. Please review the official GCP documentation on [creating and managing organizations](https://cloud.google.com/resource-manager/docs/creating-managing-organization).

### meshfed-service IAM Role

meshStack needs a well-defined set of permissions for it's automation. meshStack is designed so that it **does not require
access to workload**. We highly recommend that permissions are configured according to the principle of least privilege.

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

- Enable the Service Account for “G Suite Domain-wide Delegation” and notate the generated `Client Id`
- Generate and Download a [Service Account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

The Service Account will be identified by an email address like

```text
meshfed-service@meshstack-root.iam.gService Account.com
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
`billing.resourceAssociations.create` permission "on the Billing Account. This is best achieved by assigning the
`meshfed-service` IAM Role to the `meshfed-service` Service Account on the Billing Account in [the Billing Account's permissions](https://cloud.google.com/billing/docs/how-to/billing-access#update-cloud-billing-permissions).

## Cloud Identity Configuration

### meshfed-service User

The Service Account created above needs to impersonate a technical user to perform [delegated operations using the Admin SDK](https://developers.google.com/admin-sdk/directory/v1/guides/delegation).
Depending on your organization's setup of Google Cloud Identity, provisioning a technical user in the cloud directory
may require one of the following two alternatives.

1. Provisioning the user as a "cloud only" Account in the [Google Admin Console](https://admin.google.com/).
2. Provisioning the user in an on-premises directory synced with the cloud directory

> In any case, you will have to log in with the user once to accept Google's Terms of Service. If you provision the user
> as a "cloud only" account but have federation enabled on your cloud directory, temporarily making the technical user
> a ["Super Admin" disables SSO](https://support.google.com/a/answer/6341409?hl=en) and enables cloud only login.


We recommend calling this user `meshfed-service`. You may also want to consider provisioning it on a domain reserved for technical
user accounts. The user will be identified by an email like:

```text
meshfed-service@dev.meshcloud.io
```

You can reset the password of this user after completing the setup instructions. This helps ensure that only the
 `meshfed-service` Service Account is able to impersonate the technical user account.

#### Assign Admin Roles

Add the User to the following [admin roles](https://support.google.com/cloudidentity/answer/2405986?hl=en)

- `User Management Admin`
- `Groups Admin`

#### Accept Google ToS

The technical user needs to accept Google’s ToS after signing in as `meshfed-service@dev.meshcloud.io`.

Open a private browser session and

- sign in to the [admin console](https://admin.google.com/). Accept any ToS presented.
- sign in to the [Google Cloud Console](https://console.cloud.google.com/). Accept the GCP ToS.

### Enable Automated OAuth Consent

Enable Automated Consent in the G Admin Console

- Go to [Manage OAuth Clients](https://support.google.com/a/answer/162106?hl=en)
- Add a new Authorized client with these details
  - Client Name = `Client Id` of `meshfed-service` Service Account from Google Cloud Console (displayed under “Domain-wide Delegation” on the Service Account Details Page )
  - Scopes:

      ```text
      https://www.googleapis.com/auth/admin.directory.user, https://www.googleapis.com/auth/cloud-platform, https://www.googleapis.com/auth/admin.directory.group
      ```

## Configuration Reference

This section describes the configuration of a GCP Platform Instance in the meshStack [configuration model](./meshstack.configuration.md)
at `mesh.platforms`.

For easier reference the following sections break down the configuration model in multiple parts. The union of these
defines the full configuration model.

<!--snippet:mesh.platforms.gcp#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```haskell
let GcpPlatform =
        GcpPlatformCoreConfiguration
      ⩓ GcpPlatformCredentialConfiguration
      ⩓ GcpPlatformRoleMappingConfiguration
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Core Configuration

<!--snippet:mesh.platforms.gcp.core#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```haskell
let GcpPlatformCoreConfiguration =
    {-
      platform:
        The meshPlatform identifier

      domain:
        The domain used for cloud identity directory-groups created and managed by meshStack. meshStack maintains separate
        groups for each meshProject role on each managed GCP project.

      customerId:
        A Google Customer Id. You can find this id via google cloud shell https://cloud.google.com/resource-manager/docs/organization-policy/restricting-domains#gcloud_2
        Or alternatively following the instructions at https://support.google.com/a/answer/9039510?hl=en

      billingAccountId:
        The id of the billing account to associate with all GCP projects managed by meshStack

      projectIdPattern:
        A String.format format string receiving the following arguments:
          1. customerIdentifier
          2. projectIdentifier
          3. a random alphanumeric string suitable as a suffix
        The resulting string must not exceed a total length of 30 characters. Only alphanumeric + hyphen are allowed.
        We recommend that configuration include at least 3 characters of the random parameter to reduce the chance of
        naming collisions.
    -}
      { platform : Text
      , domain : Text
      , customerId : Text
      , billingAccountId : Text
      , projectIdPattern : Text
      }
```
<!--Example-->
```haskell
let example
    : GcpPlatformCoreConfiguration
    = { platform = "gcp.mylocation"
      , domain = "myorg.example.com"
      , customerId = " Cxxxx123"
      , billingAccountId = "123456-1234ABCD-1234FF"
      , projectIdPattern = "%.15s-%.10s-%.3s"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### Multiple Billing Accounts

In order to maintain symmetry to other public cloud platforms, meshStack consolidates billing of all GCP projects managed
under the same GCP Platform Instance to a single Google Cloud Billing Account. The billing account id is thus configured
on the platform level. To use multiple billing accounts consider configuring multiple GCP meshPlatforms in meshStack.


#### Billing Account owned by a different organization

In order to use a billing account that is owned by a different organization the permissons for `meshfed-service` user need to be adjusted.

Operators create a custom role `meshfed-billing-creator` in the organization that owns the target billing account with the following permisson

```text
billing.resourceAssociations.create
```

The `meshfed-service` user needs to be granted the `meshfed-billing-creator` role in the organization that owns the target billing account.

Following the principle of least privilege, operators should remove the `billing.resourceAssociations.create` permisson from the custom role `meshfed-service` created in [meshfed-service IAM Role](#meshfed-service-iam-role).

### Credentials

Configure the [meshfed-service Service Account](#meshfed-service-Service Account) and [meshfed-service Service User](#meshfed-service-user)
using the following options.

<!--snippet:mesh.platforms.gcp.credentials#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```haskell
let GcpPlatformCredentialConfiguration =
    {-
      impersonatedServiceUser:
        The username of the service user to impersonate in Google Cloud Identity Directory. The replicator uses
        this service user to automate directory operations (Google Admin SDK).

      serviceAccountCredentialsB64:
        base64 encoded credentials.json file for a GCP ServiceAccount. The replicator uses this Service Account
        to automate GCP API operations (IAM, ResourceManager etc.).
    -}
      { impersonatedServiceUser : Text
      , serviceAccountCredentialsB64 : Secret
      }
```
<!--Example-->
```haskell
let example
    : GcpPlatformCredentialConfiguration
    = { impersonatedServiceUser = "meshfed-service@myorg.example.com"
      , serviceAccountCredentialsB64 = Secret.Native "b123"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### GCP Role Mapping

The [project roles](meshcloud.project.md#project-roles) are mapped to user roles in GCP.
This mapping is fully customizable and can use custom as well as built-in roles.

Operators can also override these role mappings per [Landing Zone](meshstack.gcp.landing-zones.md). This also offers
more granular control over possible role mappings. Any role mappings
defined in the Landing Zone take precedence over the role mappings defined on the platform level.

<!--snippet:mesh.platforms.gcp.rolemappings#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```haskell
let GcpPlatformRoleMappingConfiguration =
    {-
      roleMappings:
        A list of mappingfgs from meshProjecRole identifiers to GCP role ids (e.g. roles/editor).
        The replicator will use these
    -}
      { roleMappings : List { mapKey : Text, mapValue : Text } }
```
<!--Example-->
```haskell
let example
    : GcpPlatformRoleMappingConfiguration
    = { roleMappings =
        [ { mapKey = "admin", mapValue = "roles/editor" }
        , { mapKey = "user"
          , mapValue = "organizations/123456/roles/custom-role"
          }
        ]
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

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
