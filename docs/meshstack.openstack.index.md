---
id: meshstack.openstack.index
title: Integration
---

## Architecture

Access to OpenStack platforms takes place via a federated identity, i.e. there is a relationship of trust between the Auth service Keystone responsible for the cloud and the IdP of the meshStack (Keycloak). Within OpenStacks, Keystone then determines the permitted accesses.

OpenStack Keystone delegates the authentication in the federated case to an Apache module, in our case `mod_auth_openidc`, which among other things implements the OpenID Connect protocol for distributed authentication. When accessing the cloud, the user brings a token (JWT) with him, which was issued by the meshStack Keycloak and provided with the necessary access information and is validated by `mod_auth_openidc` (see access procedure). The meshStack Keycloak in turn accesses an external identity source (e.g. LDAP, central IdP).

The Meshpanel frontend also validates the JWT tokens against Keycloak in order to grant the user the necessary access.

The backend also uses the JWT token to check the user's permissions. If the permissions to the cloud for users are changed via the meshStack, the backend updates the permissions stored in Keycloak for this user.

![OpenStack Architecture](assets/os-architecture.png)

## OpenStack Access

1. The user accesses the meshStack via the browser.
2. In the logged out state the user is forwarded to Keycloak to enter his credentials.
3. These credentials are compared with the connected external IdP (e.g. LDAP) if necessary.
4. On successful login Keycloak issues an OIDC token (JWT, here MToken) to the user and gives it to the user in the meshPanel, so that the user is logged in and can work with it.
5. For cloud access via the panel, a corresponding request is made to the backend with the OIDC token.
6. The backend uses the OIDC token sent with the panel to obtain a Keystone token (KToken) from Keystone (at the cloud). A token exchange therefore takes place. The user could also go directly to the cloud with the OIDC token, e.g. via CLI tools or similar.
7. The Token Exchange Request against Keystone leads `to mod_auth_openidc` becoming active and validating the OIDC token (temporal validity, signature of the keycloak).
8. If the OIDC token is valid, `mod_auth_openidc` forwards the request including user attributes to Keystone, which issues and returns a Keystone token (KToken) for valid token data.
9. The backend sends the received KToken to the panel so that it can directly access the respective OpenStack services.
10. First, the Panel fetches the Keystone Service Catalog to know which OpenStack services are available.
11. When accessing other OpenStack services, the KToken is now used against the other OpenStack services.
12. The other services in turn validate the KToken against Keystone.
13. If it is valid, the requested requests are answered and access to the OpenStack services is completed.

If the KToken expires, the OIDC/Keystone Token Exchange (steps 6-8) must be executed again. Once the OIDC token has expired, the user must authenticate again to the keycloak.

![OpenStack Communication](assets/os-communication.png)

## Authentication & Authorization

## meshIdP

As OpenStack has to scope authorization to a specific project, the token from the meshIdB is also scoped to a specific project in the request. The project information can then be read from the **MC_PROJECTS** claim in the token provided by the meshIdB. OpenStack maps this attribute to a local Group associated with the project, that contains the previously mentioned roles.

Project Users get the following OpenStack roles:

- _member_
- heat_stack_owner
- creator

The actual access rights associated with these roles are managed by the OpenStack instance and are not part of meshStack.

More details about the User Federation with OpenStack can be found [here](meshstack.openstack.index.md).

## Enterprise IdP

You can directly integrate your company-wide IdP to OpenStack. This simplifies the integration with meshStack compared to the meshIdB integration that is explained above. Using the company-wide IdP must be enabled in meshStack for each affected OpenStack platform.

For example:

```dhall
...
let platformConfig =
      Platform.OpenStack::{
      ...
      , idp-provider = "aad"
      , idp-protocol = "openid"
      , federated-idp-enabled = True
      }
...
```

To enable the federatedIdp it's necessary to set the property 'federated-idp-enabled' to True within the dhall configuration.

In OpenStack you have to configure the company-wide IdP as described here [Federated Identity](https://docs.openstack.org/keystone/ussuri/admin/federation/federated_identity.html).

During replication, meshStack will make sure that users have access to the OpenStack projects they are assigned to in meshStack. Users will be assigned to the according groups (per meshProject) meshStack creates in OpenStack. If meshStack is about to assign a user that does not exist in OpenStack yet, meshStack will create this user with the according federatedIdP attributes and create the user in `MeshUsers` domain. That way once the user logs in via the IdP, he will be mapped to the user created by meshStack. If the user already exists in OpenStack during replication, meshStack will pick up this user to assign him to the according groups.

**Note** If federatedIdp is enabled, only the cli access screen will be available within the panel. All other OpenStack related screens are disabled, as personalized access from meshPanel to OpenStack is not possible with this integration approach at the moment.

**Note:** This mode is an alternative to the previously described meshIdB integration. And it will be the superior integration in future. The old one will be removed in future.
