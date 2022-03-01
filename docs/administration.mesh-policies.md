---
id: administration.mesh-policies
title: meshPolicies
---

meshPolicies are described in detail [here](meshcloud.policies.md). They can be set up between meshObjects, i.e., meshCustomer, meshProject,
meshLandingZone and meshUser/Group. In the administration area, there is an option of 'Policies' in the 'Compliance'
section of the navigation area. After clicking policies, you can view all policies in your meshStack instance.

## Create meshPolicies

Policy creation is only possible for a user who has a partner admin role. There is a 'Create Policy' button top
right on the policies screen. After clicking on it, there is a redirection to the screen of "Create Policy" where all
details need to be filled out. To create the policy, you need to add the policy name in the form. Then you need to add
both the meshObjects from the dropdown menu. For ease of use, we already restricted the meshObject combinations which
do not make sense. You can choose only possible meshObject combinations. Once you select both meshObjects, the section
for adding tags will appear where you can select the tag of selected meshObject. This restriction will be
applied everywhere. The created meshPolicy has been applied to every configuration which has selected meshObjects.

### How it works

Let's consider a scenario where you want to set a policy for the selection of a meshLandingZone. Therefore you configure
a policy on the environment tags. Operator 'in' works like an intersection between the meshObjects. So if
you want to assign a landing zone with a "prod" tag to a project which has a "prod" tag, it is valid.

## Edit meshPolicies

In the policy item list, there is an edit policy button in the 'Actions' column which redirects to the Edit Policy
screen where one can update the policy.

## Delete meshPolicies

In the policy item list, there is a "delete policy" button in the 'Actions' column. On clicking, it waits for 5 seconds
to confirm the deletion. If one clicks within 5 seconds it will be deleted and redirected to the policy list screen
otherwise button will be back to normal.
