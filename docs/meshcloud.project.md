---
id: meshcloud.project
title: Project
---

In order to use cloud computing resources, you have to create a Meshproject. Within the Meshproject, you can manage and scale the resources you use across all locations.

## Create a new Meshproject

Log on to the Meshpanel with your account credentials and press `Create`. Type in a name for your new project and press `Next`. Choose a payment method as well as your billing address and press `Next` again. In the last step, you can choose the locations from which you can obtain the cloud computing resources for your project. Press `Create Project` and you will see your new project listed in the Projects List.

## Assign user to a Meshproject

Before being able to assign a user to a Meshproject, the user must have been [invited to the Meshcustomer](meshcloud.customer.md). Then go to your **Account** settings. You access them by pressing the settings icon on the top right of the panel. From here, navigate to **Projects** and click the pen button to edit the project. In the **Project Users** section you can start typing the email address of a user assigned to your Meshcustomer and select the according user in the dropdown. Press the `+` to actually add this user to the project. Note that only users with a valid account on the Meshpanel can access your projects.

## Add/remove locations from a Meshproject

In the edit screen of a project, the list of all available locations is shown. Via the checkbox, new locations can be selected. They will be added to the project when clicking the `Save` button.
Locations can also be removed from the project with some limitations. All resources related to the project in that location (i.e. OpenStack instances, Cloud Foundry Apps, etc.) have to be deleted manually before removing a location.

## Delete a Meshproject

If you would like to delete a project which is no longer used, go to your **Account** settings. Navigate to **Projects** and click the button with the trash icon. The system now checks whether any resources still exist for your project. If there are existing resources, you will be informed about which resources still exist. As deletion of a project is an irrevocable action, you cannot delete projects with resources. You have to delete those resources manually before to be sure that you really want to delete these resources that may contain production relevant workloads. When no resources exist anymore you have to confirm the deletion by entering the identifier of your project again. The actual project deletion in the platforms will be done in the background and may take a while.
