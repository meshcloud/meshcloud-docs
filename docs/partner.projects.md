---
id: partner.projects
title: Administrate Projects
---

# Managing Project Quotas

The Partner Area includes a quota dashboard that lets you define the amount of resources your customers can use for their projects. These resource definitions are called quotas. Quotas can be set per customer project. OpenStack and Cloud Foundry quotas are defined independently.

To edit the quotas, please follow these steps:

1. Login to the Meshpanel \([panel.meshcloud.io](https://panel.meshcloud.io)\) with your partner credentials
2. Navigate to the **Partner Area** via the settings button on the top right or use this link: [https://panel.meshcloud.io/\#/partner](https://panel.meshcloud.io/#/partner)
3. Click on **Manage Customers**. In this area you can create new customers and manage your customers’ quotas. You will see a list of your customers here.
4. Under **Actions**, you can click on **Customer Projects** and you will see a list of all the projects belonging to that customer.
5. Also under **Actions**, you reach the **Quota Dashboard**. These quotas are project specific.
6. You can now edit the quotas to your needs.

## Deleted Projects

When a Meshproject is deleted, it is not completely removed in the cloud platforms and in the database. Partners and Admins can find a list of **Deleted Projects** in the **Projects** section of the **Partner Area**. This list allows Cloud Admins to check for projects that have been deleted. The "Deleted in platforms on" column shows when the background process that actually deletes the "marked for deletion" projects in the platforms has been executed successfully.

## Project History

Sometimes it might be necessary to get additional information about the lifecycle of the project. The archive icon in the list of deleted projects shows all major events that have happened on the project. This history is also available for existing projects in the **Customers** section of the **Partner Area**. Navigate to the **Customer Projects** of a specific customer and click the archive icon on the project you want to get details about.

