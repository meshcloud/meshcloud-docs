---
id: meshstack.aws.metering
title: AWS Reserved Instances & Savings Plan Guide
---

An important piece of information regarding Reserved Instances to know before following this document, quoting from the AWS documentation,

> Reserved Instances are first applied to usage within the purchasing account, followed by qualifying usage in any other account in the organization.

and regarding Savings Plans 

> In a Consolidated Billing Family, Savings Plans are applied first to the owner account's usage, and then to other accounts' usage. 

Because of this, there are two main approaches when purchasing Reserved Instances and Savings Plans

* The Cloud Foundation team buys the Reserved Instances and Savings Plans under their own AWS Account.

    Because of how AWS applies the benefit of Reserved Instances, if the cloud foundation team is not running any workload, all other AWS accounts in the organisation will have the opportunity to benefit from the purchased reserved instances and savings plans. When using this approach, charging the amortized cost of the usage is enough for the chargeback process.

* The teams themselves (or meshCustomers in meshcloud terminology) pay the Cloud Foundation team and the Cloud Foundation team buys Reserved Instances and Savings Plans under meshCustomers' tenants.

    There might be meshCustomers/meshProjects that can estimate their own workload and would prefer to have Reserved Instances or Savings Plans that give them priority. This ensures them the benefit of the RI or SP rather than having to share with other tenants and only have a "chance" of benefiting.
    
    In this situation, the payment to the Cloud Foundation team happens at the time of purchase, and such tenants should not be charged for the usage of the RI and SP via the amortized cost, because they have already pre-paid.
    
    To allow for this workflow, meshStack can be configured to add a line item in the tenant usage report for the month on which the Reserved Instance or Savings Plan starts, and the amount of this line item will be equal to the upfront payment of the RI or SP. Additionally, a discount which is equal to the `amortized upfront cost` will be added to the report every month until the end of the RI or SP lifetime. This discount will effectively cancel out the amortized cost for the usage or non-usage of the RI or SP or provide a discount in the case of some other account utilizing it.

