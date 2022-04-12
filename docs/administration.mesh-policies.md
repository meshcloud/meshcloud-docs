---
id: administration.mesh-policies
title: meshPolicies
---

meshPolicies are described in detail [here](meshcloud.policies.md). They can be set up between meshSubjects.

The following meshSubjects are available:

- meshCustomer
- meshProject
- meshLandingZone
- meshUser/Group

In the administration area, there is an option of 'Policies' in the 'Compliance'
section of the navigation area. After clicking policies, you can view all policies in your meshStack instance.

## Create meshPolicies

Policy creation is only possible for a user who has a partner admin role. There is a 'Create Policy' button top
right on the meshPolicies screen. After clicking on it, there is a redirection to the screen of "Create Policy" where all details need to be filled out.

- **Policy Name**: choose a human readable display name for the meshPolicy

- **Description (optional)**: add a description to make everyone aware what your policy is about and why it is necessary

- **Policy Subjects**: select the subjects which shall be evaluated

- **Policy Subject Tags**: select a tag on both subjects that shall be evaluated against each other within this meshPolicy

- **Policy Evaluation Strategy**: select the evaluation strategy for how the subjects shall be evaluated (click [here](meshcloud.policies.md#meshPolicy-evaluation-strategy) to learn more about the different strategies)

- **How to fix (optional)**: provide an additional hint how users can resolve the situation when they violate a policy

To learn more about how meshPolicies work, please click [here](meshcloud.policies.md).

After creating the meshPolicy, it will be applied everywhere to all selected meshSubjects. Any violations of the new meshPolicy that exist already will create new policy violations in meshStack. These can be either fixed by customer admins or partner admins, by picking the right tag values.

## Edit meshPolicies

In the policy item list, there is an edit policy button in the 'Actions' column which redirects to the Edit Policy
screen where one can update the policy.

## Delete meshPolicies

In the policy item list, there is a "delete policy" button in the 'Actions' column. On clicking, it waits for 5 seconds
to confirm the deletion. If one clicks within 5 seconds it will be deleted and redirected to the policy list screen
otherwise button will be back to normal.
