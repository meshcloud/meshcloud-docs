---
id: meshstack.github.repository-provisioning
title: Repository Provisioning
---

Offering GitHub repositories in a self-service model to application teams can significantly reduce the time needed to start a new project. By integrating GitHub repositories as a service through the meshStack marketplace, you streamline the onboarding process for your teams.

## Getting Started

> Prerequisites: Your organization should be using GitHub SaaS, GitHub Enterprise, or GitHub Enterprise Server.

## Step 1: Set Up the GitHub Platform in meshStack

To enable GitHub as a platform, navigate to the admin area in meshStack, select **Platforms**, and click on **Create New Platform** at the top right. Complete the required fields, and choose **GitHub** as the platform type.

## Step 2: Configure Repository Provisioning

After creating the GitHub platform, access the platform configuration by navigating to **Settings → Configuration**. To make the repository service available in the marketplace, complete the following steps:

## 1. Create a Building Block Definition

Define a building block that provides meshStack with the necessary information to create new GitHub repositories when users initiate the process. We already have prepared a template that you can use [here](https://github.com/meshcloud/collie-hub/tree/main/kit/github/repository/).

## 2. Create a Landing Zone

Configure the building block definition as a mandatory component in a new landing zone specifically for the GitHub platform.

## Step 3: Test the Marketplace Integration

Once the landing zone is created, you can test the new GitHub repository service by accessing it through a workspace in the marketplace.

Congratulations! You're one step closer to delivering a fully automated platform experience for your application teams.ss automation workflows from the marketplace, enhancing their productivity and reducing the need for Git expertise.