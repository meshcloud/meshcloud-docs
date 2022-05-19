---
id: meshstack.kubernetes.index
title: Integration
---


meshStack supports project creation, configuration, user management and SSO for Kubernetes clusters.
Our Kubernetes integration is distribution-independent and is purely based on "vanilla" upstream Kubernetes services.
Operators should be able to successfully integrate any Kubernetes distribution of their chosing as long as it has the
required APIs and configuration options available.

The following Kubernetes distributions are supported:

- **Native Kubernetes** Supports user authentication via Keycloak integration.
- **Azure Kubernetes Services** Supports Azure AAD authenticated users to get seamless access to the AKS cluster.

## Integration Overview

To enable integration with Kubernetes, operators deploy and configure the meshStack Kubernetes Module. Operators can configure one or multiple `meshPlatform`s of `PlatformType` Kubernetes. This makes Kubernetes available to meshProjects like any other cloud platform in meshStack.
In order to successfully replicate and meter this platform, the [Platform Connection Configuration](administration.platforms.md#platform-connection-config) must be entered via meshPanel based on the configurations inside the platform described on this page.

Depending on which Kubernetes distribution you want to use you will need to follow different steps. Below are the steps for the [meshStack Identity Federation](./meshstack.identity-federation.md) integration as well as for the [Azure Kubernetes Services](#azure-kubernetes-services).

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


### meshStack Service Accounts

The meshStack Kubernetes Modules use dedicated Kubernetes ServiceAccounts to work with Kubernetes APIs on behalf of meshStack.
To create these credentials, create the following objects via `kubectl apply` as a Cluster Administrator.

Service principals are located in configured namespaces. In the following YAML files we use the "meshcloud" namespace for the principals.
You can also define a different namespace if you prefer.
Before applying the YAML file, the namespace has to be created first via `kubectl create namespace meshcloud`.

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
  - ""
  resources:
  - resourcequotas
  - resourcequotas/status
  verbs:
  - create
  - delete
  - deletecollection
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - ""
  resources:
  - appliedclusterresourcequotas
  - clusterresourcequotas
  - clusterresourcequotas/status
  verbs:
  - create
  - delete
  - deletecollection
  - get
  - list
  - update
  - watch
- apiGroups:
  - ""
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
  - ""
  - rbac.authorization.k8s.io
  resources:
  - rolebindings
  verbs:
  - create
  - delete
  - update
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
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

### Service Account Token

Next, retrieve the access token for the service accounts:

```bash
kubectl get serviceaccount meshfed-service -n meshcloud -o json | jq '.secrets[].name' | grep token | xargs kubectl describe secret -n meshcloud
kubectl get serviceaccount meshfed-metering -n meshcloud -o json | jq '.secrets[].name' | grep token | xargs kubectl describe secret -n meshcloud
```

Operators need to securely inject these access token into the configuration of the Kubernetes modules.

### Custom meshProject Roles

> If you want to use custom roles to be mapped to your meshProject roles (and not just the pre-defined `admin`, `edit` and `view` roles) you need to make sure to also list these roles in the Cluster Role binding section for the meshfed-service principal.

It is not allowed for the service-principal to bind roles granting more rights then itself has, so the right to bind these roles must be explicitly given.

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

## meshStack Identity Federation

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

meshStack automatically configures Kubernetes namespaces and RBAC permissions to integrate SSO with [meshStack Identity Federation](./meshstack.identity-federation.md).

## Azure Kubernetes Services

In order to use the AKS cluster properly with meshStack you need to enable the Azure AD integration. A good description on what needs to be done can be found in the [AKS-managed Azure Active Directory integration](https://docs.microsoft.com/en-us/azure/aks/managed-aad) document from Microsoft.

You need the Azure CLI version 2.0.61 or later installed and configured. Run `az --version` to find the version. If you need to install or upgrade, see Install Azure CLI.

After a successful replication, users can then fetch their `kubectl` credentials via:

```bash
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster --overwrite-existing
```

This credential information and some additional configuration around the azure tenant the AKS cluster is running in have to provided in the [Platform Connection Configuration](administration.platforms.md#platform-connection-config).
