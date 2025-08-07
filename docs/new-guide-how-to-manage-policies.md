---
id: new-guide-how-to-manage-policies
title: How to Manage Policies
---

:::note What is this guide about?
This guide shows you how to create, edit, and delete policies in meshStack. It also makes you aware how to resolve policy violations when they appear.
:::

## Create Policies

### Prerequisites

- You need to be an organization admin or compliance manager to create, edit, or delete policies.

### Step by Step Guide

1. Navigate to **Compliance** > **Policies**.
2. Click on the `+ Create Policy` button in the top right corner. The button is only visible for users with the right permission.
3. Configure your policy:
    - **Policy Name**: Choose a human-readable display name for the policy.
    - **Description (optional)**: Add a description to make everyone aware of what your policy is about and why it’s necessary.
    - **Policy Subjects**: Select the subjects which shall be evaluated.
    - **Policy Subject Tags**: Select a tag on both subjects that shall be evaluated against each other within this policy.
    - **Policy Evaluation Strategy**: Select the evaluation strategy for how the subjects shall be evaluated.
    - **How to Fix (optional)**: Provide an additional hint on how users can resolve the situation when they violate a policy.

After creating a policy, every subject defined in the policy will be evaluated. All violations caused by the new policy will be logged. Workspace owners/managers or organization admins can fix these by picking the compliant tag values.

## Edit Policies

### Prerequisites

- You need to be an organization admin or compliance manager to create, edit, or delete policies.

### Step by Step Guide

1. Navigate to **Compliance** > **Policies**.
2. Click on the pencil icon in the 'Actions' column of the policy you want to edit in the policy list.

## Delete Policies

### Prerequisites

- You need to be an organization admin or compliance manager to create, edit, or delete policies.

### Step by Step Guide

1. Navigate to **Compliance** > **Policies**.
2. Click on the trash icon in the 'Actions' column of the policy you want to delete in the policy list. A checkmark will appear in place of the trash icon.
3. Confirm the deletion by clicking on the checkmark icon within 5 seconds. After the deletion of your policy is finalized, your policy list will be updated. If you don’t confirm the deletion within 5 seconds, the trash icon will reappear.

## Resolve Policy Violations as an Admin

### Prerequisites

- You need to be an organization admin or compliance manager to create, edit, or delete policies.

### Step by Step Guide 

1. Navigate to **Compliance** > **Policy Violations**.
2. View the reason for the violation in the 'Reason' column.
3. Decide on how to resolve the violation:
   - add required tags to the policy subjects in order to make the comply with the policies
   - edit the policy to change the evaluation strategy or required tag values
   - delete the dependency between the policy subjects (e.g., remove a user from a workspace or project)

## Resolve Policy Violations as an Application Team

:::warning
This guide enables you to change tags to comply with policies. This is advised if the tags are incorrect or outdated. If the tags e.g. the environment type dev is correct but there still is a policy violation, you should consult an admin.
:::

### Prerequisites

- You need workspace manager or owner priviledges to resolve policy violations in the workspace.

### Step by Step Guide

1. Navigate to **Workspace Management** > **Compliance** > **Policy Violations**.
2. Navigate to **Workspace Management** > **Settings** > **Tags** and adapt the necessary tags to resolve the violation.

::note Info
Some policy violations cant be resolved by application teams. In this case, you need to contact the admin team.
:::

## Related Resources

### Concepts

- [Tags](new-concept-tag.md)
- [Policies](new-concept-policy.md)

### Guides

- [How to Protect Admin Roles](new-guide-how-to-protect-admin-roles.md)
