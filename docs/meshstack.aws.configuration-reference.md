---
id: meshstack.aws.configuration-reference
title: Configuration Reference
---

This section describes the configuration of an AWS Platform Instance in the meshStack configuration model at `mesh.platforms`.

```dhall
  λ(Secret : Type)
→ { platform :
      Text
  , region :
      Text
  , meshfedServiceUser:
  { accessKey : Secret
  , secretKey : Secret
  }
  , organizationRootAccountRole : Text
  , organizationRootAccountExternalId : Optional Text
  , automationAccountRole : Text
  , automationAccountExternalId : Optional Text
  {- Flag if the replicator should wait for an external AVM to finish. This is detected via Tags which should be placed on the account -}
  , waitForExternalAvm :
      Bool
  {-
    This role mappings are fully managed via meshstack. They are created if needed and
    also the polices listed are checked and attached.
    In order to do this the MeshfedAccountAccessRole needs write access to IAM roles.
   -}
  , roleMappingsManaged :
      List { mapKey : Text, mapValue : { awsRoleName : Text, policies : List Text } }
  {-
    The external role mappings are only checked against the SAML IDP setting. No policies are attached nor checked. It is assumed
    that an external source (e.g. an AVM) has assigned proper policies to them.
  -}
  , roleMappingsExternal :
        List { mapKey : Text, mapValue : { awsRoleName : Text } }
  , accountAccessRole :
      Optional Text
  , accountEmailPattern : Text
  , accountAliasPattern :
      Optional Text
  {-
    If set to true, then any existing account alias will be overwritten by the one determined in the accountAliasPattern. If set to
    false any existing account alias will be kept as it is and only be set if there is none at all.
  -}
  , enforceAccountAlias : Bool
  , enrollment-configuration : Optional EnrollmentConfiguration
  {-
    Specify if the role which is created by default in the newly provisioned account, which is assumed by meshStack to perform
    its tasks, should be downgraded automatically to the minimum required permissions. This is true by default.
  -}
  , self-downgrade-access-role : Bool
  }
```
