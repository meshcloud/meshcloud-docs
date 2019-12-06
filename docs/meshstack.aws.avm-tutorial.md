---
id: meshstack.aws.avm-tutorial
title: "Tutorial: Account Vending Machine"
---

> This tutorial is work in progress!

Purpose: show you how to create secure landing zones for AWS.

Terms:

- **Managed Account** An AWS Account managed under this landing zone.
- **CFN** shorthand for AWS CloudFormation

## Acount Vending Machine

To use your existing AVM, make sure it has a single lambda as its Entry Point.

## Access Stack to boostrap Managed Accounts

### OrganizationAccountAccessRole

```yaml
AWSTemplateFormatVersion: 2010-09-09
Description: Configure the OrganizationAccountAccessRole

Resources:
  OrganizationAccountAccessRole:
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
          - Sid: InvokeAccountVendingMachine
            Effect: Allow
            Action:
              - lambda:InvokeFunction
            Resource": arn:aws:lambda:<region>:${AutomationAccountId}:function:AVMEntryPoint
```

## Workflow

It's best practice to configure your AWS organization so that meshStack operates without any access to workload provisioned in managed AWS accounts. This requires careful plannign and analysis but results in increased security.

The flow of privileges is the following

- Account Provisioning
  - the `meshfed-service` user creates accounts using the AWS Organizations API on the root acount
    - the managed account contains an `OrganizationAccountAccessRole`
      - allows [AdministratorAccess](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html)
      - can be assumed from all principals of the root account
