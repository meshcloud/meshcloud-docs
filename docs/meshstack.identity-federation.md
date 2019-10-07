---
id: meshstack.identity-federation
title: Identity Federation
---

One of meshStacks main features is to provide single identities across multiple cloud and container platforms. Therefore, meshStack contains a full-featured **Identity Broker** (meshIdB) which consumes identities from company directories and adds authorization information for the specific cloud platforms.

Identity Federation enables enterprises to integrate corporate SSO systems at a single point (the **mesh Identity Broker**). meshStack then automatically ensures identity and authorization federation into all connected **Platform Instances** as depicted below by issuing tailored tokens for the meshProject in focus.

![meshStack SSO architecture](./assets/sso-architecture.png)

## Supported Technologies

The main supported technologies for Identity Federation with meshStack are

- LDAP
- Open ID Connect
- SAML
- Azure AD

meshStack supports the simultaneous integration of multiple [Enterprise Identity Providers (IdPs)](https://en.wikipedia.org/wiki/Identity_provider) at the Identity Broker. This allows operators to combine identities from different sources in the platform and unify management of multi-cloud access in meshStack.

## Requirements and Limitations

Integrators must be aware of the following requirements and limitations for IdPs which serve as identity sources for meshStack.

- IdP must provide
  - a stable and immutable user identifier (e.g. an OIDC `sub` claim)
  - a human-readable, unique username*
  - an email address
- IdP should provide name (first name, given name) information to improve user experience

> \* Please note that meshStack currently only offers limited support for propagation of changed usernames from IdPs.

## Configuration of federated IdP

### AD FS

Initially provide the URL of your AD FS to meshcloud, so a Identity Provider can be configured in the meshIdB. meshcloud will then provide a SAML descriptor URL, that can be used to configure AD FS.

With AD FS 3.0 (2012 R2) and newer, a Relying Party Trust must be created in AD FS. As OIDC Support is limited in AD FS 3.0, SAML should be used in that case and is described here. For newer AD FS versions you may also define an OIDC client, which is not part of this documentation.

In AD FS Management console, right-click "Trust relationships → Relying Party Trusts" and select "Add Relying Party Trust" from the menu. At the beginning of the wizard, enter the SAML descriptor URL that will be provided by meshcloud (it is individual per meshcloud installation) into the Federation metadata address field. Let AD FS import the settings. Proceed with the wizard, and adjust the settings where appropriate. Here we use only the default settings. Note that you will need to edit the claim rules so when asked to do so at the last page of the wizard, you can leave the checkbox checked on.

Now the SAML protocol would proceed correctly, AD FS would be able to correctly authenticate the users according to requests from Keycloak, but the requested name ID format is not yet recognized and SAML response would not contain any additional information like e-mail. It is hence necessary to map claims from AD user details into SAML document.
We will set up three rules: one for mapping user ID, second for mapping standard user attributes, and optionally third for a user group, if needed.

#### Rule for Mapping user ID¶

1. Open the `Edit Claim Rules` dialog.
2. In the `Add Transform Claim Rule` dialog, select `Transform an incoming claim`.
3. Map the following attributes:
    - `Name ID` as `rule name`
    - `Windows account name` for property `Incoming claim type`
    - `Name ID` for property `Outgoing claim type`
    - `Windows qualified Domain Name` for property `Outgoing name ID format`
4. Click Finish to add the rule.

#### Rule for Mapping the Attributes of the Standard User¶

1. Open the `Edit Claim Rules` dialog.
2. In the `Add Transform Claim Rule` dialog, select `Send LDAP attributes as Claims rule`.
3. Map the following attributes:
    - `E-Mail-Addresses` to `E-Mail Address`
    - `SAM-Account-Name` to `Subject Name`
    - Your LDAP attributes for `surname` and `given name`

#### Rule for Mapping AD groups¶

If meshcloud shall restrict access via certain AD groups, you can define another claim.

1. Start again in the `Edit Claim Rules` dialog.
2. Select `Send Group Membership as a Claim` rule type.
3. Usually two groups should be defined via this. They should result in Outgoing claim type `Group` with Outgoing claim values `meshUser` and `meshManager`. A `meshUser` can login to meshcloud and be invited to existing meshCustomers. A `meshManager` is allowed to create new `meshCustomers`.

### Azure AD

- Create a new App registration in AAD. You can choose a display name like `meshcloud SSO`. Define the redirect URI that will be provided by meshcloud. It is individual per meshcloud installation.
- Provide "Application (client) ID" and "Directory (tenant) ID", that is shown in the Overview screen of your new app registration, to meshcloud.
- Create a Client secret via "Manage -> Certficates & secrets". This secret must be provided to meshcloud.

## Concerns for High Availability

Identity Federation is designed for high-availability when the meshIdB is deployed in a redundant data-center HA setup. A potential loss of meshFed availability as the multi-cloud "control plane" is tolerable for the system. When configured correctly, users are still able to log in directly at cloud platform instances with the meshIdB and its optional upstream IdPs. Workload uptimes are never affected by outages of meshStack.

Please consult the platform-specific documentation for the required configuration.
