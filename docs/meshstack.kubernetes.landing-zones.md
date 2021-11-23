---
id: meshstack.kubernetes.landing-zones
title: Landing Zones
---

The Kubernetes Landing Zone can be used to configure how Namspaces are created inside a shared Kubernetes Cluster.


## meshRole to Platform Role Mapping

The meshProject roles must be mapped to Kubernetes specific Cluster Roles. This cluster role is then assigned to the users for their namespace via a Role Binding.
You are able to control this mapping with a Landing Zone setting. Usually its a good idea to setup own Cluster Roles in Kubernetes before and then map them to their
meshStack counterpart. But you can also use predefined Kubernetes Cluster Roles like `editor` or `viewer`.

## Resource Quota

Kubernetes ResourceQuotas are used to limit the number of resources inside a namespace (which represents a meshProject). In this Landing Zone setting you can
put in your Quotas.
