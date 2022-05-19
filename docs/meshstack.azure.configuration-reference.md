---
id: meshstack.azure.config
title: Configuration Reference
---

This section describes the top-level configuration options available for an Azure Platform Instance in the [platform config](administration.platforms.md#platform-connection-config). For details on how to set this up, please have a look at this [guide](meshstack.how-to.integrate-meshplatform-azure-manually.md). All individual configuration options are explained directly in meshPanel.

* **Replication Connection and Credential Information**: A meshStack replication service principal is used to access the configured azure tenant.
* **Blueprint configuration**: The Automation Account is used to provide all AWS StackSets and Lambda Functions that shall be executed via meshLandingZones.
* **Replication Behavior**: Details like naming patterns for AWS Accounts and AWS Account Aliases can be defined here.
* **Role Mappings**: For AWS 2 different kinds of role mappings are supported. The external role mappings are only checked against the SAML IDP setting. No policies are attached nor checked. It is assumed that an external source (e.g. an AVM) has assigned proper policies to them. The other option are fully managed role mappings via meshstack. They are created if needed and also the polices listed are checked and attached.
* **Tag Configuration**: [Tag Configuration](meshstack.metadata-tags.md#tags-in-cloud-tenants) can be used to set certain tags on AWS accounts and resources inside these accounts.
* **B2B User Invitation**: This configuration is optional. When configured, instructs the replicator to create AAD B2B guest invitations for
users missing in the AAD tenant managed by this meshPlatform. This configuration is useful if you have one or more
"workload" AAD tenants for Azure Subscriptions while having a central "home tenant" for your organization's user
identities that handles O365 and related services. Details about some implications of it can be found [here](#b2b-user-invitation).
* **IAM Configuration**: AWS SSO should be used for IAM. meshStack creates groups in AWS SSO, assigns users to them and establishes access to the AWS accounts for the according groups with defined Permission Sets.
* **Metering Connection and Credential Information**: A meshStack metering service principal is used to access the configured azure tenant.
* **Metering Behavior**: You can manage how to handle some aspects of how chargeback is applied. I.e. you can exclude taxes from the internal chargeback.

### B2B User Invitation

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
