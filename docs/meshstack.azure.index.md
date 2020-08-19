---
id: meshstack.azure.index
title: Integration
---

meshcloud can automatically provision Azure Subscriptions as Tenants for [meshProjects](./meshcloud.project.md) and configure them according to your organiziations policies
using [Landing Zones](./meshcloud.landing-zones.md).

## Integration Overview

To enable integration with Azure, operators need to deploy and configure the meshStack Azure Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.Azure`. This makes Azure available to meshProjects like any other cloud platform in meshStack.

Azure relies on Azure Active Directoy (AAD) for authentication and authorization. meshcloud can seamlessly integrate with common
AAD setups like [Azure Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/). meshcloud helps you implement Azure in line with [Governance best-practices](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/govern/governance-disciplines) by integrating [Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) and Management Groups using [Landing Zones](#landing-zones)

In order to plan and execute a successful integration of Azure using meshcloud, organizations need to consider the following parts described in the sections below.

## Azure Active Directory Integration

All subscriptions in Azure must be associated with exactly one AAD Tenant storing role and permission assignments. Azure uses this AAD Tenant to evaluate permissions on all resources contained in that subscription. meshcloud manages roles and assignments
by automatically replicating [meshProject Role Assignments](./meshcloud.project.md) to this AAD Tenant.

However, a key decision in any Azure integration is how your organization wants to provision user identities in this AAD Tenant.
The two different ways supported by meshstack are described below.

### Externally-provisioned Identities

The default model expected by Microsoft is [Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/), i.e. a local Active Directory (AD) synced to Azure (Azure Active Directory, AAD). Organizations can implement this sync using
[Azure Active Directory Connect (AD Connect)](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect). This sync populates user identities into an AAD Tenant owned by the organization and can also synchronize existing groups and memberships.

The user identities are synchronized to your organization's "home tenant", which also owns the email domains identifying these users.
In most organizations, other applications like Office 365 already consume user identities from this AAD Tenant.

> Please make sure that all users who need access to the Azure Portal are replicated into the AAD. meshcloud will issue
> a [replication](./meshcloud.tenant.md) warning for projects that have role assignments that cannot be replicated because a user identity could not be found on the home tenant.

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

meshcloud can automatically provision new subscriptions from an Enterprise Enrollment Account owned by your organization. This is suitable for large organizations that have a Microsoft Enterprise Agreement, Microsoft Customer Agreement or a Microsoft Partner Agreement and want to provide a large number of subscriptions in a fully automated fashion.

> Microsoft currently has limitation of a [maximum of 500 Subscriptions](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/programmatically-create-subscription?tabs=rest#limitations-of-azure-enterprise-subscription-creation-api) per Enrollment Account (EA). It's therefore possible to configure meshStack to consume subscriptions from multiple EA's for the same [meshPlatform](./meshcloud.platform-location.md). Please contact our experts for more details.

### Pre-provisioned Subscriptions

If your organization does not have access to an Enterprise Enrollment, you can alternatively configure meshcloud to
consume subscriptions from a pool of externally-provisioned subscriptions. This is useful for smaller organizations that whish
to use "Pay-as-you-go" subscriptions or if you're organization partners with an [Azure Cloud Solution Provider](https://docs.microsoft.com/en-us/azure/cloud-solution-provider/overview/azure-csp-overview) to provide your subscriptions.

The meshcloud Azure [replication](./meshcloud.tenant.md) detects externally-provisioned subscriptions based on a configurable prefix in the subscription
name. Upon assignment to a meshProject, the subscription is inflated with the right [Landing Zone](./meshstack.azure.landing-zones.md) configuration
and removed from the subscription pool.

## Service Principal Setup

meshstack in total needs up to three service principals, one for replicating meshProjects into the Azure platform, one if AAD should be used as an user lookup when users are added to a customer or project inside the meshfed panel, and one for gathering metering data for the billing subsystem.

### Replicator

In order to manage user roles and permissions, meshcloud requires a Service Principal on the meshcloud AAD Tenant.
The Service Principal must be authorized in the scope of the meshcloud AAD Tenant.

#### AAD Level Permissions

1. Under **Azure Active Directory** &rarr; **App registrations** create a new web app (call it e.g. `meshReplicator`).
2. Add an client secret under **Certificates &amp; secrets** and write it down (it is the `SERVICE_PRINCIPAL_CLIENT_SECRET`).
3. Add the following **application permissions** (not delegated permissions):
    - `Directory.Read.All` - this permission is required to search the directory for existing users, groups and service principals
    - `Group.ReadWrite.All`  this permissions is required to create new groups
    - `User.Invite.All` - this permission is required if you want to enable B2B User Invitation (see below)
4. Click **Grant permissions** and make sure to also grant admin consent for each permission by clicking **Grant admin consent** in the permissions screen of the app.
5. The following values are needed for meshPlatform configuration:
    - Go to **Azure Active Directory** and write down either the **AAD Tenant ID** or the **Primary domain** (typically a `*.onmicrosoft.com` domain) -> `AAD_TENANT`
    - Go to **Azure Active Direcory** &rarr; **Enterprise application** and search the newly created web app (created in step 1.)
      - **Application (client) ID** -> `SERVICE_PRINCIPAL_CLIENT_ID`
      - **Application object id** -> `SERVICE_PRINCIPAL_OBJECT_ID`

Operators need to supply these variables to the [meshStack Configuration](#meshstack-configuration) for this Azure Platform Instance.

#### Subscription Level Permissions

Created subscriptions will have the Service Principal of the replicator registered as an owner at first. As soon as all needed maintenance steps are performed (e.g. renaming the subscription, moving it into the final management group), the replicator removes itself as an owner.

All permissions left are therefore granted only via the management group hierarchy. The meshstack software does **not** need access related to actual workload inside these subscriptions. However in order to perform certain maintenance tasks, the following permissions/roles must be granted to the replicator principal:

```hcl
# Assigning Users
"Microsoft.Authorization/permissions/read",
"Microsoft.Authorization/roleAssignments/*",
"Microsoft.Authorization/roleDefinitions/read",

# Assigning Blueprints
"Microsoft.Resources/deployments/*",
"Microsoft.Blueprint/blueprintAssignments/*",
"Microsoft.Resources/subscriptions/resourceGroups/read",
"Microsoft.Resources/deployments/*",

# Fetching Blueprints
"Microsoft.Management/managementGroups/read",
"Microsoft.Management/managementGroups/descendants/read",

# Assigning Subscriptions to Management Groups
"Microsoft.Management/managementGroups/subscriptions/write",
"Microsoft.Management/managementGroups/write",

# Permission we need to activate/register required Resource Providers
"*/register/action"
```

Furthermore in order to prevent the replicator from assigning itself more permissions, we recommended to add the following policy rule to your subscriptions:

```json
{
    "properties": {
        "mode": "all",
        "displayName": "meshcloud Privilege Escalation Prevention",
        "description": "Prevent meshcloud SP from assigning itself new roles.",
        "policyRule": {
          "if": {
            "allOf": [
              {
                "equals": "Microsoft.Authorization/roleAssignments",
                "field": "type"
              },
              {
                "allOf": [
                  {
                    "field": "Microsoft.Authorization/roleAssignments/roleDefinitionId",
                    "equals": "/subscriptions/<SUBSCRIPTION_ID>/providers/Microsoft.Authorization/roleDefinitions/<AZURE_SERVICE_PRINCIPAL_ROLE_ID>"
                  },
                  {
                    "field": "Microsoft.Authorization/roleAssignments/principalId",
                    "equals": "<AZURE_SERVICE_PRINCIPAL_ID>"
                  },
                ]
              }
            ]
          },
          "then": {
            "effect": "audit"
          }
      }
    }
}
```

### Identity Provider (IdP) Lookup

This principal is only required if the AAD is actually be used as source of user information when assigning users to meshCustomers or meshProjects inside the meshPanel. In order to use this functionality, create a new principal (described in **Replicator** &rarr; **AAD Level Permissions** step 1 and 2) and assign the following required permissions:

- `User.Read.All`

> Since `User.Read.All` is a Role permission, you will also need to grant admin consent in AAD on the assignment


## Configuring Enterprise Enrollment

### 1. Setting up the Enrollment Account

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

### 2. Authorizing the meshcloud Service Principal for EA

To use EA for Subscription provisioning, an EA Administrator must authorize the [meshcloud Service Principal](#service-principal-setup) on the Enrollment Account [following the official instructions](https://docs.microsoft.com/en-us/azure/azure-resource-manager/grant-access-to-create-subscription).

### Automated B2B User Invitation

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

#### Authorize the meshcloud Service Principal

You must must grant the meshcloud Service Principal `owner` access to all [management groups](https://docs.microsoft.com/en-us/azure/governance/management-groups/) in the meshcloud AAD Tenant.

Before you can grant this access, you must have access to the root Management Group yourself. If you haven't already done so, please make sure your user is a `Global Administrator` on the meshcloud AAD Tenant
and has [elevated access to all management groups](https://docs.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin).

> In case you're not able to see all management groups after elevating access, try signing out and back in to Azure Portal.

Once you have elevated access, use the Azure Portal to Navigate to the "Management Groups"  blade, then click on the "Details" link of the Tenant Root Group. Select "Access Control (IAM)" from the menu and create a Role assignment that grants the [App created above](#meshcloud-service-principal) for the meshcloud Service Principal (i.e. `meshReplicator`) the `Owner` permission on this resource.

In this screen you can also find the Object ID and Application ID of your service principal. In case you prefer the CLI and have the Azure CLI installed the following Powershell command can also reveal this ID for you:

```powershell
Get-AzADServicePrincipal | Where-Object {$_.Displayname -eq "<NAME_OF_THE_SERVICE_ACCOUNT>"}
```

## Platform Instance Configuration

With the information we gathered in the above section we now can configure the Azure Replicator.
This will typcially configured by your meshcloud experts, but please consult the following example as a reference
of possible configuration settings.

```dhall
let Provisioning = ./Azure/Provisioning.dhall
let InviteB2BUserConfig = ./Azure/InviteB2bUserConfig.dhall

in    λ(Secret : Type)
    → { platform = "azure.meshcloud-azure-dev"
      , accountNamePattern :
          Optional Text
      , groupNamePattern :
          Optional Text
      {- See below for explanation. -}
      , blueprintServicePrincipal = "<AZURE_BLUEPRINT_PRINCIPAL>"
      {- # https://docs.microsoft.com/en-us/rest/api/blueprints/assignments/createorupdate#assignmentlockmode -}
      , blueprintLockAssignment = "AllResourcesReadOnly"
      , blueprintLocation = "westeurope"
      , servicePrincipal :
          {- Either friendly domain name or your tenants GUID -}
          { aadTenant = "<AAD_TENANT>"
          , objectId = "<SERVICE_PRINCIPAL_OBJECT_ID>"
          , clientId = "<SERVICE_PRINCIPAL_CLIENT_ID>"
          , clientSecret = "<SERVICE_PRINCIPAL_CLIENT_SECRET>"
          }
      , b2bUserInvitation :
          Optional InviteB2BUserConfig
      , provisioning :
          Provisioning
      , roleMappings :
          {-
          Each mesh project role (specified by key, i.e. user) is mapped to an Azure role
          (specified by id).
          An alias is provided which can be used when naming related IAM groups.
          For example, this mapping gives all users with project admin access to a project
          owner access to the Azure subscription which was created for this project.

            admin = { alias = "owner", id = "8e3af657-a8ff-443c-a75c-2fe8c4bcb635" }
          -}
          List { mapKey : Text, mapValue : { alias : Text, id : Text } }
      }
```

Role mappings must be configured for all [meshProject roles](./meshcloud.project.md#project-roles), you can refer to the official [Azure documentation](https://docs.microsoft.com/bs-latn-ba/azure/role-based-access-control/built-in-roles) for additional information on Azure roles.

As [described](./meshstack.azure.index.md#subscription-provisioning), provisioning can be configured to use an enterprise enrollment account or pre provisioned subscriptions.

```dhall
let EnterpriseEnrollment =
      {-
      You can configure multiple owners of the created/assigned subscriptions.
      Enter the object IDs of the subscription owners. This is useful for
      extended automation.
      -}
      { subscriptionOwnerObjectIds ["<SUB_OWNER_OBJECT_ID>"]
      , enterpriseEnrollment :
          { enrollmentAccountId =  "<EA_ACCOUNT_ID>"
          , subscriptionOfferType = "MS-AZR-0017P"
          {-
          There is a safety mechanism to avoid duplicate Subscription creation in case
          of an error. This delay should be a bit higher then it usually takes to
          create subscriptions. For big installations this is somewhere between 5-15
          minutes.
          -}
          , subscriptionCreationErrorCooldownSec = 600
          }
      }

let PreProvisioned =
      { subscriptionOwnerObjectIds :
          List Text
      , preProvisioned :
          {-
          Unused subscriptions must begin with this name in order to be picked by
          the replicator.
          -}
          { unusedSubscriptionNamePrefix = "mesh" }
      }

in  < EnterpriseEnrollment :
        EnterpriseEnrollment
    | PreProvisioned :
        PreProvisioned
    >
```

The field `b2bUserInvitation` allows you to optionally configure the replicator to create Azure B2B guest invitations for
users missing in the target AAD tenant. The configuration reference for `InviteB2BUserConfig` is:

```dhall
-- URL used in the Azure invitation mail if send
{ redirectUrl = "https://example.com"
-- Flag if an Invitation mail by Azure should be send out
, sendAzureInvitationMail = false
}
```

### Blueprint Service Principal

The `Azure Blueprints` service principal id is different in every AAD Tenant, so we need to find the id
of the app in the managed AAD Tenant.

The easiest way to accomplish this is to start an Azure cloud shell in a subscription on the meshcloud AAD Tenant and execute the following command:

```powershell
Get-AzureRmADServicePrincipal -ApplicationId f71766dc-90d9-4b7d-bd9d-4499c4331c3f
```

The response should be similar to

```text
ServicePrincipalNames : {f71766dc-90d9-4b7d-bd9d-4499c4331c3f}
ApplicationId         : f71766dc-90d9-4b7d-bd9d-4499c4331c3f
ObjectType            : ServicePrincipal
DisplayName           : Azure Blueprints
Id                    : 2a6a62ad-e28b-4eb4-8f1e-ce93dbc76d20
```

This `Id` needs to be configured in the Azure Platform configuration.

<!--snippet:mesh.platforms.azure.blueprintServicePrincipal-->

The following configuration options are available at `mesh.platforms.azure.blueprintServicePrincipal`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let BlueprintServicePrincipalConfiguration =
    {-
        blueprintServicePrincipal:
          The Service Principal Id (SAMI) used to execute Blueprints, unless overriden with an explicit UAMI
          in the Landing Zone definition. The value is the Object Id of the Enterprise Application belongig
          to the Microsoft Application "Azure Blueprints" with Application Id f71766dc-90d9-4b7d-bd9d-4499c4331c3f.
    -}
      { blueprintServicePrincipal : Text }
```
<!--Example-->
```dhall
let example
    : BlueprintServicePrincipalConfiguration
    = { blueprintServicePrincipal = "2a6a62ad-e28b-4eb4-8f1e-ce93dbc76d20"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Azure Subscription Name

The name of the generated subscriptions can be fully customized. A `printf` format string is used. You can read about all the available options in the official Java documentation about [`String.format`](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html#syntax).

For example a string pattern `%s.%s` would generate: `customer.project`. Which is the default.

The following arguments are provided:

1. argument: meshCustomer [identifier](./meshstack.configuration.md#identifiers)
2. argument: meshProject [identifier](./meshstack.configuration.md#identifiers)
3. argument: meshProject [ID (numeric)](./meshstack.configuration.md#identifiers)
4. argument: tenantNumber (numeric), a running number specific to each platform which can be optionally enabled.

### AAD Group Name

Similiar to the [Azure Subscription Name](#azure-subscription-name) a `printf` compatible string can be used.

> Operators must be careful to ensure resulting group names are unique for project-role combinations.

The arguments available here are:

1. argument: meshCustomer [identifier](./meshstack.configuration.md#identifiers)
2. argument: meshProject [identifier](./meshstack.configuration.md#identifiers)
3. argument: meshProject [ID (numeric)](./meshstack.configuration.md#identifiers)
4. argument: tenantNumber (numeric), a running number specific to each platform which can optionally be enabled
5. argument: role name suffix ([configurable via Landing Zone](./meshstack.azure.landing-zones.md#meshrole-to-platform-role-mapping))
