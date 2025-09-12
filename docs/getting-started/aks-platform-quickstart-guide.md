---
id: aks-platform-quickstart-guide
title: AKS Platform Quickstart Guide
---


## Introduction

Welcome to the **First Platform: AKS guide**! This guide provides step-by-step instructions to help you quickly set up
your first meshStack platform integration with Azure Kubernetes Service (AKS).

## Goals

By the end of this guide, you will have achieved:

1. Creating a platform integration with AKS. This will allow:
   - provisioning new namespaces
   - assign users
   - assign tags (optional)
2. Successfully testing the AKS integration

This allows your application teams to open up meshStack and provision themselves namespaces and authorization on AKS.

## Prerequisites

Before starting, ensure you have the following:

- An AKS Cluster that is publicly accessible via the internet
- A place to run Terraform. For example, your local machine, or the Azure cloud shell.

## Preparing Infrastructure in Azure

To integrate your AKS cluster into meshStack properly, we require a few things to be in place in AKS & Azure for a successful integration.

In this guide, we will use our Terraform module to set these things up. You can also do this manually, but we highly recommend doing this with Terraform, and for this guide we assume you did.

Amongst other things, the Terraform module will create a service user with the right permissions in the Kubernetes cluster and create a service principal in Azure to interact with your Microsoft Entra ID tenant.

Click [here](https://github.com/meshcloud/terraform-aks-meshplatform) and follow along the guide in the README to use the Terraform module.

Make sure you execute the last step of exporting the outputs and save these somewhere. We need them later in this guide.

## Creating the Platform

1. **Open the platform list in the platform builder**

   When entering your workspace, click the blue “Platform Builder” button at the top-right if you haven’t already. Then open the menu on the left-hand side and click on “Platform → Platforms”.

2. **Create a new platform**

   In the list, click on the button “+ Create new platform”. A wizard will open where we will have to enter some information.

3. **Select platform type**

   Under “Platform Type” pick “Azure Kubernetes Service”.

4. **Enter name, identifier & description**

   Enter a fitting name, for example “Azure Kubernetes Service”. You can pick a more specific name if you have multiple clusters for example.

   For the identifier pick something similar to the name, for example `aks`.

   For the description you can write a little bit of additional information about your cluster that people can see in the marketplace. You can also leave this empty for now.

5. **Enter cloud platform web console URL**

   Enter a URL here that users can use to open the web console of your AKS cluster. You can enter the API Server Address that can be found in Azure Portal when opening up your AKS cluster.

   The support & documentation fields below can be left empty.

6. **Create a new location**

   Locations are a grouping mechanism for multiple platforms in meshStack. For now you can create a new location and give it the name and identifier “AKS”. After that, click “Next”.

7. **Pricing**

   You will be prompted to enter a price for your new platform. You can skip this for now.


🎉 The platform is created in meshStack! But it won’t be usable yet. We will have to properly integrate it now


## Configuring Integration

1. **Open the configuration**

   In the last step you should have landed on the configuration page. If not, or if you navigated away again in the meantime, open up the platform and go to “Settings → Configuration”.

2. **Enter base URL**

   Enter the base URL for calling the APIs of your cluster. An example URL is `https://aks-meshcloud-dev-dns-95df19f5.hcp.westeurope.azmk8s.io`.

3. **Add replication config**

   Click the green “+ Add config” button under “Replication Configuration”. This configuration is responsible for managing namespaces & IAM.

4. **Enter access token**

   From your Terraform outputs from before (Preparing Infrastructure step) grab the `replicator_expose_token` value and paste it into the “Access Token” field.

   The next field “Namespace Name Pattern” you can leave as-is for now.

5. **Configure Microsoft Entra ID tenant**

   In the section below under “Additional Access Configuration” go AKS-specific configuration so that meshStack can manage user & groups in your Microsoft Entra ID tenant.

   Under “AAD Tenant” enter either the domain name or ID of your Microsoft Entra ID tenant that holds the service principal.

   For Authentication Type, you get to pick whether you use Workload Identity Federation or Credentials. Please continue below in the section of your choice. We recommend Workload Identity Federation because it is more secure.

   **Workload identity federation (recommended)**

   Select “Workload Identity Federation” for Authentication Type and you will see a blue banner pop up. Copy the code mentioned there and paste that into the meshPlatform AKS Terraform module from before (if you haven’t already). This will set up Workload Identity Federation for the Service Principal in Azure.

   After that is done, you can look up the `replicator_service_principal` output of the Terraform module and copy the value of the property `Application_Client_ID` into the field in meshStack called “Application (client) ID”.

   In the same object, you should also find the property `Enterprise_Application_Object_ID`. The value of this should go into the field “Enterprise Application Object ID”.

   **Credentials**

   Select “Credentials” for Authentication Type. Make sure you also set `create_password = true` in the meshPlatform AKS Terraform module as a new password is needed for the Service Principal.

   After that is done, you can look up the `replicator_service_principal` output of the Terraform module and copy the value of the property `Application_Client_ID` into the field in meshStack called “Application (client) ID”.

   In the same object you should also find the property `Enterprise_Application_Object_ID`. The value of this should go into the field “Enterprise Application Object ID”.

   Lastly, enter the value of `Client_Secret` into the field “Client Secret”.

6. **Cluster configuration**

   Next up we have to configure more specifics of the cluster that is hosted in Azure.

   You can leave “User Group Name Pattern” as is. If you configured an Administrative Unit for the service principal then enter its ID in the field “Administrative Unit ID”.

   Enter the subscription ID where the AKS cluster is hosted in “Subscription ID”.

   Enter the name of the AKS cluster in “Cluster Name”.

   Enter the Resource Group name where the AKS cluster is hosted in “Resource Group”.

   You can leave User Lookup Strategy as is and you can leave the B2B User Federation section untouched.

   We will also skip the “Metering Configuration” part of this guide as it is related to monitoring costs and setting prices of your cluster.


🎉 All the necessary configuration has been filled in! Let’s create a landing zone now and then test the new platform.

## Creating a Landing Zone

The last step before testing the platform is creating a so-called landing zone. The landing zone contains configuration for auto-deletion settings, role mappings & more. Landing zones can be used to split up different behavior depending on environments e.g. dev & prod. It is mandatory for a platform to have a landing zone.

1. **Create new landing zone**

   Open up the “Landing Zones” tab in your platform and click “+ Create new Landing Zone”.

2. **Fill in general information**

   Enter a fitting name, identifier and description for the landing zone. You can simply enter “AKS” for name and identifier and enter a simple description such as “Default setup for a new AKS namespace.

3. **Enable deletion**

   If wanted, you can enable automated tenant deletion by checking both boxes under “Tenant Deletion”. This will allow your application teams to delete their namespaces in self-service using meshStack.

4. **Enter role mappings**

   On the right-hand side create a total of three role mappings by clicking “+ Add Role Mapping” three times.

   In here we can select which role in meshStack relates to which role in your kubernetes cluster. As a start, we recommend the following mapping:

   - Project Admin → `admin`
   - Project User → `edit`
   - Project Reader → `view`

5. **Create the landing zone**

   Below the role mappings is a section called Quotas. We will skip this for now, but it allows you to manage default quotas for newly created namespaces.

   Finish the process by clicking “Save” at the bottom of the page.


🎉 The landing zone has been created! Let’s get to testing

## Testing Tenant Creation

We will now use the same workspace to test the flow of creating a new namespace (also known as a meshStack **tenant**) from the completely same perspective as your application teams.

1. **Open the workspace manager**

   The easiest way to do this is by clicking the meshStack logo all the way on the top-left of meshStack.

2. **Open the marketplace**

   Open the marketplace tab and look for your AKS platform and open it up

   > You’ll notice it says “Private”. This platform is already available in your own marketplace but it won’t be for anyone else yet until it is tested and published.

3. **Add the platform**

   Click “Add to project” and you’ll be prompted to select a project. You can either pick an existing project (if you have one) or create a new one.

4. **Create the new tenant**

   Depending on what you did above finish the creation of the tenant (and project) and follow the instructions on the screen.

5. **Monitor the tenant status**

   Open up the tenant you just created and wait for it to finish the replication process. This should not take longer than a minute.

6. **Success?**

   If all went well, you should see a green “Replication Success” label pop up. If not, and an error occurred, let’s investigate the issue.

7. **Fixing replication issues**

   (This part is only relevant if the replication failed) You can go back to the Platform Builder and open up the list of tenants under “Platforms → Tenants”. Open up the newly created tenant and you should see more detailed logs on why the replication process failed. This can have many reasons such as wrong credentials or mistyped configuration. You can try and solve the issue by changing your configuration and running replication again on the tenant.


🎉 That’s it! You successfully integrated your AKS cluster as a platform in meshStack and tested that it works

## What’s next?

- Publish the platform so anyone in the organization can use it and provision namespaces in self-service.
- [Build a developer platform](./aks-developer-platform-quickstart-guide.md) on top of the AKS platform.
  This can be a developer platform that contains all the tools your developers need to build applications on top of Kubernetes.
- Build your own building blocks on top of the platform for commonly used services in Kubernetes.
- Integrate more platforms such as AWS, Azure or GCP.
