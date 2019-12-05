---
id: meshstack.gcp.index
title: Integration
---

meshcloud can automatically provision GCP Projects as Tenants for [meshProjects](./meshcloud.project.md) and configure them according to your organiziations policies using [Landing Zones](./meshcloud.landing-zones.md).

## Integration Overview

To enable integration with GCP, operators need to deploy and configure the meshStack GCP Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.GCP`. This makes Azure available to meshProjects like any other cloud platform in meshStack.

Google Cloud Platform relies on Google Cloud Identity (GCI) for authentication and authorization. meshStack can seamlessly integrate with GCI and various hybrid identity setups. For organizations that do not already use google identity services, meshStack supports fully federated
[meshStack provisioned identities](./meshstack.identity-federation.md). Organizations already using Google Cloud Directory Sync or G-Suite can use meshStack with an [externally provisioned identities](./meshstack.identity-federation.md) configuration.

meshcloud helps organizations implement Google Cloud Platform in line with [Governance best-practices](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations) by integrating with the GCP [Organization Resource Hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy) and [Organization Policy Service](https://cloud.google.com/resource-manager/docs/organization-policy/overview) using [Landing Zones](./meshstack.gcp.landing-zones.md)

In order to plan and execute a successful integration of GCP using meshcloud, organizations need to consider the following parts described in the sections below.

> As part of an integration project meshcloud typically delivers a configuration tailored to your organization's specific requirements using infrastructure as code (IaC) tools. The descriptions below serve as a general reference.

## Cloud Identity Setup

meshStack does not require Cloud Identity Premium nor G-Suite. Cloud Identity "Free" is sufficient for automated GCP IAM management through meshStack.

### meshStack-provisioned Identities

When using meshStack-provisioned identites operators need to setup SSO beftween the Cloud Identity directory and meshIdB.
This can be achieved by following the official [instructions](https://cloud.google.com/blog/products/identity-security/using-your-existing-identity-management-system-with-google-cloud-platform).

## Organization Setup

Operators need to setup a GCP Organization to be used by meshStack. Please review the official GCP documentation on [creating and managing organizations](https://cloud.google.com/resource-manager/docs/creating-managing-organization).

### meshfed-service IAM Role

meshStack needs a well-defined set of permissions for it's automation. meshStack is designed so that it **does not require
access to workload**. We highly recommend that permissions are configured according to the principle of least privilege.

Operators need to define a Custom Role called `meshfed-service` at the **Organization Level** with the following permissions

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
```

## Root Project Configuration

For some resources we need a “root” project for meshStack in GCP. This project is reserved for use by meshstack and operators. For this guide, we’ll call the root project `meshstack-root`.


### Enable APIs

Enable the following APIs on the `meshstack-root` project from the API Library

- [Admin SDK](https://console.cloud.google.com/apis/api/admin.googleapis.com/overview)
- [Cloud Resource Manager API](https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/overview)
- [Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com/overview)

### meshfed-service ServiceAccount

Create a `meshfed-service` [ServiceAccount on the Organization](https://console.cloud.google.com/iam-admin/serviceaccounts/)

- Enable the ServiceAccount for “G Suite Domain-wide Delegation” and notate the generated `Client Id`
- Generate and Download a [ServiceAccount Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

The ServiceAccount doesn’t need any roles on itself, it will be merely used to impersonate a technical user set up on the Cloud Identity directory using the [Admin Console](https://admin.google.com) for your Organization. This is required because Google does not support automation of Cloud Identity operations using ServiceAccounts.

The ServiceAccount will be identified by an email address like

```text
meshfed-service@meshstack-root.iam.gserviceaccount.com
```

## Cloud Identity Configuration

### meshfed-service User

meshStack needs to impersonate a technical user to perform [delegated operations using the Admin SDK](https://developers.google.com/admin-sdk/directory/v1/guides/delegation).

> Note: Depending on your organizations setup of Google Cloud Identity provisioning a technical user in the cloud directory
> may require an exception from standard procedures (e.g. federated SAML Login).

Manually create a `meshfed-service` (directory-)user in the [Google Admin Console](https://admin.google.com/).

- You can throw away the password of this user after completing the setup
- Add the User to the following admin roles
  - `User Management`
  - `Groups Admin`

The directory-user will be identified by an email address like

```text
meshfed-service@dev.meshcloud.io
```

#### Accept Google ToS

The user needs to accept Google’s ToS after signing in as `meshfed-service@dev.meshcloud.io`.

Open a private browser session and

- sign in to the [admin console](https://admin.google.com/). Accept any ToS presented.
- sign in to the [Google Cloud Console](https://console.cloud.google.com/). Accept the GCP ToS.

#### Add to the meshfed-service GCP role

Add the `meshfed-service@dev.meshcloud.io` user to the `meshfed-service` role setup earlier on the organization level in GCP.

### Enable Automated OAuth Consent

Enable Automated Consent in the G Admin Console

- Go to [Manage OAuth Clients](https://support.google.com/a/answer/162106?hl=en)
- Add a new Authorized client with these details
  - Client Name = `Client Id` of `meshfed-service` Service Account from Google Cloud Console (displayed under “Domain-wide Delegation” on the Service Account Details Page )
  - Scopes:

      ```text
      https://www.googleapis.com/auth/admin.directory.user, https://www.googleapis.com/auth/cloud-platform, https://www.googleapis.com/auth/admin.directory.group
      ```

## Platform Instance Config

This section describes the configuration of a GCP Platform Instance in the meshStack [configuration model](./meshstack.configuration.md).

### Organization

Configure the domain, service account and service user as they were setup above.

```haskell
{   domain =
      "dev.meshcloud.io"
  , serviceUser =
      "meshfed-service@dev.meshcloud.io"
  , serviceAccount =
      { accountId =
          "meshfed-service@meshstack-root.iam.gserviceaccount.com"
      , privateKey =
          { name = "GCP_PRIVATE_KEY" }
      }
}
```

### Billing Account

In order to maintain symmetry to other public cloud platforms, meshStack consolidates billing of all GCP projects managed
under the same GCP Platform Instance to a single Google Cloud Billing Account. The billing account id is thus configured
on the platform level.

{   billingAccountId =
      "123456-1234ABCD-1234FF"  {- The id of your Billing Account as it's displayed in Google Cloud Console -}
}

To use multiple billing accounts consider configuring multiple GCP platform instances in meshStack.

### GCP Role Mapping

The [project roles](meshcloud.project.md#project-roles) are mapped to user roles in GCP. This mapping is fully customizable and can use custom as well as built-in roles.

In order to configure the mapping use the `roleMappings` key in the [platform config](#configuration-reference).

```haskell
{ roleMappings =
    [ { mapKey = "admin", mapValue = "roles/editor" } {- Uses a built-in GCP role -}
    , { mapKey =
          "user"
      , mapValue =
          "organizations/632614034120/roles/meshstack.project_developer" {- Uses a custom role defined on the organization -}
      }
    ]
}
```
