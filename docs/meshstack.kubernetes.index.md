---
id: meshstack.kubernetes.index
title: Integration
---

meshStack supports project creation, configuration, user management and SSO for Kubernetes clusters.
Our Kubernetes integration is distribution-independent and is purely based on "vanilla" upstream Kubernetes services.
Operators should be able to successfully integrate any Kubernetes distribution of their chosing as long as it has the
required APIs and configuration options available.

## Integration Overview

To enable integration with Kubernetes, operators deploy and configure the meshStack Kubernetes Module. Operators can configure one or multiple `PlatformInstance`s of `PlatformType` Kubernetes. This makes Kubernetes available to meshProjects like any other cloud platform in meshStack.

meshStack automatically configures Kubernetes namespaces and RBAC permissions to integrate SSO with [meshStack Identity Federation](./meshstack.identity-federation.md).

## Prerequisites

### Supported Kubernetes versions

meshStack should work with any Kubernetes version and distribution that offers the following API versions:

- `core/v1`
- `rbac.authorization.k8s.io/v1`

meshStack has been specifically validated to work with RKE (Rancher Kubernetes Enginge) and CFCR (Cloud Foundry Container Runtime).

### meshStack Configuration

Your meshStack installation needs to be configured to restrict meshProject and meshCustomer identifiers as follows:

- alphanumeric characters only
- maximum combined length of 63 characters

You can refer to the [official Documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names).

### API Server Configuration

In order to integrate with [meshStack Identity Federation](./meshstack.identity-federation.md), operators need to configure the meshStack Identity Broker as a trusted authentication provider. You will need to configure your Kubernetes distribution to apply the following configuration to [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/). Variables prefixed with `$` must
be replaced with the appropriate values for your individual meshStack installation.

```yaml
authorization-mode: RBAC
oidc-issuer-url: "https://$SSO_URL/auth/realms/meshfed"
oidc-client-id: "meshfed-oidc"
oidc-username-claim: "sub"
oidc-username-prefix: "mesh:"
oidc-groups-claim: "MC_CUSTOMER_PROJECTS"
oidc-groups-prefix: ""
cors-allowed-origins: "http://localhost:9001,https://.*"
```

### meshStack Service Accounts

The meshStack Kubernetes Modules use dedicated Kubernetes ServiceAccounts to work with Kubernetes APIs on behalf of meshStack.
To create these credentials, create the following objects via `kubectl apply` as a Cluster Administrator.

Service principals are located in configured namespaces. In the following yaml files we use the "meshcloud" namespace for the principals.
You can also define a different namespace if you prefer.
Before applying the yaml file, the namespace has to be created first via `kubectl create namespace meshcloud`.

#### Tenant Management

The tenant management component of meshStack requires the following principal.

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: meshfed-service
  namespace: meshcloud
  annotations:
    io.meshcloud/meshstack.replicator-kubernetes.version: "1.0"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: meshfed-service
  annotations:
    io.meshcloud/meshstack.replicator-kubernetes.version: "1.0"
rules:
- apiGroups:
  - ""
  resources:
  - namespaces
  verbs:
  - get
  - list
  - watch
  - create
  - delete
  - update
- apiGroups:
  - rbac.authorization.k8s.io
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
  - rbac.authorization.k8s.io
  resources:
  - rolebindings
  verbs:
  - create
  - delete
  - update
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - clusterroles
  verbs:
  - bind
  resourceNames:
  - admin
  - edit
  - view
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: meshfed-service
  annotations:
    io.meshcloud/meshstack.replicator-kubernetes.version: "1.0"
subjects:
- kind: ServiceAccount
  name: meshfed-service
  namespace: meshcloud
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: meshfed-service
```

#### Metering

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: meshfed-metering
  namespace: meshcloud
  annotations:
    io.meshcloud/meshstack.metering-kubernetes.version: "1.0"
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: meshfed-metering
  annotations:
    io.meshcloud/meshstack.metering-kubernetes.version: "1.0"
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
  - list
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: meshfed-metering
  annotations:
    io.meshcloud/meshstack.metering-kubernetes.version: "1.0"
subjects:
- kind: ServiceAccount
  name: meshfed-metering
  namespace: meshcloud
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: meshfed-metering
```

#### Get service account token

Next, retrieve the access token for the service accounts:

```bash
kubectl get serviceaccount meshfed-service -n meshcloud -o json | jq '.secrets[].name' | grep token | xargs kubectl describe secret -n meshcloud
kubectl get serviceaccount meshfed-metering -n meshcloud -o json | jq '.secrets[].name' | grep token | xargs kubectl describe secret -n meshcloud
```

Operators need to securely inject these access token into the configuration of the Kubernetes modules.


### Custom meshProject Roles

If you want to use custom roles to be mapped to your meshProject roles (and not just the pre-defined `admin`, `edit` and `view` roles) you need to make sure to also list these roles in the clusterrole binding section for the meshfed-service principle. It is not allowed for the service-principle to bind roles granting more rights then itself has, so the right to bind these roles must be explicitly given.

For example if you plan to use a role named `my-custom-role` please change the relevant section in the tenant management document to:

```yml
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
  - authorization.openshift.io
  resources:
  - clusterroles
  verbs:
  - bind
  resourceNames:
  - admin
  - edit
  - view
  - my-custom-role
```
