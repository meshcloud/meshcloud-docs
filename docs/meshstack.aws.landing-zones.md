---
id: meshstack.aws.landing-zones
title: Landing Zones
---

AWS Landing Zones use Cloud Formation templates to orchestrate configuration of managed AWS accounts. In the following section the options for this Landing Zone are described.

You have two paths for provisionig AWS accounts. You can simply use CloudFormation StackSets in order to bootstrap your account or you can use an existing, "external" (in the sense of not controlled via meshstack) Account Vending Machine (AVM). Decide for a bootstrap path and configure the Landing Zone accordingly.

## Common Configuration

* **Target Organization Unit Name**: This value is optional. If it is set all meshProjects placed under this Landing Zone will be put under this Organization Unit (OU). This might be helpful if a SCP should be assigned to all of these projects. If left empty a new OU will be created for every customer and all of his meshProjects with AWS location will be placed in it.
* **AccessStack Template URL**: This StackSet will be created in every new AWS account. It usually contains simple bootstraping resources e.g. like required roles and drops the rights of the admin access which is pre-assigned to each new account by AWS (the `OrganizationAccountAccessRole`). For more information see the [Landing Zone Tutorial](/docs/meshstack.aws.landing-zone-tutorial.html).

## CloudFormation StackSet

Operators can also configure an [CloudFormation StackSet](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html) on an AWS Landing Zone. meshStack will then ensure that all AWS Accounts provisioned using this Landing Zone will receive a StackInstance from the StackSet. This allows operators to leverage that StackSet to centrally manage configuration and resources for all AWS Accounts under the landing zone.

Each AWS project which now gets this Landing Zone assigned will be setup to receive the Cloud Formation Stack Instance setup.

The following parameter can be used in the StackSet template:

| Parameter    | Description                                                                              |
| ------------ | :--------------------------------------------------------------------------------------- |
| AccountName  | Account name of the created AWS account                                                  |
| AccountEmail | Account email of the created AWS account                                                 |
| CostCenter   | ID of the CostCenter defined for this meshProject.                                       |
| ContactEmail | E-Mail of the meshProject creator. Currently this is the user which created the project. |
| Stage        | The name of the assigned Landing Zone                                                    |

> Soon the parameter names will be editable in the Landing Zone configuration.

* **StackSet ARN**: This StackSet get all new meshProject AWS accounts added as StackInstances. The templated configured in this StackSet will get applied.
* **StackInstance Deploy Region**: The StackInstances will get deployed in this region.

> **Important:** A StackInstance can currently only be deployed in one region. In order to work around you can create another StackInstance in different regions triggered by the first instance.

## Account Vending Machines

As some users might have already their own custom AWS account provisioning solution, usually called Account Vending Machines (AVM), other mechanisms are needed in order to bootstrap newly created AWS accounts.

While it is possible to trigger an AVM execution via a StackSet a better alternative is usually to trigger it by an custom Lambda function invocation. During the AWS account replication meshStack is able to invoke such a function with custom parameters. From this function the external AVM can start its provisioning process.

> Please make sure the `MeshfedServiceRole` has the rights in order to trigger the configured Lambda.

In order to detect the finished execution of the AVM meshStack looks for certain tags on the AWS account. If such a tag is present the success of the external replication is assumed and the replication process is handed back to meshStack.

Currently the account must contain these tags to be picked up:

* ProductName: Must contain the customer identifier
* Stage: Must contain the project identifier

> These tags will soon be customizable in the AWS Landing Zone configuration.
