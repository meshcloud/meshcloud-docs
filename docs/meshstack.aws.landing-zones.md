---
id: meshstack.aws.landing-zones
title: Landing Zones
---

AWS Landing Zones use Cloud Formation templates to orchestrate configuration of managed AWS accounts. In the following section the options for this Landing Zone are described.

You have two paths for provisionig AWS accounts. You can simply use CloudFormation StackSets in order to bootstrap your account or you can use an existing, "external" (in the sense of not controlled via meshstack) Account Vending Machine (AVM). Decide for a bootstrap path and configure the Landing Zone accordingly.

## Parameters

Each Landing Zone has parameters which control its behavior. The available parameters are described below.

### Target Organization Unit ID

This parameter is optional. If it is set all meshProjects placed under this Landing Zone will be put under this Organization Unit (OU). This might be helpful if a SCP (Service Control Policy) should be assigned to all of these projects. If left empty a new OU will be created for every customer and all of his meshProjects with AWS platform will be placed in it.

You must provide the ID of the OU which can be found in the AWS Organizational Management panel. The IDs start with `ou-*`.

You can also use a root account under which the accounts will be placed when they are created. Root IDs start with `r-*`.

### AccessStack Template URL

This StackSet will be created in every new AWS account. It usually contains simple bootstrapping resources such as required roles.

### StackSet ARN

Operators can also configure an [CloudFormation StackSet](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html) on an AWS Landing Zone. meshStack will then ensure that all AWS Accounts provisioned using this Landing Zone will receive a StackInstance from the StackSet. This allows operators to leverage that StackSet to centrally manage configuration and resources for all AWS Accounts under the landing zone.

Each AWS project which now gets this Landing Zone assigned will be setup to receive the Cloud Formation Stack Instance setup.

The following parameters can be used in the StackSet template:

| Parameter      | Description                                                                                                                     |
| -------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| AccountName    | Name of the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html)               |
| AccountEmail   | Email associated with the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html) |
| AccountId      | Unique Id of the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html)          |
| AccountArn     | ARN of the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html)                |
| ProductName    | meshCustomer Identifier                                                                                                             |
| ~~CostCenter~~ | ID of the CostCenter defined for this meshProject.(Deprecated, please use tagCostCenter)                                        |
| ContactEmail   | E-Mail of the meshProject creator. Currently this is the user who created the project.                                        |
| Stage          | The meshProject identifier                                                                                                          |

In addition, any payment settings, project tags or customer tags can also be used in the StackSet template. These parameter keys will have the prefix `tag`.
For example, the value of the tag `costCenter` will be made available via the key `tagCostCenter`.

> If you are planning on converting any of the StackSet parameters into AWS tags, please be aware of the limits and requirements
> that AWS has [described in their docs](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html#tag-conventions).
>
> Key takeaways here:
>
> - A resource can have a maximum of 50 user created tags
> - The characters _ . : / = + - @ are not allowed in tag keys or values.
> - Tag keys (and values) are case sensitive. It is recommend to use a consistent capitalizing strategy.

**Known Issues**: If you use parameters in your AWS template please make sure the parameters are used in a resource depending on them. If a parameter is specified without a relationship towards a resource in the template, the update calls to this parameter will get silently ignored from AWS. In such a case the parameter won't receive a new value during a project replication. Only if you reference a parameter in a way that a change will affect a resource a real update is performed. A working parameter update could be this example, where the parameter alters the name of a S3 bucket:

```json
{
  "Parameters": {
    "tagCostCenter": {
      "Type": "String",
      "Description": "ID of the CostCenter."
    }
  },
  "Resources": {
    "ExampleBucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "BucketName": {
          "Fn::Join": [
            "-",
            [
              "examplebucket",
              {
                "Ref": "tagCostCenter"
              }
            ]
          ]
        }
      }
    }
  }
}
```


#### StackInstance Deploy Region

The StackInstances will be deployed in this region.

> **Important:** A StackInstance can currently only be deployed in one region. In order to work around you can create another StackInstance in different regions triggered by the first instance.

### meshRole to Platform Role Mapping

The meshProject roles must be mapped to AWS specific roles. Your are able to control this mapping with a Landing Zone setting. You can specifiy these mappings by adding role mappings and supplying a AWS Role Name here. The replicator will try to create this roles if necessairy so please make sure it has the correct right to do so, otherwise replication will fail. If you dont want to provide the meshStack with these rights
you can also make sure that these roles already exist in AWS and the meshStack will only assign the users to these roles.

You can also add multiple policies to such a role (by providing either a policy name or an ARN). During the meshProject replication meshStack will make sure that these policies are assigned to the AWS role (please make sure the replicator principal is allowed to do so, otherwise replication will fail as well). If no policy is assigned it is assumed that the roles will be pre-configured with the correct roles via for example some kind of account vending machine.

### Lambda ARN

As some users might have already their own custom AWS account provisioning solution, usually called Account Vending Machines (AVM), other mechanisms are needed in order to bootstrap newly created AWS accounts.

While it is possible to trigger an AVM execution via a StackSet a better alternative is usually to trigger it by an custom Lambda function invocation. During the AWS account [replication](./meshcloud.tenant.md) meshStack is able to invoke such a function with custom parameters. From this function the external AVM can start its provisioning process.

> Please make sure the `MeshfedServiceRole` has the rights in order to trigger the configured Lambda.

The Lambda is called synchronously, so please make sure your Lambdas execution time is kept low. If you have to do long running tasks its a good advice to call another lambda in an async fashion from the initial Lambda call, so you can return to the replication code without hitting HTTP timeouts.

If the function could not be invoked because of a server error for example a permission error prevents the function of being called, this is regarded as a replication error and will fail the project replication.
If the function itself signals an error, the error code returned by the function is currently not used but only logged for reference. This is done in order to allow the replication of the meshProject to be continued.

The following parameters can be used in the Lambda function and are provided as a JSON payload like the following pattern:

```json
{
  "AccountName": "max-muster",
  "AccountEmail": "max@muster.de",
  // ...
}
```

| Parameter      | Description                                                                                                                     |
| -------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| AccountName    | Name of the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html)               |
| AccountEmail   | Email associated with the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html) |
| AccountId      | Unique Id of the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html)          |
| AccountArn     | ARN of the created [AWS account](https://docs.aws.amazon.com/organizations/latest/APIReference/API_Account.html)                |
| ProductName    | meshCustomer Identifier                                                                                                             |
| ~~CostCenter~~ | ID of the CostCenter defined for this meshProject.(Deprecated, please use tagCostCenter)                                        |
| ContactEmail   | E-Mail of the meshProject creator. Currently this is the user who created the project.                                        |
| Stage          | The meshProject identifier                                                                                                          |

In addition, any payment settings, project tags or customer tags can also be used as Lambda function parameters. These parameter keys will have the prefix `tag`.
For example, the value of the tag `costCenter` will be made available via the key `tagCostCenter`.

## Account Vending Machines

In order to detect the finished execution of the AVM meshStack looks for certain tags on the AWS account. If such a tag is present the success of the external [replication](./meshcloud.tenant.md) is assumed and the [replication](./meshcloud.tenant.md) process is handed back to meshStack.

Currently the account must contain these tags to be picked up:

- ProductName: Must contain the meshCustomer identifier
- Stage: Must contain the meshProject identifier

> These tags will soon be customizable in the AWS Landing Zone configuration.

Please contact meshcloud for more details and reference configurations.

## Example meshLandingZone

This section serves as an example on how you can use a meshLandingZone to bootstrap the newly created AWS account.

### Create the Access Stack

Create a meshLandingZone with the following Access Stack configured. This will create the `AWSCloudFormationStackSetExecutionRole` in the newly provisioned account. This role has the [minimum permissions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs-self-managed.html#stacksets-prereqs-advanced-perms) for StackSets to work plus IAM permissions. The IAM permissions are needed because the StackSet we deploy later on will need to perform some IAM operations.

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Parameters": {
    "AutomationAccountId": {
      "Type": "String",
      "Default": "987654321321",
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
            "PolicyName": "AllowStackSetsToCreateIAMResources",
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

This StackSet example defines two roles. One is the `OrganizationAccountAccessRole` which has admin privileges. This role trusts the management account and can be used to login to the new account with admin privileges if you require that. The other role is the `CrossAccountLambdaExecutionRole` which will be assumed by the Automation Account's Lambda function to perform its tasks.

After creating the StackSet, configure the StackSet section in the meshLandingZone with the ARN.

> Update the following Default parameters with the correct values.

```json
{
  "Parameters": {
    "ManagementAccountId": {
      "Type": "String",
      "Default": "123456789123",
      "Description": "The ID of the Management Account"
    },
    "AutomationAccountId": {
      "Type": "String",
      "Default": "987654321321",
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
    "CrossAccountLambdaExecutionRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "CrossAccountLambdaExecutionRole",
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
                      ":role/AutomationAccountLambdaServiceRole"
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
          "arn:aws:iam::aws:policy/IAMReadOnlyAccess"
        ]
      }
    }
  }
}
```

### Create the Lambda

Create the `AutomationAccountLambdaServiceRole` with the following policy and trust relationship in the automation account. Additionally attach the `AWSLambdaBasicExecutionRole` managed policy so that the Lambda can log to CloudWatch.


<!--DOCUSAURUS_CODE_TABS-->
<!--Policy-->
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowAssumeRoleForCrossAccountAccess",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/CrossAccountLambdaExecutionRole"
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

Create the Lambda function that will run the automation. Set the Execution Role of the Lambda to `AutomationAccountLambdaServiceRole`.

```python
import json
import logging
import boto3

import http.client

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


def lambda_handler(event, context):
    logger.debug("Recieved event " + json.dumps(event))
#  E.g EVENT FORMAT:
# {
#     "tagEnvironment": "Test",
#     "tagConfidentiality": "Public",
#     "tagYOUR_REPLICATED_TAG": "VALUE",
#     "ProductName": "CUSTOMER_NAME (meshcloud)",
#     "ContactEmail": "CONTACT_EMAIL (admin@meshcloud.io)",
#     "Stage": "PROJECT_NAME (test-aws-integration)",
#     "AccountName": "CUSTOMER_NAME.PRODUCT_NAME (meshcloud.test-aws-integration)",
#     "AccountEmail": "AWS_ROOT_ACCOUNT_EMAIL (awsexample+meshcloud.test-aws-integration@meshcloud.io)",
#     "AccountId": "NEW_ACCOUNT_ID (001228688548)",
#     "AccountArn": "NEW_ACCOUNT_ARN (arn:aws:organizations::122242404000:account/o-9y4kda3oxr/001228688548)"
# }

# E.g HTTP REQUEST TO ANOTHER WEBSITE
    connection = http.client.HTTPSConnection("httpbin.org")
    headers = {
        "Meshcloud-Replicated-Environment-Tag": event['tagEnvironment'],
        "Meshcloud-Account-Id": event['AccountId'],
        "Meshcloud-Customer-Name": event['ProductName'],
        "Meshcloud-Project-Name": event['Stage'],
        'Content-type': 'application/json',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    }
    body = json.dumps({"Hello": "World!"})
    connection.request('GET', "/anything", body, headers)
    response = connection.getresponse()
    print(response.read().decode())

# ASSUME CROSS ACCOUNT ACCESS ROLE FROM NEW ACCOUNT
# You can assume the role that you have created with StackSet template and execute custom automations on your new account.
    accountId = event["AccountId"]
    sts = boto3.client('sts')
    assumed_role_object = sts.assume_role(
        RoleArn="arn:aws:iam::"+accountId+":role/CrossAccountLambdaExecutionRole",
        RoleSessionName="LambdaSession"
    )

    logger.debug("Successfully assumed role in the new account.")

    credentials = assumed_role_object['Credentials']
    accessKey = credentials['AccessKeyId']
    secretKey = credentials['SecretAccessKey']
    sessionToken = credentials['SessionToken']

# E.g Print all IAM Roles from the new Account
    iam = boto3.client(
        'iam',
        aws_access_key_id=accessKey,
        aws_secret_access_key=secretKey,
        aws_session_token=sessionToken
    )

    logger.debug("Print all roles from the new acccount:")
    response = iam.list_roles()
    for role in response['Roles']:
        logger.debug(role['RoleName'])

    return {
        'statusCode': 200,
        'body': 'Success'
    }
```

Configure the Lambda ARN in the meshLandingZone with the ARN of the above created Lambda.
This Lambda will be invoked during account provisioning and execute the automation.
