---
id: new-guide-how-to-manage-tags
title: How to Manage Tags
---

:::note What is this guide about?
This guide shows you how to use tags in meshStack to provide organizational context to teams, applications and environments.
:::

:::note Best Practice Tip
We advise you to choose tag names that work for all platforms you use. This way, you can ensure that the tags are consistently applied.
:::

## Create a Central Tag Catalog

:::note
Please be aware that central tag characteristics e.g. type can't be changed after the first creation.
:::

### Prerequisites

- You have access to meshStack as an organization admin.

### Step by Step Guide 

1. **Navigate to the Tags Section**
   - Go to the admin area of meshStack.
   - Click on **Tags** in the left sidebar.
2. **Create a New Tag**
   - Click **Create Tag**.
   - Save your new tag.
3. **Rollout Tags**
   - Use the meshPanel or API to apply tags to existing resources.
   - Set tags up as mandatory if you want them to be required for new resources.

## Modify Existing Tags

:::warning
Changes to existing tags are not automatically propagated to existing resources. You need to update the resources manually via meshPanelor via API.
:::

### Prerequisites

- You have access to meshStack as an organization admin.

### Step by Step Guide

1. **Navigate to the Tags Section**
   - Go to the admin area of meshStack.
   - Click on **Tags** in the left sidebar.
2. **Select the Tag to Modify**
   - Click on the tag you want to modify.
3. **Edit Tag Properties**
   - Update the tag properties as needed.
   - Save your changes.
4. **Update Existing Resources**
   - Use the meshPanel or API to apply the updated tag to existing resources.

## Delete Existing Tags

### Prerequisites

- You have access to meshStack as an organization admin.
- Tag in scope of deletion is not part of a policy

### Step by Step Guide

1. **Navigate to the Tags Section**
    - Go to the admin area of meshStack.
    - Click on **Tags** in the left sidebar.
2. **Delete the Tag**
    - Click the trash icon in the 'Actions' column for that tag.
3. **Confirm Deletion**
    - Once deletion is finalized, the list of active tags will be updated.

## Exposing Tags to Platforms

:::note
There are two ways to expose tags to platforms:
1. Via the platform configuration in the admin area. Use this for information that is inherent to meshStack, such as the payment identifier.
2. Via the landing zone configuration in the admin area or platform builder. Use this for custom metadata defined by your organization in the tag catalog.
:::

### Prerequisites

- You have access to meshStack as an organization admin or platform builder.
- You have defined tags in the admin area that you want to expose to platforms.

### Step by Step Guide for Custom Meta Data

1. **Navigate to the Landing Zone Section**
   - Go to the admin area of meshStack.
   - Click on **Landing Zone** in the left sidebar.
2. **Select the Landing Zone**
   - Click on the landing zone where you want to expose tags.
3. **Configure Tag Replication**
   - In the landing zone settings, add the tag keys you want to expose.
4. **Save Changes**
   - Save the landing zone configuration.
5. **Verify Tag Replication**
    - Check the platform to ensure that the tags are replicated correctly.

### Step by Step Guide for meshStack Objects

1. **Navigate to Platform Configuration**
   - Go to the admin area of meshStack.
   - Click on **Platforms** in the left sidebar.
   - Open Configuration for the platform you want to modify.
   - Navigate to the tag configuration section in the **Configuration** tab.
2. **Specify Meta Data for Replication**
   - Add the tag keys you want to expose to the platform. (see list below)
3. **Save Changes**

**meshStack metadata**

| Tag Key                       | Description                                                                                                                                               |
| ----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${projectIdentifier}`        | The project identifier                                                                                                                                    |
| `${workspaceIdentifier}`      | The project's workspace identifier                                                                                                                        |
| `${workspaceName}`            | The projects's workspace name                                                                                                                             |
| `${projectName}`              | The project display name                                                                                                                                  |
| `${landingZoneName}`          | The name of the applied [landing zone](meshcloud.landing-zones.md). It contains `no-landingzone` if the tenant does not have a landing zone applied       |
| `${landingZoneIdentifier}`    | The identifier of the applied [landing zone](meshcloud.landing-zones.md). It contains `no-landingzone` if the tenant does not have a landing zone applied |
| `${paymentIdentifier}`        | The identifier of the payment method that is assigned to the project                                                                                      |
| `${paymentName}`              | The display name of the payment method that is assigned to the project                                                                                    |
| `${paymentExpirationDate}`    | The expiration date of the payment method that is assigned to the project. It contains `none` if no expiration date is set for the payment method         |
| `${paymentAmount}`            | The amount of the assigned payment method. It is `none` if no payment method is set                                                                       |
| `${contactMail}`              | The email of workspace owner of this project. It is `none` if no owner is set                                                                             |
| `${ownerUsername}`            | The username of the workspace owner of this project. It is `none` if no owner is set                                                                      |
| `${ownerFirstName}`           | The first name of the workspace owner of this project. It is `none` if no owner is set                                                                    |
| `${ownerLastName}`            | The last name of the workspace owner of this project. It is `none` if no owner is set                                                                     |
| `${additionalOwnerUsername}`  | The username of the additional workspace owner of this project. It is `none` if no additional owner is set                                                |
| `${additionalOwnerFirstName}` | The first name of the additional workspace owner of this project. It is `none` if no additional owner is set   

:::note Handling Tag Conflicts
It's possible that objects such as workspace and project have tags with the same tag key. For example, both the workspace and
project could contain a `cmdb-id` tag. Setting the `cmdb-id` tag value on the
workspace provides it as a "default" value to all tenants owned by that workspace. A user can then override
this default value on an individual project by providing a value for the optional `cmdb-id` tag on the project.

When merging the tag sources for a tenant, meshStack therefore applies the following precedence rule:

```text
project tags > payment method tags > workspace tags
```

You can find an example in the table below which explains this behavior:

| Object            | Tag Name | Tag Value |
| ----------------- | -------- | --------- |
| Workspace         | cmdb-id  | 12        |
| Payment Method    | cmdb-id  | 34        |
| Project           | cmdb-id  | 56        |

This example would result in `cmdb-id` being equal to `56` as the project has the highest priority.
:::                                          

## Provide Information as an Application Team

:::note 
The tags available on an objects are defined by the meshStack admins via the admin area. Application teams can provide values for these tags in the workspace or project configuration.
:::

### Prerequisites

- You have access to a workspace in meshStack.
- You have workspace owner or admin permissions.

### Step by Step Guide for Workspace Tags

1. **Navigate to the Workspace**
   - Log in to meshStack and select your workspace from the top navigation bar.
2. Navigate to the **Tags** section under **Settings**.
3. **Add Values to Tags**
   - Click on the tag you want to update.
   - Enter the required information in the tag value field.
   - Save your changes.

### Step by Step Guide for Project Tags

1. **Navigate to the Workspace**
   - Log in to meshStack and select your workspace from the top navigation bar.
2. **Select the Project**
    - Within the workspace, choose the relevant project.
3. Navigate to the **Tags** section under **Settings**.
4. **Add Values to Tags**
   - Click on the tag you want to update.
   - Enter the required information in the tag value field.
   - Save your changes.

## Related Resources

- [Tag Concept](new-concept-tag)
