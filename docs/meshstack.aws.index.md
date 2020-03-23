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

meshStack uses [AWS Organizations](https://aws.amazon.com/organizations/) to provision and manage AWS Accounts for [meshProjects](./meshcloud.project.md). To use AWS with a meshStack deployment, operators will need an AWS "root" account acting as the parent of all accounts managed by meshStack. The complete account setup contains three dedicated accounts:

* meshcloud Account - Here lives the `meshfed-service` user.
* Org Root Account - All accounts created by meshstack are living "under" this account and its Organization Units. `meshfed-service` needs to assume a role in this account.
* Automation Account - This account is usually used to host certain CloudFormation templates, provide an Account Vending Machine and is needed to properly setup Landing Zones.


### IAM Roles and Service Control Policies

When a user (e.g. a developer) accesses an AWS Account, they are assigned an AWS IAM role based on their project role configured on the corresponding meshProject. Operators can configure these roles and their permissions by providing an [AWS Cloud Formation](https://aws.amazon.com/cloudformation/) template. meshStack uses this template to initialize and update AWS Account configurations.

When configuring these roles, operators must take care to correctly guard against privilege escalation and maintain project sandboxing. Operators should also consider leveraging [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) to simplify role configuration and set up a guarded boundary for the maximum of permissions granted to any role.

## Platform Instance Configuration

### AWS Root Account Setup

> Security Note: The demonstrated IAM Policies implement the minimum of configuration required to produce
> a working AWS integration using meshstack AWS Connector. This setup is based on the [default AWS Organization configuration](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html).
> We advise operators to determine the specific needs and requirements for their usage of AWS and implement more restrictive
> roles and policies.

This account needs the `MeshfedServiceRole`. The `meshfed-service` user needs to assume it.

The root account also needs a role for the mesh-service principal to assume. This role is created by this CloudFormation template:

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "meshfed-service Role Setup",
  "Parameters": {
    "MeshcloudAccountId": {
      "Type": "String",
      "Description": "The ID of the meshCloud AWS Account"
    },
    "PrivilegedExternalId": {
      "Type": "String",
      "Description": "Privileged external ID for the meshfed-service to use"
    }
  },
  "Resources": {
    "MeshfedServiceRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "MeshfedServiceRole",
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
                        "Ref": "MeshcloudAccountId"
                      },
                      ":user/meshfed-service"
                    ]
                  ]
                }
              },
              "Action": "sts:AssumeRole",
              "Condition": {
                "StringEquals": {
                  "sts:ExternalId": {
                    "Ref": "PrivilegedExternalId"
                  }
                }
              }
            }
          ]
        },
        "Path": "/",
        "Policies": [
          {
            "PolicyName": "MeshfedServicePolicy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Sid": "StsAccessMemberAccount",
                  "Effect": "Allow",
                  "Action": "sts:AssumeRole",
                  "Resource": "arn:aws:iam::*:role/MeshstackAccountAccessRole",
                  "Condition": {
                    "StringEquals": {
                      "sts:ExternalId": {
                        "Ref": "PrivilegedExternalId"
                      }
                    }
                  }
                },
                {
                  "Sid": "OrgManagementAccess1",
                  "Effect": "Allow",
                  "Action": [
                    "organizations:DescribeOrganizationalUnit",
                    "organizations:DescribeAccount",
                    "organizations:ListParents",
                    "organizations:ListOrganizationalUnitsForParent",
                    "organizations:CreateOrganizationalUnit",
                    "organizations:ListTagsForResource",
                    "organizations:MoveAccount"
                  ],
                  "Resource": [
                    "arn:aws:organizations::*:account/o-*/*",
                    "arn:aws:organizations::*:ou/o-*/ou-*",
                    {
                      "Fn::Join": [
                        "",
                        [
                          "arn:aws:organizations::",
                          {
                            "Ref": "AWS::AccountId"
                          },
                          ":root/o-*/r-*"
                        ]
                      ]
                    }
                  ]
                },
                {
                  "Sid": "OrgManagementAccess2",
                  "Effect": "Allow",
                  "Action": [
                    "organizations:ListRoots",
                    "organizations:ListAccounts",
                    "organizations:CreateAccount",
                    "organizations:DescribeCreateAccountStatus"
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

Operators should generate a unique and random value for `PrivilegedExternalId`, e.g. a GUID. meshStack AWS Connector is architected
to supply this [ExternalId](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) only
when accessing organization member accounts from a privileged (system) context. Using the ExternalId therefore increases
the security of member accounts in your organization.

Operators need to securely inject the generated credentials and `PrivilegedExternalId` into the configuration of the AWS Connector.

`MeshcloudAccountId` is the ID of the dedicated meshcloud AWS account where the `meshfed-service` users lives.

### meshStack Account Setup

The meshStack AWS Connector uses a dedicated set of IAM credentials to work with AWS APIs on behalf of meshstack. To create these credentials, create a user in IAM with these specifications:

* User name: `meshfed-service`
* AWS access type: Programmatic access - with an access key

You can use this template for setup the account:

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "RootAccountId": {
      "Type": "String",
      "Default": "<INSERT_ROOT_ACC_ID>",
      "Description": "The ID of the Root Org Account"
    }
  },
  "Resources": {
    "MeshstackAccountAccessRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "MeshstackAccountAccessRole",
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
                        "Ref": "RootAccountId"
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
    }
  }
}
```

### Automation Account Setup

The automation account, containing all components for AWS account provisioning should have a `MeshfedAutomationRole` which is also assumed by the `mesfed-service` user in order to execute certain CloudFormation setup steps.

This account needs the `MeshfedAutomationRole`. The `meshfed-service` user needs to assume it.

You can use the following template inside the automation account to perform the necessairy role setup:

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "meshfed-automation Role Setup",
  "Parameters": {
    "MeshcloudAccountId": {
      "Type": "String",
      "Description": "The ID of the meshCloud AWS Account"
    },
    "PrivilegedExternalId": {
      "Type": "String",
      "Description": "Privileged external ID for the meshfed-service to use"
    }
  },
  "Resources": {
    "MeshfedAutomationRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "MeshfedAutomationRole",
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
                        "Ref": "MeshcloudAccountId"
                      },
                      ":user/meshfed-service"
                    ]
                  ]
                }
              },
              "Action": "sts:AssumeRole",
              "Condition": {
                "StringEquals": {
                  "sts:ExternalId": {
                    "Ref": "PrivilegedExternalId"
                  }
                }
              }
            }
          ]
        },
        "Path": "/",
        "Policies": [
          {
            "PolicyName": "MeshfedAutomationPolicy",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Sid": "VisualEditor0",
                  "Effect": "Allow",
                  "Action": [
                    "cloudformation:UpdateStackInstances",
                    "cloudformation:DescribeStackSet",
                    "cloudformation:ListStackInstances",
                    "cloudformation:CreateStackInstances"
                  ],
                  "Resource": "*"
                }
              ]
            }
          }
        ]
      }
    },
    "AWSCloudFormationStackSetAdministrationRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "AWSCloudFormationStackSetAdministrationRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Service": "cloudformation.amazonaws.com"
              },
              "Action": "sts:AssumeRole"
            }
          ]
        },
        "Path": "/",
        "Policies": [
          {
            "PolicyName": "AssumeRole-AWSCloudFormationStackSetExecutionRole",
            "PolicyDocument": {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Sid": "VisualEditor0",
                  "Effect": "Allow",
                  "Action": "sts:AssumeRole",
                  "Resource": "arn:aws:iam::*:role/AWSCloudFormationStackSetExecutionRole"
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

### Account Access

The following operations are performed via meshstack in the deployed AWS accounts:

* Verifying SAML IDP integrity/update
* Account Alias Setup

The default access to AWS accounts is done via a assumed role to `MeshstackAccountAccessRole`. This role should have the following minimal policy attached:

```json
{
  "ManagedPolicyName": "MeshcloudMinimalServicePolicy",
  "Description": "Minimal Access for meshstack Automation Service",
  "Roles": [
    "MeshstackAccountAccessRole"
  ],
  "PolicyDocument": {
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
          "arn:aws:iam::<ACCOUNT_ID>:saml-provider/*",
          "arn:aws:cloudformation:*:<ACCOUNT_ID>:stack/meshstack-cf-access*"
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
      }
    ]
  }
}
```

Where `<ACCOUNT_ID>` is the current account id. Usually this service policy is rolled out via an Access Stack by an AWS [meshLandingZone](meshcloud.landing-zones.md). You can insert the current account id via the AWS template.

> Depending of your mode of operation (usage of external Account Vending Machine) these "minimal rights" can be adapted and further restricted. Please [contact us](https://support.meshcloud.io) for more details on reducing these rights.

### AWS Role Mapping

The [project roles](meshcloud.project.md#project-roles) are mapped to user roles in AWS. This mapping is fully customizable. It is also possible to attach a AWS policy automatically to the user role in AWS.

In order to configure the mapping use the `roleMappings` key in the [platform config](#configuration-reference).

```haskell
{ roleMappings =
    [ { mapKey ="admin" {- Name of project role in meshStack -}
      , mapValue =
            { roleName = "meshProjectAdminRole" {- Name of IAM role in AWS -}
            , policyArn = None Text {- Optional: The ARN of an IAM policy to attach to the role. -}
            }
      }
    ]
}
```

If the role does not exist in AWS the replicator tries to create it and attaches a configured IAM Policy to it.
The replicator also sets up a trust relationship to meshStack's IdP in order to allow SSO for the project users.

If the AWS role does already exist the replicator will update the IdP trust relationship and (if configured) attach the policy via its ARN. Already attached policies to the role won't be changed.


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

> The account alias must be unique across all of AWS. Operators should thererfore consider using a company-specific prefix together with a combination of meshCustomer and meshProject identifier.

The following arguments are provided:

1. argument: meshCustomer [identifier](./meshstack.configuration.md#identifiers)
2. argument: meshProject [identifier](./meshstack.configuration.md#identifiers)
3. argument: meshProject [ID (numeric)](./meshstack.configuration.md#identifiers)

You can decide if you want to enforce the account allias by using the `enforceAccountAlias` flag. If you want to keep any existing account alias (which might not fit into the defined pattern), set this flag to `false`.

### Identifier Configuration

meshStack operators that want to use AWS must configure their deployment to restrict identifier lengths to meet AWS requirements. The maximum allowed lengths are:

```yaml
customer_identifier_length: 16
project_identifier_length: 30
```

## Configuration Reference

Please find the full `Aws.dhall` [configuration options](./meshstack.configuration.md) below:

```haskell
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
  , meshProvisioning :
      Optional ./Aws/MeshProvisioning.dhall
  , externalProvisioning :
      Optional (./Aws/ExternalProvisioning.dhall Secret)
  , accountAccessRole :
      Optional Text
  , accountAliasPattern :
      Optional Text
  {-
    If set to true, then any existing account alias will be overwritten by the one determined in the accountAliasPattern. If set to
    false any existing account alias will be kept as it is and only be set if there is none at all.
  -}
  , enforceAccountAlias : Bool
  }
```
