---
id: meshstack.aws.reserved-instance-guide
title: Reserved Instances & Savings Plans Guide
---

## Benefit Priority

An important piece of information regarding Reserved Instances to know before following this document, quoting from the AWS documentation,

> Reserved Instances are first applied to usage within the purchasing account, followed by qualifying usage in any other account in the organization.

and regarding Savings Plans

> In a Consolidated Billing Family, Savings Plans are applied first to the owner account's usage, and then to other accounts' usage.

Because of this, there are two main approaches when purchasing Reserved Instances and Savings Plans

## Centralized Purchase

In this approach, the Cloud Foundation team buys the Reserved Instances and Savings Plans under their own AWS Account.

Because of how AWS applies the benefit of Reserved Instances, if the cloud foundation team is not running any workload, all other AWS accounts in the organisation will have the opportunity to benefit from the purchased reserved instances and savings plans. When using this approach, charging the amortized cost of the usage is enough for the chargeback process. The same applies for Savings Plans.

Since the Cloud Foundation Team has a good overview of the resource usage across all accounts, having the cloud foundation team purchase the Reserved Instances and Savings Plans can result in optimum utilization.

## Individual Purchase

In this approach, the teams themselves (or meshCustomers in meshcloud terminology) pay the Cloud Foundation team upfront, and the Cloud Foundation team buys Reserved Instances and Savings Plans under the meshCustomers' tenants.

There might be meshCustomers/meshProjects that can estimate their own workload and would prefer to have Reserved Instances or Savings Plans that give them priority. This ensures them the benefit of the RI or SP rather than having to share with other tenants and only have a chance of benefiting.

In this situation, the payment to the Cloud Foundation team happens at the time of purchase, and such tenants should not be charged for the usage of the RI and SP via the amortized cost, because they have already pre-paid. (Note that the upfront fee component is only available in All Upfront and Partial Upfront RIs & SPs. It doesn't apply for No Upfront ones.)

To allow for this workflow, meshStack can be configured to add a line item in the tenant usage report for the month on which the Reserved Instance or Savings Plan starts, and the amount of this line item will be equal to the upfront payment of the RI or SP. Additionally, a discount which is equal to the amortized upfront cost will be added to the report every month until the end of the RI or SP lifetime.

This discount will achieve one of the following results

1. **Cancel out the amortized cost for usage** : If the purchasing account fully used the RI or SP, this discount will cancel out that usage, because they have already paid for that upfront.

2. **Cancel out the amortized cost for non-usage** : If the purchasing account did not use the RI or SP and no other account utilized it either, there would be amortized cost line items in the tenant usage report for this non-usage. These would also be cancelled out by the above mentioned discount, because the purchasing meshCustomer has already made the payment upfront.

3. **Provide a discount in the case of some other account utilizing it** : If the purchasing account did not use the RI or SP but some other account did use it, then the other account will pay the cost of the usage to the Cloud Foundation team via the amortized costs. The purchasing account will effectively get a reduction in their total costs via the above mentioned discount.

Enabling these settings allows operators to consciously deviate from the default accrual basis accounting (via amortized cost) and switch to a "cashflow basis" accounting for RI/SP usage. The benefit of enabling this setting is that it will give a more accurate view of the usage of the budget by a meshProject.
