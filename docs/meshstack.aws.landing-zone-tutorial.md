---
id: meshstack.aws.landing-zone-tutorial
title: Configuration Tutorial
---

> This tutorial is work in progress!

Purpose: show you how to create secure landing zones for AWS.

Terms:

- **Managed Account** An AWS Account managed under this landing zone.
- **CFN** shorthand for AWS CloudFormation

## Create the Organization

Setup the Organization on the root account

- select the "Root" Organizational Unit that's automatically created ("Organize Accounts" section) an enable "Service control policies"
  Policy type
- attach the following policy to the root
  - FullAWSAccess (default policy supplied by AWS)
  - meshstack-aws-root: Root Policy for meshstack-managed AWS organizations

This policy "jails" member accounts in the organization

- deny access to organizations API
- deny access to CRUD IAM IdPs
- todo: figure out how/if we can restrict modifications to the IAM OrganizationAccountAccessRole and to the user's own role

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DenyAllOrganizationsApis",
            "Effect": "Deny",
            "Action": [
                "organizations:*"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "DenyRestrictedIamOperations",
            "Effect": "Deny",
            "Action": [
                "iam:AddClientIDToOpenIDConnectProvider",
                "iam:CreateOpenIDConnectProvider",
                "iam:CreateSAMLProvider",
                "iam:DeleteOpenIDConnectProvider",
                "iam:DeleteSAMLProvider",
                "iam:GetOpenIDConnectProvider",
                "iam:GetSAMLProvider",
                "iam:ListOpenIDConnectProviders",
                "iam:ListSAMLProviders",
                "iam:RemoveClientIDFromOpenIDConnectProvider",
                "iam:UpdateOpenIDConnectProviderThumbprint",
                "iam:UpdateSAMLProvider"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

## Automation Account

Setup these resources on the Automation Account, here expressed as CloudFormation Templates.

### LZCFNStackSetAdministrationRole

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Configure the LZCFNStackSetAdministrationRole to enable use of AWS CloudFormation StackSets. This role can be assumed by the CloudFormation Service and can in turn assume the StackSetExecutionRole in managed accounts.

Resources:
  AdministrationRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: LZCFNStackSetAdministrationRole
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service: cloudformation.amazonaws.com
            Action:
              - sts:AssumeRole
      Path: /
      Policies:
        - PolicyName: AssumeRole-AWSCloudFormationStackSetExecutionRole
          PolicyDocument:
            Version: 2012-10-17
            Statement:
              - Effect: Allow
                Action:
                  - sts:AssumeRole
                Resource:
                  - "arn:aws:iam::*:role/AWSCloudFormationStackSetExecutionRole"
```

### LZStackSet

> tbd

### LZStackSetUser

> consider renaming to `LZStackSetAdmin`

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Configure a service user for meshStack to add managed accounts to the LZ StackSet

Resources:
  LZStackSetUser:
    Type: 'AWS::IAM::User'
    Properties:
        # configure credentials etc. here ...
  LZStackSetUserPolicy:
    Type: 'AWS::IAM::Policy'
    Properties:
      PolicyName: LZStackSetUserPolicy
      PolicyDocument:
        Statement:
          - Sid: AllowAccessToLZStackSet
            Effect: Allow
            Action:
              - 'cloudformation:Describe*'
              - 'cloudformation:List*'
              - 'cloudformation:Get*'
            Resource: '*' # tbd this may need to be more limited, but needs access on the LZ StackSet
        - Sid: AllowToPassLZCFNStackSetAdministrationRole
          Effect: Allow
          Action:
            - iam:GetRole
            - iam:PassRole
          Resource": "arn:aws:iam::*:role/LZCFNStackSetAdministrationRole"
      Users:
        - !Ref LZStackSetUser
```

## Access Stack to boostrap Managed Accounts

### OrganizationAccountAccessRole

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Configure the OrganizationAccountAccessRole

Resources:
  OrganizationAccountAccessRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: OrganizationAccountAccessRole
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - arn:aws:iam::${RootAccountId}:root
            Action:
              - sts:AssumeRole
      Path: /
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/AdministratorAccess
  MeshfedServiceAccessRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: OrganizationAccountAccessRole # tbd check for collisions with existing roles
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - arn:aws:iam::${RootAccountId}:meshfed-service
            Action:
              - sts:AssumeRole
      Path: /
      PolicyDocument:
        Statement:
          - Sid: IamReadOnly
            Effect: Allow
            Action:
                - iam:GetRole
                - iam:ListSAMProviders
                - iam:ListRoles
                - iam:GetSAMLProvider
            Resource: '*' # tbd this may need to be more limited, but needs access on the LZ StackSet
          - Sid: IamUpdateSAMLProvider
            Effect: Allow
            Action:
                - iam:UpdateSAMProvider
            Resource: arn:aws:iam::*:saml-provider/meshstack-saml-idp
```




### AWSCloudFormationStackSetExecutionRole

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Configure the AWSCloudFormationStackSetExecutionRole to enable use of your account as a target account in AWS CloudFormation StackSets. For simplicity, this role receives full AdministratorAccess on the target account.

Resources:
  ExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: AWSCloudFormationStackSetExecutionRole
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - arn:aws:iam::${AutomationAccountId}:role/LZCFNStackSetAdministrationRole
            Action:
              - sts:AssumeRole
      Path: /
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/AdministratorAccess
```
