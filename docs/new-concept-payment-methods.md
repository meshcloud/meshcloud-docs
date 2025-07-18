---
id: new-concept-payment-methods
title: Payment Methods
---

:::warning Unsupported Functionality

- Deleting payment methods is supported via API and not available via meshPanel.
- Budgets can be applied in Dollar and Euro. Budget alerts and payment method status only considers Euro.

:::

Just like you pay for a new t-shirt online via your credit card, application teams "reference" payment methods for cost allocation of their environments. Payment methods are used for allocating cost from projects. The following points summarize the key aspects of the standard payment method setup in meshStack:

## Different Payment Method Setups

In order to enable different organizational setups meshStack provides three different payment method working modes:

1. **Standard**: By default, a payment method is required when creating a meshProject. This enforces cost allocation throughout the platform and prevents tenant creation without a payment method.
2. **Self-Service Option**: The workspace team can configure payment methods in self-service.
3. **Complete Disable**: Alternatively, you can disable the payment method feature entirely, which will remove all payment method screens from the interface.

These are configured in the backend. Please reach out to [contact support](mailto:support@meshcloud.io) if you want to change the setup.

## Standard Payment Method Setup

Use this setup if you want to enforce approval processes for payment methods and prevent the teams from entering information themselves. The following points summarize the key aspects of the standard payment method setup in meshStack:

- Payment methods are created **per workspace**. You cannot assign a payment method to more than one workspace.
- Payment methods can be **customized via tags** in the admin area to reflect organizational information such as cost centers, department information, etc.
- A payment method's identifier is **globally unique**. Please consider this when creating new payment methods by including workspace specific information such as the application or project name.
- **Expired payment methods are removed** from all projects automatically upon expiration and can no longer be assigned to any projects. If a **substitute payment method** is available, it will be assigned to the project automatically.
- **Payment methods can be managed via API**. This allows for automation and integration with external financial systems e.g. to integrate approval flows.

## Self-Service Payment Method Setup

Use this setup if you want to allow workspace teams to create and manage their own payment methods. This is useful for organization where the financial responsibility is decentralized. The following points summarize the key aspects of the self-service payment method setup in meshStack:

- You can create **one payment method per workspace**. Multiple payment methods per workspace are not supported within this setup.
- You can **assign a payment method to a project** within the workspace.
- Users **cannot set tags** on the payment method. This is only possible in the admin area.
- Users **cannot set a budget** on the payment method.
- Users can **set a cost center** on the payment method to reflect organizational information.

## Related Resources

- [How to Manage Payment Methods](./new-guide-how-to-manage-payment-methods.md)