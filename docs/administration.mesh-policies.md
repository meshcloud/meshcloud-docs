---
id: administration.mesh-policies
title: meshPolicies
---

meshPolicies are described in detail [here](meshcloud.policies.md). They can be set up between meshSubjects.

The following meshSubjects are available:

- meshWorkspace
- meshProject
- meshLandingZone
- meshUser/Group

You can see all existing meshPolicies in the **Administration** Area by navigating to **Compliance** > **Policies**.
If you want to see all detected policy violations, you can go to to **Compliance** > **Policy Violations** in the **Administration** Area or on a workspace control plane.

> Creating and Editing meshPolicy triggers an evaluation process of the meshPolicy. This process may take a while. After the process ends, you can see the violations caused by the (updated) meshPolicy in the **Policy Violations**.

## Create meshPolicies

Policy creation is only possible for a user who has a partner role.

1. Navigate to **Compliance** > **Policies**.
2. Click on `+ Create Policy` button in the top right corner. The button is only visible for users with the right permission.
3. Configure your meshPolicy.

- **Policy Name**: choose a human readable display name for the meshPolicy

- **Description (optional)**: add a description to make everyone aware what your policy is about and why it is necessary

- **Policy Subjects**: select the subjects which shall be evaluated

- **Policy Subject Tags**: select a tag on both subjects that shall be evaluated against each other within this meshPolicy

- **Policy Evaluation Strategy**: select the evaluation strategy for how the subjects shall be evaluated (click [here](meshcloud.policies.md#meshPolicy-evaluation-strategy) to learn more about the different strategies)

- **How to fix (optional)**: provide an additional hint how users can resolve the situation when they violate a policy

To learn more about how meshPolicies work, please click [here](meshcloud.policies.md).

After creating a meshPolicy, every meshSubjects defined in meshPolicy will be evaluated. All violations caused by the new meshPolicy will be logged. These can be either fixed by workspace managers or partner admins, by picking the right tag values.

## Edit meshPolicies

1. Navigate to **Compliance** > **Policies**.
2. Click on the pencil icon in the 'Actions' column of the meshPolicy you want to edit in the meshPolicy list.


## Delete meshPolicies

1. Navigate to **Compliance** > **Policies**.
2. Click on the trash icon in the 'Actions' column of the meshPolicy you want to delete in the meshPolicy list. A checkmark will appear in place of the trash icon.
3. Confirm the deletion by clicking on the checkmark icon within 5 seconds. After the deletion of your meshPolicy is finalized your meshPolicy list will be updated. In case, you don't confirm the deletion within 5 seconds. The trash icon will reappear.

