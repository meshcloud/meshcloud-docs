---
id: new-guide-how-to-integrate-external-approval-processes
title: How to Integrate External Approval Processes
---

:::note What is this guide about?
This guide explains how to connect your organization's existing financial approval processes with meshStack, so users can request new payment methods through an external system and automate approvals.
:::

## Challenge

Many organizations already have established financial approval workflows. Integrating these with meshStack ensures compliance and streamlines the process for users requesting new payment methods.

## Prerequisites

- You have an external approval or budget request system (such as an internal form or workflow).

## Step by Step Guide

### 1. Configure the External Approval URL

To integrate your external approval process with meshStack, you need to set the URL where users can request new payment methods. This URL should point to your internal approval system or form.

[Contact meshcloud support](mailto:support@meshcloud.io) to configure the `externalPaymentMethodUrl` option in your meshStack configuration and to enable the "Request New Payment Method" button in the meshPanel.

### 2. Automate Payment Method Creation

To further streamline the process, use the meshStack API to automate the creation of new payment methods after approval in your external system.

- Implement a workflow in your external system that calls the meshStack API when a request is approved.
- This reduces manual steps and ensures approved payment methods are available in meshStack without delay.

## Related Resources

### Concepts

- [Payment Methods](new-concept-payment-methods.md)
- [Cost Management](new-concept-cost-management.md)

### Guides

- [How to Manage Payment Methods](new-guide-how-to-manage-payment-methods.md)
