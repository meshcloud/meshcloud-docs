---
id: meshcloud.service-user
title: Service Users
---

Sometimes you may need a local user account in a platform with separate credentials for automated deployment tasks. This is what meshcloud Service Users are made for. A Service User is a set of credentials for a specific platform \(Compute, Container\) contained to a specific cloud platform tenant. You can have multiple Service Users per platform and meshProject. For example, if you plan to use Heat scripts for your deployment on OpenStack you would need a Service User to execute your Heat stacks.

> Service Users are currently only available for the OpenStack and Cloud Foundry platforms.

When accessing a project without Service Users you may see a notification reminding you to create one. It is usually a good idea to have Service Users for important projects and platforms so that they remain accessible (i.e. in case of lost credentials, unforseen outages, etc.) which is why Operating may enable this notification for their users.

## Creating a Service User

The following steps describe how to create a Service User:

1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io/).

2. If not logged in, please login with your personal credentials.

3. On the Welcome Dashboard, please select the Project & Location in which you want to use your Service User.

4. After selecting Project & Location, go to **Tools &gt; Service Users** in the menu bar on the left.

5. On the form enter a description for the Service User, e.g. _PaaS Backup Service User._

6. Click on the **+** button to add the Service User. An automated download will start and provide you with the Service User credentials.

7. Note down the password, as it will not be visible and/or recoverable later. In case you lost the credentials you need to delete the existing Service User and create a new one.

8. Congratulations. You successfully created a Service User.
