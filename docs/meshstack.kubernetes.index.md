---
id: meshstack.kubernetes.index
title: Integration
---

meshStack supports namespace creation, configuration, access control, quota management and billing for Kubernetes.

Our Kubernetes integration is generally distribution-independent and is purely based on "vanilla" upstream Kubernetes services. Platform engineers should be able to successfully integrate any Kubernetes distribution of their chosing as long as it has the
required APIs (described below) and configuration options available.

The following Kubernetes distributions are supported and covered on this page:

- **Native Kubernetes** with [Identity Federation](meshstack.identity-federation.md#externally-provisioned-identities) using externally provisioned identities
- **Azure Kubernetes Services** with user authentication and authorization via AKS AAD integration

> meshStack additionally offers [OpenShift integration](meshstack.openshift.index.md). Configuring OpenShift has some important differences to other Kubernetes distributions, so we cover it in a separate guide.

## Integration Overview

To enable integration with Kubernetes, platform engineers configure one or multiple `meshPlatform`s of `PlatformType` Kubernetes or AKS in the [Platform Administration](administration.platforms.md) in meshPanel.

## Prerequisites

### Supported Kubernetes versions

meshStack should work with any Kubernetes version and distribution that offers the following API versions:

- `core/v1`
- `rbac.authorization.k8s.io/v1`

meshStack has been specifically validated to work with RKE (Rancher Kubernetes Engine) and [AKS](#azure-kubernetes-services).

## meshStack Configuration

Your meshStack installation needs to be configured to restrict meshProject and meshWorkspace identifiers as follows:

- alphanumeric characters only
- maximum combined length of 63 characters

You can refer to the [official Documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names).


## Kubernetes Cluster Configuration

### meshStack Service Accounts

> The recommended way to set up Kubernetes as a meshPlatform is via the public terraform [Kubernetes meshPlatform Module](https://github.com/meshcloud/terraform-kubernetes-meshplatform). The steps below are not needed if you decide to use it.

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

Platform engineers need to securely inject these access token into the configuration of the Kubernetes modules.

### Custom meshProject Roles

> If you want to use custom roles to be mapped to your meshProject roles (and not just the pre-defined `admin`, `edit` and `view` roles) you need to make sure to also list these roles in the Cluster Role binding section for the meshfed-service principal.

It is not allowed for the service-principal to bind roles granting more rights then itself has, so the right to bind these roles must be explicitly given.

For example if you plan to use a role named `my-custom-role` please change the relevant section in the tenant management document to:

```yml
- apiGroups:
  - ""
  - rbac.authorization.k8s.io
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

### Access Control Integration

Integrating access control with meshStack requires different steps depending on your Kubernetes distribution.

#### Generic Kubernetes Distributions

meshStack will identify and assign users to roles in Kubernetes based on their `euid` (external user id) as described in [Identity Federation](meshstack.identity-federation.md#externally-provisioned-identities).
In practice this means that meshStack will replicate `ClusterRoleBinding` with subjects like

```yaml
subjects:
- kind: User
  name: "$euid"
  apiGroup: rbac.authorization.k8s.io
```

You will need to configure your Kubernetes distribution to map the same attribute value configured as `euid` in meshStack as the [subject identifier](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#referring-to-subjects) in your Kubernetes Cluster.
For example, if you're using an OIDC identity provider, configure the kube-apiserver `oidc-username-claim` to use the same attribute value used for meshUser's `euid`.
For more details, please review the [Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#openid-connect-tokens) or your Kubernetes distribution's specific instructions.

#### Azure Kubernetes Services

If you're using AKS, choose the platform type AKS when configuring the meshPlatform. This enables you to use Azure AD integration with your AKS cluster.

To prepare your AKS Cluster follow the official instructions [AKS-managed Azure Active Directory integration](https://docs.microsoft.com/en-us/azure/aks/managed-aad).

You need the Azure CLI version 2.0.61 or later installed and configured. Run `az --version` to find the version. If you need to install or upgrade, see Install Azure CLI.

After a successful replication, users can then fetch their `kubectl` credentials via:

```bash
az aks get-credentials --resource-group myResourceGroup --name myAKSCluster --overwrite-existing
```

This credential information and some additional configuration around the azure tenant the AKS cluster is running in have to provided in the [Platform Connection Configuration](administration.platforms.md#platform-connection-config).
