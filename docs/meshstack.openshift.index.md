---
id: meshstack.openshift.index
title: Integration
---

meshStack supports management of RedHat OpenShift platforms. OpenShift has a [Kubernetes](meshstack.kubernetes.index) core and provides additional services. It is available in both Open Source flavors (OKD) as well as enterprise offerings by RedHat.

meshStack supports project creation, configuration, access control, quota management and billing for OpenShift.

## Integration Overview

To enable integration with OpenShift, platform engineers configure one or multiple `meshPlatform`s of `PlatformType` OpenShift in the [Platform Administration](administration.platforms) in meshPanel.

## Prerequisites

### OpenShift Versions

meshStack currently officially supports and validates OpenShift version 4.x as either Open-Source (OKD) or OpenShift Enterprise variants. Also version 3.9+ was successfully validated in the past with meshStack and should still be working, but it is no longer officially validated by meshcloud.

In general meshStack supports all OpenShift versions that can provide the resources listed for the required [service accounts](meshstack.openshift.index#meshstack-service-accounts). These resources are consumed with the versions mentioned in the cluster roles of the service account or if not defined there with the following versions:

* [`/api/v1`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/)
* [`/apis/template.openshift.io/v1`](https://docs.openshift.com/container-platform/4.7/rest_api/template_apis/template-template-openshift-io-v1.html)

### IdP Configuration

meshStack will identify and assign users in OpenShift via their euid (external user id) as described in [Identity Federation](meshstack.identity-federation#externally-provisioned-identities).
In practice, we recommend using the same external IdP as configured for meshStack and configuring OpenShift to use the same attribute as `username`.


### meshStack Service Accounts

The meshStack OpenShift Modules use dedicated OpenShift ServiceAccounts to work with OpenShift APIs on behalf of meshStack.
To create these credentials, create the following objects via `oc create -f <file>` as a Cluster Administrator.

> After you initially created the service account once, you can use `oc replace -f <file>` to update existing definitions.

The meshStack ServiceAccounts can be located in a dedicated namespace. In the following yaml files we use the `meshcloud` namespace for the ServiceAccounts.
You can also define a different namespace if you prefer.
Before applying the yaml file, the namespace has to be created first via `oc create namespace meshcloud`.

#### Replicator Service Account

The tenant management component of meshStack requires the following ServiceAccount.

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: meshfed-service
  namespace: meshcloud
  annotations:
    io.meshcloud/meshstack.replicator-openshift.version: "1.0"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: meshfed-service
  annotations:
    io.meshcloud/meshstack.replicator-openshift.version: "1.0"
rules:
- apiGroups:
  - ""
  resources:
  - namespaces
  verbs:
  - get
  - list
  - watch
  - update
- apiGroups:
  - ""
  - user.openshift.io
  resources:
  - groups
  - identities
  - useridentitymappings
  - users
  verbs:
  - create
  - delete
  - get
  - list
  - update
  - watch
- apiGroups:
  - ""
  - project.openshift.io
  resources:
  - projectrequests
  - projects
  verbs:
  - create
  - delete
  - get
  - list
  - update
  - watch
- apiGroups:
  - ""
  resources:
  - resourcequotas
  - resourcequotas/status
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - ""
  - template.openshift.io
  resources:
  - templates
  - templateinstances
  - templateconfigs
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - ""
  - quota.openshift.io
  resources:
  - appliedclusterresourcequotas
  - clusterresourcequotas
  - clusterresourcequotas/status
  verbs:
  - create
  - delete
  - get
  - list
  - update
  - watch
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
  - authorization.openshift.io
  resources:
  - roles
  - rolebindings
  - clusterroles
  - clusterrolebindings
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
  - authorization.openshift.io
  resources:
  - rolebindings
  verbs:
  - create
  - delete
  - update
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
  - authorization.openshift.io
  resources:
  - clusterroles
  verbs:
  - bind
  resourceNames:
  # ATTENTION: Replace these roles with the actual ClusterRoles you want to map for meshProject roles
  - admin
  - edit
  - view
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: meshfed-service
  annotations:
    io.meshcloud/meshstack.replicator-openshift.version: "1.0"
subjects:
- kind: ServiceAccount
  name: meshfed-service
  namespace: meshcloud
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: meshfed-service
```

#### Metering Service Account

The metering component of meshStack requires the following ServiceAccount.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: meshfed-metering
  namespace: meshcloud
  annotations:
    io.meshcloud/meshstack.metering-openshift.version: "1.0"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: meshfed-metering
  annotations:
    io.meshcloud/meshstack.metering-openshift.version: "1.0"
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - persistentvolumeclaims
  verbs:
  - get
  - list
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: meshfed-metering
  annotations:
    io.meshcloud/meshstack.metering-openshift.version: "1.0"
subjects:
- kind: ServiceAccount
  name: meshfed-metering
  namespace: meshcloud
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: meshfed-metering
```

#### Retrieve the secret

In order to retrieve the secrets of the service accounts, please execute the following commands.

```bash
$ oc describe sa meshfed-service -n meshcloud
Name:                meshfed-service
Namespace:           meshcloud
Labels:              <none>
Annotations:         io.meshcloud/meshstack.replicator-openshift.version: 1.0
Image pull secrets:  meshfed-service-dockercfg-kgvnj
Mountable secrets:   meshfed-service-token-5vvls
                     meshfed-service-dockercfg-kgvnj
Tokens:              meshfed-service-token-5vvls
                     meshfed-service-token-fmnd6
                     meshfed-service-token-kbst7
                     meshfed-service-token-n45k6
Events:              <none>
```

Here you get a list of available tokens. Pick one of the tokens and use it in the following command.

```bash
$ oc describe secret meshfed-service-token-5vvls -n meshcloud
Name:         meshfed-service-token-5vvls
Namespace:    meshcloud
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: meshfed-service
              kubernetes.io/service-account.uid: bb537f6b-7a64-408b-9e47-933ac9d1aab4

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:          5940 bytes
namespace:       9 bytes
service-ca.crt:  7153 bytes
token:           eyJhbGciOiJ...
```

Use the token provided here in the meshStack OpenShift connector configuration. Do the same for the meshfed-metering service account.

### Custom meshProject Roles

Kubernetes has built-in privilege escalation prevention, which means that it is not allowed for Service Accounts to bind roles granting more rights than the Service Account itself has. Operators can override this by explicitly granting a Service Account permission to create role bindings involving a named set of `ClusterRoles`.

If you want to use custom roles to be mapped to your meshProject roles (and not just the pre-defined `admin`, `edit` and `view` roles) you need to make sure to also list these roles in the `ClusterRole` for the [Replicator Service Account](#replicator-service-account).

For example if you plan to use custom roles named `my-custom-view` and `my-custom-edit` please change the relevant section in the `ClusterRole` definition to:

```yml
# ...
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
  - authorization.openshift.io
  resources:
  - clusterroles
  verbs:
  - bind
  resourceNames:
  - my-custom-view
  - my-custom-edit
# ...
```

### Tagging Configuration

Openshift supports meshStack's powerful multi-cloud [tagging system](meshstack.metadata-tags#replicate-tags-to-cloud-platforms).
To enable the Openshift integration to automatically replicate tags from meshStack into the cloud platform, a label prefix must be defined in the OpenShift configuration.
It can be found in the meshPanel in the Administration Area. Go to "meshPlatforms" on the left, click on an OpenShift platform and go to "Settings" -> "Config".
The Label Prefix can be found under the "Replication Configuration" header.

> 💡 Make sure to pick a valid DNS prefix that ends with a slash, e.g. "yourcompany.com/".
