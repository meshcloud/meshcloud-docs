---
id: meshstack.how-to.onboard-team-to-project
title: How to onboard your team to a meshProject
---

If you are not familiar with what a meshProject is, please check the [official meshcloud documentation](meshcloud.md).

## Pre-Requisites

- Users you want to add to an meshProject needs to be added to the meshCustomer first. Check out the `Onboarding your team to your meshCustomer` guide.
- Permissions: Your user needs either the Customer Admin or Customer Owner role in the meshCustomer

## Step to Step Guide

- Make sure you are in the meshCustomer you want to add further users. Do this by checking the drop-down in the upper-left corner.
![Select meshCustomer in the upper left corner](.././assets/customer/choose-customer.png "Pick meshCustomer")
- You need to navigate to the meshProject where you want to onboard your project team members.

- Select the meshProject using the top navigation bar

![Select meshProject in the upper left corner](./assets/project/project-in-top-nav.png)

- Select the meshproject from the meshCustomer overview

![Select meshProject in meshCustomer overview](./assets/project/project-in-overview.png "Access Control - Access Requests")

- Go to the access control panel by clicking on the `Access Control` tab
- At the end of the `Current Access` list will be an input field. Type in the first-, last-name or email address to find and select the user you want to add. Choose a Project Role and press the `+` button.

![Add a user to the customer](./assets/project/project-access-control.png "add a user")

### Optional

meshStack enterprise supports 4-eyes access controls.
Please check the [official meshcloud documentation](meshcloud.project.html#access-control-on-a-meshproject).

- A second user with Customer Admin or Customer Owner permission needs to approve the access request. The second user must also navigate to the specific meshCustomer (see step 1.), select the meshProject (see step 2.), go to the `Access Control` tab (see step 3.) and then click on the `Access Requests` tab in the second tab-row.
![Click the Access Requests tab](./assets/project/project-access-approve.png "Access Control - Access Requests")
