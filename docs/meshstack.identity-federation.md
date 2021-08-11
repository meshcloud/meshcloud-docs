---
id: meshstack.identity-federation
title: Identity Federation
---

One of meshStacks main features is to provide single identities across multiple cloud and container platforms. Therefore, meshStack contains a full-featured **Identity Broker** (meshIdB) which consumes identities from company directories and adds authorization information for the specific cloud platforms.

Identity Federation enables enterprises to integrate corporate SSO systems at a single point (the **mesh Identity Broker**). meshStack then automatically ensures identity and authorization federation into all connected **Platform Instances** as depicted below by issuing tailored tokens for the meshProject in focus.

![meshStack SSO architecture](./assets/sso-architecture.png)


## Federated Multi-Cloud Identities

meshStack enables multi-cloud identity federation so that end-users of the system like developers can access all their cloud environments using a single user identity. This allows enterprises to easily retain full control over identities and credentials.

The identity provisioning mechanism and the resulting federation setup depends on the type of cloud platform and its specific configuration. Please consult the respective platform's operator documentation for more configuration details.

### meshStack-provisioned Identities

In this mode meshStack provisions identities used in meshProjects on the respective cloud platform. The lifecycle of the identity is automatically managed via meshStack, including [revocation and deprovisioning](./meshstack.user-revocation.md). In this mode, identity federation involves the meshIdB and meshcloud can provide all necessary configuration and setup assistance.

### Externally-provisioned Identities

Some public cloud platforms like [Microsoft Azure](./meshstack.azure.index.md) or [Google Cloud Platform](./meshstack.gcp.index.md) feature their own directory services for cloud-based or hybrid user identities. Enterprises provision cloud identities by synchronizing an on-premise directory to the cloud. These setups are especially common for enterprises using Office 365 or Google G-Suite.

meshStack supports using user identities from these cloud directories for the resepective cloud [meshPlatform](./meshcloud.platforms.md). meshStack calls these **externally provisioned user identities** because provisioning and identity federation between on-premise and cloud-directory happens outside of meshStack. In order to use the right externally provisioned user identity when provisioning permissions, meshStack needs to map a federated user identity used in meshStack to its corresponding externally provisioned user identity. This mapping is based on the `external user id` or `euid` in short.

When using externally provisioned user identities, IdPs must also provide a stable and immutable `euid` claim or user property that is also present in the cloud directory. meshStack will use the `euid` to map identities from meshStack to their respective cloud identity. Most setups use an existing `email` or `username` property as the `euid`.

> Operators need to ensure that all user identities available to meshStack are also provisioned on the cloud platform.
> meshStack cannot provision permissions for user identities missing on the cloud platform. Failure to replicate permissions for externally provisioned user identities will be logged as replication warnings.

In this mode, identity federation does not involve the meshIdB. Platform Operators have to setup identity sync and federated authentication between the cloud platform and on-premise IdPs themselves.

## Concerns for High Availability

meshStack features a carefully designed high-availability architecture. A potential loss of meshStack availability as the multi-cloud "control plane" is tolerable for the "data plane" used by developers to authenticate and work with cloud platforms. This means that developers' work can continue uninterrupted while meshStack availability is restored. Only operations that modify desired state like managing cloud permissions via [meshProjects](./meshcloud.project.md) are temporarily unavailable in this case.

User can still authenticate and work with cloud platforms using [meshStack-provisioned identities](#meshstack-provisioned-identities), as long as the meshIdB is available. meshcloud therefore supports deploying the meshIdB in a data-center redundant HA setup.

Availability of the meshIdB does not affect cloud platforms using [externally-provisioned identities](#externally-provisioned-identities). These platforms can tolerate a full loss of meshStack availability.
