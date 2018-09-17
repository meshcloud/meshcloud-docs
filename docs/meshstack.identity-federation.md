---
id: meshstack.identity-federation
title: Identity Federation
---

Meshstack supports integration with common enterprise single-sign-on system infrastructures. Identity Federation enables enterprises to integrate corporate SSO systems at a single point (the **Mesh Identity Broker**). Meshstack then automatically ensures identity and authorization federation into all connected **Platform Instances** as depicted below.

```text
Enterprise IdP A --> Mesh IdB -> Meshfed ---> Platform Instance X
                  /                       \
Enterprise IdP B -                         -> Platform Instance Y
```

## Supported Technologies

The main supported technologies for Identity Federation with Meshstack are

- LDAP
- Open ID Connect
- SAML

## Requirements and Limitations

Integrators must be aware of the following requirements and limitations for Enterprise Identity Providers (IdPs) which serve as identity sources for the Meshcloud multi-cloud system.

- IdP must provide
  - a stable and immutable user identifier (e.g. an OIDC `sub` claim)
  - a human-readable, unique username*
  - an email address
- IdP should provide name (first name, given name) information to improve user experience

> \* Please note that meshstack currently only offers limited support for propagation of changed usernames from IdPs.

## Concerns for High Availability

Identity Fedeation is designed for high-availability and can be deployed in a redundant data-center HA setup. A potential loss of meshfed availability as the multi-cloud "control plane" is tolerable for the system. When configured correctly, users are still able to log in directly at cloud platform instances with the Mesh IdB and its optional upstream IdPs.

Please consult the platform-specific documentation for the required configuration.
