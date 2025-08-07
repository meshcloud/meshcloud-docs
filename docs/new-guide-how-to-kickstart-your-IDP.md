---
id: new-guide-how-to-kickstart-your-IDP
title: How to Kickstart Your IDP
---

:::note What is this guide about?
This guide shows you how to accelerate your platform engineering by importing pre-built building blocks from meshStack Hub. You'll learn how to quickly provide standardized, secure infrastructure for your teams using community-maintained resources. This guide uses AWS S3 Buckets as an example, but the process applies to any building block definition available in the meshStack Hub.
:::

:::tip
For a hands-on walkthrough of this solution, checkout the interactive demo on Storylane: [View the Interactive Demo](https://app.storylane.io/share/hzzabrqbgthk). This demo will guide you step-by-step through
importing a Building Block Definition from the meshStack Hub and making it available to your platform users.
:::

## Prerequisites

- You have a user with workspace owner or admin permissions to access platform builder. 
- You have an AWS principal with the rights to deploy AWS S3 Buckets.

## Step by Step Guide

### 1. Visit meshStack Hub

- Go to [hub.meshcloud.io](https://hub.meshcloud.io) and browse the curated collection of ready-to-use Terraform modules.
- Locate the [AWS S3 Bucket](https://hub.meshcloud.io/platforms/aws/definitions/aws-s3_bucket) module. Review its description and purpose.

### 2. Import a Building Block Definition

- Choose the *AWS S3 Bucket* module.
- Click **Import to meshStack**.
- Enter your meshStack URL if prompted.
- You'll be redirected to meshPanel and asked where to import the building block definition. Select the workspace for the import.
- You'll land on the building block definition creation page with pre-populated information.

### 3. Finish Creation of the Building Block Definition

- Complete the pre-populated form.
- The inputs are automatically imported. Fill in the AWS Secret Key and AWS Access Key ID.
- Finish the creation wizard.

### 4. Finishing Up

✅ That's it! You now have a fully working Building Block Definition for an AWS S3 Bucket. Application teams can use it to provision compliant S3 buckets in their projects.

## Related Resources

### Concepts

- [Building Block](new-concept-buildingblock.md)
- [meshStack Hub](https://hub.meshcloud.io)
