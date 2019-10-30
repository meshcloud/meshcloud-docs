---
id: meshstack.metering-openstack
title: OpenStack Metering
---

meshStack supports metering and billing for most common OpenStack versions. For fine-granular metering and best-performance, we recommend the use of OpenStack Panko for OpenStack Releases Pike and later.

## Prerequisites

- OpenStack admin user with suitable read-only permissions for all projects
- OpenStack APIs are accessible by meshStack metering collector components
- OpenStack Panko (optional, but recommended): OpenStack Pike or later
  - Panko must be configured to emit & record suitable events
  - note: Panko can also be used with suitable patches on older OpenStack releases
  - Contact us for details

## Supported Resources

Resources with the following traits are addressable in the Product Catalog.

### Nova

A nova virtual machine.

```text
id: os.nova.vm
traits:
  - RAM
  - VCPU
  - STATE
  - FLAVOR
  - DISK
  - DISK_EPHEMERAL
  - DISK_ROOT
```

### Cinder

#### Volumes

```text
id: os.cinder.volume
traits:
  - STATUS
  - AVAILABILITY_ZONE
  - SIZE
  - REPLICATION_STATUS
  - TYPE
```

#### Snapshots

```text
id: os.cinder.snapshots
traits:
  - STATUS
  - VOLUME_SIZE
  - AVAILABILITY_ZONE
  - REPLICATION_STATUS
```

### Glance

#### Images

```text
id: os.glance.volume
traits:
  - STATUS
  - SERVICE
  - SIZE
```

### Neutron

#### Routers

```text
id: os.cinder.volume
traits: []
```

#### Floating IPs

```text
id: os.neutron.floatingIp
traits: []
```

#### Traffic

Metering for Neutron Traffic is supported, however it depends on the actual environment and networking services used in Neutron. Please contact us for details.

### Keystone

#### Project

The Keystone project resource is useful for attaching prices directly to an OpenStack Project.

> Common use cases include chargeback of fixed-fees for support contracts.

The metering pipeline for OpenStack automatically generates this resource for each OpenStack project managed by meshStack.

```text
id: os.keystone.project
traits: []
```
