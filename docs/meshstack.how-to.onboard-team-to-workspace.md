---
id: meshstack.how-to.onboard-team-to-workspace
title: How to onboard your team to your meshWorkspace
---

If you are not familiar with what a meshWorkspace is, please check the [official meshcloud documentation](meshcloud.workspace).

## Pre-Requisites

- Permissions: Your user needs either the Workspace Manager or Workspace Owner role in the meshWorkspace where you want to add further users

## Step to Step Guide

- Make sure you are in the meshWorkspace you want to add further users. Do this by checking the drop-down in the upper-left corner.

![Select meshWorkspace in the upper left corner](assets/workspace/choose-workspace.png "Pick meshWorkspace")

- Go to the access control panel by clicking on the `Workspace Access` tab

![Click the Workspace Access tab](assets/workspace/workspace-access-control.png "Access Control")

- At the end of the `Current Access` list will be an input field. Type in the first-, last-name or email address to find and select the user you want to add. Choose a Workspace Role (Workspace Owner, Admin or Employee) and press the `+` button.

![Add a user to the Workspace](assets/workspace/workspace-access-control-add-a-user.png "add a user")

- Workspace Owner can only be granted to max. 2 users per Worksace. Also, only a Workspace Owner can grant another user the Owner role - except there is no Workspace Owner at all.

### Optional

meshStack provides the optional configuration for 4-eyes access controls.
Please check the [official meshcloud documentation](meshcloud.workspace#invite-users-to-a-meshworkspace-team).

- A second user with Workspace Manager or Workspace Owner permission needs to approve the access request. The second user must also navigate to the specific meshWorkspace (see step 1.), go to the `Workpsace Access` tab (see step 2.) and then click on the `Access Requests` tab in the second tab-row.
![Click the Access Requests tab](assets/workspace/workspace-access-approve.png "Access Control - Access Requests")
