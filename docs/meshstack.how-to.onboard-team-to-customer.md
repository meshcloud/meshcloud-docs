---
id: meshstack.how-to.onboard-team-to-customer
title: How to onboard your team to your meshCustomer
---

If you are not familiar with what a meshCustomer is, please check the [official meshcloud documentation](meshcloud.customer.md).

## Pre-Requisites

- Permissions: Your user needs either the Customer Admin or Customer Owner role in the meshCustomer where you want to add further users

## Step to Step Guide

- Make sure you are in the meshCustomer you want to add further users. Do this by checking the drop-down in the upper-left corner.

![Select meshCustomer in the upper left corner](./assets/customer/choose-customer.png "Pick meshCustomer")

- Go to the access control panel by clicking on the `Access Control` tab

![Click the Access Control tab](./assets/customer/customer-access-control.png "Access Control")

- At the end of the `Current Access` list will be a input field. Type in the first-, last-name or email address to find and select the user you want to add. Choose a Customer Role (Customer Owner, Admin or Employee) and press the `+` button.

![Add a user to the customer](./assets/customer/customer-access-control-add-a-user.png "add a user")

- Customer Owner can only be granted to max. 2 user per Customer. Also only a Customer Owner can grant another user the Owner role - except there is no Customer Owner at all.

### Optional

meshStack provides the optional configuration for 4-eyes access controls.
Please check the [official meshcloud documentation](meshcloud.customer.md#invite-users-to-a-meshcustomer-team).

- A second user with Customer Admin or Customer Owner permission needs to approve the access request. The second user must also navigate to the specific meshCustomer (see step 1.), go to the `Access Control` tab (see step 2.) and then click on the `Access Requests` tab in the second tab-row.
![Click the Access Requests tab](./assets/customer/customer-access-approve.png "Access Control - Access Requests")
