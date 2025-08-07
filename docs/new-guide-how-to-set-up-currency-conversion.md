---
id: new-guide-how-to-set-up-currency-conversion
title: How to Set Up Currency Conversion
---

:::note What Is This Guide About?
This guide shows you how to configure currency conversion in meshStack, so you can present financial data in your preferred currency and ensure accurate reporting for your organization.
:::

:::note Current Limitations
**Euro-only Conversion:** Currently, meshStack can convert any currency into Euros. Conversion in other currencies is not yet supported. Please reach out to support@meshcloud.io if you are interested in this feature.

**Payment Methods:** Payment amounts are currently limited to EUR. Support for other currencies will be added in the future.

**Prices for Platforms and Building Blocks:** Prices can only be set in EUR at this time. Future updates will allow pricing in other currencies.

**Known Issue – Detailed Tenant Usage Report:** Detailed tenant usage reports (for OpenShift, OpenStack, Cloud Foundry, and OSB Services) provide additional insights, but even with currency conversion enabled, these reports display the original currency from the provider.

**Presenting Other Currencies:** If you need to display a currency other than Euro, please contact support@meshcloud.io.
:::

## Challenge

Managing cloud costs across multiple currencies can be confusing and lead to reporting inconsistencies. meshStack makes it easy to convert and present financial data in Euro, so your teams can focus on what matters.

## Prerequisites

- You have organization admin access to meshStack.
- You know whether you want to use meshStack default exchange rates or provide your own via API.
- If meshStack is hosted privately, ensure it can make external requests (check firewall rules).

## Step by Step Guide

### 1. Navigate to Currency Conversion Settings

- Go to the **Admin area** in meshStack.
- Open the **Settings** page.
- Click on the **Financials** tab.

### 2a. Enable meshStack Default Exchange Rates

- Select **meshStack default exchange rates**.
- meshStack will fetch rates from frankfurter.app, using exchange rates from the European Central Bank.
- When enabled, financial data will be presented in Euro starting with the current month.
- If currency conversion is turned off, financial data will be shown in the original currency.
- If you switch currency conversion on and off multiple times, converted data will also be shown for previous months.

### 2b. Enable Custom API Exchange Rates

- In the **Financials** tab, select **Custom API Exchange Rates**.
- Provide your own exchange rates via API. You can find the API docs for this [here](https://docs.meshcloud.io/api/index.html#_meshexchangerate)
- If no rates are provided by the finalization date and the currency converter is turned on, meshStack default exchange rates will apply for that month.

### Related Resources

### Concepts

- [Cost Management](new-concept-cost-management.md)
- [Platform](new-concept-platform.md)
- [Payment Methods](new-concept-payment-methods.md)

### Guides

- [How to Manage Payment Methods](new-guide-how-to-manage-payment-methods.md)
