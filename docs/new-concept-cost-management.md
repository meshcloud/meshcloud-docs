---
id: new-concept-cost-management
title: Cost Management
---

> **Note:** Cost management capabilities described below are only available with the meshStack FinOps module.

## Key Components

### Chargeback Statements

Chargeback statements provide transparency around costs incurred in one project over a month. Chargeback statements are generated with the information provided by the integrated and used platforms. Chargeback statements include one or more tenant usage reports. Chargeback statements are available in the admin area and workspace manager in meshPanel and can be exported for further analysis.

### Tenant Usage Reports

Tenant usage reports provide detailed insights into resource consumption and associated costs for a tenant. These reports help teams understand their cloud usage patterns, identify cost drivers, and optimize spending. Usage reports are available in the admin area and workspace area in meshPanel.

### Resource Usage Reports

Resource usage reports are optional and can be integrated into tenant usage reports via API. Use the `meshResourceUsageReport` endpoint to provide cost data from external systems to meshStack. Once submitted, these reports are processed by meshStack’s metering system and included in regular tenant usage reports. This feature is useful if you want to supply cost information from platforms that do not have native metering support.

![Cost Management and Financial Reports Diagram](./assets/new_concept/concept_financialreports.png)

### Pricing

meshStack enables you to set internal prices for platforms and building blocks you offer to application teams in your organization. This allows you to allocate costs to specific projects, teams, or environments, and helps you manage your cloud spending more effectively.

Current functionality includes:

- Setting up internal prices for platforms in self-service
- Setting up internal prices for tenant building blocks in self-service
- Setting up discounts for tenants via support request to support@meshcloud.io.
- Setting up an added management percentage for tenants via support request to support@meshcloud.io.
- Setting up pricing tiers for tenants via support request to support@meshcloud.io.

## Related Resources

### Concepts

- [Payment Methods](new-concept-payment-methods.md)

### Guides

- [How to Manage Payment Methods](new-guide-how-to-manage-payment-methods.md)
- [How to Set Up Prices](new-guide-how-to-set-up-prices.md)
- [How to Set Up Currency Conversion](new-guide-how-to-set-up-currency-conversion.md)
