---
id: meshstack.how-to.integrate-meshplatform-azure-manually
title: How to manually integrate Azure as meshPlatform
---

> The recommended way to set up Azure as a meshPlatform is via the public terraform [Azure meshPlatform Module](https://github.com/meshcloud/terraform-azure-meshplatform). If you use it then the steps given below are not needed.

## Set up the Replication Service Principal

meshStack uses separate service principals for different tasks based on the best practice of least privilege principle. There are two possible ways to setup Subscription creation:

1. Pre-provisioned Subscriptions
2. Using an Enterprise Enrollment/Customer Agreement Account

Depending on the way you choose to setup, you can either use an App Registration or an Enterprise Application principal. But in order to use an Enterprise Enrollment Account with automatic [Subscription provisioning](#subscription-provisioning), the usage of an App Registration principle is **mandatory**.

In order to manage user roles and permissions, meshcloud requires a Service Principal for the replicator which is placed in the AAD Tenant containing your Azure Subscriptions and workloads.
The Service Principal must be authorized in the scope of this AAD Tenant.

### Set AAD Level Permissions

1. Under **Azure Active Directory** &rarr; **Enterprise applications**, click on **New application**.
2. Click on **Create your own application**.
3. Choose a name for example, `meshReplicator`.
4. Choose "Register an application to integrate with Azure AD".

![Enterprise application registration](assets/app-creation-1.png)
5. Choose "Accounts in this organizational directory only, Single tenant".
![Choose single tenant](assets/app-creation-2.png)
6. It can take some time to show up in the overview, but then please write down its Object ID (will later correspond to `objectId`) and Application (client) ID (will later correspond to `client-id`).
7. In the AAD overview now go to **App registrations** (the created app should show up there as well).
8. Click on the app.
9. Add either a client secret or federated credentials.
    - **Client secret**: generate a client secret and note it down as well.
    - **Federated credentials**: the `federated credential scenario` should be set to "Other issuer". The values for `Issuer` and `Subject identifier` will be shown by the panel during platform configuration after selecting "Workload Identity Federation" as the authentication type.
10. Under **API permissions** → **Add a permission** → **Microsoft Graph API** (not Azure AD Graph API) → **Application permissions**:
    - `Directory.Read.All` - this permission is required to search the directory for existing users, groups and service principals
    - `Group.ReadWrite.All`  this permissions is required to create new groups
    - `User.Invite.All` - this permission is required if you want to enable [B2B User Invitation](#b2b-user-invitation)
11. Click **Grant permissions** and make sure to also grant admin consent for each permission by clicking **Grant admin consent** in the permissions screen of the app.
12. In the **Overview** section of your app also write down the **Directory (tenant) ID**.

Platform Operators need to supply these variables to the [meshStack Configuration](#meshstack-configuration) for this Azure Platform Instance.

### Set Azure RBAC Permissions

Created subscriptions will have the Service Principal of the replicator registered as an owner at first. As soon as all needed maintenance steps are performed (e.g. renaming the subscription, moving it into the final management group), the replicator removes itself as an owner.

All permissions left are therefore granted only via the Management Group hierarchy. The meshstack software does **not** need access related to actual workload inside these subscriptions. However, in order to perform certain maintenance tasks, the following permissions/roles must be granted to the replicator principal:

```hcl
# Assigning Users
"Microsoft.Authorization/permissions/read",
"Microsoft.Authorization/roleAssignments/*",
"Microsoft.Authorization/roleDefinitions/read",

# Assigning Blueprints
"Microsoft.Resources/deployments/*",
"Microsoft.Blueprint/blueprintAssignments/*",
"Microsoft.Resources/subscriptions/resourceGroups/read",

# Fetching Blueprints
"Microsoft.Management/managementGroups/read",
"Microsoft.Management/managementGroups/descendants/read",

# Assigning Subscriptions to Management Groups
"Microsoft.Management/managementGroups/subscriptions/write",
"Microsoft.Management/managementGroups/write",

# Permissions for reading and writing tags
"Microsoft.Resources/tags/*",

# Permission we need to activate/register required Resource Providers
"*/register/action",

# Rename pre-provisioned subscriptions, not required for Enterprise Enrollment
"Microsoft.Subscription/rename/action",

# The following permission is only required if you plan to use this principal for Azure Resource Group
# integeration.
"Microsoft.Resources/subscriptions/resourceGroups/write",
```

You must grant the meshcloud Service Principal this access to all [Management Groups](https://docs.microsoft.com/en-us/azure/governance/management-groups/) used in [Landing Zones](./meshstack.azure.landing-zones.md).

1. In Azure Portal, navigate to the "Management Groups" blade.
2. Click on the "Details" link of the management group you want to give access to.
3. Select "Access Control (IAM)" from the menu.
4. Create a role assignment of the custom IAM role created above for the [replicator Service Principal](#replicator).

> Access to the Management Groups may require the "Global Administrator" role with [elevated access](https://docs.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin). In case you're not able to see all management groups after elevating access, try signing out and back in to Azure Portal.

In order to enable meshStack to cancel Azure Subscriptions as part of [tenant deletion](./administration.delete-tenants.md), please also include the following permission. We strongly recommend you assign this permission only on Management Groups where you want to allow automated tenant deletion.


```hcl
"Microsoft.Subscription/cancel/action"
```

### Set up a policy to prevent Privilege Escalation

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
                  }
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

## Set up Subscription Provisioning

To provide Azure Subscription for your organization's meshProjects, meshcloud supports using Enterprise Enrollment or allocating from a pool of pre-provisioned subscriptions. The Enterprise Enrollment is always the preferred one if you have an Enterprise Agreement as it allows full automation by meshStack for account creation.

### Use an Enterprise Enrollment

meshcloud can automatically provision new subscriptions from an Enterprise Enrollment Account owned by your organization. This is suitable for large organizations that have a Microsoft Enterprise Agreement, Microsoft Customer Agreement or a Microsoft Partner Agreement and want to provide a large number of subscriptions in a fully automated fashion.

> Microsoft currently has limitation of a [maximum of 2000 Subscriptions](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/programmatically-create-subscription?tabs=rest#limitations-of-azure-enterprise-subscription-creation-api) per Enrollment Account (EA). It's therefore possible to configure meshStack to consume subscriptions from multiple EA's for the same [meshPlatform](./meshcloud.platforms.md). Please contact our experts for more details.

#### Set up the Enrollment Account

We recommend using dedicated enrollment accounts (EA) for exclusive use by meshcloud.

> EA Administrators must be careful to choose an EA Account Owner that is placed in the meshcloud AAD Tenant!

Subscriptions provisioned through the EA get automatically associated with the AAD Home-Tenant of the EA Account Owner.
If your organization uses Microsoft (i.e. outlook.com) identities as EA Account Owner, please invite the EA Owner user first into the meshcloud AAD Teant before creating the enrollment account.

For setting up the replicator configuration you need the scope of the enrollment account. Microsoft states this is the ID, however their documentation is inconclusive about this. The recommendation is to use a REST call to [get the Enrollment Account ID/Scope](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/programmatically-create-subscription-enterprise-agreement?tabs=rest-getEnrollments%2Crest-EA#find-accounts-you-have-access-to) (it should be executed in the scope of a user who is the owner of this EA account):

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

The value for a billing scope and id are the same thing. The id for your enrollment account is the billing scope under which the subscription request is initiated. Please note the field `value[].enrollmentAccounts[].id` of your desired enrollment account, as it needs to be used as the `enrollmentAccountId` in the [Platform Connection Config](administration.platforms.md#platform-connection-config).

#### Grant Enterprise Enrollment Account Permissions

The Service Principal needs the `Subscription Creator` role.

When using an [Enterprise Enrollment Account (EA) for Subscription provisioning](#enterprise-enrollment-account), an EA Administrator must authorize the [meshcloud Service Principal](#service-principal-setup) on the Enrollment Account.

This happens via a PUT request against `https://management.azure.com/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleAssignments/{billingRoleAssignmentName}?api-version=2019-10-01-preview`.

##### Method 1: Use the Try it Button

The Mircosoft [API documentation](https://docs.microsoft.com/en-us/rest/api/billing/2019-10-01-preview/enrollmentaccountroleassignments/put) offers a **Try it** button which you can use to execute the call.

Using the Try it Button is also mentioned in the Mircosoft [role assignment documentation](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/assign-roles-azure-service-principals).

##### Method 2: Use a PowerShell Script

Replace the parameters in the following PowerShell script and execute it in a cloud shell:

```powershell
# Manual input
$principalId = "11111111-1111-1111-1111-111111111111" # Object ID of the replicator enterprise application
$aadTenantId = "11111111-1111-1111-1111-111111111111" # Your AAD tenant id
$billingAccountId = "1234567" # You can find the billing account id in the Azure portal on the Cost Management + Billing overview page.
$enrollmentAccountId = "7654321"

# Build the request
$token = (Get-AzAccessToken -ResourceUrl 'https://management.azure.com').Token
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")
$headers.Add("Authorization","Bearer $token")
$billingRoleAssignmentName = (New-Guid).Guid

$url = "https://management.azure.com/providers/Microsoft.Billing/billingAccounts/$billingAccountId/enrollmentAccounts/$enrollmentAccountId/billingRoleAssignments/$billingRoleAssignmentName`?api-version=2019-10-01-preview"

# Subscription Creator. See https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/assign-roles-azure-service-principals#permissions-that-can-be-assigned-to-the-spn
$roleDefinitionId = "/providers/Microsoft.Billing/billingAccounts/$billingAccountId/enrollmentAccounts/$enrollmentAccountId/billingRoleDefinitions/a0bcee42-bf30-4d1b-926a-48d21664ef71"

$body = "{
`"properties`": {
  `"principalId`": `"$principalId`",
  `"principalTenantId`": `"$aadTenantId`",
  `"roleDefinitionId`": `"$roleDefinitionId`"}`n}"

# Send request
Invoke-RestMethod $url -Method 'Put' -Headers $headers -Body $body | Format-List

# Check that the creation was successfull
Invoke-RestMethod $url -Method 'Get' -Headers $headers | Format-List
```

> The Azure documentation also mentions to use the correct API versions for both the Subscription creation and the role assignment call. For Subscription creation, the replicator uses the API version `...?api-version=2020-09-01`, which reliably works together with the above mentioned PUT call of the EA Account role assignment with the API version: `...?api-version=2019-10-01-preview`.

#### Ensure Retained Subscription Owners

Azure requires that there's at least one "Owner" or "Classic Administrator" role assignment on each Subscription. Unfortunately, it's not a sufficient workaround to inherit the Owner role via the Management Group Hierarchy onto the Subscription. Instead a direct role assignment must exist.

In contrast to other provisioning methods, EA provisioning will not retain a default "Classic Administrator" role assignment on the subscription from the billing account owner. Platform Operators should therefore configure at least one explicit owner under `subscriptionOwnerObjectIds`. We recommend to use the EA Account owner as Subscription Owner. It could also be an empty AAD group or the [Blueprint Service Principal](#blueprint-configuration).

> You should never grant subscription owner roles to the meshStack replicator SPN.

### Use a Customer Agreement

If your company has a Customer Agreement with Microsoft you can also use an automatic REST API in order to create new subscriptions. It is a very similiar process to the [Enterprise Agreement](#set-up-enterprise-agreement-provisioning) variant. The difference is you need two principals, one on the Billing Account tenant that creates the subscription and another one on the target AAD tenant that receives its ownership.

#### Create Source Tenant Principal

1. On the tenant that contains your billing account create a new Enterprise Application.
2. Add either a client secret or federated credentials to it and note down the `Directory (tenant) ID`, `Application (client) ID`, `Object ID`.
    - **Client secret**: generate a client secret and note it down as well.
    - **Federated credentials**: the `federated credential scenario` should be set to "Other issuer". The values for `Issuer` and `Subject identifier` will be shown by the panel during platform configuration after selecting "Workload Identity Federation" as the authentication type.
3. Select the billing profile or invoice section under which you want to create the subscriptions by following the [documentation](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/programmatically-create-subscription-microsoft-customer-agreement?tabs=rest#find-billing-profiles--invoice-sections-to-create-subscriptions) from Microsoft. Write down the ID that looks something like this `/providers/Microsoft.Billing/billingAccounts/5e98e158-xxxx-xxxx-xxxx-xxxxxxxxxxxx:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_xxxx-xx-xx/billingProfiles/AW4F-xxxx-xxx-xxx/invoiceSections/SH3V-xxxx-xxx-xxx`.
4. Go to the billing account and give the newly generated principal one of those roles there: `Owner`, `Contributer`, `Azure Subscription Creator` on an invoice section or `Owner` or `Contributor` on a billing profile or billing account. This allows the principal to generate new Subscriptions.

#### Create Target Tenant Principal

The requirements for the principal on the target tenant is identically with the one from the Enterprise Agreement provisioning. Please follow the section [Set up the Replication Service Principal](#set-up-the-replication-service-principal).

#### meshPanel Configuration

When creating a new platform configuration in the meshPanels admin section, choose Customer Agreement and fill in the form with the data you just noted down. The `Principal Client Secret`, `Principal Object ID` and `Billing Account Principal Client ID` refer to the data of the service principal from the billing/source tenant AAD.

The `Destination AAD ID` must be an ID. Please don't use the domain name variant of it e.g. `*.onmicrosoft.com` but use its UUID form. The principal data in the **Access Configuration** part refers to the target tenant AAD service principal.

> If the source AAD tenant is the same as the destination AAD tenant, ensure to use an ID and not the domain name variant for the source AAD tenant as well.

### Use pre-provisioned Subscriptions

If your organization does not have access to an Enterprise Enrollment, you can alternatively configure meshcloud to
consume subscriptions from a pool of externally-provisioned subscriptions. This is useful for smaller organizations that wish
to use "Pay-as-you-go" subscriptions or if your organization partners with an [Azure Cloud Solution Provider](https://learn.microsoft.com/en-us/partner-center/azure-plan-lp) to provide your subscriptions.

The meshcloud Azure [replication](./meshcloud.tenant.md) detects externally-provisioned subscriptions based on a configurable prefix in the subscription
name. Upon assignment to a meshProject, the subscription is inflated with the right [Landing Zone](./meshstack.azure.landing-zones.md) configuration
and removed from the subscription pool.

## Set up the Metering Service Principal

To read resource usage, a metering principal is needed. It requires the following role on all resources which should be accessed by meshStacks's metering service:

- `Cost Management Reader`

## Set up Blueprint

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

## B2B User Invitation

You can optionally activate AAD B2B guest invitations for users missing in the AAD tenant managed by the meshPlatform.
This configuration is useful if you have one or more "workload" AAD tenants for Azure Subscriptions while having a central
"home tenant" for your organization's user identities that handles O365 and related services.

Before users can access an AAD tenant they've been invited to using Azure B2B, they need to go through Azure's
["Consent Experience"](https://docs.microsoft.com/en-us/azure/active-directory/external-identities/redemption-experience) and accept the invitation. meshStack supports two different entry points into this process:

- The "Go to Azure Portal" link displayed in meshPanel redirects users into Azure Portal and selects the right AAD tenant and Subscription. This will trigger the consent experience in case the user's B2B invitation is pending acceptance.
- meshStack can instruct Azure to send invitation mails directly via the `sendAzureInvitationMail` configuration option.

> B2B Invitations require meshStack to know the user's valid email address which is usually fetched from the [euid](./meshstack.identity-federation.md#externally-provisioned-identities).
