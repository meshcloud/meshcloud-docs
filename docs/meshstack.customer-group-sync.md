---
id: meshstack.customer-group-sync
title: meshCustomer Group Synchronisation
---

meshStack auto-provisions user accounts when users sign in to meshStack using SSO from an Enterprise IdP. Additionally, meshStack supports importing users and groups objects into meshStack using **Identity Connectors**.
This type of import is useful if operators want fine-grained control over users and groups in meshStack
and automatically maintain [metadata tags](meshstack.tag-schema.md) on these objects based on
an authoritative source.

## Identity Connectors

A meshStack Identity Connector loads data from an identity source, applies transformation to create meshObjects and
then synchronizes those objects into meshStack via the [meshObject API](./meshstack.api.md#meshobject-api).

## Supported Sources

meshcloud currently provides an Identity Connector for LDAP. Further identity sources may be supported in the future.

## Configuration Reference - LDAP

 that supports the LDAP protocol, for example, Microsoft Active Directory. The [`Simple Paged Results Control`](https://www.ietf.org/rfc/rfc2696.txt) is used to do a paginated LDAP query to fetch the users and groups. Because of this, it is required that the LDAP server supports the `Simple Paged Results Control`. Other than importing users and groups, meshStack also has the capability to assign a [customer role](./meshcloud.customer.md#assign-meshcustomer-roles) or [partner role](./administration.index.md) to the imported group.


This section describes how to configure the LDAP group synchronization in meshStack.
For easier reference the following sections break down the configuration model in multiple parts.

<!--snippet:mesh.identityconnector.ldap-->

The following configuration options are available at `mesh.identityconnector.ldap`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let LdapConfiguration =
      { source : SourceConfiguration
      , collector : CollectorConfiguration
      , transform : TransformConfiguration
      , transport : TransportConfiguration
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Source Configuration

The basic parameters required to configure a connection to the source LDAP are as follows.

<!--snippet:mesh.identityconnector.ldap.source-->

The following configuration options are available at `mesh.identityconnector.ldap.source`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let SourceConfiguration =
    {-
      url:
          The LDAP connection URL, including the ldap protocol

      base:
          The base query from which all further searches should be performed

      username:
          The username of a technical user who can connect to the LDAP source to perform searches

      password:
          The password of the user above
    -}
      { url : Text, base : Text, username : Text, password : Secret }
```
<!--Example-->
```dhall
let example
    : SourceConfiguration
    = { url = "ldap://example.com:389"
      , base = "dc=meshcloud,dc=io"
      , username = "user"
      , password = Secret.Native "LDAP_PASSWORD"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Collector Configuration

The collector configuration what kind of data shall be collected from the source LDAP.
This configuration allows operators to retrieve any attributes required that shall be imported into meshStack.

<!--snippet:mesh.identityconnector.ldap.collector-->

The following configuration options are available at `mesh.identityconnector.ldap.collector`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let LdapFilter =
    {-
      attributes:
          A comma separated list of attributes that should be returned per LDAP entry.
          These attributes can later be used to populate the value of a meshObject field.

      base:
          The base from which the query should be performed.

      filter:
          A filter that follows the LDAP search filter format.
    -}
      { attributes : Text, base : Text, filter : Text }

let CollectorConfiguration =
    {-
      pageSize:
          The size of a single page that will be returned as a result of an LDAP search

      group:
          LdapFlter which will contain the information needed to search the LDAP source for groups.

      person:
          LdapFlter which will contain the information needed to search the LDAP source for users.
    -}

      { pageSize : Natural, group : LdapFilter, person : LdapFilter }
```
<!--Example-->
```dhall
let example
    : CollectorConfiguration
    = { pageSize = 100
      , group =
        { attributes = "cn, uniqueMember, description"
        , base = "ou=groups"
        , filter = "'(cn=*)'"
        }
      , person =
        { attributes = "entryDN, uid, sn, givenName, mail"
        , base = "ou=people"
        , filter = "'(uid=*)'"
        }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Transformation Configuration

The transform configuration describes how the collected data should be transformed into meshObjects
for import via the [meshObject API](./meshstack.api.md#meshobject-api).

<!--snippet:mesh.identityconnector.ldap.transform-->

The following configuration options are available at `mesh.identityconnector.ldap.transform`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let Transformation =
    {-
      mesh-object:
          The type of meshObject this configuration is about. Can be one of
          "MeshUser", "MeshCustomerUserGroup" or "MeshCustomerGroupBinding"

      fields:
          A list of configuration objects specifying which LDAP attribute gets mapped to which
          meshObject attribute, and whether any transformations should be done on the attribute before
          assigning it to the meshObject field.

      tags:
          Same as fields above, but for tags on the specified meshObject.
    -}
      { mesh-object : Text, fields : List Field, tags : List Field }

let TransformConfiguration =
    {-
      mesh-customer-group-members:
          The name of the LDAP attribute on an LDAP group entry which stores the list of group members.
          The members are expected to be seperated by a ";" character.

      mesh-user-ldap-dn:
          The name of the LDAP attribute on an LDAP user entry that is used to represent the user in the list
          of group members on an LDAP group entry. This must be a unique user identifier as it is used to lookup
          LDAP users that are members of an LDAP group.

      transformations:
          A list of Transformations to use for mapping LDAP entries to meshObjects.
    -}
      { mesh-customer-group-members : Text
      , mesh-user-ldap-dn : Text
      , transformations : List Transformation
      }
```
<!--Example-->
```dhall
let example
    : TransformConfiguration
    = let mkStatic =
          -- field: the meshObject field to set
          -- attribute: the LDAP attribute which is the source for the meshObject field value
              λ(field : Text)
            → λ(attribute : Text)
            → Field.Static
                { transformationType = "static"
                , field
                , attribute
                , postProcessor = None Text
                }

      let meshUserTransformation
          : Transformation
          =
            -- Creates a meshUser object by statically mapping LDAP attributes to meshUser object fields.
            -- The available LDAP attributes are controlled by the configuration setting
            -- `mesh.identityconnector.ldap.collector.person`
            { mesh-object = "MeshUser"
            , fields =
              [ mkStatic "metadata.name" "uid"
              , mkStatic "spec.email" "mail"
              , mkStatic "spec.firstName" "givenName"
              , mkStatic "spec.lastName" "sn"
              , mkStatic "spec.euid" "uid"
              ]
            , tags = [] : List Field
            }

      let meshCustomerUserGroupTransformation
          : Transformation
          =
            -- Creates a meshUser object by statically mapping LDAP attributes to meshUser object fields
            -- The available LDAP attributes are controlled by the configuration setting
            -- `mesh.identityconnector.ldap.collector.group`
            { mesh-object = "MeshCustomerUserGroup"
            , fields =
              [ mkStatic "metadata.name" "cn"
              , mkStatic "metadata.ownedByCustomer" "description"
              , mkStatic "metadata.displayName" "cn"
              , mkStatic "metadata.egid" "cn"
              , mkStatic "metadata.members" "uniqueMember"
              ]
            , tags = [] : List Field
            }

      let meshCustomerUserGroupBindingTransformation
          : Transformation
          =
            -- Creates a meshCustomerGroupBinding object by dynamically mapping an LDAP group name to a meshCustomer role.
            -- The available LDAP attributes are controlled by the configuration setting
            -- `mesh.identityconnector.ldap.collector.group`
            { mesh-object = "MeshCustomerGroupBinding"
            , fields =
              [ Field.Regex
                  { transformationType = "regex"
                  , field = "roleRef.name"
                  , attribute = "cn"
                  , rules =
                    [ { regex = ".*partner-admins\$"
                      , value = Some "Partner Admin"
                      }
                    ]
                  , postProcessor = None Text
                  , otherwise = Some "Customer Employee"
                  , template = None Text
                  }
              ]
            , tags = [] : List Field
            }

      in  { mesh-user-ldap-dn = "entryDn"
          , mesh-customer-group-members = "uniqueMember"
          , transformations =
            [ meshUserTransformation
            , meshCustomerUserGroupTransformation
            , meshCustomerUserGroupBindingTransformation
            ]
          }
```
<!--END_DOCUSAURUS_CODE_TABS-->

The Field configuration mentioned above has two possible forms. A basic form known as `BaseField` and a Field that performs
transformations on the matched attribute, called the `RegexField`. The `RegexField` is an extension of the `BaseField`.

> TODO: This needs examples

<!--snippet:mesh.identityconnector.ldap.baseField#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let BaseField =
    {-
      transformationType:
          One of "static" or "regex". Static transformation will simply take the LDAP attribute value.
          The regex transformation will perform extra operations on the matched value.

      field:
          The meshObject field that should be assigned the result of this field mapping.
          For example, "metadata.name"

      attribute:
          The LDAP attribute that should be processed. For example "cn"

      postProcessor:
          Any post processing function that should be run on the mapped value. Can be one of UPPERCASE or LOWERCASE
    -}
      { transformationType : Text
      , field : Text
      , attribute : Text
      , postProcessor : Optional Text
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:mesh.identityconnector.ldap.regexField#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let RegexField =
    {-
      rules:
          A list of regex rules that the LDAP attributes will be tested against for a match.
          The matching is performed sequentially until a match is found.

      template:
          An optional template where the extracted value should be inserted into.
          The format should follow the Java String.format contract.

      otherwise:
          An optional default value to be assigned if none of the rules match.
    -}
        BaseField
      ⩓ { rules : List RegexRule
        , otherwise : Optional Text
        , template : Optional Text
        }
```
<!--END_DOCUSAURUS_CODE_TABS-->

The RegexRule mentioned above is as follows.

<!--snippet:mesh.identityconnector.ldap.regexRule#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let RegexRule =
    {-
      value:
          This is an optional parameter. If it is defined, if the LDAP attribute matches the
          regular expression, this value will be assigned as the value of the meshObject field.

      regex:
          The regular expression against which the LDAP attribute should be matched. If the value parameter
          is not defined, the regular expression MUST contain a group and the first group will be assigned
          as the value of the meshObject field.
    -}
      { regex : Text, value : Optional Text }
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Transport Configuration

The transport configuration contains the information needed to call the meshObject API.

<!--snippet:mesh.identityconnector.ldap.transport-->

The following configuration options are available at `mesh.identityconnector.ldap.transport`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let TransportConfiguration =
    {-
      apiUser:
          A meshStack ApiUser used to authenticate against the meshStack API.

      chunkSize:
          The number of meshObjects to synchronize in a single API request.
          For typical meshStack implementations this should be between 10 and 100 objects.
    -}
      { apiUser : ApiUser, chunkSize : Natural }
```
<!--Example-->
```dhall
let example
    : TransportConfiguration
    = { chunkSize = 100
      , apiUser =
        { username = "identityconnectorapi"
        , password =
            Secret.Native "EXTERNAL_IDENTITYCONNECTOR_MESH_API_PASSWORD"
        , authorities = [ Authority.EXTERNAL_MESH_OBJECT_IMPORT ]
        }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


