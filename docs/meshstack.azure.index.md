---
id: meshstack.azure.index
title: Integration
---

meshcloud can automatically provision Azure Subscriptions as Tenants for [meshProjects](./meshcloud.project.md) and configure them according to your organiziations policies
using [Landing Zones](./meshcloud.landing-zones.md).

## Integration Overview

To enable integration with Azure, operators need to deploy and configure the meshStack Azure Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.Azure`. This makes Azure available to meshProjects like any other cloud platform in meshStack.

Azure relies on Azure Active Directoy (AAD) for authentication and authorization. meshcloud can seamlessly integrate with common
setups like [Azure Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/). meshcloud helps you implement Azure in line with [Governance best-practices](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/govern/governance-disciplines) by integrating [Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) and Management Groups using [Landing Zones](#landing-zones)

In order to plan and execute a successful integration of Azure using meshcloud, organizations need to consider the following parts described in the sections below.

## Azure Active Directory Integration

All subscriptions in Azure must be associated with exactly one AAD Tenant storing role and permission assignments. Azure uses this AAD Tenant to evaluate permissions on all resources contained in that subscription. meshcloud manages roles and assignments
by automatically replicating [meshProject Role Assignments](./meshcloud.project.md) to this AAD Tenant.

However, a key decision in any Azure integration is how your organization wants to provision user identities in this AAD Tenant.
In the following section we describe a possible AAD setup.

### Externally Provisioned Identities

The default model expected by Microsoft is [Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/), i.e. a local Active Directory (AD) synced to Azure (Azure Active Directory, AAD). Organizations can implement this sync using
[Azure Active Directory Connect (AD Connect)](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect). This sync populates user identities into an AAD Tenant owned by the organization and can also synchronize existing groups and memberships.

The user identities are synchronized to your organization's "home tenant", which also owns the email domains identifying these users.
In most organizations, other applications like Office 365 already consume user identities from this AAD Tenant.

> Please make sure that all users who need access to the Azure Portal are replicated into the AAD. meshcloud will issue
> a [replication](./meshcloud.tenant.md) warning for projects that have role assignments that cannot be replicated because a user identity could not be found on the home tenant.

### Workload AAD Tenant

Because meshcloud requires read-write permissions to your Azure Active Directory to manage user roles on Azure Subscriptions, we recommend creating a
separate "Workload AAD Tenant" to be exclusively used by meshcloud. Our orchestration engine then creates Guest Users in the meshcloud AAD Tenant that reference user identities from the "home tenant" (AAD B2B). This way, users have a single cloud identity managed by your organization-wide policies while isolating "workload" related Azure activies into its own AAD Tenant which has no way of affecting other applications using the home tenant like Office 356 etc.

### External User Ids (euid)

Using [externally-provisioned user identities](./meshstack.identity-federation.md#externally-provisioned-identities) requires your IdP to provide a user identifier suitable to locate user identities
in the "home tenant". This external user id needs to be mapped to the `euid` user attribute in the [meshIdB](./meshstack.identity-federation.md).

It is important that the provided euid's are **case-sensitive** and must match the user entries saved in the AAD against which the replication should happen! This is a limitation imposed by the search queries of Microsoft Graph API.

> meshcloud can support complex Azure AD setups involving user identity lookup rules and multiple home tenants. Please contact our experts for more details.

### Licensing Considerations

Users managed in the meshcloud AAD Tenant do not require AAD Premium Licenses.

## Service Principal Setup

meshStack uses separate service principals for different tasks following the best practice of least privilege principle. Depending on the way how you want to setup Subscription creation (there are two possible ways: Pre-provisioned Subscriptions or using an Enterprise Enrollment Account), you can use either an App Registration or an Enterprise Application principal. But in order to use an Enterprise Enrollment Account with automatic [Subscription provisioning](#enterprise-enrollment-account), the usage of an App Registration principle is **mandatory**.

In order to manage user roles and permissions, meshcloud requires a Service Principal for the replicator which is placed in the AAD Tenant containing your Azure Subscriptions and workloads.
The Service Principal must be authorized in the scope of this AAD Tenant.

### AAD Level Permissions

1. Under **Azure Active Directory** &rarr; **Enterprise applications**, click on **New application**.
2. Click on **Create your own application**, choose a name e.g. `meshReplicator` and choose "Register an application to integrate with Azure AD".

![Enterprise application registration](assets/app-creation-1.png)
3. On the next step, choose "Accounts in this organizational directory only, Single tenant)".

![Choose single tenant](assets/app-creation-2.png)
4. It can take some time to the app to show up in the overview, but then please write down its Object ID (will later correspond to `objectId`) and Application (client) ID (will later correspond to `client-id`).
5. In the AAD overview now go to **App registrations** (the created app should show up there as well). Click on the app and add an client secret under **Certificates &amp; secrets**. Write it down (it is the `client-secret`).
6. Under **API permissions** add the following for the **Microsoft Graph API** (not Azure AD Graph API):
    - `Directory.Read.All` - this permission is required to search the directory for existing users, groups and service principals
    - `Group.ReadWrite.All`  this permissions is required to create new groups
    - `User.Invite.All` - this permission is required if you want to enable B2B User Invitation (see below)
7. Click **Grant permissions** and make sure to also grant admin consent for each permission by clicking **Grant admin consent** in the permissions screen of the app.
8. In the **Overview** section of your app also write down the **Directory (tenant) ID** this is the `aadTenant` (you can also use the primary domain, this is typically a `*.onmicrosoft.com` domain)

Operators need to supply these variables to the [meshStack Configuration](#meshstack-configuration) for this Azure Platform Instance.

### Azure RBAC Permissions

Created subscriptions will have the Service Principal of the replicator registered as an owner at first. As soon as all needed maintenance steps are performed (e.g. renaming the subscription, moving it into the final management group), the replicator removes itself as an owner.

All permissions left are therefore granted only via the Management Group hierarchy. The meshstack software does **not** need access related to actual workload inside these subscriptions. However in order to perform certain maintenance tasks, the following permissions/roles must be granted to the replicator principal:

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

# Permissions for reading and writing tags
"Microsoft.Resources/tags/write",

# Permission we need to activate/register required Resource Providers
"*/register/action",

# Rename pre-provisioned subscriptions, not required for Enterprise Enrollment
"Microsoft.Subscription/rename/action"
```

You must must grant the meshcloud Service Principal this level access to all [Management Groups](https://docs.microsoft.com/en-us/azure/governance/management-groups/) used in [Landing Zones](./meshstack.azure.landing-zones.md).

In Azure Portal, navigate to the "Management Groups" blade, then click on the "Details" link of the management group you want to give access to. Select "Access Control (IAM)" from the menu and create a role assignment of the custom IAM role created above for the [replicator Service Principal](#replicator).

> Access to the Management Groups may require the "Global Administrator" role with [elevated access](https://docs.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin). In case you're not able to see all management groups after elevating access, try signing out and back in to Azure Portal.

### Privilege Escalation Prevention

Furthermore in order to prevent the replicator from assigning itself more permissions, we recommended to add the following policy on a root management group level:

```json
{
    "properties": {
        "mode": "all",
        "displayName": "meshcloud Privilege Escalation Prevention",
        "description": "Prevent replicator SPN from assigning itself new roles.",
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
                    "field": "Microsoft.Authorization/roleAssignments/principalId",
                    "equals": "<objectId>"
                  },
                ]
              }
            ]
          },
          "then": {
            "effect": "deny"
          }
      }
    }
}
```

## Subscription Provisioning

To provide Azure Subscription for your organization's meshProjects, meshcloud supports using Enterprise Enrollment or allocating from a pool of pre-provisioned subscriptions. Operators can find the corresponding configuration options in the [Provisioning Configuration Reference](./meshstack.azure.config.md#provisioning-configuration).

### Enterprise Enrollment Account

meshcloud can automatically provision new subscriptions from an Enterprise Enrollment Account owned by your organization. This is suitable for large organizations that have a Microsoft Enterprise Agreement, Microsoft Customer Agreement or a Microsoft Partner Agreement and want to provide a large number of subscriptions in a fully automated fashion.

> Microsoft currently has limitation of a [maximum of 2000 Subscriptions](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/programmatically-create-subscription?tabs=rest#limitations-of-azure-enterprise-subscription-creation-api) per Enrollment Account (EA). It's therefore possible to configure meshStack to consume subscriptions from multiple EA's for the same [meshPlatform](./meshcloud.platforms.md). Please contact our experts for more details.

#### Setting up the Enrollment Account

We recommend using dedicated enrollment accounts (EA) for exclusive use by meshcloud.

> EA Administrators must be careful to choose an EA Account Owner that is placed in the meshcloud AAD Tenant!

Subscriptions provisioned through the EA get automatically associated with the AAD Home-Tenant of the EA Account Owner.
If your organization uses Microsoft (i.e. outlook.com) identities as EA Account Owner, please invite the EA Owner user first into the meshcloud AAD Teant before creating the enrollment account.

For setting up the replicator configuration you need the scope of the enrollment account. Microsoft states this is the ID, however their documentation is inconclusive about this. The recommend to use a REST call to [get the Enrollment Account ID/Scope](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/programmatically-create-subscription-enterprise-agreement?tabs=rest-getEnrollments%2Crest-EA#find-accounts-you-have-access-to) (it should be executed in the scope of a user who is the owner of this EA account):

```bash
GET https://management.azure.com/providers/Microsoft.Billing/billingaccounts/?api-version=2020-05-01
```

the response is:

```json
{
  "value": [
    {
      "id": "/providers/Microsoft.Billing/billingAccounts/1234567",
      "name": "1234567",
      "properties": {
        "accountStatus": "Unknown",
        "accountType": "Enterprise",
        "agreementType": "EnterpriseAgreement",
        "soldTo": {
          "companyName": "Contoso",
          "country": "US "
        },
        "billingProfiles": {
          "hasMoreResults": false
        },
        "displayName": "Contoso",
        "enrollmentAccounts": [
          {
            "id": "/providers/Microsoft.Billing/billingAccounts/1234567/enrollmentAccounts/7654321",
            "name": "7654321",
            "type": "Microsoft.Billing/enrollmentAccounts",
            "properties": {
              "accountName": "Contoso",
              "accountOwnerEmail": "kenny@contoso.onmicrosoft.com",
              "costCenter": "Test",
              "isDevTest": false
            }
          }
        ],
        "hasReadAccess": false
      },
      "type": "Microsoft.Billing/billingAccounts"
    }
  ]
}
```

The value for a billing scope and id are the same thing. The id for your enrollment account is the billing scope under which the subscription request is initiated. Please note the field `value[].enrollmentAccounts[].id` of your desired enrollment account down, as it needs to be used as the `enrollmentAccountId` in the [DHALL provisioning configuration](meshstack.azure.config.md#provisioning-configuration).

#### Enterprise Enrollment Account Permissions

When using an [Enterprise Enrollment Account (EA) for Subscription provisioning](#enterprise-enrollment-account), an EA Administrator must authorize the [meshcloud Service Principal](#service-principal-setup) on the Enrollment Account [following the official instructions](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/assign-roles-azure-service-principals).

In order to grant the Service Principal the `Subscription Creator` role the easiest way is to again perform a REST call:


```bash
PUT https://management.azure.com/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleAssignments/{billingRoleAssignmentName}?api-version=2019-10-01-preview
```

Please check the [official documentation](https://docs.microsoft.com/en-us/rest/api/billing/2019-10-01-preview/enrollmentaccountroleassignments/put) for the meaning of the parameter and the required body payload (there is also a **Try it** button which can directly execute this call). On this page there is also an [example](https://docs.microsoft.com/en-us/rest/api/billing/2019-10-01-preview/enrollmentaccountroleassignments/put#putenrollmentaccountsubscriptioncreatorroleassignment) which assigns the required role to a Service Principal. Please adapt the parameters there accordingly.

The following additional information to the required REST call parameters mentioned in the above links can be helpful:

| Name                                   | Description                                      |
| -------------------------------------- | ------------------------------------------------ |
| `billingRoleAssignmentName` in the URL | **Must** be a random UUID you can freely choose. |
| `properties.principalTenantId`         | The `aadtenant` value from above.               |
| `properties.principalId`               | The `objectId` of the **enterprise application**. This is **not** the same id as the object id as of the app registration.                 |

The complete set of Azure documentation to complete this task can be found here:

- [General documentation for programmatical Subscription creation](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/programmatically-create-subscription-enterprise-agreement?tabs=rest)
- [How to assign EA roles to a Service Principal](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/assign-roles-azure-service-principals)
- [REST API Docs for role assignment](https://docs.microsoft.com/en-us/rest/api/billing/2019-10-01-preview/enrollmentaccountroleassignments/put)

> The Azure documentation also mentions to use the correct API versions for both the Subscription creation and the role assignment call. For Subscription creation, the replicator uses the API version `...?api-version=2020-09-01` which reliably works together with the above mentioned PUT call of the EA Account role assignment with the API version: `...?api-version=2019-10-01-preview`.

#### Ensuring Retained Subscription Owners

Azure requires that there's at least one "Owner" or "Classic Administrator" role assignment on each Subscription. Unfortunately, it's not a sufficient workaround to inherit the Owner role via the Management Group Hierarchy onto the Subscription. Instead a direct role assignment must exist. This owner can also be the Azure [Blueprint Service Principal](#blueprint-configuration)

In contrast to other provisioning methods, EA provisioning will not retain a default "Classic Administrator" role assignment on the subscription from the billing account owner. Operators should therefore configure at least one explicit owner under `subscriptionOwnerObjectIds`. This owner can also be an empty AAD group or Service Principal.

> You should never grant subscription owner roles to the meshStack replicator SPN.

### Pre-provisioned Subscriptions

If your organization does not have access to an Enterprise Enrollment, you can alternatively configure meshcloud to
consume subscriptions from a pool of externally-provisioned subscriptions. This is useful for smaller organizations that whish
to use "Pay-as-you-go" subscriptions or if you're organization partners with an [Azure Cloud Solution Provider](https://docs.microsoft.com/en-us/azure/cloud-solution-provider/overview/azure-csp-overview) to provide your subscriptions.

The meshcloud Azure [replication](./meshcloud.tenant.md) detects externally-provisioned subscriptions based on a configurable prefix in the subscription
name. Upon assignment to a meshProject, the subscription is inflated with the right [Landing Zone](./meshstack.azure.landing-zones.md) configuration
and removed from the subscription pool.

### Metering

In order to read resource usages, a metering principal is needed. It requires the following permissions/roles on all resources which should be accessed by meshStacks's metering service:

- `Cost Management Reader`

## Blueprint Configuration

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
