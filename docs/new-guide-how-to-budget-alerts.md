---
id: new-guide-how-to-budget-alerts
title: How to Use Budget Alerts
---

:::note What Is This Guide About?
This guide explains how to set up budget alerts in meshStack and what to do if your budget is exceeded.
:::

## Challenge

Staying on top of platform costs is critical. meshStack’s budget alerts help application teams to quickly react when costs approach or exceed budget limits.

## Prerequisites

- You are a workspace manager or workspace owner in a workspace.
- Your workspace has a payment method with a configured limit.

## Step by Step Guide

### How Budget Alerts Work

- Budget alerts are sent automatically—no setup required.
- You’ll receive an alert if:
  - You’re a Workspace Manager or Owner.
  - Your workspace has a payment method with a set limit.
  - Cloud consumption reaches 80% or more of this limit (e.g., €400 out of a €500 limit).
- Alerts are sent via email on Monday mornings.
- To avoid spam, all relevant budget alerts are bundled into a single email.

:::info
Currently, budget alerts and payment method status only consider Euro. While budgets can be set in Dollar and Euro, support for additional currencies is planned.
:::

### What to Do If a Budget Is Exceeded

1. **Increase the Limit of the Payment Method**
   - Contact a Cloud Foundation administrator to raise the limit for your payment method.

2. **Request a New Payment Method**
   - If enabled by your Cloud Foundation team, go to “Financials” → “Payment Methods” in the workspace control plane.
   - Click **Request Payment Method** to open the request form.
   - Once approved, set the new payment method as active for your project.

:::tip
Admins: [Learn how to configure a payment method request button.](#)
:::

## Related Resources

### Concepts

- [Cost Management](new-concept-cost-management.md)
- [Payment Methods](new-concept-payment-methods.md)
