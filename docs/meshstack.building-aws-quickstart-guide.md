---
id: meshstack.building-aws-quickstart-guide
title: AWS S3 Quickstart Guide
---

## Introduction

Welcome to the **AWS Building Block Quickstart Guide**! This guide provides step-by-step instructions to help you
quickly set up your first meshStack Building Block and deploy AWS resources using Terraform.

## Goal

By the end of this guide, you will have achieved:

1. Creating a [Building Block Definition](./administration.building-blocks.md) that deploys an S3 Bucket using Terraform.
2. Deployed & tested the Building Block.
3. Publishing the Building Block on the marketplace.

## Prerequisites

Before starting, ensure you have the following:

- An AWS Account with a Service User that has permission to manage S3 Buckets.
  - Tip: have a look at our [Terraform code](https://github.com/meshcloud/collie-hub/tree/main/kit/aws/buildingblocks/s3_bucket/backplane)
    for defining a Service User to learn more.
- Terraform code to provision an S3 Bucket. We highly recommend using our
  [template](https://github.com/meshcloud/collie-hub/tree/main/kit/aws/buildingblocks/s3_bucket/buildingblock) to get started.
- Access to a meshStack Workspace that has the [Service Management Area enabled](./marketplace.service-management-area.md).
  If you do not see the Service Management Area, go to Settings -> General in your workspace and enable the Service Management Area.

## Creating Definition

1. **Open the list of Building Block Definitions in the Service Management Area.**

   When entering your workspace, click the blue “Go to Services Management” button at the top-right if you haven’t already.
   Then open the menu on the left-hand side and click on “Building Blocks → Building Blocks”.

2. **Create a new Building Block Definition**

   In the list, click on the button “+ Create new Definition”. A wizard will open where we will have to enter all
   the necessary information to run the S3 bucket using Terraform.

3. **Select a Type**

   For this guide, select “Workspace Building Block”. It works without needing a tenant, which makes things simpler.

4. **Configure Appearance**

   Now enter a fitting name, description, and logo. You can also use our example information below:

   Name: `AWS S3 Bucket`

   Description: `Deploy a simple AWS S3 Bucket based on best-practices. You will be able to read and write into this bucket.`

   Logo: You can copy the logo from below or use your own.

   ![Simple Storage Service.png](./assets/s3_logo.png)

5. **Skip over other settings**

   We can also enter more information on this screen but you can leave all of this as it is for now.

    - Notification User: receive notifications when things require your attention. This is set to your user by default.
    - Support & Documentation: you can enter URLs that will be visible in the marketplace to users to request support or read more documentation.

6. **Entering Terraform Implementation details**

   If still on the General page, click “Next” and let’s start filling in all details for running Terraform as part of this Building Block.

   You will be asked which Implementation Type to use. Pick “Terraform” here. Additional settings will show up.

    - Enter a desired Terraform version or leave the default value.
   
   > 💡Any versions entered over 1.5.5 will run using [OpenTofu](https://opentofu.org/).
   > This is an open-source friendlier alternative of Terraform.

    - Enable the option “Use meshStack’s Http Backend” if using our template. This makes sure that Terraform has a place
      to store its state, which is highly recommended to be used and enables automatic deletion of cloud resources again.
      If you use your own template and you have a backend configured already, you can leave this disabled.
    - Enter a Git repository URL. You can either enter your own or use our template, for which the git repository URL
      is `https://github.com/meshcloud/collie-hub.git`
        - The AWS Bucket Terraform code is under folder `kit/aws/buildingblocks/s3_bucket/buildingblock`.
          Make sure to enter this folder under "Git Repository Path".
    - You can leave Git Reference empty for now. With this field, you can pin the used Terraform files to a certain
      git tag, branch, or commit.
    - If you don’t use a self-hosted git repository, a “Test Connection” button will appear.
    - Click this button and if everything is correct you should see all Terraform files related to your AWS S3 bucket.
        - If anything has gone wrong, you will receive an error message instead. Analyze the given error, try to
          resolve the issue, and try again.
    - For “Execution Mode” leave this as it is. In complex scenarios, you can take over the status reporting of your
      Building Block using meshStack API’s.
    - For “Deletion Mode” leave this as it is too. We highly recommend using “Delete Resources” which means that
      meshStack will clean up the underlying infrastructure resources upon deletion using `terraform destroy`.
7. **Entering Inputs**

   If you haven’t already, click “Next” on the implementation page.

   You will land on the “Dependencies” page.

    - meshStack can work with [Dependencies between Building Blocks]. We will skip this in this quickstart guide.

   Click “Next” again and you should see a modal pop-up with imported inputs, authentication, and outputs.

   meshStack read out the Terraform files and automatically generated fitting inputs based on the defined variables, outputs, and providers.

   Leave all of them checked and click “Add selected”.

   We will now see all variables that are defined in Terraform plus the AWS authentication environment variables that
   are needed to manage resources in AWS. Let’s fill those in:

   (If you are unsure what rights are needed, take a look at our
   [Terraform IAM definition](https://github.com/meshcloud/collie-hub/blob/main/kit/aws/buildingblocks/s3_bucket/backplane/iam.tf)
   for this quickstart guide)

    - For `AWS_ACCESS_KEY_ID` add the ID of an Access Key in AWS that has the right to manage S3 resources in the “Static Value” field.
    - For `AWS_SECRET_ACCESS_KEY` enter the secret of the Access Key in AWS in the “Static Value” field.
8. **Entering Outputs**

   Move on to the Outputs page by clicking “Next” on the bottom right.

   The outputs will also be there already based on the import from before. You can leave all of these as they are and click “Create Definition”.

🎉Your definition is created, well done! The hard work is finished. Let’s get to testing your new definition and make sure it works as expected.

## Testing the Definition

After the previous step, you should have landed on the control plane of your new building block definition.
There should be a wizard explaining what the next step is. Let’s follow those recommendations.

1. **Deploy & Start Testing**

   Under “Test definition” you’ll see a blue button “Deploy & Start Testing”. Click on it.

2. **Enter Inputs**

   You will be prompted to enter all Inputs that were configured before. Enter these with some sensible values and hit “Deploy Building Block”.

3. **Analyze the run**

   You will be redirected to the list of Building Blocks and you should see the newly created Building Block in a pending state.
   Let’s open it up and see if it runs successfully. Click on the name of the Building Block and open up the first run. You should see the Terraform logs which are automatically refreshed.

4. **Green Light?**

   After a short moment, the Building Block should finish and you should have a successful run! If something went wrong,
   try to read the logs and see if you can resolve the given error. You can go back to the settings of the Building
   Block Definition, make some changes, and trigger a new run in the list of runs. Keep trying until the building block runs successfully.

🎉The building block run is successful and with that, you deployed an S3 bucket on AWS using meshStack!

## Publishing the Building Block on the marketplace

Now that your Building Block runs successfully in your workspace, let’s make it available to others in your organization via the marketplace.

1. **Open the Marketplace**

   Navigate back to your workspace view (click the meshStack logo top-left) and open the **“Marketplace”** tab. You’ll see your Building Block listed there — it will have a **“Draft”** badge, meaning it’s only visible to you right now.

2. **Review Your Building Block**

   Click on your Building Block to open it. Check that everything looks good — the name, description, logo, and any support or documentation URLs (if set).

3. **Test the consumption flow**

   Click **“Add Service”** to walk through the process your colleagues would use to consume the Building Block. Fill in the inputs you configured and confirm.

4. **Consume the Building Block**

   Click on “Add Service” on the top right and let’s see what the consumption process looks like for everyone.

   After clicking “Add Service” you’ll have to fill in the inputs you configured before. Fill them in and confirm.

5. **Submit for Publishing**

   Go back to the Service Management Area and open up your Building Block from before.

   On the top-right click the “Submit for Publishing” button. You will be prompted with some more information about the process.

   Go ahead and click “Yes, submit for review”.


🎉That’s it! Your new Building Block has now been submitted for review. Once an admin approves you will be notified via e-mail and your Building Block will be published and ready to be used by the rest of the organization! 🎉
