---
id: platforms.openstack
title: OpenStack
---

You can manage OpenStack resources via the meshPanel or the OpenStack CLI. IaaS services include virtual machines in different flavors, network services and storage services, such as block and object storage.

## Supported Services

The meshPanel contains a convenient user interface for the most common OpenStack services. The panel talks directly
to the OpenStack API, which thus needs to allow CORS. The following services are supported from the panel:

- Nova
- Neutron
- Cinder
- Glance
- Swift

## Service Users

meshcloud allows creation of [Service Users](meshcloud.service-user.md) for OpenStack.

## Quota Management

Partners can enforce detailed per-project quotas for OpenStack via meshcloud.
