# Deploying an Application

In this article we help you deploy your first application to Cloud Foundry. If you have not installed the CF CLI tools yet, you should read [this article](https://meshcloud.gitbooks.io/meshcloud/content/paas/cloud-foundry-cli-access.html) first.

## Sample Spring Boot Application

Cloud Foundry offers a great collection of sample applications to get you started. Find it [here](https://github.com/cloudfoundry-samples). We will use the [spring-music application](https://github.com/cloudfoundry-samples/spring-music) application in this example.

## Download the Repository

Open your PowerShell or Terminal, type `git clone https://github.com/cloudfoundry-samples/spring-music.git` and hit enter to download the repository to your local environment. Direct to the spring-music folder.

## Access Cloud Foundry

From the Meshpanel get your temporary Cloud Foundry authentication token and login to Cloud Foundry using `cf login -sso` in your Terminal/PowerShell. You will be asked to enter the passcode. From the list of spaces, choose the space to which you want to deploy your sample application. \(For more detailed instructions read [this](https://meshcloud.gitbooks.io/meshcloud/content/paas/cloud-foundry-cli-access.html) first\).

## Build the Application

Before pushing the application to Cloud Foundry, you will need to run a `./gradlew clean assemble` to build the application locally.

## Push the Application

In your PowerShell or Terminal, make sure your are in the folder with the manifest.yaml file. It contains the configurations for your application. e.g. the RAM per instance. Now, type `cf push APPNAME` to push your application to Cloud Foundry.  This command will upload your files to the cloud, download the required buildpack and build a container out of your application and deploy the container to the cloud. That's it, your app is running in the cloud. You can check its status with `cf app APPNAME`. It will show you the number of running instances, their status as well as their size. Under **routes **it also shows the domain where you will find the app. Copy this address to your browser to see the music database.

In this state, your sample application is running with an in-memory database. If you add an album it will be added within your container. Re-starting the container will result in a loss of these changes. That is why you should bind a persistent database to your app. See how this works in [this article](https://meshcloud.gitbooks.io/meshcloud/content/paas/services/cre.html).

