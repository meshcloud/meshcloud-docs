---
id: meshstack.azure.config
title: Configuration Reference
---

This section describes the configuration of an Azure Platform Instance in the meshStack configuration model at `mesh.platforms`.

For easier reference the following sections break down the configuration model in multiple parts. The union of these defines the full configuration model.

<!--snippet:mesh.platform.azure#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzurePlatformConfiguration =
        AzurePlatformCoreConfiguration
      ⩓ AzurePlatformBlueprintConfiguration
      ⩓ { service-principal : ServicePrincipal
        , b2b-user-invitation : Optional InviteB2BUserConfig
        , provisioning : Provisioning
        , role-mappings : List RoleMapping
        , tenant-tags : TenantTags
        }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Core Configuration

<!--snippet:mesh.platforms.azure.core#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzurePlatformCoreConfiguration =
    {-
      platform:
        The meshPlatform identifier

      subscriptionNamePattern:
        Configures the pattern that defines the desired name of Azure Subscriptions managed by meshStack.
        It follows the usual replicator string pattern features.

        Operators must ensure the resulting Subscription names are unique in the managed AAD Tenant.

      group-name-pattern:
        Configures the pattern that defines the desired name of AAD groups managed by meshStack.
        It follows the usual replicator string pattern features and provides the additional replacement:

          1. platformGroupAlias (contains the role name suffix, configurable via Landing Zone)

        (see: http://docs.meshcloud.io/docs/meshstack.replication-configuration.html#string-templating)

        Operators must ensure the group names are unique in the managed AAD Tenant.
    -}
      { platform : Text
      , subscription-name-pattern : Text
      , group-name-pattern : Text
      }
```
<!--Example-->
```dhall
let example
    : AzurePlatformCoreConfiguration
    =
      -- creates subscription names like "customer.project"
      -- and group names like "customer.project-reader"
      { platform = "azure.mylocation"
      , subscription-name-pattern =
          "#{customerIdentifier}.#{projectIdentifier}"
      , group-name-pattern =
          "#{customerIdentifier}.#{projectIdentifier}-#{platformGroupAlias}"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


## Blueprint Configuration

<!--snippet:mesh.platforms.azure.blueprint#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AzurePlatformBlueprintConfiguration =
    {-
        blueprintServicePrincipal:
          Object Id of the Enterprise Application belonging to the Microsoft Application "Azure Blueprints" with Application Id
          f71766dc-90d9-4b7d-bd9d-4499c4331c3f in the managed AAD Tenant. meshStack will grant the necessary permissions on
          managed Subscriptions to this SPN so that it can create System Assigned Managed Identities (SAMI) for Blueprint execution.

          Note: Operators can also explicitly configure an UAMI to be used instead of a SAMI in Azure Landing Zone definitions.
          If an UAMI is not explicitly configured, meshStack will default to using the SAMI.

        blueprintLocation:
          The Azure location where replication creates and updates Blueprint Assignments. Note that it's still
          possible that the Blueprint creates resources in other locations, this is merely the location where the
          Blueprint Assignment is managed.
    -}
      { blueprint-service-principal : Text, blueprint-location : Text }
```
<!--Example-->
```dhall
let example
    : AzurePlatformBlueprintConfiguration
    = { blueprint-service-principal =
          "2a6a62ad-e28b-4eb4-8f1e-ce93dbc76d20"
      , blueprint-location = "westeurope"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Service Principal Configuration

This section configures the Service Principal (SPP) used by meshStack's replicator
to automate project replication. The SPP needs to be configured in the same
AAD Tenant that is used to hold all Subscriptions managed by this meshPlatform.

**Caution**: Currently it is not possible to manage SPPs in the Azure Portal. As a result we strongly recommend to create the SPP via the API (e.g. via Terraform) or the Azure CLI. This is required in order to retrieve the necessary client secret that meshcloud needs. You can achieve this by running:

```bash
az ad sp create-for-rbac --name ${desired-name-for-your-azure-app}
# Save the `password` result of this command; it can never be retrieved again!
```


<!--snippet:mesh.platform.azure.servicePrincipal#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let ServicePrincipal =
    {-
      Configures an Azure Service Principal.

          aadTenant:
              Domain name or Id of the AAD Tenant that holds the Service Principal.

          objectId:
              The Object Id of the Service Principal. In Azure Portal, this is the Object Id
              of the "Enterprise Application".

          clientId:
              The Application Client Id. In Azure Portal, this is the Application Id of the
              "Enterprise Application" but can also be retrieved via the "App Registration" object
              as "Application (Client) Id".

          clientSecret:
              A valid secret for accessing the SPN. In Azure Portal, this can be configured on the
              "App Registration" objecct.
    -}
      { aad-tenant : Text
      , object-id : Text
      , client-id : Text
      , client-secret : Secret
      }
```
<!--Example-->
```dhall
let example
    : ServicePrincipal
    = { aad-tenant = "example.onmicrosoft.com"
      , object-id = "655985db-ca43-4b9f-b317-9dd3d0289c50"
      , client-id = "2a51f406-27fd-4e40-8bd3-fe83ff934a47"
      , client-secret = Secret.Native "AZURE_CLIENT_SECRET"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### B2B User Invitation

This configuration is optional. When configured, instructs the replicator to create AAD B2B guest invitations for
users missing in the AAD tenant managed by this meshPlatform. This configuration is useful if you have one or more
"workload" AAD tenants for Azure Subscriptions while having a central "home tenant" for your organization's user
identities that handles O365 and related services.

Before users can access an AAD tenant they've been invited to using Azure B2B, they need to go through Azure's
["Consent Experience"](https://docs.microsoft.com/en-us/azure/active-directory/external-identities/redemption-experience) and accept the invitation. meshStack supports two different entry points into this process:

- The "Go to Azure Portal" link displayed in meshPanel redirects users into Azure Portal and selects the right AAD tenant and Subscription. This will trigger the consent experience in case the user's B2B invitation is pending acceptance.
- meshStack can instruct Azure to send invitation mails directly via the `sendAzureInvitationMail` configuration option.

> B2B Invitations require meshStack to know the user's valid email address which is usually fetched from the [euid](./meshstack.identity-federation.md#externally-provisioned-identities).

<!--snippet:mesh.platform.azure.inviteB2BUserConfig#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let InviteB2BUserConfig =
    {-
      send-azure-invitation-mail:
          When true, meshStack instructs Azure to send out Invitation mails to invited users.
          These mails allows users to redeem their invitation to the AAD tenant only using email and
          Azure Portal. This is useful if some of your users don't have access to meshPanel or you do not
          expect them to sign in to Azure Portal via meshPanel.

          Note: meshStack always instructs Azure to send invitation mails for meshUsers that are flagged as guests,
          regardless of the configured value.

      redirect-url:
          This is the URL that Azure's consent experience redirects users to after they accept their invitation.
          Operators should consider redirecting user to Azure Portal with the platform's AAD tenant pre-selected
          using an URL like "https://portal.azure.com/example.onmicrosoft.com".
    -}
      { send-azure-invitation-mail : Bool, redirect-url : Text }
```
<!--Example-->
```dhall
let example
    : Optional InviteB2BUserConfig
    = Some
        { redirect-url =
            "https://portal.azure.com/example.onmicrosoft.com"
        , send-azure-invitation-mail = True
        }

let exampleNoB2bInvites
    : Optional InviteB2BUserConfig
    = None InviteB2BUserConfig
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Provisioning Configuration

meshStack allows operators to control how the replicator provisions Subscriptions for meshProjects. meshStack supports automated provisioning from an existing Enterprise Agreement (EA) Enrollment Account or consuming pre-provisioned Subscriptions created from other sources.

Pre-provisioned Subscriptions are useful when no EA is available and operators want to consume CSP or Pay-as-you-go Subscriptions instead.

> **Important**: It is not supported to re-use Subscriptions for multiple meshProjects (for example when you marked a meshProject for deletion but did not properly delete the Subscription in Azure but and instead re-use them for pre-provisioning). If you do this, the metering system will assign the Subscription to the wrong meshProject for billing calculation. Double billed resources will be the consequence.

<!--snippet:mesh.platform.azure.provisioning#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let SubscriptionOwner =
    {-
      This configuration is available on all provisioning types.

          subscriptionOwnerObjectIds:
              One or more principals Object Ids (e.g. groups, SPNs) that meshStack will ensure have an "Owner" role
              assignment on managed subscriptions. This can be useful to satisfy Azure's constraint of at least
              one direct "Owner" role assignment per Subscription.
    -}
      { subscription-owner-object-ids : List Text }

let EnterpriseEnrollment =
    -- Creating new Subscriptions under an Enterprise Agreement (EA) Enrollment Account.

      let EnterpriseEnrollmentConfig =
          {-
            enrollmentAccountId:
                Id of the EA Enrollment Account used for the Subscription creation. Should look like this:
                /providers/Microsoft.Billing/billingAccounts/1234567/enrollmentAccounts/7654321
                See: https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/programmatically-create-subscription-enterprise-agreement?tabs=rest-getEnrollments%2Crest-EA#find-accounts-you-have-access-to

            subscriptionOfferType:
                The Microsoft Subscription offer type to use when creating subscriptions.
                Common values are "Production" for standard and "DevTest" for Dev/Test subscriptions.

            useLegacySubscriptionEnrollment:
                Uses the old Subscription enrollment API in its preview version. The new API is currently experimental.

            subscriptionCreationErrorCooldownSec:
                There is a safety mechanism to avoid duplicate Subscription creation in case
                of an error on Azure's EA API. This delay should be a bit higher then it usually takes to
                create subscriptions. For big installations this is somewhere between 5-15 minutes.
          -}
            { enrollment-account-id : Text
            , subscription-offer-type : Text
            , useLegacySubscriptionEnrollment : Bool
            , subscription-creation-error-cooldown-sec : Natural
            }

      in    SubscriptionOwner
          ⩓ { enterprise-enrollment : EnterpriseEnrollmentConfig }

let PreProvisioned =
    -- Look up pre-provisioned Subscriptions in the AAD Tenant based on a prefix name.

      let PreProvisionedConfig =
          {-
            unusedSubscriptionNamePrefix:
                The prefix that identifies unused subscriptions. Subscriptions will be renamed during meshStack's
                project replication, at which point they should no longer carry this prefix.
          -}
            { unused-subscription-name-prefix : Text }

      in  SubscriptionOwner ⩓ { pre-provisioned : PreProvisionedConfig }

let Provisioning =
      < EnterpriseEnrollment : EnterpriseEnrollment
      | PreProvisioned : PreProvisioned
      >
```
<!--Example-->
```dhall
let exampleEnterpriseEnrollment =
      Provisioning.EnterpriseEnrollment
        { subscription-owner-object-ids =
          [ "390eaa30-67c3-4314-9368-33c76472e6f1" ]
        , enterprise-enrollment =
          { enrollment-account-id =
              "/providers/Microsoft.Billing/billingAccounts/1234567/enrollmentAccounts/7654321"
          , subscription-offer-type = "MS-AZR-0017P"
          , useLegacySubscriptionEnrollment = False
          , subscription-creation-error-cooldown-sec = 900
          }
        }

let examplePreProvisioned =
      Provisioning.PreProvisioned
        { subscription-owner-object-ids = [] : List Text
        , pre-provisioned.unused-subscription-name-prefix = "unused-"
        }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Role Mappings

Role mappings instruct the replicator how to map meshProject roles to Azure RBAC role assignments
during replication. Operators can override these default role mappings in Landing Zones.

Role mappings must be configured for all [meshProject roles](./meshcloud.project.md#project-roles),
you can refer to the official [Azure documentation](https://docs.microsoft.com/bs-latn-ba/azure/role-based-access-control/built-in-roles) for additional information on Azure roles.

<!--snippet:mesh.platform.azure.roleMapping#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let RoleMapping =
    {-
      Defines the mapping of a meshProject role to Azure RBAC Roles.

          mapKey:
              The id of the meshProject role defined in this mapping.

          mapValue.id:
              The id of an Azure RBAC Role. This can be a built-in or custom RBAC role.

          mapValue.alias:
              A custom alias for this role. The alias is used for naming IAM groups mapped to this role.
              See groupNamePattern configuration.
    -}
      { mapKey : Text, mapValue : { alias : Text, id : Text } }
```
<!--Example-->
```dhall
let example
    : RoleMapping
    =
      -- This mapping gives all users with meshProject Role "admin" an Azure "Owner" role assignment
      -- on the subscription managed for this meshProject.
      { mapKey = "admin"
      , mapValue =
        { alias = "owner", id = "8e3af657-a8ff-443c-a75c-2fe8c4bcb635" }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->
