---
id: meshstack.aws
title: Amazon Web Services
---

*AWS* is a proprietary public cloud platform provided by Amazon Web Services. meshStack supports project and user management for AWS to include AWS services into cloud projects managed by meshStack.

meshStack supports project creation, configuration, user management and SSO for AWS.

## Integration Overview

To enable integration with AWS, Operators deploy and configure the meshStack AWS Connector. Operators can configure one or multiple `PlatformInstance`s of `PlatformType` AWS. In a typical setup, we recommend grouping each AWS `PlatformInstance` in a separate `Location`.

This makes AWS available to meshProjects like any other cloud platform in meshStack.

meshStack automatically configures AWS IAM in all managed accounts to integrate SSO with [meshStack Identity Federation](./meshstack.identity-federation.md).

## Prerequisites

### AWS Root Account

meshStack uses [AWS Organizations](https://aws.amazon.com/organizations/) to provision and manage AWS Accounts for [meshProjects](./meshcloud.project.md). To use AWS with a meshStack deployment, operators will need an AWS "root" account acting as the parent of all accounts managed by meshStack.

> Security Note: The demonstrated IAM Policies implement the minimum of configuration required to produce
> a working AWS integration using meshstack AWS Connector. This setup is based on the [default AWS Organization configuration](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html).
> We advise operators to determine the specific needs and requirements for their usage of AWS and implement more restrictive
> roles and policies.

### Identifier Configuration

meshStack operators that want to use AWS must configure their deployment to restrict identifier lengths to meet AWS requirements. The maximum allowed lengths are:

```yaml
customer_identifier_length: 16
project_identifier_length: 30
```

### meshStack IAM User

The meshStack AWS Connector uses a dedicated set of IAM credentials to work with AWS APIs on behalf of meshstack. To create these credentials, create a user in IAM with these specifications:

- User name: meshfed-service
- AWS access type: Programmatic access - with an access key

Attach the following inline policy using this json

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "OrganizationsFullAccess",
            "Effect": "Allow",
            "Action": "organizations:*",
            "Resource": "*"
        },
        {
            "Sid": "StsAccessMemberAccount",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/OrganizationAccountAccessRole",
            "Condition": {
              "StringEquals": {
                "sts:ExternalId": "${privilegedExternalId}"
              }
            }
        },
        {
            "Sid": "IamFullAccess",
            "Effect": "Allow",
            "Action": "iam:*",
            "Resource": "*"
        }
    ]
}
```

Operators should generate a unique and random value for `${privilegedExternalId}`, e.g. a GUID. meshStack AWS Connector is architected
to supply this [ExternalId](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) only
when accessing organization member accounts from a privileged (system) context. Using the ExternalId therefore increases
the security of member accounts in your organization.

Operators need to securely inject the generated credentials and `${privilegedExternalId}` into the configuration of the AWS Connector.

### Project-Account Email Addresses

AWS requires a unique email address for each account. Operators must thus configure a wildcard email address pattern with a placeholder `%s`. The pattern must not exceed a total length of `20` characters (including the placeholder). For example, this pattern

```yaml
accountEmailTemplate: aws+%s@meshcloud.io
```

allows generation of account names:

- aws+customer.projectA@meshcloud.io
- aws+customer.projectB@meshcloud.io

### IAM Roles and Service Control Policies

When a user (e.g. a developer) accesses an AWS Account, they are assigned an AWS IAM role based on their project role configured on the corresponding meshProject. Operators can configure these roles and their permissions by providing an [AWS Cloud Formation](https://aws.amazon.com/cloudformation/) template. meshStack uses this template to initialize and update AWS Account configurations.

When configuring these roles, operators must take care to correctly guard against privilege escalation and maintain project sandboxing. Operators should also consider leveraging [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) to simplify role configuration and set up a guarded boundary for the maximum of permissions granted to any role.

### Stack Set Replication

meshStack is able to perform a provision of customer projects into a defined [AWS Stack Set](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html). By defining a Landing Zone for AWS, setting a Stack Template all projects with this Landing Zone assigned will be put into the given AWS Stack Set. This allows operators to manage and update the projects AWS resources convienently by this Stack Set in the AWS Console.

In order to use this feature you need to setup a few prerequisites:

1. Choose an administrative account in which the Stack Sets will live
2. We need a permission setup [Template](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) which adds a special role to the administrator account named **AWSCloudFormationStackSetAdministrationRole**, with the following policy attached:

```json
   {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "sts:AssumeRole"
            ],
            "Resource": [
                "arn:aws:iam::*:role/AWSCloudFormationStackSetExecutionRole"
            ],
            "Effect": "Allow"
        }
    ]
  }
```

3. Prepare a [Template](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) which will setup a **AWSCloudFormationStackSetExecutionRole**. This role must allow the adminstration account/Cloud Formation to perform actions on behalf of the users. It must also allow access to all services you plan to use in your Cloud Formation Templates. A example role policy could look like:

```yml
AWSTemplateFormatVersion: '2010-09-09'
Description: Configure the AWSCloudFormationStackSetExecutionRole to enable use of your account as a target account in AWS CloudFormation StackSets.

Resources:
  ExecutionRole:
    Type: 'AWS::IAM::Role'
    Properties:
      RoleName: AWSCloudFormationStackSetExecutionRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                # Adapt this Account ID to the ID of your designated Stack Set admin account
                - arn:aws:iam::ADMIN_ACCOUNT_ID:root
            Action:
              - sts:AssumeRole
      Path: /
      Policies:
        - PolicyName: StackSetExecutionPolicy # Adapt the name if you want
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
            - Effect: Allow
              Action:
              # According to the AWS Docs this is the minimal rights needed for StackSets to work. Please extend it with the specific rights needed
              # for your Stack Templates you wish to roll out.
              - cloudformation:*
              - s3:*
              - sns:*
              Resource: '*'
```

4. Setup a AWS Landing Zone in meshStack. You need the URL of the above defined Permission Setup Template, the actual Stack Set template you wish to apply, the Account ID of the admin account which will contain the stack sets, the ARN of the Stack Set Administration role (it has the form of `arn:aws:iam::ACCOUNT_ID:role/AWSCloudFormationStackSetAdministrationRole`), the execution role name, this is usually `AWSCloudFormationStackSetExecutionRole`. Choose a region in which the Stack Set deployments of the admin account should be placed. And define the deploy regions of your stack instances.

Each AWS project which now gets this Landing Zone assigned will be setup to receive the Cloud Formation Stack Instance setup.

> **Important:** Currently only Templates without parameters are supported.

Please contact [Meshcloud](https://www.meshcloud.io/en/team/) for more details and reference configurations.
