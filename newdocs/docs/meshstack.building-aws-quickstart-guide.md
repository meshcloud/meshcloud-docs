---
id: meshstack.building-aws-quickstart-guide
title: AWS S3 Quickstart Guide
---

## Introduction

Welcome to the **AWS building block quickstart guide**! This guide provides step-by-step instructions to help you
quickly set up your first meshStack building block and deploy AWS resources using Terraform.

## Goals

By the end of this guide, you will have achieved:

1. Creating a [building block definition](./administration.building-blocks.md) that deploys an AWS S3 Bucket using Terraform.
2. Deployed & tested the building block.
3. Publishing the building block on the marketplace.

## Prerequisites

Before starting, ensure you have the following:

- An AWS account with a service user that has permission to manage S3 buckets.
  - Tip: have a look at our [Terraform code](https://github.com/meshcloud/meshstack-hub/tree/main/modules/aws/s3_bucket/backplane) for defining a service user to learn more.
- Terraform code to provision an S3 bucket. We highly recommend using our [template](https://github.com/meshcloud/meshstack-hub/tree/main/modules/aws/s3_bucket/buildingblock) to get started.
- Access to a meshStack workspace that has the [service management area enabled](./marketplace.service-management-area.md).  
  If you do not see the service management area, go to settings -> general in your workspace and enable the service management area.

## Creating Definition

1. **Open the list of building block definitions in the service management area.**

   When entering your workspace, click the blue “Go to Services Management” button at the top-right if you haven’t already.
   Then open the menu on the left-hand side and click on “Building Blocks → Building Blocks”.

2. **Create a new building block definition**

   In the list, click on the button “+ Create new Definition”. A wizard will open where we will have to enter all
   the necessary information to run the S3 bucket using Terraform.

3. **Select a type**

   For this guide, select “Workspace Building Block”. It works without needing a tenant, which makes things simpler.

4. **Configure appearance**

   Now enter a fitting name, description, and logo. You can also use our example information below:

   Name: `AWS S3 Bucket`

   Description: `Deploy a simple AWS S3 Bucket based on best practices. You will be able to read and write into this bucket.`

   Logo: You can copy the logo from below or use your own.

   ![Simple Storage Service.png](./assets/s3_logo.png)

5. **Skip over other settings**

   You can also enter more information on this screen, but you can leave all of this as it is for now.

   - Notification user: receive notifications when things require their attention. This is set to your user by default.
   - Support & documentation: you can enter URLs that will be visible to users in the marketplace to request support or read more documentation.

6. **Entering Terraform implementation details**

   If still on the general page, click “Next” and let’s start filling in all details for running Terraform as part of this building block.

   You will be asked which implementation type to use. Pick “Terraform” here. Additional settings will show up.

   - Enter a desired Terraform version or leave the default value.

   > 💡Any versions entered over 1.5.5 will run using [OpenTofu](https://opentofu.org/).  
   > This is an open-source, friendlier alternative of Terraform.

   - Enable the option “Use meshStack’s Http Backend” if using our template.
     Learn more about how this meshStack backend works [here](./meshstack.building-blocks.meshStack-http-backend.md).
   - Enter a git repository URL. You can either enter your own or use our template, for which the git repository URL
     is `https://github.com/meshcloud/meshstack-hub.git`
       - The AWS Bucket Terraform code is under folder `modules/aws/s3_bucket/buildingblock`.
         Make sure to enter this folder under "Git Repository Path".
   - You can leave "Git Reference" empty for now. With this field, you can pin the used Terraform files to a certain
     git tag, branch, or commit.
   - If you don’t use a self-hosted git repository, a “Test Connection” button will appear.
   - Click this button and if everything is correct you should see all Terraform files related to your AWS S3 bucket.
       - If anything has gone wrong, you will receive an error message instead. Analyze the given error, try to
         resolve the issue, and try again.
   - For “Execution Mode” leave this as it is. In complex scenarios, you can take over the status reporting of your
     building block using meshStack APIs.
   - For “Deletion Mode” leave this as it is too. We highly recommend using “Delete Resources” which means that
     meshStack will clean up the underlying infrastructure resources upon deletion using `terraform destroy`.

7. **Entering inputs**

   If you haven’t already, click “Next” on the implementation page.

   You will land on the “Dependencies” page.

   > meshStack can work with [dependencies between building blocks](./administration.building-blocks.md#dependencies).
   > We will skip this in this quickstart guide.

   Click “Next” again, and you should see a modal pop-up with imported inputs, authentication, and outputs.

   meshStack read out the Terraform files and automatically generated fitting inputs based on the defined variables, outputs, and providers.

   Leave all of them checked and click “Add selected”.

   You will now see all variables that are defined in Terraform plus the AWS authentication environment variables that
   are needed to manage resources in AWS. Let’s fill those in:

   (If you are unsure what rights are needed, take a look at our
   [Terraform IAM definition](https://github.com/meshcloud/meshstack-hub/blob/main/modules/aws/s3_bucket/backplane/iam.tf)
   for this quickstart guide)

   - For `AWS_ACCESS_KEY_ID` add the ID of an access key in AWS that has the right to manage S3 resources in the “Static Value” field.
   - For `AWS_SECRET_ACCESS_KEY` enter the secret of the access key in AWS in the “Static Value” field.

8. **Entering outputs**

   Move on to the outputs page by clicking “Next” on the bottom right.

   The outputs will also be there already based on the import from before. You can leave all of these as they are and click “Create Definition”.

🎉Your definition is created, well done! The hard work is finished. Let’s get to testing your new definition and make sure it works as expected.

## Testing the Definition

After the previous step, you should have landed on the control plane of your new building block definition.  
There should be a wizard explaining what the next step is. Let’s follow those recommendations.

1. **Deploy & start testing**

   Under “Test Definition” you’ll see a blue button “Deploy & Start Testing”. Click on it.

2. **Enter inputs**

   You will be prompted to enter all inputs that were configured before.
   For the "Region" you can leave that to the default and for the bucket name you should pick something globally unique,
   for example `meshstack-aws-s3-quickstart-guide-<your-name>`.
   After that you can click “Deploy Building Block”.

3. **Analyze the run**

   You will be redirected to the list of building blocks, and you should see the newly created building block in a pending state.  
   Let’s open it up and see if it runs successfully. Click on the name of the building block and open up the first run.
   You should see the Terraform logs which are automatically refreshed.

4. **Green light?**

   After a short moment, the building block should finish, and you should have a successful run!  
   If something went wrong, please check out the logs and see if you can resolve the given error.
   You can go back to the settings of the building block definition, make some changes, and trigger
   a new run in the list of runs. Keep trying until the building block runs successfully.

🎉The building block run is successful and with that, you deployed an S3 bucket on AWS using meshStack!

## Publishing the Building Block on the Marketplace

Now that your building block runs successfully in your workspace, let’s make it available to others in your organization via the marketplace.

1. **Open the marketplace**

   Navigate back to your workspace view (click the meshStack logo top-left) and open the **“Marketplace”** tab.
   You’ll see your building block listed there — it will have a **“Draft”** badge, meaning it’s only visible to you right now.

2. **Review your building block**

   Click on your building block to open it. Check that everything looks good — the name, description, logo, and any support or documentation URLs (if set).

3. **Test the consumption flow**

   Click **“Add Service”** to walk through the process your colleagues would use to consume the building block. Fill in the inputs you configured and confirm.

4. **Consume the building block**

   Click on “Add Service” on the top right and let’s see what the consumption process looks like for everyone.

   After clicking “Add Service” you’ll have to fill in the inputs you configured before. Fill them in and confirm.

5. **Submit for publishing**

   Go back to the service management area and open up your building block from before.

   On the top-right click the “Submit for Publishing” button. You will be prompted with some more information about the process.

   Go ahead and click “Yes, submit for review”.

🎉That’s it! Your new building block has now been submitted for review.
Once an admin approves you will be notified via e-mail and your building block
will be published and ready to be used by the rest of the organization! 🎉
