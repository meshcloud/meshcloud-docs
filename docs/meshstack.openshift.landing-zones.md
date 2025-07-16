---
id: meshstack.openshift.landing-zones
title: Landing Zones
---

By defining a Landing Zone for OpenShift certain configurations can be enforced during [replication](meshcloud.tenant).

## Resource Quota

With OpenShift [ResourceQuotas](https://docs.openshift.com/container-platform/3.11/dev_guide/compute_resources.html) the number of resources inside a namespace (meshProject) can be limited.

These quotas can be defined on an OpenShift Landing Zone via the [Quota Management](administration.landing-zones#defining-quotas).

## Templates

Templates can be used to deploy some resources to projects that are provisioned via meshStack. Templates will be synchronized automatically with OpenShift when they are put into a Landing Zone and meshTenants are using this Landing Zone. This template shows up in the OpenShift web console and can be applied manually by the user. Currently only one template can be uploaded and managed this way.

It is possible to automatically instantiate this template inside a project via meshStack's project replication procedure. However, doing so requires currently that the [service principal](meshstack.openshift.index#replicator-service-account) gets all the additional rights required to instantiate the template. Like, for example, creating Pods or Network Policies. This might be not desirable and because of this it is disabled by default. To enable automatic Template instantiation set the flag `enableTemplateInstantiation` to true in the [Platform Connection Configuration](administration.platforms#platform-connection-config).

It is possible to automatically instantiate this template inside a project via meshStack's project replication procedure. However doing so requires currently that the [service principal](meshstack.openshift.index#replicator-service-account) gets all the additional rights required to instantiate the template. Like for example creating Pods or Network Policies. This might be not desirable and because of this it is disabled by default. To enable automatic Template instantiation set the flag `enableTemplateInstantiation` to true in the [Platform Connection Configuration](administration.platforms#platform-connection-config).
