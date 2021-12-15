---
id: faq.projects
title: Projects FAQ
---

## How do I move a meshProject from one meshCustomer to another meshCustomer? 

While it is possible, we advise against moving meshProjects. The recommended option is to create a new meshProject.

The process for moving a meshProject from meshCustomer "source-customer" to meshCustomer "target-customer":

1. A Customer Admins of "source-customer" marks the meshProject for deleted in the meshCustomer
2. A Partner Admin confirms deletion of the meshProject in the admin area
3. meshcloud support un-blocks the tenant localId (there is a safety mechanism in place to prevent double billing of resources when re-using a tenant).
4. A Partner Admin of "target-customer" adopts the tenant via API into the meshCustomer "target-customer" and a project of their choosing.

We have received the request to support moving meshProjects via the panel. If you have any additional input, please put it in a comment of this [canny post](https://meshcloud.canny.io/feature-requests/p/move-projects-between-customers).
