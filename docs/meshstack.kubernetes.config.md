---
id: meshstack.kubernetes.config
title: Configuration Reference
---

This section describes the configuration of a Kubernetes Platform Instance in the meshStack configuration model at `mesh.platforms`.

For easier reference the following sections break down the configuration model in multiple parts. The union of these defines the full configuration model.

## Core Configuration

The core configuration is the basic setup for Kubernetes. I

<!--snippet:mesh.platforms.kubernetes.core#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let KubernetesPlatformCoreConfiguration =
    {-
      platform:
        The meshPlatform identifier

      access-token:
        Access token of the Kubernetes Service Principal. For more information on how to create this
        principal with the correct access rights, please check the meshcloud Kubernetes documentation.

      base-url:
        The Base URL of the Kubernetes Cluster API.

      disable-ssl-validation:
        Disables SSL validation of the client. Advisable only for testing.

      aks:
        Add this part of the config if this is an AKS cluster.
    -}
      { platform : Text
      , access-token : Secret
      , base-url : Text
      , disable-ssl-validation : Bool
      , aks : Optional Aks
      }
```
<!--Example-->
```dhall
let example
    : KubernetesPlatformCoreConfiguration
    = { platform = "kubernetes.mylocation"
      , access-token = Secret.Native "ey*********"
      , base-url =
          "https://aks-meshcloud-ABCDEFGH.aaa.westeurope.azmk8s.io:443"
      , disable-ssl-validation = False
      , aks = None Aks
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## AKS Configuration

If this is an AKS cluster, please provide this part of the configuration as well.

<!--snippet:mesh.platforms.kubernetes.aks#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Aks =
    {-
      groupNamePattern:
        Users need a cluster access permission in Azure in order to get credentials. This property defines
        how the name of this AAD group is chosen.
        All the usual available replicator string template properties are available
        (see: http://docs.meshcloud.io/docs/meshstack.replication-configuration.html#string-templating) together
        with the additional property:

          1. platformGroupAlias (configurable via Landing Zone and can be used as a role name suffix)

      aksSubscriptionId:
        Azure Subscription ID that contains the AKS Cluster.

      aksResourceGroup:
        The name of the resource group the AKS cluster is placed in.
        Required to redirect users from meshPanel directly into their AKS cluster.

      aksClusterName:
        The name of the AKS cluster. Required to redirect users from meshPanel directly
        into their AKS cluster.

      redirectUrl:
        If users are invited (to get permissioned on the AKS cluster) into the AAD this is the invitation
        redirect link they see in their invitation mail (same as in the Azure platform configuration).

      sendAzureInvitationMail:
        Flag if invitation mails are send at all.

      servicePrincipal:
        Service principal of the replicator that is used to setup the Azure user permissions for the AKS cluster
        access.
    -}
      { groupNamePattern : Text
      , aksSubscriptionId : Text
      , aksResourceGroup : Text
      , aksClusterName : Text
      , redirectUrl : Text
      , sendAzureInvitationMail : Bool
      , servicePrincipal : ServicePrincipal
      }
```
<!--Example-->
```dhall
let example
    : Aks
    = { groupNamePattern = "aks-%s.%s-%4\$s"
      , aksSubscriptionId = "1234-1234-1234-1234"
      , aksClusterName = "aks-meshcloud-dev"
      , aksResourceGroup = "aks-meshcloud-dev"
      , redirectUrl = "https://example.com"
      , sendAzureInvitationMail = False
      , servicePrincipal =
        { aad-tenant = "example.onmicrosoft.com"
        , object-id = "655985db-ca43-4b9f-b317-9dd3d0289c50"
        , client-id = "2a51f406-27fd-4e40-8bd3-fe83ff934a47"
        , client-secret = Secret.Native "AZURE_CLIENT_SECRET"
        }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->