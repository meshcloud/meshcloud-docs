---
id: new-guide-how-to-manage-osb
title: How to Manage OSB Services
---

:::note What is this guide about?
This guide shows you how to manage OSB (Open Service Broker) services in meshStack. You'll learn how to discover, provision, update, and maintain OSB services for your projects and workspaces.
:::

:::warning
Please make sure OSBs are enabled for your meshStack. If you are not sure reach out to support@meshcloud.io
:::

## Discover Available OSB Services

### Prerequisites

- You have access to meshPanel as a workspace or project manager.
- Your platform team has enabled OSB services in your meshStack environment.

### Step by Step Guide

1. Go to the **Marketplace** section in meshPanel.
2. Browse the list of available OSB services.
3. Use filters or search to find the service you need.

## Provision a New OSB Service

### Prerequisites

- You have identified the OSB service you want to provision.
- You have the necessary permissions to provision services in your workspace or project.

### Step by Step Guide

1. Select the desired OSB service from the Marketplace.
2. Click **Provision** or **Create Instance**.
3. Fill out the required configuration fields (such as service plan, parameters, and target project or workspace).
4. Submit the form to start provisioning.
5. meshStack will handle the request and show you the status.

## View and Manage Existing OSB Service Instances

### Prerequisites

- You have provisioned OSB services in your project or workspace.

### Step by Step Guide

1. Navigate to your project or workspace in meshPanel.
2. Open the **Service Instances** tab.
3. Review all provisioned OSB services.
4. Click on a service instance to view details, usage, and status.

## Update an OSB Service Instance

### Prerequisites

- You have an existing OSB service instance that supports updates.
- You have permissions to modify service instances.

### Step by Step Guide

1. Select the service instance you want to update.
2. Choose **Edit** or **Update**.
3. Change the configuration as needed.
4. Save your changes. meshStack will apply the update and show the new status.

## Delete an OSB Service Instance

### Prerequisites

- You have an OSB service instance you want to remove.
- You have permissions to delete service instances.

### Step by Step Guide

1. Select the service instance you want to delete.
2. Choose **Delete**.
3. Confirm the deletion.
4. meshStack will deprovision the service and update the status.

## Monitor Service Health and Usage

### Prerequisites

- You have provisioned OSB services in your workspace or project.

### Step by Step Guide

1. Use the monitoring and logging features in meshPanel to track the health and consumption of your OSB services.
2. If you encounter issues, check the logs or contact your platform team for support.

## Approve a Service Broker

When a user publishes a service broker, an admin needs to approve it before its services become available in the marketplace catalog.

### Prerequisites

- You have admin permissions in meshPanel.
- A user has published a new service broker that requires approval.

### Step by Step Guide

1. Open meshPanel and navigate to the **Marketplace** > **Service Broker** section.
2. Locate the service broker awaiting approval.
3. Click the check button next to the broker to approve it.
4. After approval, the broker’s services will be available to all users in the marketplace.

## Related Resources

### Concepts

- [Marketplace](new-concept-marketplace.md)
- [OSB Services](new-concept-osb-services.md)

### Guides

- [How to Implement an OSB Service Broker](new-guide-how-to-implement-osb.md)
