---
id: meshstack.aws.index
title: Integration
---

AWS is a proprietary public cloud platform provided by Amazon Web Services. meshStack supports project and user management for AWS to include AWS services into cloud projects managed by meshStack.

meshStack supports project creation, configuration, user management and SSO for AWS.

## Integration Overview

To enable integration with AWS, Operators deploy and configure the meshStack AWS Connector. Operators can configure one or multiple `PlatformInstance`s of `PlatformType` AWS. In a typical setup, we recommend grouping each AWS `PlatformInstance` in a separate `Location`.

This makes AWS available to meshProjects like any other cloud platform in meshStack.

meshStack automatically configures AWS IAM in all managed accounts to integrate SSO with [meshStack Identity Federation](./meshstack.identity-federation.md).

meshStack uses [AWS Organizations](https://aws.amazon.com/organizations/) to provision and manage AWS Accounts for [meshProjects](./meshcloud.project.md). To use AWS with a meshStack deployment, operators will need an AWS [management account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html) acting as the parent of all accounts managed by meshStack. The complete meshStack setup contains three dedicated accounts:

* meshcloud Account - `meshfed-service-user` (Replicator User) should be created in this account. We have a dedicated account for this user so that meshcloud can easily roll the credentials of the user when needed.
* Management Account - All accounts created by meshStack reside "under" this account and its Organization Units. `meshfed-service-user` needs to assume a role in this account to perform tasks such as new account provisioning.
* Automation Account - This account is usually used to host certain CloudFormation templates, provide an Account Vending Machine and is needed to properly setup Landing Zones.

```mermaid
graph LR;
    subgraph Organization Account
        meshfedServiceRole["MeshfedServiceRole"];
        costExplorerServiceRole["MeshCostExplorerServiceRole"];
    end
    subgraph meshcloud Account
        replicatorUser["ReplicatorUser & AccessKey"];
        costExplorerUser["CostExplorerUser & AccessKey"];
    end
    replicatorUser--Trusted Entity with External-id-->meshfedServiceRole;
    costExplorerUser--Trusted Entity with External-id-->costExplorerServiceRole;
    subgraph Automation Account
        meshfedAutomationRole["MeshfedAutomationRole"];
    end
    replicatorUser--Trusted Entity with External-id-->meshfedAutomationRole
```

### IAM Roles and Service Control Policies

When a user (e.g. a developer) accesses an AWS Account, they are assigned an AWS IAM role based on their project role configured on the corresponding meshProject. Operators can configure these roles and their permissions by providing an [AWS Cloud Formation](https://aws.amazon.com/cloudformation/) template. meshStack uses this template to initialize and update AWS Account configurations.

When configuring these roles, operators must take care to correctly guard against privilege escalation and maintain project sandboxing. Operators should also consider leveraging [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) to simplify role configuration and set up a guarded boundary for the maximum of permissions granted to any role.

## Platform Instance Configuration

> Note that we have developed [terraform](https://www.terraform.io/) modules to automate setting up the three accounts mentioned above. This is the preferred way to set up the accounts. Alternatively, you can manually create the following resources in the respective accounts to integrate your AWS platform.

### meshcloud Account Setup

The meshStack AWS Connector uses a dedicated set of IAM credentials to work with AWS APIs on behalf of meshStack. To create these credentials, create a user in IAM with these specifications:

* User name: `meshfed-service-user`
* AWS access type: Programmatic access - with an access key

This user should have the following policy attached to assume the respective roles in the management account and in the automation account. Replace the MANAGEMENT_ACCOUNT_ID, AUTOMATION_ACCOUNT_ID and EXTERNAL_ID placeholders accordingly.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::<<MANAGEMENT_ACCOUNT_ID>>:role/MeshfedServiceRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<<EXTERNAL_ID>>"
                }
            }
        },
        {
            "Sid": "",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::<<AUTOMATION_ACCOUNT_ID>>:role/MeshfedAutomationRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<<EXTERNAL_ID>>"
                }
            }
        }
    ]
}
```

Operators should generate a unique and random value for `EXTERNAL_ID`, e.g. a GUID. meshStack AWS Connector will supply this [ExternalId](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) only when accessing organization member accounts from a privileged (system) context. Using the ExternalId therefore increases the security of member accounts in your organization.

Operators need to securely inject the generated credentials and `EXTERNAL_ID` into the configuration of the AWS Connector.

### AWS Management Account Setup

> Security Note: The demonstrated IAM Policies implement the minimum of configuration required to produce
> a working AWS integration using meshStack AWS Connector. This setup is based on the [default AWS Organization configuration](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html).
> We advise operators to determine the specific needs and requirements for their usage of AWS and implement more restrictive
> roles and policies.

This `MeshfedServiceRole` should be created in the management account with the following policy attached.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "StsAccessMemberAccount",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/MeshstackAccountAccessRole"
        },
        {
            "Sid": "OrgManagementAccess1",
            "Effect": "Allow",
            "Action": [
                "organizations:UntagResource",
                "organizations:TagResource",
                "organizations:MoveAccount",
                "organizations:ListTagsForResource",
                "organizations:ListParents",
                "organizations:ListOrganizationalUnitsForParent",
                "organizations:DescribeOrganizationalUnit",
                "organizations:DescribeAccount",
                "organizations:CreateOrganizationalUnit"
            ],
            "Resource": [
                "arn:aws:organizations::<<MANAGEMENT_ACCOUNT_ID>>:root/o-*/r-*",
                "arn:aws:organizations::*:ou/o-*/ou-*",
                "arn:aws:organizations::*:account/o-*/*"
            ]
        },
        {
            "Sid": "OrgManagementAccess2",
            "Effect": "Allow",
            "Action": [
                "organizations:ListRoots",
                "organizations:ListAccounts",
                "organizations:DescribeCreateAccountStatus",
                "organizations:CreateAccount"
            ],
            "Resource": "*"
        },
        {
            "Sid": "OrgManagementAccessSSO",
            "Effect": "Allow",
            "Action": [
                "sso:ListAccountAssignments",
                "sso:CreateAccountAssignment",
                "sso:DescribeAccountAssignmentCreationStatus"
            ],
            "Resource": [
              "<<AWS_SSO_INSTANCE_ARN>>",
              "arn:aws:sso:::permissionSet/*/*",
              "arn:aws:sso:::account/*"
            ]
        }
    ]
}
```

The following trust relationship needs to be attached to the MeshfedServiceRole so that the meshfed-service-user can assume the role.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<<MESHCLOUD_ACCOUNT_ID>>:user/meshfed-service-user"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<<EXTERNAL_ID>>"
        }
      }
    }
  ]
}
```

Replace `MESHCLOUD_ACCOUNT_ID` with the dedicated meshcloud AWS account id where the `meshfed-service-user` lives. Replace `EXTERNAL_ID` accordingly as well.

> For Enrollment with AWS Control Tower, the `MeshfedServiceRole` needs to have extra permissions to invoke the Account Factory.
> More information on that can be found at this [AWS Guide](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/controlling_access.html#permissions-end-users-console).
> To make use of these permissions, there must be an available launch path defined in AWS Service Catalog, as stated also in the [prerequisites](#aws-control-tower-integration).

### Automation Account Setup

The automation account should contain a `MeshfedAutomationRole`.

The following policy and trust relationship should be attached to the role so that `meshfed-service-user` can assume it in order to roll out CloudFormation stack instances in the newly provisioned accounts or to invoke a Lambda that would trigger account bootstrapping.

<!--DOCUSAURUS_CODE_TABS-->
<!--Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AutomationPolicy",
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction",
                "cloudformation:UpdateStackInstances",
                "cloudformation:ListStackInstances",
                "cloudformation:DescribeStackSet",
                "cloudformation:CreateStackInstances"
            ],
            "Resource": "*"
        }
    ]
}
```
<!--Trust relationship-->
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
         "AWS": "arn:aws:iam::<<MESHCLOUD_ACCOUNT_ID>>:user/meshfed-service-user"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "<<EXTERNAL_ID>>"
        }
      }
    }
  ]
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

In order to roll out CloudFormation Stack Instances in the newly provisioned accounts, create the `AWSCloudFormationStackSetAdministrationRole` as specified in the [documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs-self-managed.html) and attach the following policy and trust relationship.

<!--DOCUSAURUS_CODE_TABS-->
<!--Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowAssumeCloudFormationExecutionOnAllAccounts",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/AWSCloudFormationStackSetExecutionRole"
        }
    ]
}
```
<!--Trust relationship-->
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudformation.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### IAM Configuration

Currently meshStack supports 2 different ways of integrating AWS IAM with meshStack, either via [AWS SSO](#aws-sso) or [meshIdB](#meshidb-deprecated) (deprecated). The AWS SSO integration is the preferred integration as it allows using your company's central IdP to log in to AWS. This simplifies integration with meshStack, gives you more control over the AuthN part and improves UX for end-users when logging in to AWS.

#### AWS SSO

The integration with AWS SSO basically works like this: AuthN is done via the company's IdP. Additionally users will be synced via AWS SSO Automated Provisioning (SCIM) to AWS SSO. meshStack takes care of AuthZ. That means meshStack will create groups for every project role on a meshTenant in AWS SSO. meshStack will assign the according users to these groups. As a last step, meshStack assigns the created groups to the according AWS account with configured PermissionSets.

Details about what needs to be configured inside AWS SSO can be found [here](meshstack.aws.sso-setup.md).

> An important precondition regarding the automated user provisioning to AWS SSO is, that the userName in AWS SSO will be set to the [euid](meshstack.identity-federation.md#externally-provisioned-identities). This limitation is caused by AWS SSO only allowing to filter on userNames to find users. If an AAD is used as the IdP, that means the userPrincipalName in the AAD must be set to the [euid](meshstack.identity-federation.md#externally-provisioned-identities), as AAD will always set the userName in AWS SSO to its userPrincipalName.

<!--snippet:mesh.platforms.aws.iam-configuration.aws-sso-->

The following configuration options are available at `mesh.platforms.aws.iam-configuration.aws-sso`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AwsSso =
    {-
      scim-endpoint:
        The SCIM endpoint you can find in you AWS SSO Automatic provisioning config.
      arn:
        The ARN of your AWS SSO Instance.

      group-name-pattern:
        Configures the pattern that defines the desired name of AWS SSO groups managed by meshStack.
        It follows the usual replicator string pattern features and provides the additional replacement:

          1. platformGroupAlias (contains the role name suffix, configurable via Landing Zone)

        (see: http://docs.meshcloud.io/docs/meshstack.replication-configuration.html#string-templating)

        Operators must ensure the group names will be unique within the same AWS SSO Instance with that
        configuration. meshStack will additionally prefix the group name with "mst-" to be able to identify
        the groups that are managed by meshStack.

      sso-access-token:
        The AWS SSO Access Token that was generated via the Automatic provisioning config in AWS SSO.

      sign-in-url:
        The AWS SSO Sign Url, that must be used by end-users to log in via AWS SSO to AWS Management Console.

      role-mappings:
        Defines the mapping of a meshProject role to an AWS SSO PermissionSet. The mapKey is the identifier of
        meshProject role. The aws-role-name will be used in the group name. The permission-set-arns will be
        assigned to the created group.
    -}
      { scim-endpoint : Text
      , arn : Text
      , group-name-pattern : Text
      , sso-access-token : Secret.Type
      , sign-in-url : Text
      , role-mappings :
          List
            { mapKey : Text
            , mapValue :
                { aws-role-name : Text, permission-set-arns : List Text }
            }
      }
```
<!--Example-->
```dhall
let example
    : AwsSso
    = { scim-endpoint =
          "https://scim.eu-central-1.amazonaws.com/xxxxx-xxxx-xxxx-xxxx/scim/v2/"
      , arn = "arn:aws:sso:::instance/ssoins-123456789"
      , group-name-pattern =
          "\${customerIdentifier}.\${projectIdentifier}.\${platformGroupAlias}"
      , sso-access-token = Secret.fromEnv "AWS_SSO_ACCESS_TOKEN"
      , sign-in-url = "https://meshcloud-dev.awsapps.com/start"
      , role-mappings =
        [ { mapKey = "admin"
          , mapValue =
            { aws-role-name = "meshstack-project-admin"
            , permission-set-arns =
              [ "arn:aws:sso:::permissionSet/ssoins-123456789/ps-123456789"
              ]
            }
          }
        , { mapKey = "user"
          , mapValue =
            { aws-role-name = "meshstack-project-developer"
            , permission-set-arns =
              [ "arn:aws:sso:::permissionSet/ssoins-123456789/ps-456789123"
              ]
            }
          }
        , { mapKey = "reader"
          , mapValue =
            { aws-role-name = "meshstack-project-reader"
            , permission-set-arns =
              [ "arn:aws:sso:::permissionSet/ssoins-123456789/ps-789123456"
              ]
            }
          }
        ]
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### meshIdB (deprecated)

As AWS SSO is a rather new AWS feature, meshStack integrated IAM for AWS differently in the past. This AWS IAM integration should not be used
for new integrations anymore. During replication meshStack configures meshIdB as an IdP within the managed account. Additionally according IAM
roles are created during replication (dependent on configuration either my meshStack or by a CF template or a lambda function that are configured.
in the Landing Zone). meshStack also sets up a trust relationship to meshIdB in order to allow SSO for the project users.
meshStack additionaly creates according roles in the meshIdB so the AuthZ information on which accounts can be accessed
by which user are then part of the SAML token AWS receives after logging in via meshIdB.

<!--snippet:mesh.platforms.aws.iam-configuration.mesh-idb-->

The following configuration options are available at `mesh.platforms.aws.iam-configuration.mesh-idb`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let MeshIdb =
    {-
      role-mappings-managed:
        Defines the mapping of a meshProject role to an AWS IAM Role. As this is a managed mapping, meshStack will
        take care of creating the AWS IAM Role. The mapKey is the identifier of
        meshProject role. The aws-role-name will be used in the SAML role that will be created for the mapping.
        The policies will be assigned to the new IAM Role that will be created by meshStack.
      role-mappings-external:
        Defines the mapping of a meshProject role to an AWS IAM Role. As this is an external mapping, meshStack will
        not take care of creating the AWS IAM Role and assigning some policies to it. meshStack will only assign
        users to the according SAML Role. The IAM Role must be provisioned in the managed account by e.g.
        Cloud Formation Templates or a Lambda function defined in the Landing Zone. The mapKey is the identifier of
        meshProject role. The aws-role-name will be used in the SAML role that will be created for the mapping.
    -}
      { role-mappings-managed :
          List
            { mapKey : Text
            , mapValue : { aws-role-name : Text, policies : List Text }
            }
      , role-mappings-external :
          List { mapKey : Text, mapValue : { aws-role-name : Text } }
      }
```
<!--Example-->
```dhall
let exampleManaged
    : MeshIdb
    = { role-mappings-managed =
        [ { mapKey = "admin"
          , mapValue =
            { aws-role-name = "meshstack-project-admin"
            , policies = [ "arn:aws:iam::aws:policy/AdministratorAccess" ]
            }
          }
        , { mapKey = "user"
          , mapValue =
            { aws-role-name = "meshstack-project-developer"
            , policies = [ "arn:aws:iam::aws:policy/AmazonS3FullAccess" ]
            }
          }
        , { mapKey = "reader"
          , mapValue =
            { aws-role-name = "meshstack-project-reader"
            , policies = [ "arn:aws:iam::aws:policy/ReadOnlyAccess" ]
            }
          }
        ]
      , role-mappings-external =
          [] : List { mapKey : Text, mapValue : { aws-role-name : Text } }
      }

let exampleExternal
    : MeshIdb
    = { role-mappings-external =
        [ { mapKey = "admin"
          , mapValue.aws-role-name = "meshstack-project-admin"
          }
        , { mapKey = "user"
          , mapValue.aws-role-name = "meshstack-project-developer"
          }
        , { mapKey = "reader"
          , mapValue.aws-role-name = "meshstack-project-reader"
          }
        ]
      , role-mappings-managed =
          [] : List
                 { mapKey : Text
                 , mapValue :
                     { aws-role-name : Text, policies : List Text }
                 }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Project-Account Email Addresses

AWS requires a unique email address for each account. Operators must thus configure a wildcard email address pattern with a placeholder `%s`. The pattern must not exceed a total length of `20` characters (including the placeholder). For example, this pattern

```yaml
accountEmailTemplate: aws+%s@meshcloud.io
```

allows generation of account names:

* aws+customer.projectA@meshcloud.io
* aws+customer.projectB@meshcloud.io


### Account Alias Pattern


Accounts in AWS get an alias assigned. This alias is fully customizable. A `printf` format string is used. You can read about all the available options in the official Java documentation about [`String.format`](https://docs.oracle.com/javase/8/docs/api/java/util/Formatter.html#syntax).

For example a string pattern `%s.%s` would generate: `customer.project`. Which is also the default.

> The account alias must be unique across all of AWS. Operators should therefore consider using a company-specific prefix together with a combination of meshCustomer and meshProject identifier.

The following arguments are provided:

1. argument: meshCustomer [identifier](./meshstack.identifiers.md)
2. argument: meshProject [identifier](./meshstack.identifiers.md)
3. argument: meshProject [ID (numeric)](./meshstack.identifiers.md)

You can decide if you want to enforce the account alias by using the `enforceAccountAlias` flag. If you want to keep any existing account alias (which might not fit into the defined pattern), set this flag to `false`.

### Identifier Configuration

meshStack operators that want to use AWS must configure their deployment to restrict identifier lengths to meet AWS requirements. The maximum allowed lengths are:

```yaml
customer_identifier_length: 16
project_identifier_length: 30
```

### AWS Control Tower Integration

(also refer to [AWS Management Account Setup](#aws-management-account-setup))

A `PlatformInstance` can be configured to integrate with an existing AWS Control Tower setup.
In order to manage accounts created by meshStack with AWS Control Tower, these need to be "enrolled".
AWS Control Tower utilizes an Account Factory, to provide new accounts or enroll other accounts with it.
AWS Control Tower will create an Account Factory Product in AWS Service Catalog, that will be invoked to enroll accounts.
meshStack can be enabled to trigger the Account Factory via AWS Service Catalog.
The correct Id of the Account Factory Product needs to be specified in the enrollment configuration besides the management account Id.
meshStack will create new accounts as usual and in a later step will enroll them via the Account Factory with AWS Control Tower.

<!--snippet:mesh.platforms.aws.enrollment-configuration-->

The following configuration options are available at `mesh.platforms.aws.enrollment-configuration`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let EnrollmentConfiguration =
      { management-account-id :
          {- The account Id of the management account configured for the platform instance. -}
          Text
      , account-factory-product-id :
          {- The product Id of the AWS Account Factory Product in AWS Service Catalog, that should be used for enrollment. -}
          Text
      }
```
<!--Example-->
```dhall
let example
    : EnrollmentConfiguration
    = { management-account-id = "123456789012"
      , account-factory-product-id = "prod-a1b2c3d4e5"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

> In order to enroll created accounts with AWS Control Tower, **a Landing Zone must be configured**. The `Target Organization Unit Id` from the Landing Zone
> configuration must belong to a OU that is already enrolled with AWS Control Tower.
> Refer to [Landing Zone Configuration](./meshstack.aws.landing-zones.md#target-organization-unit-id) for more information.

The following prerequisites must be fulfilled for the enrollment to work:

1. A configured AWS Control Tower Service
2. All [AWS prerequisites](https://docs.aws.amazon.com/controltower/latest/userguide/enroll-account.html)
3. AWS Service Catalog needs to have an AWS Control Tower Account Factory Portfolio
4. The portfolio needs to contain an AWS Control Tower Account Factory Product
5. The AWS Control Tower Account Factory Product needs to have at least one active Provisioned Artifact (active version)
6. There needs to be a launch path with permissions to invoke the AWS Account Factory Product for meshStack access
7. `MeshfedServiceRole` requires the attached policies `AWSServiceCatalogEndUserFullAccess` and `AWSServiceCatalogAdminReadOnlyAccess` and in addition some extra permissions. These are also described in the [AWS Docs](https://docs.aws.amazon.com/controltower/latest/userguide/roles-how.html). We recommend attaching another custom policy to the `MeshfedServiceRole` that contains the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSControlTowerAccountFactoryAccess",
      "Effect": "Allow",
      "Action": [
        "sso:GetProfile",
        "sso:CreateProfile",
        "sso:UpdateProfile",
        "sso:AssociateProfile",
        "sso:CreateApplicationInstance",
        "sso:GetSSOStatus",
        "sso:GetTrust",
        "sso:CreateTrust",
        "sso:UpdateTrust",
        "sso:GetPeregrineStatus",
        "sso:GetApplicationInstance",
        "sso:ListDirectoryAssociations",
        "sso:ListPermissionSets",
        "sso:GetPermissionSet",
        "sso:ProvisionApplicationInstanceForAWSAccount",
        "sso:ProvisionApplicationProfileForAWSAccountInstance",
        "sso:ProvisionSAMLProvider",
        "sso:ListProfileAssociations",
        "sso-directory:ListMembersInGroup",
        "sso-directory:AddMemberToGroup",
        "sso-directory:SearchGroups",
        "sso-directory:SearchGroupsWithGroupName",
        "sso-directory:SearchUsers",
        "sso-directory:CreateUser",
        "sso-directory:DescribeGroups",
        "sso-directory:DescribeDirectory",
        "sso-directory:GetUserPoolInfo",
        "controltower:CreateManagedAccount",
        "controltower:DescribeManagedAccount",
        "controltower:DeregisterManagedAccount",
        "s3:GetObject",
        "organizations:describeOrganization",
        "sso:DescribeRegisteredRegions"
      ],
      "Resource": "*"
    }
  ]
}
```

> During the enrollment process, we create a new role in the tenant account that grants permissions to the management
> account to perform AWS Control Tower execution steps. You have to make sure that there is no Service Control Policy (SCP)
> enabled in AWS Organizations that prevents that.


### Minimum Access Rights on Provisioned Accounts

When provisioning a new account, a default role with administration privileges will be created in the new account. This role is by default named [OrganizationAccountAccessRole](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html)
but the name can be configured via meshStack. The MeshfedServiceRole will assume this newly created role in the provisioned account to perform tasks such as setting the account alias or setting up the user roles. meshStack has the capability to self downgrade this role's permissions to a minimum. This can be configured via the `self-downgrade-access-role` configuration flag.
The downgraded role will have the following final policy attached (Note that the `accountId` and `accessRole` placeholders need to be populated with the value of the current account id and the configured access role name).

```json
{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "iam:CreateSAMLProvider",
            "iam:GetSAMLProvider",
            "iam:UpdateSAMLProvider",
            "iam:DeleteSAMLProvider",
            "iam:ListSAMLProviders"
          ],
          "Resource": [
            "arn:aws:iam::{accountId}:saml-provider/*",
            "arn:aws:cloudformation:*:{accountId}:stack/meshstack-cf-access*"
          ]
        },
        {
          "Effect": "Allow",
          "Action": [
            "iam:ListAttachedRolePolicies",
            "iam:CreateAccountAlias",
            "iam:ListAccountAliases",
            "iam:DeleteAccountAlias",
            "iam:GetRole",
            "iam:CreateRole",
            "iam:AttachRolePolicy",
            "iam:UpdateAssumeRolePolicy"
          ],
          "Resource": "*"
        },
        {
          "Effect": "Allow",
          "Action": [
            "cloudformation:DescribeStacks"
          ],
          "Resource": "*"
        },
        {
          "Effect": "Allow",
          "Action": [
            "iam:DetachRolePolicy",
            "iam:DeleteRolePolicy",
            "iam:PutRolePolicy",
            "iam:ListRolePolicies"
          ],
          "Resource": "arn:aws:iam::{accountId}:role/{accessRole}"
        }
      ]
    }
```

As you can see, meshStack has the permissions to upgrade this role if needed. This is to ensure that any new features added to the product will have the required permissions. Any newly added permissions will be notified via the product release notes.

If you prefer that meshStack does not have the capability to upgrade its own role, you can choose to implement your own role downgrade mechanism, for example via a Lambda call, which is also supported by meshLandingZones. In this case the role auto downgrade feature can be disabled.

If you would like to audit the actions taken by this role, you can enable AWS CloudTrail on all the accounts provisioned by meshStack by using an AWS CloudFormation StackSet, which is also supported by meshLandingZones. With the auditing enabled, it will always be possible to identify at which point in time meshStack added additional rights to its role. It will help to easily identify that meshStack was only able to do certain actions given the rights assigned at a certain point in time.

## Configuration Reference

Please find the full `Aws.dhall` configuration options below:

```dhall
  λ(Secret : Type)
→ { platform :
      Text
  , region :
      Text
  , meshfedServiceUser:
  { accessKey : Secret
  , secretKey : Secret
  }
  , organizationRootAccountRole : Text
  , organizationRootAccountExternalId : Optional Text
  , automationAccountRole : Text
  , automationAccountExternalId : Optional Text
  {- Flag if the replicator should wait for an external AVM to finish. This is detected via Tags which should be placed on the account -}
  , waitForExternalAvm :
      Bool
  {-
    This role mappings are fully managed via meshstack. They are created if needed and
    also the polices listed are checked and attached.
    In order to do this the MeshfedAccountAccessRole needs write access to IAM roles.
   -}
  , roleMappingsManaged :
      List { mapKey : Text, mapValue : { awsRoleName : Text, policies : List Text } }
  {-
    The external role mappings are only checked against the SAML IDP setting. No policies are attached nor checked. It is assumed
    that an external source (e.g. an AVM) has assigned proper policies to them.
  -}
  , roleMappingsExternal :
        List { mapKey : Text, mapValue : { awsRoleName : Text } }
  , accountAccessRole :
      Optional Text
  , accountEmailPattern : Text
  , accountAliasPattern :
      Optional Text
  {-
    If set to true, then any existing account alias will be overwritten by the one determined in the accountAliasPattern. If set to
    false any existing account alias will be kept as it is and only be set if there is none at all.
  -}
  , enforceAccountAlias : Bool
  , enrollment-configuration : Optional EnrollmentConfiguration
  {-
    Specify if the role which is created by default in the newly provisioned account, which is assumed by meshStack to perform
    its tasks, should be downgraded automatically to the minimum required permissions. This is true by default.
  -}
  , self-downgrade-access-role : Bool
  }
```
