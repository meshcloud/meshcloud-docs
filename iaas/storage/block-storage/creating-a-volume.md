# Creating a Volume in Meshpanel

Generally, you create storage volumes in order to attach them to one of your instances.

1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io/)

2. If not logged in, please login with your personal credentials

3. On the Welcome Dashboard, please select the Project & Location in which you want to create a storage volume

4. After selecting Project & Location, go to** Storage &gt; Volumes **in the service menu bar on the left

5. Provide a name as well as a description for your volume and choose your desired size. Then click "Create"

6. Congratulations, you have now created a volume

# Creating a Volume in the OpenStack CLI

Before getting started, please make sure that you have [access to the OpenStack CLI.](/openstack-cli-access.md)

If you would like to create a new volume with the OpenStack CLI, type:

```
$ openstack volume create --size SIZE_IN_GB NAME
$ openstack volume create --size 1 MyFirstVolume
```

Now, you can boot an instance and attach it to the volume.



