---
id: cloudfoundry.cli
title: CLI Access
---

Once here, you successfully registered to the Meshcloud Platform on [https://panel.meshcloud.io/](https://panel.meshcloud.io/). If not just follow the short registration form [here](https://panel.meshcloud.io/#/register). We will now show you how to get started with the Cloud Foundry CLI:

## Login

If you just registered, make sure you validated your e-mail address. Afterwards log in [here](https://panel.meshcloud.io/#/login/mesh) with your credentials.

## Create Project

The first thing you should do on the Meshcloud Platform is to create a project. All your resources are bound to projects. To create a new project press the **Create Project** button on the top right and follow the dialogue:

1. Enter a project name
2. Choose a billing address for the project \(bills are created per project\)
3. Choose the data center locations you want to use within this project

## Choose Location

Within the new project, choose a location for the deployment of your first Cloud Foundry applications. Go to **CLI Access** in the left menu.

## Cloud Foundry CLI Tools

If you are using Cloud Foundry for the first time you will have to install the Cloud Foundry CLI tools. Please follow the official [installation instructions](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

## Cloud Foundry Authentification

* In the Meshpanel on the CLI Access page click on **Get Passcode**. Copy the temporary authentication code that opens up in a new window.

* In your PowerShell \(Windows\) or Terminal \(MacOS\)

* Type `cf api LOCATION_ENDPOINT`, for example `cf api  https://api.cf.eu-de-darz.msh.host` for the DARZ data center

* Type `cf login -sso` for single-sign-on authentication. You will be asked for your temporary authentication code. Paste it here and hit enter.

* You will see a list of your Cloud Foundry spaces. A Cloud Foundry space corresponds to a Meshcloud Project.

## Choose a Project

To get started choose a space/project by typing `cf target -s YOURPROJECTNAME`

**Congratulations, you successfully installed the CF CLI tools and are ready to get started with Cloud Foundry now.**