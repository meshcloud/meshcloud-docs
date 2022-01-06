---
id: meshcloud.service-user
title: Service Users
---

Sometimes you may need a local user account in a platform with separate credentials for automated deployment tasks. This is what meshcloud Service Users are made for. A Service User is a set of credentials for a specific platform \(Compute, Container\) contained to a specific cloud platform tenant. You can have multiple Service Users per platform and meshProject. For example, if you plan to use Heat scripts for your deployment on OpenStack you would need a Service User to execute your Heat stacks.

> Service Users are available for Cloud Foundry and OpenStack cloud platforms. Platforms like AWS or Kubernetes offer superior “native” alternatives to service users (i.e. [IAM Policies](https://docs.aws.amazon.com/de_de/IAM/latest/UserGuide/access_policies_manage.html) & Credentials, ServiceAccounts).

When accessing a project without Service Users you may see a notification reminding you to create one. It is usually a good idea to have Service Users for important projects and platforms so that they remain accessible (i.e. in case of lost credentials, unforseen outages, etc.) which is why Operating may enable this notification for their users.

The user who created the Service User is also responsible for the secure usage of it. Therefore the creator's name is also displayed in the list of Service Users.

## Creating a Service User

The following steps describe how to create a Service User:

1. Navigate to the meshPanel and login with your personal credentials.
2. Access the tenant control plane of your project in  which you want to use your Service User.
3. After selecting the control plane, go to **Platform Access** and navigate to **Service Users** in the left sidebar.
4. On the form enter a description for the Service User, e.g. _PaaS Backup Service User._
5. Click on the **+** button to add the Service User. An automated download will start and provide you with the Service User credentials.
6. Note down the password, as it will not be visible and/or recoverable later. In case you lost the credentials you need to delete the existing Service User and create a new one.
7. Congratulations. You successfully created a Service User.
