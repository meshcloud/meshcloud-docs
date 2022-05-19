---
id: meshstack.aws.configuration-reference
title: Configuration Reference
---

This section describes the top-level configuration options available for an AWS Platform Instance in the [platform config](administration.platforms.md#platform-connection-config). For details on how to set this up, please have a look at this [guide](meshstack.how-to.integrate-meshplatform-aws-manually.md). All individual configuration options are explained directly in meshPanel.

* **Replication Connection and Credential Information**: An access key and its secret is used to access the configured root account via a defined role for replication.
* **Automation Account configuration**: The Automation Account is used to provide all AWS StackSets and Lambda Functions that shall be executed via meshLandingZones.
* **Replication Behavior**: Details like naming patterns for AWS Accounts and AWS Account Aliases can be defined here.
* **Role Mappings**: For AWS 2 different kinds of role mappings are supported. The external role mappings are only checked against the SAML IDP setting. No policies are attached nor checked. It is assumed that an external source (e.g. an AVM) has assigned proper policies to them. The other option are fully managed role mappings via meshstack. They are created if needed and also the polices listed are checked and attached.
* **Tag Configuration**: [Tag Configuration](meshstack.metadata-tags.md#tags-in-cloud-tenants) can be used to set certain tags on AWS accounts and resources inside these accounts.
* **Enrollment Configuration**: AWS Accounts can be associated with AWS Control Tower.
* **IAM Configuration**: AWS SSO should be used for IAM. meshStack creates groups in AWS SSO, assigns users to them and establishes access to the AWS accounts for the according groups with defined Permission Sets.
* **Metering Connection and Credential Information**: An access key and its secret is used to access the configured root account via a defined role for metering.
* **Metering Behavior**: You can manage how to handle some aspects of how chargeback is applied. I.e. you can exclude taxes from the internal chargeback.
