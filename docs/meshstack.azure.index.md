---
id: meshstack.azure.index
title: Integration
---

meshcloud can automatically provision Azure Subscriptions as Tenants for [meshProjects](./meshcloud.project.md) and configure them according to your organiziations policies
using [Landing Zones](./meshcloud.landing-zones.md).

## Integration Overview

To enable integration with Azure, operators need to deploy and configure the meshStack Azure Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.Azure`. This makes Azure available to meshProjects like any other cloud platform in meshStack.

Azure relies on Azure Active Directoy (AAD) for authentication and authorization. meshcloud can seamlessly integrate with common
AAD setups like [Azure Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/). Meshcloud helps you implement Azure in line with [Governance best-practices](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/govern/governance-disciplines) by integrating [Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) and Management Groups using [Landing Zones](#landing-zones)

In order to plan and execute a successful integration of Azure using meshcloud, organizations need to consider the following parts described in the sections below.

## Azure Active Directory Integration

All Subscriptions in Azure must be associated with exactly one AAD Tenant storing role and permission assignments. Azure uses this AAD Tenant to evaluate permissions on all resources contained in that subscription. meshcloud manages roles and assignments
by automatically replicating [meshProject Role Assignments](./meshcloud.project.md) to this AAD Tenant.

However, a key decision in any Azure integration is how your organization wants to provision user identities in this AAD Tenant.
Meshcloud supports two different ways to achieve this.

### Externally-provisioned Identities

The default model expected by Microsoft is [Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/), i.e. a local Active Directory (AD) synced to Azure (Azure Active Directory, AAD). Organizations can implement this sync using
[Azure Active Directory Connect (AD Connect)](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect). This sync populates user identities into an AAD Tenant owned by the organization and can also synchronize existing groups and memberships.

The user identities are synchronized to your organization's "home tenant", which also owns the email domains identifying these users.
In most organizations, other applications like Office 365 already consume user identities from this AAD Tenant.

> Please make sure that all users who need access to the Azure Portal are replicated into the AAD. meshcloud will issue
> a replication warning for projects that have role assignments that cannot be replicated because a user identity could not be found on the home tenant.

#### meshcloud AAD Tenant

Because meshcloud requires read-write permissions to manage user roles on Azure Subscriptions, we recommend creating a
separate "meshcloud AAD Tenant" to be exclusively used by meshcloud. Our orchestration engine then creates Guest Users in the meshcloud AAD Tenant that reference user identities from the "home tenant" (AAD B2B). This way, users have a single cloud identity managed
by your organization-wide policies while isolating "development" related Azure activies into its own AAD Tenant which has no
way of affecting other applications using the home tenant like Office 356 etc.

#### External User Id (euid)

Using [externally-provisioned user identities](./meshstack.identity-federation.md#externally-provisioned-identities) requires your IdP to provide a user identifier suitable to locate user identities
in the "home tenant". This external user id needs to be mapped to the `euid` user attribute in the [meshIdB](./meshstack.identity-federation.md).

It is important that the provided euid's are <b>case-sensitive</b> and must match the user entries saved in the AAD against which the replication should happen! This is a limitation imposed by the search queries of Microsoft Graph API.

> meshcloud can support complex Azure AD setups involving user identity lookup rules and multiple home tenants. Please contact our experts for more details.

### meshStack-provisioned Identities

In the [meshStack-provisioned Identities](./meshstack.identity-federation.md#meshstack-provisioned-identities) setup meshStack provisions user identities itself under a virtual domain in a "meshcloud AAD Tenant". This AAD tenant is then configured for federated authentication against [meshIdB](./meshstack.identity-federation.md).

This setup is useful for smaller organizations do not have existing AAD Tenants. We recommend large organizations use
externally-provisioned Identities that help ensure users have a single cloud identity with Microsoft Azure only.

### Licensing Considerations

Users managed in the meshcloud AAD Tenant do not require AAD Premium Licenses.

## Subscription Provisioning

To provide Azure Subscription for your organization's meshProjects, meshcloud supports using Enterprise Enrollment or allocating from a pool of pre-provisioned subscriptions.

### Enterprise Enrollment Account

meshcloud can automatically provision new subscriptions from an Enterprise Enrollment Account owned by your organization. This is suitable for large organizations that have a Microsoft Enterprise Agreement and want to provide a large number of subscriptions in a fully automated fashion.

> Microsoft currently has limitation of a maximum of 250 Subscriptions per Enrollment Account (EA). It's therefore possible to configure meshStack to consume subscriptions from multiple EA's for the same [platform instance](./meshcloud.platform-location.md). Please contact our experts for more details.

### Pre-provisioned Subscriptions

If your organization does not have access to an Enterprise Enrollment, you can alternatively configure meshcloud to
consume subscriptions from a pool of externally-provisioned subscriptions. This is useful for smaller organizations that whish
to use "Pay-as-you-go" subscriptions or if you're organization partners with an [Azure Cloud Solution Provider](https://docs.microsoft.com/en-us/azure/cloud-solution-provider/overview/azure-csp-overview) to provide your subscriptions.

The meshcloud Azure replication detects externally-provisioned subscriptions based on a configurable prefix in the subscription
name. Upon assignment to a meshProject, the subscription is inflated with the right [Landing Zone](#landing-zones) configuration
and removed from the subscription pool.

## Platform Instance Configuration

With the information we gathered in the above section we now can configure the Azure Replicator.
This will typcially configured by your meshcloud experts, but please consult the following example as a reference
of possible configuration settings.

```yml
replicator-azure:
  platforms:
    - platform: azure.meshcloud-azure-dev
      # This is the ID of the "Azure Blueprint" service principal which must be known beforehand.
      blueprint-service-principal: <AZURE_BLUEPRINT_PRINCIPAL>
      # https://docs.microsoft.com/en-us/rest/api/blueprints/assignments/createorupdate#assignmentlockmode
      blueprint-lock-assignment: "AllResourcesReadOnly"
      blueprint-location: "westeurope"
      service-principal:
        aad-tenant: <AAD_TENANT> # Either friendly domain name or your tenants GUID
        object-id: <SERVICE_PRINCIPAL_OBJECT_ID>
        client-id: <SERVICE_PRINCIPAL_CLIENT_ID>
        client-secret: <SERVICE_PRINCIPAL_CLIENT_SECRET>
      provisioning:
        # You can configure multiple owners of the created/assigned subscriptions. Enter the object IDs of the
        # subscription owners. This is useful for extended automation.
        subscription-owner-object-ids:
          - <SUB_OWNER_OBJECT_ID>
        # provide one of the following two keys
        externally-provisioned:
          # Unused subscriptions must begin with this name
          unused-subscription-name-prefix: mesh
      enterprise-enrollment:
          enrollment-account-id: <EA_ACCOUNT_ID>
          subscription-offer-type: MS-AZR-0017P
      role-mappings:
        # The mesh project role is mapped to an Azure role. You can enter the role which should be assigned for the
        # user holding this meshProject roles.For more information about Azure roles see
        # https://docs.microsoft.com/bs-latn-ba/azure/role-based-access-control/built-in-roles
        admin: b24988ac-6180-42a0-ab88-20f7382dd24c # magic GUID for contributor
        user: acdd72a7-3385-48ef-bd42-f606fba81ae7  # magic GUID for reader
```

The next sections will describe individual setup steps.

### Service Principal Setup

In order to manage user roles and permissions, meshcloud requires a Service Principal on the meshcloud AAD Tenant.
The Service Principal must be authorized in the scope of the meshcloud AAD Tenant.

1. Under **Azure Active Directory** &rarr; **App registrations** create a new web app (call it e.g. `meshReplicator`).
2. Add an client secret under **Certificates &amp; secrets** and write it down (it is the `SERVICE_PRINCIPAL_CLIENT_SECRET`).
3. Add the `Directory.ReadWriteAll`, `Group.ReadWriteAll` and `User.Read` permissions (application type) and click **Grant permissions**. You will also need to grant admin consent to your app. Therefore click **Grant admin consent** in the permissions screen.
4. Go to the App overview and write down the following: **Application (client) ID** (`SERVICE_PRINCIPAL_CLIENT_ID`), **Directory (tenant) ID** (`AAD_TENANT`, typically a `*.onmicrosoft.com` domain) and the **object id** (`SERVICE_PRINCIPAL_OBJECT_ID`).

Operators need to supply these variables to the [meshStack Configuration](#meshstack-configuration) for this Azure Platform Instance.

### Configuring Enterprise Enrollment

#### 1. Setting up the Enrollment Account

We recommend using dedicated enrollment accounts (EA) for exclusive use by meshcloud.

> EA Administrators must be careful to chose an EA Account Owner that's homed in the meshcloud AAD Tenant!

Subscriptions provisioned through the EA get automatically associated with the AAD Home-Tenant of the EA Account Owner.
If your organization uses Microsoft (i.e. outlook.com) identities as EA Account Owner, please invite the EA Owner user first into the meshcloud AAD Teant before creating the enrollment account.

To list your available EA accounts you can use the [`Get-AzEnrollmentAccount`](https://docs.microsoft.com/en-us/powershell/module/az.billing/get-azenrollmentaccount?view=azps-2.6.0) powershell command:

```powershell
PS C:\> Get-AzEnrollmentAccount

ObjectId                             PrincipalName
--------                             -------------
dbd8453d-071f-4fb4-8e01-c99f5b067649 jason@contoso.onmicrosoft.com
7ff524ac-a0de-4402-876f-934ccee3b601 carol@contoso.onmicrosoft.com
```

After creating (or finding) a suitable EA Account, please note down the accounts object id as `EA_ACCOUNT_ID`.

#### 2. Authorizing the meshcloud Service Principal for EA

To use EA for Subscription provisioning, an EA Administrator must authorize the [meshcloud Service Principal](#meshcloud-service-principal) on the Enrollment Account [following the official instructions](https://docs.microsoft.com/en-us/azure/azure-resource-manager/grant-access-to-create-subscription).

### Automatic User Invitation

Users can automatically get invited via Azure. The system needs an email address which is usually fetched from the [euid](./meshstack.identity-federation.md#externally-provisioned-identities). The email must exist inside an Azure Active Directory (AAD) and automatically gets invited to the AAD in which the meshProject subscriptions live.

In order to activate it just add the `b2b-user-invitation` configuration to your Azure platform config:

```yml
replicator-azure:
  platforms:
    - platform: azure.meshcloud-azure-dev
      b2b-user-invitation:
        # URL the user is redirected to when he manually accepts an invitation
        redirect-url: http://localhost
        send-azure-invitation-mail: false
```

You can decide if you want Azure to send an automatic email notification about the invitation process to the user by setting `send-azure-invitation-mail` to `true`. Usually this is not needed as meshStack handles
the invitation notifications.
