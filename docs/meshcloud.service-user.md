---
id: meshcloud.service-user
title: Service Users
---

Sometimes you may need a special user with separate credentials for automated deployment tasks. This is what Meshcloud Service users are made for. A service user has to be created for a specific platform \(Compute, Container\) within a specific project. You can have multiple Service Users per platform and project. You will need an OpenStack Service User if you are aiming to use Heat scripts for your deployment.

> \* Service Users are currently supported on the OpenStack and Cloud Foundry platforms.

When accessing a project without service users you may see a notification reminding you of creating them. It's usually a good idea to have service users for important projects and platforms so that they remain accessible (i.e. in case of lost credentials, unforseen outages, etc.) which is why operating may enable this notification.

## Creating a Service User

The following steps describe how to create a Service User:

1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io/).

2. If not logged in, please login with your personal credentials.

3. On the Welcome Dashboard, please select the Project & Location in which you want to use your Service User.

4. After selecting Project & Location, go to **Tools &gt; Service Users** in the menu bar on the left.

5. On the form enter a description for the Service User, e.g. _PaaS Backup Service User._

6. Click on the **+** button to add the Service User. An automated download will start and provide you with the Service User credentials.

7. Note down the password, as it won't be visible and/or recoverable anymore.

8. Congratulations. You successfully created a Service User.
