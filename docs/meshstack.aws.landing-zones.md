---
id: meshstack.aws.landing-zones
title: Landing Zones
---

AWS Landing Zones use Cloud Formation templates to orchestrate configuration of managed AWS accounts.

## IAM Roles and Service Control Policies

When a user (e.g. a developer) accesses an AWS Account, they are assigned an AWS IAM role based on their project role configured on the corresponding meshProject. Operators can configure these roles and their permissions by providing an [AWS Cloud Formation](https://aws.amazon.com/cloudformation/) template. meshStack uses this template to initialize and update AWS Account configurations.

When configuring these roles, operators must take care to correctly guard against privilege escalation and maintain project sandboxing. Operators should also consider leveraging [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) to simplify role configuration and set up a guarded boundary for the maximum of permissions granted to any role.

## Cloud Formation Stack Set

Operators can also configure an [Cloud Formation Stack Set](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html) on an AWS Landing Zone. meshStack will then ensure that all AWS Accounts provisioned using this landing zone will receive a StackInstance from the StackSet. This allows operators to leverage that StackSet to centrally manage configuration and resources for all AWS Accounts under the landing zone.

In order to use this feature you need to setup a few prerequisites:

1. Choose an administrative account in which the Stack Sets will be placed
1. We need a permission setup [Template](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) which adds a special role to the administrator account named **AWSCloudFormationStackSetAdministrationRole**, with the following policy attached:

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

1. In the administration account create a StackSet with the template you later want to apply to the newly provisioned accounts. We need a created StackSet in order to have the ID. This might only work if you apply the template to a placeholder account which you can remove again afterwards.
1. Prepare a [Template](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) which will setup a **AWSCloudFormationStackSetExecutionRole**. This role must allow the adminstration account/Cloud Formation to perform actions on behalf of the users. It must also allow access to all services you plan to use in your Cloud Formation Templates. A example role policy could look like:

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

1. As a last step setup an AWS Landing Zone in meshStack. You need the URL of the above defined Permission Setup Template, the actual Stack Set template you wish to apply, the Account ID of the admin account which will contain the stack sets and the StackSet Admin Region (the region in which the StackSet in the Admin account is placed) as well as the StackInstance Deploy Region.

Each AWS project which now gets this Landing Zone assigned will be setup to receive the Cloud Formation Stack Instance setup.

> **Important:** A StackInstance can currently only be deployed in one region. In order to work around you can create another StackInstance in different regions from the first instance.
>
> **Important:** Currently only templates without parameters are supported. Support for parameters provided by meshStack will be added in a future release.

Please contact [meshcloud](https://www.meshcloud.io/en/team/) for more details and reference configurations.
