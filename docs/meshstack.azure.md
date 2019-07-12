---
id: meshstack.azure
title: Azure
---

The usual procedure to realize a SSO at Azure is to synchronize a local Active Directory (AD) to Azure (Azure Active Directory, AAD). This is done by using
[Azure Active Directory Connect (AD Connect)](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect). When the AAD is populated it is used to grant
users access to the [Azure Portal](https://portal.azure.com).

We currently support two scenarios for connecting the meshStack authentication to Azure:

1. Use AAD as an Upstream IDP. With this solutions the users will be able to login into the meshPanel automatically
2. Synchronize the AAD users with the IDP (Keycloak) used by meshStack (users will need to enter their password at the Azure portal).

Depending on whether your organization has an active enterprise enrollment or not meshStack is able to automatically generate subscription for each project. If you dont have such an enrollment you can still create empty subscriptions up front. These pre-created subscriptions will then be picked and assigned to a project if it gets replicated.

After the subscriptions have been created or picked, depending on the configured landing zone, a [Blueprint](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview) will be assigned to your subscription. With this you can control exactly how your resources should be used and enforce very specific company rules.

> If you need a specialized way of mapping projects to Azure please [contact us](mailto:support@meshcloud.io).

## Integration Overview

If your company does not have an active Azure Enterprise Enrollment you will need
To enable integration with Azure, operators need to deploy and configure the meshStack Azure Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.Azure`. This makes Azure available to meshProjects like any other cloud platform in meshStack.

If configured correctly the meshStack entities are mapped like this:

| meshcloud    | Azure                                                                             |
| ------------ | --------------------------------------------------------------------------------- |
| meshProject  | Subscription                                                                      |
| meshCustomer | Account, (Account can currently contain multiple customers and their meshProjects |
| meshUser     | AD User                                                                           |

## IDP Configuration

### Azure Upstream IDP

> Currently there is no documentation to setup Azure as an upstream IDP with meshstacks Keycloak. Please [contact us](mailto:support@meshcloud.io).

### Synchronized AAD

Please make sure that all users who need access to the Azure Portal are replicated into the AAD. If you have an on premise Active Directory this is usually done via [Azure Active Directory Connect (AD Connect)](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect).

As soon as the users are synced in the meshStack Keycloak server you must enter a [user attribute](https://www.keycloak.org/docs/latest/server_admin/index.html#user-attributes) called 'external user id' (the attribute name in Keycloak is `euid`). Use the mail address of the user in Azure as this `euid`. This attribute is needed to match up the Azure and meshStack users.

## Azure Configuration

In order to start the setup please make sure the following exist:

1. An Azure account ([you can create one if it does not exist](https://azure.microsoft.com/en-us/features/azure-portal/)).
2. An enterprise enrolllment account or a few subscriptions which can be assigned to projects getting replicated.

### Azure Setup

#### Enterprise Enrollment Step

If you want to programatically create subscriptions you need to grant this access to the service principal. Please follow the [documentation of Microsoft](https://docs.microsoft.com/en-us/azure/azure-resource-manager/grant-access-to-create-subscription) how to grant this right.

> Subscriptions, even when created via a granted Service Principal will always pop up in the home tenant of the user who is part of the enrollment account. To make sure the subscriptions end up in the right tanant, please invite the user first into the target account and then grant him the right via the enrollment account for subscription creations.

With this user the principal created in the next step can get assigned the necessairy rights.

#### Service Principal Setup

In order to allow the meshFed to access and replicate the Azure user there needs to be a way to access the AAD. This is done via a Service
Principal (which is basically an app). The app must be authorized in the scope of the AAD.

1. Under **Azure Active Directory** &rarr; **App registrations** create a new web app (call it e.g. meshReplicator).
2. Add an client secret under **Certificates &amp; secrets** and write it down (it is the `SERVICE_PRINCIPAL_CLIENT_SECRET`).
3. Add the `Directory.ReadWriteAll`, `Group.ReadWriteAll` and `User.Read` permission and click **Grant permissions**. You will also need to grant admin consent to your app. Therefore click **Grant admin consent** in the permissions screen.
4. Go to the App overview and write down the following: **Application (client) ID** (`SERVICE_PRINCIPAL_CLIENT_ID`), **Directory (tenant) ID** (`AAD_TENANT`) and the **object id** (`SERVICE_PRINCIPAL_OBJECT_ID`).

In order to assign blueprints the replicator needs the service principal id of the `Azure Blueprints` app which is different in every tenant. In order to find it the easiest way is to start an Azure cloud shell and execute the following command:

```powershell
PS Azure:\> Get-AzureRmADServicePrincipal -ApplicationId f71766dc-90d9-4b7d-bd9d-4499c4331c3f
```

The response should be similar to

```powershell
ServicePrincipalNames : {f71766dc-90d9-4b7d-bd9d-4499c4331c3f}
ApplicationId         : f71766dc-90d9-4b7d-bd9d-4499c4331c3f
ObjectType            : ServicePrincipal
DisplayName           : Azure Blueprints
Id                    : 227ac22a-************
```

Write down the Id as this is the `AZURE_BLUEPRINT_PRINCIPAL`.

The App must also have owner access to all [management groups](https://docs.microsoft.com/en-us/azure/governance/management-groups/) as this layer is used to assign [Blueprints](https://docs.microsoft.com/en-us/azure/governance/blueprints/overview). Please follow the Microsoft doucmentation to grant yourself (you will need a `Global Admin` role for this) access to the root Management Group and assign the RBAC `Owner` role to the just created service principal app.

### meshStack Setup

With the information we gathered in the above section we now can configure the Azure Replicator. To enable the replication the meshFed Azure replicator needs the platform instance configuration as a .yml file.

To configure the replicator without an enterprise enrollment, use the following example configuration:

```yml
replicator-azure:
  platforms:
    - platform: azure.meshcloud-azure-dev
      # This is the ID of the "Azure Blueprint" service principal which must be known beforehand.
      blueprint-service-principal: <AZURE_BLUEPRINT_PRINCIPAL>
      # https://docs.microsoft.com/en-us/rest/api/blueprints/assignments/createorupdate#assignmentlockmode
      blueprint-lock-assignment: "AllResourcesReadOnly"
      blueprint-location: "westeurope"
      service-principal:
        aad-tenant: <AAD_TENANT> # Either friendly domain name or your tenants GUID
        object-id: <SERVICE_PRINCIPAL_OBJECT_ID>
        client-id: <SERVICE_PRINCIPAL_CLIENT_ID>
        client-secret: <SERVICE_PRINCIPAL_CLIENT_SECRET>
      provisioning:
        # You can configure multiple owners of the created/assigned subscriptions. Enter the object IDs of the
        # subscription owners.
        subscription-owner-object-ids:
          - <SUB_OWNER_OBJECT_ID>
        pre-provisioned:
          # Unused subscriptions must begin with this name
          unused-subscription-name-prefix: mesh
      role-mappings:
        # The mesh project role is mapped to an Azure role. You can enter the role which should be assigned for the
        # user holding this meshProject roles.For more information about Azure roles see
        # https://docs.microsoft.com/bs-latn-ba/azure/role-based-access-control/built-in-roles
        admin: b24988ac-6180-42a0-ab88-20f7382dd24c # magic GUID for contributor
        user: acdd72a7-3385-48ef-bd42-f606fba81ae7  # magic GUID for reader
```

If you want to use a enterprise enrollment creating new subscriptions, just leave out the `unused-subscription-name-prefix: mesh` option.
