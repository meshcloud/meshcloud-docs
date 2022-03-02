---
id: meshstack.gcp.configuration-reference
title: Configuration Reference
---

This section describes the configuration of a GCP Platform Instance in the meshStack [configuration model](./meshstack.index.md#configuration)
at `mesh.platforms`.

For easier reference the following sections break down the configuration model in multiple parts. The union of these
defines the full configuration model.

<!--snippet:mesh.platforms.gcp#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let GcpPlatform =
        GcpPlatformCoreConfiguration
      ⩓ GcpPlatformCredentialConfiguration
      ⩓ GcpPlatformRoleMappingConfiguration
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Core Configuration

<!--snippet:mesh.platforms.gcp.core#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
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

      projectNamePattern:
        All the usual available replicator string template properties are available.
        The result must be 4 to 30 characters.
        Allowed characters are: lowercase and uppercase letters, numbers, hyphen,
        single-quote, double-quote, space, and exclamation point.
        When length restrictions are applied, the abbreviation will be in the middle and marked by a single-quote

      projectIdPattern:
        All the usual available replicator string template properties are available.
        The resulting string must not exceed a total length of 30 characters. Only alphanumeric + hyphen are allowed.
        We recommend that configuration include at least 3 characters of the random parameter to reduce the chance of
        naming collisions.

      groupNamePattern:
        A String.format format string receiving the following arguments:
          1. meshCustomer identifier
          2. meshProject identifier
          3. meshProject ID (numeric)
          4. role name suffix (configurable via Landing Zone)

      allowHierarchicalFolderAssignment:
        Configuration flag to enable or disable hierarchical folder assignment in GCP. This means
        projects can be assigned to sub folders of the defined resource manager folder in a landing zone.
        If this config flag is disabled the replicator forces to create projects only directly under the resource manager folder.
        Every project which is not directly attached to the resource manager folder will be then moved via gcp function to the right folder.

      tenantTags:
        Configures how to map tags coming from meshfed to project labels in GCP. For more information please look into
        the TenantTags type documentation.
    -}
      { platform : Text
      , domain : Text
      , customer-id : Text
      , billing-account-id : Text
      , project-name-pattern : Text
      , project-id-pattern : Text
      , group-name-pattern : Text
      , allow-hierarchical-folder-assignment : Bool
      , tenant-tags : TenantTags
      }
```
<!--Example-->
```dhall
let example
    : GcpPlatformCoreConfiguration
    = { platform = "gcp.mylocation"
      , domain = "myorg.example.com"
      , customer-id = " Cxxxx123"
      , billing-account-id = "123456-1234ABCD-1234FF"
      , project-name-pattern =
          "#{customerIdentifier:%.14s} #{projectIdentifier:%.15s}"
      , project-id-pattern =
          "#{customerIdentifier:%.15s}-#{projectIdentifier:%.10s}-#{rand:%.3s}"
      , group-name-pattern =
          "#{customerIdentifier}.#{projectIdentifier}-#{platformGroupAlias}"
      , allow-hierarchical-folder-assignment = True
      , tenant-tags =
        { namespace-prefix = "meshstack_"
        , tag-mappers =
          [ { key = "cident"
            , value-pattern = "prefix-\${customerIdentifier}"
            }
          ]
        }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Multiple Billing Accounts

In order to maintain symmetry to other public cloud platforms, meshStack consolidates billing of all GCP projects managed
under the same GCP Platform Instance to a single Google Cloud Billing Account. The billing account id is thus configured
on the platform level. To use multiple billing accounts consider configuring multiple GCP meshPlatforms in meshStack.


### Billing Account owned by a different organization

In order to use a billing account that is owned by a different organization the permissons for `meshfed-service` user need to be adjusted.

Operators create a custom role `meshfed-billing-creator` in the organization that owns the target billing account with the following permisson

```text
billing.resourceAssociations.create
```

The `meshfed-service` user needs to be granted the `meshfed-billing-creator` role in the organization that owns the target billing account.

Following the principle of least privilege, operators should remove the `billing.resourceAssociations.create` permisson from the custom role `meshfed-service` created in [meshfed-service IAM Role](#meshfed-service-iam-role).

## Credentials

Configure the [meshfed-service Service Account](#meshfed-service-Service Account) and [meshfed-service Service User](#meshfed-service-user)
using the following options.

<!--snippet:mesh.platforms.gcp.credentials#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let GcpPlatformCredentialConfiguration =
    {-
      serviceAccountCredentialsB64:
        base64 encoded credentials.json file for a GCP ServiceAccount. The replicator uses this Service Account
        to automate GCP API operations (IAM, ResourceManager etc.).
    -}
      { service-account-credentials-b64 : Secret }
```
<!--Example-->
```dhall
let example
    : GcpPlatformCredentialConfiguration
    = { service-account-credentials-b64 = Secret.Native "b123" }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## GCP Role Mapping

The [project roles](meshcloud.project.md#project-roles) are mapped to user roles in GCP.
This mapping is fully customizable and can use custom as well as built-in roles.

Operators can also override these role mappings per [Landing Zone](meshstack.gcp.landing-zones.md). This also offers
more granular control over possible role mappings. Any role mappings
defined in the Landing Zone take precedence over the role mappings defined on the platform level.

<!--snippet:mesh.platforms.gcp.rolemappings#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let GcpPlatformRoleMappingConfiguration =
    {-
      roleMappings:
        A list of mappings from meshProjecRole identifiers to GCP role ids (e.g. roles/editor).
        The replicator uses these to derive IAM Role bindings for meshProject roles in GCP.

        Operators can override these default role mappings in Landing Zones.
    -}
      { role-mappings : List { mapKey : Text, mapValue : Text } }
```
<!--Example-->
```dhall
let example
    : GcpPlatformRoleMappingConfiguration
    = { role-mappings =
        [ { mapKey = "admin", mapValue = "roles/editor" }
        , { mapKey = "user"
          , mapValue = "organizations/123456/roles/custom-role"
          }
        ]
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->
