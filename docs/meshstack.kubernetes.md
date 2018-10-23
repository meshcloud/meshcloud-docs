---
id: meshstack.kubernetes
title: Kubernetes
---

Meshstack supports project creation, configuration, user management and SSO for Kubernetes clusters.
Our Kubernetes integration is distribution-independent and is purely based on "vanilla" upstream Kubernetes services.
Operators should be able to successfully integrate any Kubernetes distribution of their chosing as long as it has the
required APIs and configuration options available.

## Integration Overview

To enable integration with Kubernetes, operators deploy and configure the Meshstack Kubernetes Module. Operators can configure one or multiple `PlatformInstance`s of `PlatformType` Kubernetes. This makes Kubernetes available to Meshprojects like any other cloud platform in Meshstack.

Meshstack automatically configures Kubernetes namespaces and RBAC permissions to integrate SSO with [Meshstack Identity Federation](./meshstack.identity-federation.md).

## Prerequisites

### Supported Kubernetes versions

Meshstack should work with any Kubernetes version and distribution that offers the following API versions:

- `core/v1`
- `rbac.authorization.k8s.io/v1`

Meshstack has been specifically validated to work with RKE (Rancher Kubernetes Enginge) and CFCR (Cloud Foundry Container Runtime).

### Mesh Configuration

Your meshstack installation needs to be configured to restrict MeshProject and MeshCustomer identifiers in the following ways:

- alphanumeric characters only
- maximum combined length of 63 characters

### API Server Configuration

In order to integrate with [Meshstack Identity Federation](./meshstack.identity-federation.md), operators need to configure the Meshstack Identity Broker as a trusted authentication provider. You will need to configure your Kubernetes distribution to apply the following configuration to [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/). Variables prefixed with `$` must
be replaced with the appropriate values for your individual meshstack installation.

```yaml
authorization-mode: RBAC
oidc-issuer-url: "https://$SSO_URL"
oidc-client-id: "meshfed-oidc"
oidc-username-claim: "sub"
oidc-username-prefix: "mesh:"
oidc-groups-claim: "MC_CUSTOMER_PROJECTS"
oidc-groups-prefix: ""
cors-allowed-origins: "http://localhost:9001,https://.*"
```

### MeshFed Service Account

The Meshstack Kubernetes Module uses a dedicated OpenShift ServiceAccount to work with Kubernetes APIs on behalf of Meshstack. To create these credentials, create the following objects via `kubectl apply` as a Cluster Administrator.

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: meshfed-service
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
    io.meshcloud/meshstack.replicator-openshift.version: "1.0"
subjects:
- kind: ServiceAccount
  name: meshfed-service
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: meshfed-service
```

Next, retrieve the access token for the service account so that it can be securely injected into the configuration
of the Kubernetes Module.

```bash
kubectl get serviceaccount meshfed-service -o json | jq '.secrets[].name' | grep token | xargs oc describe secret
```