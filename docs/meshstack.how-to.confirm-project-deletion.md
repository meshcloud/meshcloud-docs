---
id: meshstack.how-to.onboard-team-to-customer
title: How to onboard your team to your meshCustomer
---

If you are not familiar with what a Partner User is, please check the [official meshcloud documentation](administration.index.md).

## Pre-Requisites

- Permissions: Your user needs the appropriate privileged role in the Partner account to approve the meshProject deletion. Please check the [Partner Role overview](administration.index.md). Usually meshProject deletions are approved by the Cloud Foundation Team or the Platform Team.

## Step to Step Guide

1. Login into the meshPanel and navigate to the Administration Area. Open the Admin Area by clicking on the `ADMIN AREA` button in the top navigation.
![Select Admin Area in the top navigation bar](./assets/partner/navigate-to-admin-area.png "Go to the Admin Area")
2. You now need to go to the Deleted Projects view where you can see the overview of meshProjects pending for deletion.
![Select Project - Deleted Projects menu item on the left side](./assets/partner/navigate-to-project-deletion.png "Deleted Projects")
3. Confirm the meshProject deletion by clicking on the bin icon. A pop-up for the meshProject deletion will show an overview of the meshProject and the possibility to add a comment for the meshProject deletion. The checkbox is required to be checked to confirm the deletion.

![Click the bin icon to confirm the meshProject deletion](./assets/partner/navigate-to-project-deletion2.png "Confirm meshProject deletion")
![Review the Deletion request and give final meshProject deletion confirmation](./assets/partner/confirm-project-deletion.png "Confirm Deletion")

## Optional

You can also take other actions besides the meshProject deletion:

- Project History: View the meshProject History which contains all relevant logged information for the project like user assignments and meshTenant assignment

![Click the Archive icon to access the meshProject history](./assets/partner/navigate-to-project-history.png "Access the meshProject history")

- Decline Deletion: You can also decline the meshProject deletion request and bounce it back to the customer e.g. if they forgot to clean up certain resources in the cloud tenant.

![Click the decline icon to decline the meshProject deletion](./assets/partner/naviagte-to-decline-meshProject-deletion.png "Decline meshProject deletion")
![Bounce the deletion request back to the customer](./assets/partner/decline-project-deletion.png.png "Decline meshProject deletion")

## Additional

You can also uncheck the "Required manual deletion" checkbox to see already confirmed or automatically deleted meshProjects.
![uncheck the "Required manual deletion" checkbox](./assets/partner/all-deleted-meshprojects.png)
