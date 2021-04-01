---
id: meshstack.openshift.landing-zones
title: Landing Zones
---

By defining a Landing Zone for OpenShift certain configurations can be enforced during [replication](./meshcloud.tenant.md).

## Resource Quota

With OpenShift [ResourceQuotas](https://docs.openshift.com/container-platform/3.11/dev_guide/compute_resources.html) the number of resources inside a namespace (meshProject) can be limited.

These quotas can be defined on an OpenShift Landing Zone via the [Quota Management](./administration.landing-zones.md#defining-quotas).

## Templates

Templates can also be synchronized automatically with OpenShift if they are put into a Landing Zone and assigned to a meshProject. This is similar to the ResourceQuotas handling. This template then shows up in the web console and can be applied manually by the user. Currently only one template can be uploaded and managed this way.

It is possible to automatically instance this template inside a project via meshStacks project replication procedure. However doing so requires currently that the service principal, created with the rights above, gets all the additional rights required to instance the template. Like for example creating Pods. This might be not desirable and because of this this function is disabled by default. To enable automatic Template instancing set the flag `enableTemplateInstancing` to true:

```yml
replicator-openshift:
  platforms:
    - platform: okd.eu-de-central
      enableTemplateInstancing: true
```

## Default Labels

Labels are used to identify existing Resources inside OpenShift or Kubernetes projects. It is possible to define a set of default labels which get applied to every resource created via meshStack. Usually these managed resources are created by a Landing Zone configuration (e.g. [ResourceQuotas](https://docs.openshift.com/container-platform/3.11/admin_guide/quota.html) or [Templates](https://docs.openshift.com/container-platform/3.11/dev_guide/templates.html)).

In order to set these default labels use the replicator OpenShift platform configuration and set the property `default-resource-labels` like so:

```yml
replicator-openshift:
  platforms:
    - platform: okd.eu-de-central
      default-resource-labels:
        my-label-1: sample-value-123
        my-label-2: sample-value-456
```

## Dynamic Labels

You can also specify certain labels which are populated via data from the meshProject spec. This can be for example a costcenter id. You need to map these fields via the replicator config as well:

```yml
replicator-openshift:
  platforms:
    - platform: okd.eu-de-central
      meta-label-mappings:
        costCenter: io.meshcloud/costCenter
```

This configuration will map the value from the specs metadata with the key `costCenter` to an OpenShift label with the key `io.meshcloud/costCenter`. The datapoints available in the specs for mapping might be differnt depending on the configured environment of your meshStack installation. Please contact the [support](https://support.meshcloud.io/hc/en-us/requests/new) for more details.
