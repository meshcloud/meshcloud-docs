---
id: meshcloud.payment
title: Payment
---

The Meshcloud platform provides central [multi-cloud billing](meshstack.billing.md). Therefore you have to configure a billing address and a payment method for your meshCustomer as a Customer Admin. Depending on your meshcloud installation, either payment via credit card, invoice or via a cost center is available. All options are described in the following.

## Company & Billing Addresses

You can configure company addresses for your meshCustomer as contact addresses. If this address shall also be used for billing, you are done when having configured a Customer Address.

You can also define additional Billing Addresses, that can be used for your meshProjects. You can select from these configured addresses per meshProject.

## Payment Methods

### Credit Card

The credit card payment method is used in our public cloud offer and is described [here](federation.payment.md).

### Invoice

The invoice payment method simply results in an invoice, that is send to your billing address. No automation for the payment process is applied here.

### Cost Center

When Meshcloud is used inside a company, cloud resources may have to be billed to different cost centers of the company. You can configure a default cost center for your meshCustomer, which will initially be applied to your meshProjects. It can also be changed per meshProject.
