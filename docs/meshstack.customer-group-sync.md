---
id: meshstack.customer-group-sync
title: meshCustomer Group Synchronisation
---

meshStack supports importing users and groups into meshStack from a source that supports the LDAP protocol, for example, Microsoft Active Directory. The [`Simple Paged Results Control`](https://www.ietf.org/rfc/rfc2696.txt) is used to do a paginated LDAP query to fetch the users and groups. Because of this, it is required that the LDAP server supports the `Simple Paged Results Control`. Other than importing users and groups, meshStack also has the capability to assign a [customer role](./meshcloud.customer.md#assign-meshcustomer-roles) or [partner role](./administration.index.md) to the imported group. The entities read via LDAP are imported to meshStack via the [meshObject import API](./meshstack.api.md#meshobject-api). At the moment, we only support the import of three kinds of meshObjects: meshUser, meshGroup and meshCustomerGroupBinding. The other meshObjects, such as meshProjectUserBindings can be created via the panel.

## Configuration Reference

This section describes how to configure the LDAP group synchronization in meshStack.

The synchronization process is done in three parts.

* Collect
* Transform
* Transport

### Collect

In the "Collect" step, we connect to the LDAP server and fetch the LDAP entities. In order to do that,
the configuration needs to contain the information required to establish a connection with the LDAP server.
The configuration model is as follows.

<!--snippet:mesh.identityconnector.ldap.SourceConfiguration#type-->


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


You also have to specify the filters that should be used when fetching users and groups from the LDAP server.
Additionally, using the pageSize configuration parameter, specify the number of LDAP entities we should request in a single call to the server.

<!--snippet:mesh.identityconnector.ldap.collectorConfiguration#type-->


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
          LdapFilter which will contain the information needed to search the LDAP source for groups.

      user:
          LdapFilter which will contain the information needed to search the LDAP source for users.
    -}

      { pageSize : Natural, group : LdapFilter, user : LdapFilter }
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
      , user =
        { attributes = "entryDN, uid, sn, givenName, mail"
        , base = "ou=people"
        , filter = "'(uid=*)'"
        }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Transform

In the Transform step, the collected data is transformed into meshObjects.

An `AttributeTransformation` will specify an LDAP attribute and how to transform it before assigning to a meshObject field.

<!--snippet:mesh.identityconnector.ldap.attributeTransformation#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let AttributeTransformation =
    {-
      An AttributeTransformation is used to define an attribute of an LDAP entry and how to transform it so that it
      can be assigned to a field in a meshObject. There are two types of AttributeTransformations, Static and Regex.
    -}
      < Static : StaticAttributeTransformation
      | Regex : RegexAttributeTransformation
      >
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### StaticAttributeTransformation

<!--snippet:mesh.identityconnector.ldap.staticAttributeTransformation#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let StaticAttributeTransformation =
    {-
      A StaticAttributeTransformation simply takes an attribute and applies an optional postProcessor on it.

      attribute:
          The LDAP attribute that should be processed. For example "cn"

      postProcessor:
          Any post processing function that should be run on the mapped value. Can be one of UPPERCASE or LOWERCASE
    -}
      { attribute : Text, postProcessor : Optional PostProcessor }
```
<!--Example-->
```dhall
let example =
      { attribute = "cn", postProcessor = Some PostProcessor.LOWERCASE }
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### RegexAttributeTransformation

<!--snippet:mesh.identityconnector.ldap.regexAttributeTransformation#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let RegexAttributeTransformation =
    {-
     A RegexAttributeTransformation takes an attribute and matches the attribute against a list of regular expressions
     until a match is found. If a match is found and the rule defines a value, the value will be used. If a value is not
     set, the first matching group in the regular expression is used and the optional template is applied. If no
     regular expressions match, the otherwise value will be assigned to the meshObject field.

      rules:
          A list of regex rules that the LDAP attributes will be tested against for a match.
          The matching is performed sequentially until a match is found.
          A single rule has the following structure
          value:
              This is an optional parameter. If it is defined and if the LDAP attribute matches the
              regular expression, this value will be assigned as the value of the meshObject field.
          regex:
              The regular expression against which the LDAP attribute should be matched. If the value parameter
              is not defined, the regular expression MUST contain a group and the first group will be assigned
              as the value of the meshObject field.

      template:
          An optional template where the extracted value should be inserted into.
          The format should follow the Java String.format contract.

      otherwise:
          An optional default value to be assigned if none of the rules match.
    -}
        StaticAttributeTransformation
      ⩓ { rules : List { regex : Text, value : Optional Text }
        , otherwise : Optional Text
        , template : Optional Text
        }
```
<!--Example-->
```dhall
let example =
    {-
      The following example takes the 'cn' attribute and if the attribute matches the first rule,
      will assign whatever follows the "MESHCLOUD-ROLE-" as the value of the meshObject field. If the attribute matches
      the second rule, will assign the value "Platform Operator" and if none of the rules match, assigns the
      value "Customer Employee".
    -}
      { attribute = "cn"
      , postProcessor = None PostProcessor
      , rules =
        [ { regex = "MESHCLOUD-ROLE-(.+)", value = None Text }
        , { regex = "MESHCLOUD-OPERATOR"
          , value = Some "Platform Operator"
          }
        ]
      , template = None Text
      , otherwise = Some "Customer Employee"
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### LDAP entities to meshObjects transformation

Using AttributeTransformations, you can specify how to transform LDAP entities into meshObjects as follows.

<!--snippet:mesh.identityconnector.ldap.transformConfiguration#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let UserAttributesTransformations =
    {-
      distinguishedNameAttribute:
          The 'distinguished name' attribute key for a user entity in LDAP. This attribute value should match the users
          referred to in the 'members' attribute of the groupAttributesTransformations.

      name, email, firstName, lastName, euid
          For each of these meshUser fields, specify which LDAP attribute should be transformed and assigned to the field.

      tags:
          How to tag the meshUser object.
          Specify the tag keys and for each key, which LDAP attribute should be transformed and assigned as the tag value.
    -}
      { distinguishedNameAttribute : Text
      , name : AttributeTransformation
      , email : AttributeTransformation
      , firstName : AttributeTransformation
      , lastName : AttributeTransformation
      , euid : AttributeTransformation
      , tags : List TagMapping
      }

let GroupAttributesTransformations =
    {-
      distinguishedNameAttribute:
         The 'distinguished name' attribute key for a user entity in LDAP. This attribute value should match the users
         referred to in the 'members' attribute of the groupAttributesTransformations.

      name, ownedByCustomer, displayName, egid
         For each of these meshUser fields, specify which LDAP attribute should be transformed and assigned to the field.

      tags:
         How to tag the meshUser object.
         Specify the tag keys and for each key, which LDAP attribute should be transformed and assigned as the tag value.
    -}
      { membersAttribute : Text
      , name : AttributeTransformation
      , ownedByCustomer : AttributeTransformation
      , displayName : AttributeTransformation
      , egid : AttributeTransformation
      , tags : List TagMapping
      }

let GroupBindingAttributesTransformations =
    {-
      roleName:
        Specify which LDAP attribute should be transformed and assigned to the 'roleName' field of the meshCustomer user group
    -}
      { roleName : AttributeTransformation }

let TransformConfiguration =
    {-
       Specifies how LDAP entities should be transformed into meshObjects.
       There are three types of meshObjects that are imported. meshUsers, meshCustomerUserGroups
       and meshCustomerGroupBindings.

       userAttributesTransformations:
         Specifies how an LDAP user entity should be transformed into a meshUser.


       groupAttributesTransformations:
         Specifies how an LDAP group entity should be transformed into a meshCustomer user group.

        groupBindingAttributesTransformations:
          Specifies how a meshCustomerGroupBinding meshObject should be constructed from an LDAP group entity.

    -}
      { userAttributesTransformations : UserAttributesTransformations
      , groupAttributesTransformations : GroupAttributesTransformations
      , groupBindingAttributesTransformations :
          GroupBindingAttributesTransformations
      }
```
<!--Example-->
```dhall
let example
    : TransformConfiguration
    = { userAttributesTransformations =
        { distinguishedNameAttribute = "dn"
        , name =
            AttributeTransformation.Static
              { attribute = "cn", postProcessor = None PostProcessor }
        , email =
            AttributeTransformation.Static
              { attribute = "mail", postProcessor = None PostProcessor }
        , firstName =
            AttributeTransformation.Static
              { attribute = "givenName"
              , postProcessor = None PostProcessor
              }
        , lastName =
            AttributeTransformation.Static
              { attribute = "sn", postProcessor = None PostProcessor }
        , euid =
            AttributeTransformation.Static
              { attribute = "cn", postProcessor = None PostProcessor }
        , tags = [] : List TagMapping
        }
      , groupAttributesTransformations =
        { membersAttribute = "member"
        , name =
            AttributeTransformation.Static
              { attribute = "cn"
              , postProcessor = Some PostProcessor.LOWERCASE
              }
        , ownedByCustomer =
            AttributeTransformation.Regex
              { attribute = "cn"
              , postProcessor = None PostProcessor
              , rules =
                [ { regex = "ADMIN-GROUP-.+"
                  , value = Some "default-partner"
                  }
                , { regex = "GROUP-TEAM-(.+)", value = None Text }
                ]
              , template = None Text
              , otherwise = None Text
              }
        , displayName =
            AttributeTransformation.Static
              { attribute = "cn", postProcessor = None PostProcessor }
        , egid =
            AttributeTransformation.Static
              { attribute = "dn", postProcessor = None PostProcessor }
        , tags =
          [ { tagKey = "environment"
            , transformation =
                AttributeTransformation.Regex
                  { attribute = "cn"
                  , postProcessor = Some PostProcessor.LOWERCASE
                  , rules =
                    [ { regex = ".*-([A-Z]+)", value = None Text } ]
                  , template = Some "mesh-%s"
                  , otherwise = Some "mesh-dev"
                  }
            }
          ]
        }
      , groupBindingAttributesTransformations.roleName
        =
          AttributeTransformation.Regex
            { attribute = "cn"
            , postProcessor = None PostProcessor
            , rules =
              [ { regex = "MESHCLOUD-ADMIN-.*"
                , value = Some "Partner Admin"
                }
              , { regex = "MESHCLOUD-OPERRATOR-.*"
                , value = Some "Platform Operator"
                }
              ]
            , template = None Text
            , otherwise = Some "Customer Employee"
            }
      }
```
<!--END_DOCUSAURUS_CODE_TABS-->


### Transport

The `Transport` configuration contains the parameters needed to call the meshObject API.

<!--snippet:mesh.identityconnector.ldap.transportConfiguration#type-->


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


### Combined Configuration

The above configuration models are combined as follows to create the complete configuration.
<!--snippet:mesh.identityconnector.ldapConfiguration#type-->


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
