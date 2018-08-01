---
id: openstack.heat
title: Heat Automation
---

## Deploying a Heat Stack

Heat templates are used to orchestrate infrastructure, also known as infrastructure as code.  This enables you to create a template for your infrastructure, which describes different resource types and their relationships and which can be \(re-\)run at any time. Using Heat you are able to automate and standardize your deployments and make them less prone to errors.

Make sure you have [CLI Access](openstack.cli.md) befor you get going with the following instructions.

### 1. Authenticate with an OpenStack Service User

It is recommended to use a service user for your automated deployments. That's why only service users own the rights to deploy Heat scripts. Use the rc-file provided when you create your OpenStack service user to authenticate against the OpenStack CLI. Here is how you [create a service user](meshcloud.service-user.md) if you haven't done this before. 

### 2. Install the OpenStack Heat Client

If this is the first time you are using Heat you should install the OpenStack Heat Client.

```bash
pip install python-heatclient
```

Once this is done, run the following command to confirm everything is working as expected
```bash
openstack stack list
```

If this command results in an empty line you are all set to get going.

Check out the official Heat Documentation if you want to know more about Heat: https://docs.openstack.org/heat/latest/
