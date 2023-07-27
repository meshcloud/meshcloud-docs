---
id: faq.projects
title: Projects FAQ
---

## How do I move a meshProject from one meshWorkspace to another meshWorkspace?

While it is possible, we advise against moving meshProjects. The recommended option is to create a new meshProject.

Process for moving a meshProject from meshWorkspace `source-workspace` to meshWorkspace `target-workspace`:

1. A Workspace Managers of `source-workspace` marks the meshProject for deleted in the meshWorkspace
2. A Partner Admin confirms deletion of the meshProject in the admin area
3. meshcloud support un-blocks the tenant localId (there is a safety mechanism in place to prevent double billing of resources when re-using a tenant).
4. A Partner Admin of `target-workspace` adopts the tenant via API into the meshWorkspace `target-workspace` and a project of their choosing.

We have received the request to support moving meshProjects via the panel. If you have any additional input, please put it in a comment of this [canny post](https://meshcloud.canny.io/feature-requests/p/move-projects-between-customers).
