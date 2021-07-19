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

* meshCloud Account - `meshfed-service-user` should be created in this account. We have a dedicated account for this user so that meshcloud can easily roll the credentials of the user when needed.
* Management Account - All accounts created by meshStack reside "under" this account and its Organization Units. `meshfed-service-user` needs to assume a role in this account to perform tasks such as new account provisioning.
* Automation Account - This account is usually used to host certain CloudFormation templates, provide an Account Vending Machine and is needed to properly setup Landing Zones.

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
            "Resource": "arn:aws:iam::*:role/MeshstackAccountAccessRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<<EXTERNAL_ID>>"
                }
            }
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
                "arn:aws:organizations::<<MANGEMENT_ACCOUNT_ID>>:root/o-*/r-*",
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
          This Java String.format format string receiving the following arguments:

            1. meshCustomer identifier
            2. meshProject identifier
            3. meshProject ID (numeric)
            4. role name suffix (configurable via Landing Zone)

          Operators must ensure the group names will be unique within the same AWS SSO Instance with that
          configuration. meshStack will additionaly prefix the group name with "mst-" to be able to identify
          the groups that are managed by meshStack.
      sso-access-token:
        The AWS SSO Access Token that was generated via the Automatic provisioning config in AWS SSO.
      role-mappings:
        Defines the mapping of a meshProject role to an AWS SSO PermissionSet. The mapKey is the identifier of
        meshProject role. The aws-role-name will be used in the group name. The permission-set-arns will be
        assigned to the created group.
    -}
      { scim-endpoint : Text
      , arn : Text
      , group-name-pattern : Text
      , sso-access-token : Text
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
      , group-name-pattern = "%s.%s.%4\$s"
      , sso-access-token = "abc"
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

1. argument: meshCustomer [identifier](./meshstack.configuration.md#identifiers)
2. argument: meshProject [identifier](./meshstack.configuration.md#identifiers)
3. argument: meshProject [ID (numeric)](./meshstack.configuration.md#identifiers)

You can decide if you want to enforce the account alias by using the `enforceAccountAlias` flag. If you want to keep any existing account alias (which might not fit into the defined pattern), set this flag to `false`.

### Identifier Configuration

meshStack operators that want to use AWS must configure their deployment to restrict identifier lengths to meet AWS requirements. The maximum allowed lengths are:

```yaml
customer_identifier_length: 16
project_identifier_length: 30
```

## Configuration Reference

Please find the full `Aws.dhall` [configuration options](./meshstack.configuration.md) below:

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
  }
```

## Downgrading meshcloud Access

> This part is not automated via terraform templates. This is because you may choose to set up roles with different naming conventions and permissions, or to deploy CloudFormation stacks or a Lambda that has additional functionality. This section also serves as an example on how you can use a meshLandingZone to bootstrap the newly created AWS account.

meshStack uses `MeshstackAccountAccessRole` within the newly provisioned accounts to perform tasks such as

* Setting up SAML IDP
* Account Alias Setup
* Deploy Access Stack

This role will have administration rights on the new account right after account creation. For security reasons, it is recommended that you downgrade these permissions using the Lambda invocation functionality provided in the meshLandingZone. You can do this by setting up a meshLandingZone as follows.

### Create the Access Stack

Create a meshLandingZone with the following Access Stack configured. This will create the `AWSCloudFormationStackSetExecutionRole` in the newly provisioned account. This role has the [minimum permissions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs-self-managed.html#stacksets-prereqs-advanced-perms) for StackSets to work plus IAM permissions. The IAM permissions are needed because the StackSet we deploy later on will need to perform some IAM operations.

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "AutomationAccountId": {
      "Type": "String",
      "Default": "888163887028",
      "Description": "The ID of the Automation Account"
    }
  },
  "Resources": {
    "AWSCloudFormationStackSetExecutionRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "AWSCloudFormationStackSetExecutionRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::Join": [
                    "",
                    [
                      "arn:aws:iam::",
                      {
                        "Ref": "AutomationAccountId"
                      },
                      ":root"
                    ]
                  ]
                }
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "Policies": [
          {
            "PolicyName": "MinimumCloudFormationPolicy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "cloudformation:*",
                    "s3:*",
                    "sns:*"
                  ],
                  "Resource": "*"
                }
              ]
            }
          },
          {
            "PolicyName": "StackSetExecutionPolicy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "iam:*"
                  ],
                  "Resource": "*"
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

### Create the StackSet

Create a StackSet in the automation account via the AWS console using the following template and set the StackSet ARN in the meshLandingZone to the ARN of the newly created StackSet.

The StackSet defines two roles. One is the `OrganizationAccountAccessRole` which has admin privileges. This role trusts the management account and can be used to login to the new account with admin privileges if you require that. The other role is the `PermissionDowngradeLambdaExecutionRole` which will be assumed by the Lambda to downgrade the permissions of the `MeshstackAccountAccessRole`.

```json
{
  "Parameters": {
    "ManagementAccountId": {
      "Type": "String",
      "Default": "122242464812",
      "Description": "The ID of the Management Account"
    },
    "AutomationAccountId": {
      "Type": "String",
      "Default": "888163887028",
      "Description": "The ID of the Automation Account"
    }
  },
  "Resources": {
    "OrganizationAccountAccessRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "OrganizationAccountAccessRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::Join": [
                    "",
                    [
                      "arn:aws:iam::",
                      {
                        "Ref": "ManagementAccountId"
                      },
                      ":root"
                    ]
                  ]
                }
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/AdministratorAccess"
        ]
      }
    },
    "PermissionDowngradeLambdaExecutionRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "PermissionDowngradeLambdaExecutionRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": {
                  "Fn::Join": [
                    "",
                    [
                      "arn:aws:iam::",
                      {
                        "Ref": "AutomationAccountId"
                      },
                      ":role/PermissionDowngradeLambdaAdministrationRole"
                    ]
                  ]
                }
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/IAMFullAccess"
        ]
      }
    }
  }
}
```

### Create the Lambda

Create the `PermissionDowngradeLambdaAdministrationRole` with the following policy and trust relationship in the automation account. Additionally attach the `AWSLambdaBasicExecutionRole` managed policy so that the Lambda can log to CloudWatch.


<!--DOCUSAURUS_CODE_TABS-->
<!--Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowAssumePermissionDowngradeLambdaOnAllAccounts",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/PermissionDowngradeLambdaExecutionRole"
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
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

Create the Lambda that will downgrade the permissions. Set the Execution role of the Lambda to `PermissionDowngradeLambdaAdministrationRole`.

```python
import json
import logging
import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def main(event, context):
    logger.debug("Recieved event "+ json.dumps(event))

    accessRoleName = 'MeshstackAccountAccessRole'
    # the policy to remove
    adminAccessPolicy = 'AdministratorAccess'
    # the name of the new policy to add
    minimumMeshAccessPolicy = 'MeshstackAccountAccessPolicy'

    accountId = event["AccountId"]

    sts = boto3.client('sts')
    assumed_role_object = sts.assume_role(
        RoleArn = "arn:aws:iam::"+accountId+":role/PermissionDowngradeLambdaExecutionRole",
        RoleSessionName = "DowngradePermissionsSession"
    )
    logger.debug("Successfully assumed role in child account.")

    credentials = assumed_role_object['Credentials']
    accessKey = credentials['AccessKeyId']
    secretKey = credentials['SecretAccessKey']
    sessionToken = credentials['SessionToken']

    iam = boto3.client(
        'iam',
         aws_access_key_id = accessKey,
         aws_secret_access_key = secretKey,
         aws_session_token = sessionToken
    )

    response = iam.list_role_policies(RoleName = accessRoleName)

    logger.debug("Response from list role policies" + json.dumps(response))

    if minimumMeshAccessPolicy not in response['PolicyNames']:
        policy = """{
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
                      "arn:aws:iam::%s:saml-provider/*",
                      "arn:aws:cloudformation:*:%s:stack/meshstack-cf-access*"
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
                  }
                ]
            }
            """ % (accountId, accountId)
        logger.debug("Putting policy "+ policy)
        iam.put_role_policy(
            RoleName = accessRoleName,
            PolicyName = minimumMeshAccessPolicy,
            PolicyDocument = policy
        )
        logger.info("Created minimum access policy")


    if adminAccessPolicy in response['PolicyNames']:
        iam.delete_role_policy(
            RoleName = accessRoleName,
            PolicyName = adminAccessPolicy
        )
        logger.info("Removed admin access policy")

    return {
        'statusCode': 200,
        'body': 'Successfully downgraded'
    }
```

This Lambda will be invoked during account provisioning and downgrades the `MeshstackAccountAccessRole`.

> Depending of your mode of operation (usage of external Account Vending Machine) these "minimal rights" can be adapted and further restricted. Please [contact us](https://support.meshcloud.io) for more details on reducing these rights.
