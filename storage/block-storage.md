# Block Storage

The block storage is used to manage volumes as well as volume snapshots that attach to instances.

If you would like to create a new volume, type:

```
$ openstack volume create --size SIZE_IN_GB NAME
$ openstack volume create --size 1 MyFirstVolume
```

Now, you can boot an instance and attach it to the volume:

```
$ openstack server create --image cirros-qcow2 --flavor m1.tiny MyVolumeInstance
```

For listing all volumes and checking the volume status, type:

```
$ openstack volume list
```

After the instance is active, attach a volume and then the volume is available:

```
$ openstack server add volume INSTANCE_ID VOLUME_ID
$ openstack server add volume MyVolumeInstance 573e024d-5235-49ce-8332-be1576d323f8
```

It is possible to provide a specific device name on the Xen Hypervisor. By doing so, you avoid the automatic allocation:

```
$ openstack server add volume --device /dev/vdb MyVolumeInstance 573e024d..1576d323f8

NOTE: This is not possible for non-Xen hypervisors.
```

After logging into the instance, you can manage volumes.

To list storage devices, type:

```
# fdisk -l
```

In order to make a filesystem on the volume, type:

```
# mkfs.ext3 /dev/vdb
```

For creating a mountpoint, type:

```
# mkdir /myspace
```

Now, mount the volume at the mountpoint:

```
# mount /dev/vdb /myspace
```

To create a file on the volume, type:

```
# touch /myspace/helloworld.txt
# ls /myspace
```

Unmounting the volume will require typing:

```
# umount /myspace
```



