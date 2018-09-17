---
id: meshstack.aws
title: Amazon Web Services
---

*AWS* is a proprietary public cloud platform provided by Amazon Web Services. Meshstack supports project and user management for AWS to include AWS services into cloud projects managed by Meshstack.

Meshstack supports project creation, configuration, user management and SSO for AWS.

## Integration Overview

To enable integration with AWS, Operators deploy and configure the Meshstack AWS Connector. Operators can configure one or multiple `PlatformInstance`s of `PlatformType` AWS. In a typical setup, we recommend grouping each AWS `PlatformInstance` in a separate `Location`.

This makes AWS available to Projects like any other cloud platform in Meshstack.

Meshstack automatically configures AWS IAM in all managed accounts to integrate SSO with [Meshstack Identity Federation](./meshstack.identity-federation.md).

## Prerequisites

### AWS Root Account

Meshstack uses [AWS Organizations](https://aws.amazon.com/organizations/) to provision and manage AWS Accounts for [MeshProjects](./meshcloud.project.md). To use AWS with a Meshstack deployment, operators will need an AWS "root" account acting as the parent of all Accounts managed by Meshstack.

### Identifier Configuration

Meshstack operators that want to use AWS must configure their deployment to restrict identifier lengths to meet AWS requirements. The maximum allowed lengths are:

```yaml
customer_identifier_length: 16
project_identifier_length: 30
```

### Meshstack IAM User

The Meshstack AWS Connector uses a dedicated set of IAM credentials to work with AWS APIs on behalf of meshstack. To create these credentials, create a user in IAM with these specifications:

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
            "Resource": "arn:aws:iam::*:role/OrganizationAccountAccessRole"
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

Operators need to securely inject the generated credentials into the configuration of the AWS Connector.

### Project-Account Email Addresses

AWS requires a unique email address for each Account. Operators must thus configure a wildcard email address pattern with a placeholder `%s`. The pattern must not exceed a total length of `20` characters (including the placeholder). For example, this pattern

```yaml
accountEmailTemplate: aws+%s@meshcloud.io
```

allows generation of account names:

- aws+customer.projectA@meshcloud.io
- aws+customer.projectB@meshcloud.io

### IAM Roles and Service Control Policies

When a Meshstack User accesses an AWS Project, they are assigned an AWS IAM Role based on their project role configured on the MeshProject. Operators can configure these roles and their permissions by providing an [AWS Cloud Formation](https://aws.amazon.com/cloudformation/) template.

When configuring these roles, operators must take care to correctly guard against privilege escalation and maintain project sandboxing. Operators should also consider leveraging [Service Control Policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) and  Please contact us for more details and reference configurations.
