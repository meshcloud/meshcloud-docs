---
id: meshcloud.project-resources
title: Project Resources
---

When a user is [assigned](meshcloud.project.md#assign-user-to-a-meshproject) to a meshProject, this project appears in his project list on the home screen. As long as he is not assigned, he also doesn't have access to the project and its resources. To access the meshProject you can either click on its name or the **Open Project Dashboard** button to get to the [Project Dashboard](#project-dashboard) or you click on a specific Cloud Platform to get directly to the [Project Platform Dashboard](#project-platform-dashboard).

## Project Dashboard

In the project dashboard you get an overview of all locations and their platforms, that are available for for the selected meshProject. Via the **Manage** button on the card for a specific platform, you get to the [Project Platform Dashboard](#project-platform-dashboard).

## Project Platform Dashboard

The project platform dashboard provides some general statistics for your meshProject in this cloud platform. Dependent on the Cloud Platform type, the menu on the left provides different options. For [OpenStack](openstack.index.md) you can managed your VMs, network components, etc. For [Cloud Foundry](cloudfoundry.index.md) you can managed your apps and services. For these platforms and also for other ones like AWS, Kubernetes, Azure or OpenShift, you get a SSO login option to their CLI or web console.

A [Mesh Marketplace](marketplace.index.md) is another type of cloud platform, that allows you to provision different type of services.

## CI/CD access to Cloud Platform

Platforms like AWS and Kubernetes provide advanced options to get access for you CI/CD pipelines. In case of OpenStack and Cloud Foundry, we provide the creation of [Service Users](meshcloud.service-user.md) for these purposes.
