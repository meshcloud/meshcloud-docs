---
id: meshstack.azure.index
title: Integration
---

meshStack can automatically provision Azure Subscriptions or Resource Groups as Tenants for [meshProjects](./meshcloud.project.md) and configure them according to your organiziations policies
using [Landing Zones](./meshcloud.landing-zones.md).

## Integration Overview

To enable integration with Azure, operators configure one or multiple `meshPlatform`s of `PlatformType` Azure in the [Platform Administration](./administration.platforms.md) in meshPanel.

Azure relies on Azure Active Directoy (AAD) for authentication and authorization. meshcloud can seamlessly integrate with common
setups like [Azure Hybrid Identity](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/). meshcloud helps you implement Azure in line with [Governance best-practices](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/govern/governance-disciplines) by integrating [Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) and Management Groups using [Landing Zones](#landing-zones)

In order to plan and execute a successful integration of Azure using meshcloud, organizations need to consider the following parts described in the sections below.

## Azure Active Directory Integration

All subscriptions in Azure must be associated with exactly one AAD Tenant storing role and permission assignments. Azure uses this AAD Tenant to evaluate permissions on all resources contained in that subscription. meshcloud manages roles and assignments
by automatically replicating [meshProject Role Assignments](./meshcloud.project.md) to this AAD Tenant.

However, a key decision in any Azure integration is how your organization wants to provision user identities in this AAD Tenant. For best practices on setting up your AAD, check out our [Cloud Foundation](https://cloudfoundation.meshcloud.io/maturity-model/iam/federated-identity-and-authentication.html#azure-active-directory) website for typical implementations.

> **Recommendation**: Because meshcloud requires read-write permissions to your Azure Active Directory to manage user roles on Azure Subscriptions, we recommend creating a separate **"Workload AAD Tenant"** to be exclusively used by meshcloud. Our orchestration engine then creates Guest Users in the meshcloud AAD Tenant that reference user identities from the "home tenant" (AAD B2B). This way, users have a single cloud identity managed by your organization-wide policies while isolating "workload" related Azure activies into its own AAD Tenant which has no way of affecting other applications using the home tenant like Office 365 etc.

### Considerations

#### Managed Users

All users who need access to the Azure Portal should be synced in the AAD managed by meshcloud.

> meshcloud will issue a [replication](./meshcloud.tenant.md) warning for projects that have role assignments that cannot be replicated because a user identity could not be found on the home tenant.

#### External User Ids (euid)

Using [externally-provisioned user identities](./meshstack.identity-federation.md#externally-provisioned-identities) requires your IdP to provide a user identifier suitable to locate user identities
in the "home tenant". This external user id needs to be mapped to the `euid` user attribute in the [meshIdB](./meshstack.identity-federation.md).

It is important that the provided euid's are **case-sensitive** and must match the user entries saved in the AAD against which the replication should happen! This is a limitation imposed by the search queries of Microsoft Graph API.

> meshcloud can support complex Azure AD setups involving user identity lookup rules and multiple home tenants. Please contact our experts for more details.

#### Licensing

Users managed in the meshcloud AAD Tenant do not require AAD Premium Licenses.

## How to integrate Azure as a meshPlatform into meshStack

This is described in the Guide section under [How to integrate a meshPlatform into meshStack](meshstack.how-to.integrate-meshplatform.md).

## Azure Resource Groups

The regular Azure integration uses Subscription based meshTenants. However, there might be reasons you do wish to use Resource Groups as the meshTenant representation in your setup. Often legacy setups use this
organizational structure. It might also be helpful if your company does not yet have a Microsoft Enterprise Agreement. A requirement for automatic Subscription creation.
In the Azure Resource Group integration, every meshTenant will lead to a Resource Group generation inside a fixed parent Subscription. User access is granted via user groups bound to these Resource Groups.

The integration is very similar to the regular Azure setup. More information can be found in the Guide section under [How to integrate a meshPlatform into meshStack](meshstack.how-to.integrate-meshplatform.md).
