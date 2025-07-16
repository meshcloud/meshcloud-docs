---
id: administration.policies
title: Policies
---

Policies are described in detail [here](meshcloud.policies). They can be set up between subjects.

The following subjects are available:

- Workspace
- Project
- LandingZone
- User/Group

You can see all existing policies in the **Administration** Area by navigating to **Compliance** > **Policies**.
If you want to see all detected policy violations, you can go to **Compliance** > **Policy Violations** in the **Administration** Area or on a workspace control plane.

> Creating and editing a policy triggers an evaluation process of the policy. This process may take a while. After the process ends, you can see the violations caused by the (updated) policy in the **Policy Violations**.

## Create Policies

Policy creation is only possible for a user who has an organization admin or compliance manager role.

1. Navigate to **Compliance** > **Policies**.
2. Click on the `+ Create Policy` button in the top right corner. The button is only visible for users with the right permission.
3. Configure your policy.

- **Policy Name**: choose a human-readable display name for the policy

- **Description (optional)**: add a description to make everyone aware of what your policy is about and why it is necessary

- **Policy Subjects**: select the subjects which shall be evaluated

- **Policy Subject Tags**: select a tag on both subjects that shall be evaluated against each other within this policy

- **Policy Evaluation Strategy**: select the evaluation strategy for how the subjects shall be evaluated (click [here](meshcloud.policies#policy-evaluation-strategy) to learn more about the different strategies)

- **How to Fix (optional)**: provide an additional hint on how users can resolve the situation when they violate a policy

To learn more about how policies work, please click [here](meshcloud.policies).

After creating a policy, every subject defined in the policy will be evaluated. All violations caused by the new policy will be logged. These can be either fixed by workspace managers or organization admins, by picking the right tag values.

## Edit Policies

1. Navigate to **Compliance** > **Policies**.
2. Click on the pencil icon in the 'Actions' column of the policy you want to edit in the policy list.

## Delete Policies

1. Navigate to **Compliance** > **Policies**.
2. Click on the trash icon in the 'Actions' column of the policy you want to delete in the policy list. A checkmark will appear in place of the trash icon.
3. Confirm the deletion by clicking on the checkmark icon within 5 seconds. After the deletion of your policy is finalized, your policy list will be updated. In case you don't confirm the deletion within 5 seconds, the trash icon will reappear.
