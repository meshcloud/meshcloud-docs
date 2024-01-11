---
id: meshstack.openstack.metering
title: Metering
---

meshStack supports metering and billing for the most common types of OpenStack resources.
Metering is based on periodically sampling resource state from the platform's API.

> The accuracy of sampling-based metering naturally depends on the sampling interval. While insufficient for
> supporting a per-second billing model, it works very well for billing resources on a per-hour billing model.

## Prerequisites

- OpenStack admin user with suitable read-only permissions for all projects
- OpenStack APIs are accessible by meshStack metering collector components

## Supported Resources

Resources with the following traits are addressable in the [Product Catalog](meshstack.billing-configuration.md#defining-a-custom-product-catalog). Platform Operators or Partners can use the traits of these resources to define fine-granular product and pricing rules.

### Neutron - Floating IP
<!--snippet:mesh.kraken.productcatalog.traits.openstack.neutron.floatingIp#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let FloatingIpResourceTraits =
    {-
        This type has no traits. However you can still create products charging for the resource's existence.
    -}
      {}
```
<!--Example-->
```dhall
let example
    : FloatingIpResourceTraits
    = {=}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Neutron - Router
<!--snippet:mesh.kraken.productcatalog.traits.openstack.neutron.router#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let RouterResourceTraits =
    {-
        This type has no traits. However you can still create products charging for the resource's existence.
    -}
      {}
```
<!--Example-->
```dhall
let example
    : RouterResourceTraits
    = {=}
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Neutron - Load Balancer
<!--snippet:mesh.kraken.productcatalog.traits.openstack.neutron.loadbalancer#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let LoadBalancerResourceTraits =
    {-
      listeners:
        Number of load balancer listeners

      operatingStatus:
        Operating status of the load balancer. One of ONLINE, OFFLINE, DEGRADED, ERROR, NO_MONITOR.

      pools:
        Number of load balancer backend pools

      provider:
        The loadbalancer provider
    -}
      { listeners : Optional Integer
      , operatingStatus : Optional Text
      , pools : Optional Integer
      , provider : Optional Text
      }
```
<!--Example-->
```dhall
let example
    : LoadBalancerResourceTraits
    = { listeners = Some +1
      , operatingStatus = Some "OFFLINE"
      , pools = Some +1
      , provider = Some "octavia"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Cinder - Volume Snapshot
<!--snippet:mesh.kraken.productcatalog.traits.openstack.cinder.snapshot#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let VolumeSnapshotResourceTraits =
    {-
      availabilityZone:
        Availability zone of the volume snapshot

      replicationStatus:
        Replication status of the volume

      status:
        Status of the volume snapshot, see https://docs.openstack.org/api-ref/block-storage/v3/#volume-snapshots-snapshots

      volumeSize:
        Size of the volume snapshot in GiB
    -}
      { availabilityZone : Optional Text
      , replicationStatus : Optional Text
      , status : Text
      , volumeSize : Integer
      }
```
<!--Example-->
```dhall
let example
    : VolumeSnapshotResourceTraits
    = { availabilityZone = Some "eu-west"
      , replicationStatus = Some ""
      , status = "available"
      , volumeSize = +10
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Cinder - Volume
<!--snippet:mesh.kraken.productcatalog.traits.openstack.cinder.volume#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let VolumeResourceTraits =
    {-
      availabilityZone:
        Availability zone of the volume

      replicationStatus:
        Replication status of the volume

      size:
        Size of the volume in GiB

      status:
        Status of the volume, see https://docs.openstack.org/api-ref/block-storage/v3/#volumes-volumes

      type:
        Type of the volume
    -}
      { availabilityZone : Optional Text
      , replicationStatus : Optional Text
      , size : Integer
      , status : Text
      , type : Optional Text
      }
```
<!--Example-->
```dhall
let example
    : VolumeResourceTraits
    = { availabilityZone = Some "eu-west"
      , replicationStatus = Some ""
      , size = +10
      , status = "in-use"
      , type = Some "ssd"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Glance - Image
<!--snippet:mesh.kraken.productcatalog.traits.openstack.glance.image#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let ImageResourceTraits =
    {-
      service:
        The Glance backend service storing the image.

      size:
        The size of the image in GiB.

      status:
        Image status, see https://docs.openstack.org/glance/pike/user/statuses.html
    -}
      { service : Optional Text, size : Optional Integer, status : Text }
```
<!--Example-->
```dhall
let example
    : ImageResourceTraits
    = { service = Some "cinder", size = Some +10, status = "active" }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Nova - Server
<!--snippet:mesh.kraken.productcatalog.traits.openstack.nova.vm#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let VirtualMachineResourceTraits =
    {-
      disk:
        Virtual machine disk size in GiB

      diskEphemeral:
        Virtual machine ephemeral disk size in GiB

      diskRoot:
        Virtual machine root disk size in GiB

      flavor:
        Name of the flavor (not id)

      ramMb:
        RAM size of the virtual machine in MiB

      state:
        Virtual machine state

      vcpu:
        Number of virtual CPUs
    -}
      { disk : Optional Integer
      , diskEphemeral : Optional Integer
      , diskRoot : Optional Integer
      , flavor : Optional Text
      , ramMb : Optional Integer
      , state : Text
      , vcpu : Optional Integer
      }
```
<!--Example-->
```dhall
let example
    : VirtualMachineResourceTraits
    = { disk = Some +20
      , diskEphemeral = Some +20
      , diskRoot = Some +20
      , flavor = Some "v4.large"
      , ramMb = Some +1024
      , state = ""
      , vcpu = Some +4
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->
