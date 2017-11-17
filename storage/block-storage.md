# Block Storage

The block storage is used to manage volumes as well as volume snapshots that attach to instances.

If you would like to create a new volume, type:

```
$ openstack volume create --size SIZE_IN_GB NAME
$ openstack volume create --size 1 MyFirstVolume
```

Now, you can boot an instance and attach it to the volume.





