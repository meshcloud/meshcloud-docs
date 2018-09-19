---
id: meshstack.openshift
title: OpenShift
---

Meshstack supports management of RedHat OpenShift platforms. OpenShift has a [Kubernetes](meshstack.k8s.md) core and provides additional services. It is available in both Open Source flavors (OKD) as well as enterprise offerings by RedHat.

Meshstack supports project creation, configuration, user management and SSO for OpenShift.

## Integration Overview

To enable integration with OpenShift, Operators deploy and configure the Meshstack OpenShift Connector. Operators can configure one or multiple `PlatformInstance`s of `PlatformType` OpenShift. This makes OpenShift available to Projects like any other cloud platform in Meshstack.

Meshstack automatically configures OpenShift Projects and Permissions to integrate SSO with [Meshstack Identity Federation](./meshstack.identity-federation.md).

## Prerequisites

### OpenShift Versions

Meshstack currently supports OpenShift version 3.7 as either Open-Source (OKD) or OpenShift Enterprise variants.

### IdP Configuration

In order to integrate with [Meshstack Identity Federation](./meshstack.identity-federation.md), Operators need to configure the Meshstack Identity Broker as an [OpenID Identity Provider in OpenShift](https://docs.okd.io/latest/install_config/configuring_authentication.html#OpenID) using the following settings:

```yml
identityProviders:
  - name: meshfed_oidc
    challenge: false
    login: true
    mappingMethod: claim
    provider:
      apiVersion: v1
      kind: OpenIDIdentityProvider
      clientID: meshfed-oidc
      clientSecret: ignored
      extraScopes:
      - email
      - profile
      - skipIdentifierSelection
      extraAuthorizeParameters:
        include_granted_scopes: "true"
      claims:
        id:
        - sub
        preferredUsername:
        - sub
        name:
        - preferred_username
        email:
        - email
      urls:
        authorize: https://sso.example.meshcloud.io/auth/realms/meshfed/protocol/openid-connect/auth/auth?response_mode=query
        token: https://sso.example.meshcloud.io/auth/realms/meshfed/protocol/openid-connect/token
        userInfo: https://sso.example.meshcloud.io/auth/realms/meshfed/protocol/openid-connect/userinfo
```

### Meshstack Service Account

The Meshstack OpenShift Module uses a dedicated OpenShift ServiceAccount to work with OpenShift APIs on behalf of Meshstack. To create these credentials, create the following objects via `oc apply` as a Cluster Administrator.

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

Next, retrieve the access token for the service account:

```bash
oc get serviceaccount meshfed-service -o json | jq '.secrets[].name' | grep token | xargs oc describe secret
```

Operators need to securely inject this access token into the configuration of the OpenShift module.
