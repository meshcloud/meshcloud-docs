---
id: meshstack.azure
title: Azure
---

Integrating Azure into the meshStack means that the user and project management gets simplified by a unified replication over all available cloud platforms. The users will be able
to access their assigned Azure resources via a Single Sign On (SSO) service provided by meshStack.

The usual procedure to realize a SSO at Azure is to synchronize a local Active Directory (AD) to Azure. This is done by using
[Azure Active Directory Connect (AD Connect)](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/whatis-azure-ad-connect). But in this scenario realizing a multi
cloud approach is hard. Therefore we follow a different path and use our external Identity Provider to grant access to Azure. By doing this we are able to seamless integrate every workflow.

## Integration Overview

To enable integration with Azure, operators deploy and configure the meshStack Azure Replicator. Operators can configure one or multiple `PlatformInstance`s of `PlatformType.Azure`. This makes Azure available to meshProjects like any other cloud platform in meshStack.

If configured correctly the meshStack entities are mapped as described in the following table:

| meshcloud        | Azure                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| PlatformInstance | Subscription (currently)                                                    |
| meshProject      | Resource Group                                                              |
| meshCustomer     | Account, but the Account can currently contain multiple customer projects.  |
| meshUser         | AD User                                                                     |

Currently, all meshProjects are mapped to a single Subscription per `PlatformInstance`. This is subject to change as we extend the Azure support.

The meshIdB provides SSO to Azure via SAML. The use of an external IDP in combination with Azure is [documented by Microsoft](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-fed-saml-idp).

Deleting a meshUser from the project is currently (begin of February 2019) not yet implemented.

## Integration Steps

### IDP Configuration

In order to integrate with [meshStack Identity Federation](./meshstack.identity-federation.md), operators need to configure the Meshstack Identity Broker as an [federated SAML IDP](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-fed-saml-idp) using the following steps. The steps are based on the provided documentation from Microsoft, but some
steps are misleading and/or incomplete. So stick to the steps in this document and refer to the [official documentation](https://docs.microsoft.com/en-us/azure/active-directory/hybrid/how-to-connect-fed-saml-idp) if additional information is needed.

1. Create a new SAML Client as described in the official documentation. It is possible to use the Azure SAML Metadate file as starting point. Please check if the signature algorithm is set to SHA-1 after the import.
2. Add a mapper which will map the `azure-email` user attribute to `IDPEmail`.

### Azure Configuration

In order to start the setup please make sure the following exist:

1. An Azure account ([you can create one if it does not exist](https://azure.microsoft.com/en-us/features/azure-portal/)).
2. Add a valid Subscription to the account and remember the Subscription ID (e.g. `0688c9ba-183b-49d3-a3a5-98735b3702df`)

#### Domain Setup

1. Make sure at least one Azure Active Directory (Azure AD) exists. If not create one:
   1. Click on **Create a resource**.
   2. Search for `Azure Active Directory`.
   3. Click on **Create**.
   4. Give a meaningful name and add the domain name you own and which you want to have federated.
2. In the **Azure Active Directory** menu under **Custom domain names** you can add a custom domain, which is not necessairy but the users of the domain which is
   put into federation mode won't be able to access the panel via the usual username/password login. That means if you want to have access for people with `john.doe@meshcloud.io`
   via username password (or Active Directory access) you need an additional domain like for example `msh.io` to use it as the federated one.
3. Verify the domain you have chosen via a DNS text entry.

> The Federated Domain accounts wont be able to login via username/password. This users must rely on the external IDP server to allow access.

#### Federate Domain

1. In order to switch the domain into federation mode download the
   [MSOnline PowerShell module](https://docs.microsoft.com/en-us/powershell/azure/active-directory/overview?view=azureadps-1.0). The successor AD Connect won't work.
2. Call `Connect-MssolService` and login with your Azure account and password. If this fails and the tools complains about a wrong username/password you probably need to create another
   Azure AD user via the meshPanel. Put this user in **Global Administrator** mode. After the federation was setup the user can be deleted again. You must first
   login into the panel via this newly created user because the password needs to be reset. After you set a permanent password you can login via CLI with this user.
3. In order to setup the federated mode you need to find the signing certificate for the Keycloak IDP server and set it into a shell variable. You will find
  this certificate under **Realm Settings &rarr; Keys &rarr; Certificate**
4. After this the command is as follows:

```powershell
$MySigningCert = @"
MIICnTCCAYUCBgFa3Tm/dTANBgkqhkiG9...
...X6dDBuCmcg5S9jd3wzfu3GoEgMwc+aw==
"@

Set-MsolDomainAuthentication -DomainName msh.host -Authentication Federated \
-IssuerUri https://<IDP_URL>/auth/realms/meshfed \
-FederationBrandName msh.host \
-PassiveLogOnUri https://<IDP_URL>/auth/realms/meshfed \
-LogOffUri https://<IDP_URL>/federated-auth/logout \
-ActiveLogOnUri https://<IDP_URL>/auth/realms/meshfed \
-SigningCertificate $MySigningCert -PreferredAuthenticationProtocol SAMLP
```

> Calling `Set-MsolDomainAuthentication` again to correct some parameter does not work. In order to do so you must first put the domain back into managed mode
> via ```Set-MsolDomainAuthentication -DomainName meshcloud.io -Authentication Managed```.
> After this a new call of `Set-MsolDomainAuthentication` with different options is possible.

#### Service Principal

In order to allow the meshFed to access and replicate the Azure user there needs to be a way to access the Subscription. This is done via a Service
Principal (which is basically an app). The app must be authorized in the scope of the subscription.

1. Under **Azure Active Directory** &rarr; **App registrations** create a new web app (call it e.g. meshSync).
2. Add an client secret under **Certificates &amp; secrets** and write it down.
3. Add the `Directory.ReadWriteAll` permission and click **Grant permissions**.

The App must also have access to the Subscription you plan to use. The easiest way is to add the app to the Subscription as well. This grant the necessairy rights. In the Azure
Portal follow these steps:

1. Under **Subscriptions** &rarr; **Access control (IAM)** click on **Add a role assignment**.
2. Search for the name of the app you created earlier (meshSync) and select it.
3. Grant the role **Owner** to the app

### meshStack Configuration

To enable the replication the meshFed Azure replicator needs the platform instance configuration as a .yml file. A possible configuration could look like this:

```yml
replicator-azure:
  platforms:
    - platform: azure.meshcloud-azure-dev
      clientId: <APP_CLIENT_UUID>
      secret: "<APP_CLIENT_SECRET>"
      applicationTennant: meshcloud.io # This is the Azure AD tenant ID
      federatedActiveDirectoryDomain: msh.host # Federated Domain
      region: West US # The region where the Resource Groups will be created
      subscription: <SUBSCRIPTION_UUID>

```

## Current Limitations

- Logout in the Azure Panel is currently not possible. You need to logout from the meshPanel.
- All Projects in one Azure location are mapped in a single Subscription. As a workaround multiple Azure locations could be registered. This will be changed soon.