---
id: osb.volume
title: Volume Service (osb-samba)
---

In Cloud Foundry, the local file system of a container is typically ephemeral. Meshcloud's Volume Service allows you to mount a persistent data volume into a running container file system. Instances of the volume service can be shared among different applications and instances. They are backed by a secure SMB file share and suitable for workloads like content-management-systems that only support file-based storage.

## Service Plans

Each service instance of the volume service has dedicated resources available to it and thus offers constant performance.

Please see the pricing sheet (found in the footer of the meshPanel) for available sizes and prices of the `osb-samba` service.

## Mounting a Volume

When binding an instance of the Volume service, the volume will be mounted to `/mnt` by default.

To customize this mount-point, you can specify the `container_dir` parameter when creating a service binding. We recommend storing custom binding parameters as a `volume-binding.json` file next to your `manifest.yml` \(manifests themselves do [not yet](https://github.com/cloudfoundry/cli/issues/1173) support service binding parameters\).

Using the following `volume-binding.json` , we can tell Cloud Foundry to mount the volume at `/app/htdocs/wp-content` when creating the binding using `cf bind-service my-app my-service -c volume-binding.json`

```json
{
  "container_dir": "/app/htdocs/wp-content"
}
```