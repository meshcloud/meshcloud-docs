---
id: openstack.block-storage
title: Block Storage
---

OpenStack Block Storage is provided via Cinder.

Create storage volumes of any size that are independent from the life cycle of your instances. Connect them flexibly with instances. The security of your data is of great importance to us and that is why they are exclusively stored in Germany. We replicate each of your volumes three times. Additionally, you are granted the possibility to create snapshots and store them in a different location at any point in time. Our blockstorage service is based on OpenStack Cinder.

You can use Cinder via the OpenStack API and CLI or via the Meshpanel.

## Using the OpenStack CLI

### Creating a Volume via CLI

Before getting started, please make sure that you have [access to the OpenStack CLI.](openstack.cli.md)

If you would like to create a new volume with the OpenStack CLI, type:

```bash
openstack volume create --size SIZE_IN_GB NAME
openstack volume create --size 1 MyFirstVolume
```

Now, you can boot an instance and attach it to the volume.

## Using the Meshpanel

### Creating a Volume via Meshpanel

Generally, you create storage volumes in order to attach them to one of your instances.

  1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io/)
  1. If not logged in, please login with your personal credentials
  1. On the Welcome Dashboard, please select the Project & Location in which you want to create a storage volume
  1. After selecting Project & Location, go to** Storage &gt; Volumes **in the service menu bar on the left
  1. Provide a name as well as a description for your volume and choose your desired size. Then click "Create"
  1. Congratulations, you have now created a volume

### Binding a Volume to an Instance

As usual, you need to access your project dashboard in order to get started:

  1. Navigate to **Compute &gt; Instances.** You will see a list of all your instances
  1. Choose the instance you want to attach your volume to and click on its name
  1. In the detail view you can now choose the volume that you want to attach
