---
id: new-guide-how-to-manage-payment-methods
title: How to Manage Payment Methods
---

:::note What is this guide about?

This guide walks you through handling payment methods in the standard and self-service payment method setups in meshStack.

:::

## Standard Payment Method Setup

### Customizing Payment Methods

You can customize payment methods in meshStack to suit your organization's financial management needs. For example, you can set them up as a cost center without budgets and a cost center ID, or as a project budgeted with a budget and a project ID.

**Prerequisites:**

- Have admin access to meshStack with organization admin, organization admin and user, or FinOps manager permissions.

**Step-by-Step Guide:**

1. Navigate to the admin area and select "Tags."
2. Create a new tag for payment methods, such as `payment-method-type` and make it required.
3. Navigate to the "Payment Methods" section and assign the new tag to the relevant payment methods.

### Manage Payment Methods as an Application Team

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.
- Have standard payment method setup enabled. This means payment methods are created by admins and assigned to workspaces.

**Step-by-Step Guide to Assess Status:**

1. Navigate to the workspace management area.
2. Under "Financials," select "Payment Methods."
3. See the status of your payment methods across projects.
4. Access the details for tags, budget status, spend history, and forecast.

**Step-by-Step Guide to Assign Payment Methods:**

1. Navigate to the workspace management area.
2. Select the project you want to assign a payment method to.
3. Under "Financials," click on "Payment Methods."
4. Choose an existing payment method.
5. **optional**: Select a substitute payment method.

### Manage Payment Methods as an Administrator

**Prerequisites:**

- Have admin access to meshStack with organization admin permissions.
- Have either standard or self-service payment method setup enabled.

**Step-by-Step Guide:**

1. Navigate to the admin area and select "Workspaces."
2. In the drop-down for the workspace, select "Create/Edit Payment Methods."

- To **create a new payment method**, click "Create Payment Method" and fill in the required details.
- To **edit an existing payment method**, select "Edit Payment Method" in the drop-down.
- To **export payment methods**, click "Export Payment Methods" to download a CSV file with the payment method details.
- To **delete a payment method**, use the meshPayment method endpoint in the API.

### Payment Method Roll Over

:::note Information
This functionality is limited to expired payment methods. Used up budgets don't lead to an automatic roll over.
:::

**Prerequisites:**

- Have admin access to meshStack with organization admin, organization user, or FinOps manager permissions.
- Have workspace owner or member access to the workspace management area of the workspace you want to provide with a substitute payment method.
- Payment methods have a expiration date e.g. 31th of December.
- Have standard payment method setup enabled. This means payment methods are created by admins and assigned to workspaces.

Use this functionality if you want to have a smooth roll over for when a payment method expires.

**Step-by-Step Guide:**

1. Assign at least two payment methods to the workspace via the admin area.
2. Navigate to the workspace management area of the workspace you want to provide with a substitute payment method.
3. Select the project you want to assign the payment method to.
4. Under "Financials," click on "Payment Methods."
5. Choose a substitute payment method.

Now the substitute payment method will automatically be active for the project when the original payment method expires.



## Self-Service Payment Method Setup

### Assigning New Payment Method

**Prerequisites:**

- Have access to the workspace management area.
- Have workspace manager or owner permissions.
- Have self-service payment method setup enabled.

**Step-by-Step Guide:**

1. Navigate to the workspace management area.
2. Under "Financials," select "Payment Methods."
3. Fill in the required details for the new payment method.
4. Click "Save" to establish the new payment method.

## Related Ressources

### Concepts

- [Payment Method](new-concept-payment-methods.md)
- [Tags](new-concept-tag.md)
- [Workspace](new-concept-workspace.md)
- [Project](new-concept-project.md)

### Guides

- [Budget Alerts](new-guide-how-to-budget-alerts.md)
