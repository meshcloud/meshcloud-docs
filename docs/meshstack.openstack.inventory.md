---
id: meshstack.openstack.inventory
title: Cloud Inventory
---

You can see a list of OpenStack virtual machines in the Resources page under the Inventory section in the Admin Area.
Here you can filter by VM status and metadata such as flavor and IP Address of the instance.

The meshPanel shows four possible statuses of a VM, and they are mapped to [OpenStack statues](https://docs.openstack.org/api-guide/compute/server_concepts.html) as follows.

* Active -  ACTIVE, BUILD, ERROR, HARD_REBOOT, MIGRATING, PASSWORD, REBOOT, REBUILD, RESCUE, RESIZE, REVERT_RESIZE, UNKNOWN, VERIFY_RESIZE
* Terminated - DELETED
* Offline - PAUSED, SHELVED, SHELVED_OFFLOADED, SHUTOFF, SOFT_DELETED, SUSPENDED
* Unknown - Any other state

