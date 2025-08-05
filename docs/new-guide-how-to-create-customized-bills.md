---
id: new-guide-how-to-create-customized-bills
title: How to Create Customized Bills
---

:::note What Is This Guide About?
This guide shows you how to provide external cost data to meshStack using the meshResourceUsageReports API endpoint. You'll learn how to include your custom usage data in tenant billing reports for more accurate and flexible chargeback.
:::

## Prerequisites

- You have API access to meshStack.
- You have cost or usage data from external systems that you want to include in tenant billing.

## Step by Step Guide

1. **Prepare Your Cost Data**
   - Gather cost and usage data from your external systems.
   - Format the data according to meshStack's meshResourceUsageReport schema.

2. **Use the meshResourceUsageReports API Endpoint**
   - Send your formatted data to meshStack using the `Put meshResourceUsageReports` endpoint.
   - Make sure your API request is authenticated and follows meshStack's API documentation.

3. **Verify Inclusion in Tenant Usage Reports**
   - After submitting your data, meshStack's billing system will pick up your meshResourceUsageReport.
   - Your custom data will be included in regular meshTenantUsageReports, visible in billing and chargeback statements.

:::tip
Check meshStack's API documentation for details on authentication, required fields, and example payloads.
:::

## Related Resources

### Concepts

- [Cost Management](new-concept-cost-management.md)

### Guides

- [How to Set Up Prices](new-guide-how-to-set-up-prices.md)
- [How to Create Your Own Platforms](new-guide-how-to-create-own-platforms.md)---
id: new-guide-how-to-create-customized-bills
title: How to Create Customized Bills
---

:::note What Is This Guide About?
This guide shows you how to provide external cost data to meshStack using the meshResourceUsageReports API endpoint. You'll learn how to include your custom usage data in tenant billing reports for more accurate and flexible chargeback.
:::

## Prerequisites

- You have API access to meshStack.
- You have cost or usage data from external systems that you want to include in tenant billing.

## Step by Step Guide

1. **Prepare Your Cost Data**
   - Gather cost and usage data from your external systems.
   - Format the data according to meshStack's meshResourceUsageReport schema.

2. **Use the meshResourceUsageReports API Endpoint**
   - Send your formatted data to meshStack using the `Put meshResourceUsageReports` endpoint.
   - Make sure your API request is authenticated and follows meshStack's API documentation.

3. **Verify Inclusion in Tenant Usage Reports**
   - After submitting your data, meshStack's billing system will pick up your meshResourceUsageReport.
   - Your custom data will be included in regular meshTenantUsageReports, visible in billing and chargeback statements.

:::tip
Check meshStack's API documentation for details on authentication, required fields, and example payloads.
:::

## Related Resources

### Concepts

- [Cost Management](new-concept-cost-management.md)

### Guides

- [How to Set Up Prices](new-guide-how-to-set-up-prices.md)
- [How to Create Your Own Platforms](new-guide-how-to-provide-your-own-platform.md)