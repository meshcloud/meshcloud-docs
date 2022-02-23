---
id: administration.mesh-policies
title: meshPolicies
---

meshPolicies are described in detail [here](meshcloud.policies.md). They can be set up between meshObjects, i.e., meshCustomer, meshProject,
meshLandingZone and meshUser/Group. In the administration area, there is an option of 'Policies' in the 'Compliance'
section of the navigation area. After clicking policies, you can view all policies in your meshStack instance.

## Create meshPolicies

meshPolicy creation is only possible for a user who has a partner admin role. There is a 'Create Policy' button top
right on the meshPolicies screen. After clicking on it, there is a redirection to the screen of "Create Policy" where all
details need to be filled out. To create the meshPolicy, you need to add the meshPolicy name in the form. Then you need to add
both the meshObjects from the dropdown menu. On the left side you can select the affected meshObject which will be
restricted by the right authoritative meshObject. For ease of use, we already restricted the meshObject combinations which
do not make sense. You can choose only possible meshObject combinations. Once you select both meshObjects, the section
for adding tags will appear where you can select the tag of selected meshObject. This restriction will be
applied everywhere. The created meshPolicy has been applied to every configuration which has selected meshObjects.

### How it works

Let's consider a scenario where you want to set a meshPolicy for the selection of a meshLandingZone. Therefore you configure
a meshPolicy between the meshObjects meshProject (environment) -> meshLandingZone (environment). This means, the selectable
meshLandingZones for a specific meshProject depends on the selected environment tag value. For example, if you've a meshProject with environment
tag value 'dev' then only meshLandingZones with environment tag value 'dev' can be selected during the meshTenant creation.

## Edit meshPolicies

In the meshPolicy item list, there is an edit meshPolicy button in the 'Actions' column which redirects to the 'Edit Policy'
screen where one can update the meshPolicy.

## Delete meshPolicies

In the meshPolicy item list, there is a 'Delete policy' button in the 'Actions' column. On clicking, it waits for 5 seconds
to confirm the deletion. If one clicks within 5 seconds it will be deleted and redirected to the meshPolicy list screen
otherwise button will be back to normal.
