---
id: meshcloud.service-user
title: Service Users
---

Sometimes you may need a special user with separate credentials for automated deployment tasks. This is what Meshcloud Service users are made for. A service user has to be created for a specific platform \(Compute, Container\) within a specific project. You can have multiple Service Users per platform and project. You will need an OpenStack Service User if you are aiming to use Heat scripts for your deployment.

## Creating a Service User

The following steps describe how to create a Service User:

1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io/).

2. If not logged in, please login with your personal credentials.

3. On the Welcome Dashboard, please select the Project & Location in which you want to use your Service User.

4. After selecting Project & Location, go to **Tools &gt; Service Users** in the menu bar on the left.

5. On the form enter a description for the Service User, e.g. _PaaS Backup Service User._

6. In the Platform Section select the platform for which you wish to create the service user. For Service Broker Backups you require a Service User for OpenStack DARZ. If you are aiming to build a continuous integration pipeline you are probably looking for a Cloud Foundry Service User.

7. Click on the **+** button to add the Service User. An automated download will start and provide you with the Service User credentials.

8. Note down the password, as it won't be visible and/or recoverable anymore.

9. Congratulations. You successfully created a Service User.



