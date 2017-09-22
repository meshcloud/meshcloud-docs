# OpenStack CLI Access

The OpenStack CLI tools enable you to experience the full set of our OpenStack Services. The OpenStack command line client is written in Python. So you will need to have Python installed to get started. If this is not the case, you can get it from [here.](https://www.python.org/downloads/)

## 1. Download and install the OpenStack CLI Tools

You install the OpenStack CLI tools from PyPI using pip

```
pip install python-openstackclient
```

And that's it. 

You can now start all your OpenStack commands with: `openstack`

e.g. by typing `openstack help`

you will see all OpenStack commands. 

## 2. Download your environment file

1. Login to the Meshpanel: https://panel.meshcloud.io
2. Create a new project or choose an existing project from your project list
3. In the Services Menu, navigate to Tools/CLI Access
4. Download the provided environment file for your operating system

The environment file contains all the information that you need to authorize against the OpenStack CLI, like the URL, your credentials, the project you want to access and so on.

## 3. Authenticate against the OpenStack CLI

1. Within your PowerShell or Terminal navigate to the folder that contains the downloaded environment file
2. Use the code snippets available in the Meshpanel to source your file. They are already customized to your project and location. It will be something like `source meshrc-[projectname]-eu-de-[locationname].sh`
3. Run `openstack token issue`
4. You will be asked to enter your federation password \(the one you use to login to Meshpanel as well\)
5. You can try this command to confirm that your authentication was successful: `openstack server list`
6. Congratulations. You are now ready to get going.

You just have to run through all these steps the first time you access OpenStack via the CLI. Keep your environment file for future accesses. You will have to source it again to reconnect to OpenStack next time.





