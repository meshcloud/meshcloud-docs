---
id: meshcloud.payment-methods
title: Payment Methods
---

## Introduction

Just like you pay for a new t-shirt online via your credit card, enterprises also have to be responsible for the costs that they make in cloud platforms. Payment methods are used for allocating cloud costs, all the way back to the responsible department of your organization, for a clear and transparent accounting process. As the cloud can be mighty with its enormous offering of practically unlimited services, it is important that all meshProjects and meshCustomers are correctly charged and that this information makes its way back to the required systems. Payment methods therefore are the link between the cloud usage and the resulting cost in the context of a meshProject.

Payment methods are created **per** meshCustomer and can be enhanced with [metadata tags](meshcloud.metadata-tags.md) for use cases such as cost center allocation, department information, etc. Additionally, it is possible to provide a euro amount to a payment method for budgeting purposes.

![Payment Methods Lifecycle](assets/payment_methods/payment_method_overall_lifecycle.png)

## The Payment Method Lifecycle: Creation

The first step in reaping the benefits of payment methods is creating them. A few important things must be considered about payment methods before creating them:

1. A payment method is **always** scoped to a single meshCustomer. This means it is not possible to create a global payment method that can be used for all meshCustomers. It is also not possible to re-use a single payment method across multiple meshCustomers.
2. A payment method's identifier is globally unique. This means you cannot create a payment method with the same identifier for multiple meshCustomers. Make sure to use an identifier that will not collide in other meshCustomers.

### Creating a Payment Method via the meshPanel

One way of creating payment methods is via the meshPanel. To do so, make sure that you have an account with the 'Partner Admin' role. Navigate to the Admin area and follow these steps:

1. Click on 'Customers' on the left.
2. Find a customer you want to create a payment method for and click on the 'Customer Payment Methods' icon on the right.

    ![List Payment Methods](assets/payment_methods/customer_list_payment_methods.png)

3. Click on 'Create Payment Method' at the top right.
4. Enter a name and identifier for the new payment method.
5. Choose a type for the payment method. Read more [here](#types-of-payment-methods) on what type to choose and what the individual differences are.
6. (This is optional) Set a maximum amount of EUR on the payment method to indicate the remaining budget of this payment method.
7. (This is optional) Set an expiration date for the payment method. This is especially useful when a budget expires, e.g. at the end of the accounting year.
8. Additionally, you can enter tags for the payment method, which are custom for your meshStack (also see [meshTags](meshstack.metadata-tags.md)). This is useful when you want to enhance the payment method with organizational details like the cost center number or the business unit.
9. Click 'Save' and your new payment method will be available to the meshCustomer it was created in!

### Creating a Payment Method via the meshObject API

As automation matters, there is also the possibility to create payment methods via the meshObject API. This is especially helpful when an external system already manages the data that is relevant for payment methods. To find the API documentation, open your meshstack and click on 'API' at the bottom of the meshPanel. A new page will open and on the left-hand side, you should see `meshPaymentMethod` listed under `meshObject Import`. Click on it and read the documentation to understand how you can create a payment method via the API.

## The Payment Method Lifecycle: Assigning to meshProjects

Now that the Partner Admin has created one or more payment methods for a meshCustomer, we are ready to link a payment method to one or more meshProjects.

First, check if the payment method is correctly created in the meshCustomer. You can do so by navigating to the [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer). In order to do that you need to have Customer Admin rights within the respective customer. In the customer control plane, open **Financials** and then **Payment Methods**. All payment methods that are created and assigned to your current meshCustomer are shown here.

The payment methods that are assigned can be used for both existing meshProjects and new meshProjects.

### Applying a Payment Method to an existing meshProject

In the [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer), open the corresponding project. Then click on the **Financials** tab and open the **Payment Methods** tab. In this screen, you'll see the selected payment method(s). As explained at the top of the page, you also have the ability to specify a Substitute Payment Method. A Substitute Payment Method is useful when working with expiring cost centers or budgets. meshStack runs a job every night to make sure that when the Active Payment Method has expired, the Substitute Payment Method will be set as the active payment method. If there is no Substitute Payment Method, the active payment method will be removed.

![Set Payment Method in project control plane](assets/payment_methods/payment_method_selection_project_edit.png)

Select the Active Payment Method of choice, and optionally a Substitute Payment Method if that is desired. Save the meshProject and the payment method(s) will be assigned to the meshProject.

### Applying a Payment Method to a new meshProject

Create a new meshProject at the top of the meshPanel. Follow the project creation flow until you enter the 'Billing Information' page.

![Set Payment Method in Project Create screen](assets/payment_methods/payment_method_selection_project_create.png)

As you can see, on this page you have the ability to assign a payment method to the meshProject. Keep in mind that this is mandatory. If you want to specify a substitute payment method, you can do so after creating the meshProject and following the steps above in '**Applying a payment method to an existing meshProject'**. If your meshCustomer has no payment methods, you will be confronted with a warning that looks like this:

![Missing Payment Method warning](assets/payment_methods/payment_method_missing_in_project_create.png)

After setting a payment method, you can continue the project creation flow and save the new meshProject. You now have a new meshProject with a payment method successfully assigned!

## The Payment Method Lifecycle: Enhance with Metadata

As it is difficult to handle large amounts of payment methods only via their names or identifiers, there is the possibility to provide tags (also see [Tag Schema](meshstack.metadata-tags.md)) to the payment methods. This metadata can be provided when creating/editing the payment method in the meshPanel. This is already described in step 8 [here](#creating-a-payment-method-via-the-meshpanel).

An alternative way of providing metadata to payment methods is via the meshObject API. The API docs will describe how to inject tags in payment methods.

## The Payment Method Lifecycle: Exporting Data for External Systems

There are two possible ways to exporting the metadata of the payment methods, depending on the use case.

### Applying Metadata on Tenants in Cloud Platforms

One way of exporting the payment method data (on top of other metadata from meshCustomers and meshProjects) is via the meshTenant. The meshTenant in the cloud platform can be 'tagged' (or 'labeled' for Google Cloud Platform) with the metadata from meshcloud. There are multiple ways of exporting the metadata into the cloud platforms. You can read more about exporting your metadata [here](meshstack.metadata-tags.md#meshtenant-metadata) and decide what approach fits best.

### Exporting Financial Data and Metadata

The other way of exporting metadata is via our [chargeback statements](meshcloud.project-metering.md#chargeback-statements). These chargeback statements are generated periodically and contain the financial data of one or more meshTenants (based on the Tenant Usage Reports). It is possible to export these chargeback statements via CSV and on top of that, provide one or more metadata values per CSV row. This is very helpful when parsing the CSV export in another tool for financial processing.

Not all metadata is exported by default, and each metadata field has to be explicitly configured before it will be exported as part of the CSV file. It is even possible to configure the export to include standard fields of the payment method, e.g. the name or expiration date. To configure this behavior, read more [here](meshstack.billing.md#chargeback).

The actual export itself can be done via the meshPanel. This is possible for both Partner Admins (for all meshCustomers) and Customer Admins (for the selected meshCustomer). When navigating to the Administration area (for partner admins), you will see **Chargeback Statements** on the left. When navigating to the [customer control plane](./meshcloud.customer.md#managing-your-meshcustomer) (for customer admins) , you will see **Chargeback Statements** under **Financials**. Click on it and you will see all chargeback statements. Additionally, there is the option at the top right labelled 'CSV Export' to export the list to a single CSV file.

### External Payment Method Registration

Beside manually creating a new payment method in the meshPanel on an ad-hoc basis, it is also possible to let users navigate to an external URL for requesting
a new payment method, e.g. an internal budget request form. To make this even better, you can use the API of meshStack to create an approval flow and automate the creation
of any new payment methods.

The external URL can be figured under the configuration option `environment.ui.externalPaymentMethodUrl`.

By configuring the URL, the following button will appear in the meshPanel for meshCustomers:

![Request Payment Method Button](assets/payment_methods/payment_method_request_button.png)
