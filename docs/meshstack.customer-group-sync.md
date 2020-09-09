---
id: meshstack.customer-group-sync
title: meshCustomer Group Synchronisation
---

meshStack supports importing users and groups into meshStack from a source that supports the LDAP protocol, for example, Microsoft Active Directory. The [`Simple Paged Results Control`](https://www.ietf.org/rfc/rfc2696.txt) is used to do a paginated LDAP query to fetch the users and groups. Because of this, it is required that the LDAP server supports the `Simple Paged Results Control`. Other than importing users and groups, meshStack also has the capability to assign a [customer role](./meshcloud.customer.md#assign-meshcustomer-roles) or [partner role](./administration.index.md) to the imported group. The entities read via LDAP are imported to meshStack via the [meshObject import API](./meshstack.api.md#meshobject-api).

## Configuration Reference

This section describes how to configure the LDAP group synchronization in meshStack.
For easier reference the following sections break down the configuration model in multiple parts. The union of these
defines the full configuration model.

The basic parameters required to configure the connection to LDAP are as follows.

<!--snippet:mesh.identityconnector.ldap.core#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let ConnectionConfiguration =
    {-
      url: The LDAP connection URL which would be of the form ldap://example.com:389
      base:
          The base from which searches should be performed, which would be of the form "dc=meshcloud,dc=io"
      username: The username of the user who can connect to the LDAP source to perform searches
      password: The password of the user above
    -}
      { url : Text, base : Text, username : Text, password : Secret }
```
<!--END_DOCUSAURUS_CODE_TABS-->

The configuration related to the collection of data via LDAP is as follows.

<!--snippet:mesh.identityconnector.ldap.collector#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{-
  pageSize: The size of a single page that will be returned as a result of an LDAP search
  group/person:
    a configuration of type LDAPFilter which will contain the information needed to search the LDAP source
    for users and groups.
-}
  let CollectorConfiguration =
        { pageSize : Natural, group : LdapFilter, person : LdapFilter }

  in  CollectorConfiguration
```
<!--END_DOCUSAURUS_CODE_TABS-->

The LdapFilter mentioned above has the following form.

<!--snippet:mesh.identityconnector.ldap.filter#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{-
    attributes:
        A comma separated list of attributes that should be returned per LDAP entry.
        For example, "cn, uniqueMember, description"
    base: The base from which the query should be performed. For example, "ou=groups"
    filter: A filter that follows the LDAP search filter format. For example, "'(cn=mc*)'"
-}
  let LdapFilter = { attributes : Text, base : Text, filter : Text }

  in  LdapFilter
```
<!--END_DOCUSAURUS_CODE_TABS-->


The following configuration describes how the collected data should be transformed into meshObjects.
<!--snippet:mesh.identityconnector.ldap.transformation#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let TransformationConfiguration =
    {-
    mesh-object:
      The type of meshObject this configuration is about. Can be one of
      MeshUser, MeshCustomerUserGroup or MeshCustomerGroupBinding
    fields:
      A list of configuration objects specifying which LDAP attribute gets mapped to which
      mesh object attribute, and whether any transformations should be done on the attribute before
      assigning it to the meshObject field.
    tags: Same as fields above, but for tags on the specified meshObject.
    -}
      { mesh-object : Text, fields : List Field, tags : List Field }
```
<!--END_DOCUSAURUS_CODE_TABS-->

The Field configuration mentioned above has two possible forms. A basic form known as `BaseField` and a Field that performs
transformations on the matched attribute, called the `RegexField`. The `RegexField` is an extension of the `BaseField`.

<!--snippet:mesh.identityconnector.ldap.baseField#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{-
    transformationType:
       One of static or regex. Static transformation will simply take the LDAP attribute value.
       The regex transformation will perform extra operations on the matched value.
    field:
       The meshObject field that should be assigned the result of this field mapping.
       For example, "metadata.name"
    attribute:
       The LDAP attribute that should be processed. For example "cn"
    postProcessor:
       Any post processing function that should be run on the mapped value. Can be one of UPPERCASE or LOWERCASE
-}
  let BaseField =
        { transformationType : Text
        , field : Text
        , attribute : Text
        , postProcessor : Optional Text
        }

  in  BaseField
```
<!--END_DOCUSAURUS_CODE_TABS-->

<!--snippet:mesh.identityconnector.ldap.regexField#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{-
    rules:
        A list of regex rules that the LDAP attributes will be tested against for a match. The matching is performed
        sequentially until a match is found.
    template:
        An optional template where the extracted value should be inserted into. The format should follow the Java String.format
        contract.
    otherwise: A optional default value to be assigned if none of the rules match.
-}
  let RegexField =
          BaseField
        ⩓ { rules : List RegexRule
          , otherwise : Optional Text
          , template : Optional Text
          }

  in  RegexField
```
<!--END_DOCUSAURUS_CODE_TABS-->

The RegexRule mentioned above is as follows.

<!--snippet:mesh.identityconnector.ldap.regexRule#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{-
    value:
        This is an optional parameter. If it is defined, if the LDAP attribute matches the
        regular expression, this value will be assigned as the value of the meshObject field.
    regex:
        The regular expression against which the LDAP attribute should be matched. If the value parameter
        is not defined, the regular expression MUST contain a group and the first group will be assigned
        as the value of the meshObject field.
-}
  let RegexRule = { regex : Text, value : Optional Text } in RegexRule
```
<!--END_DOCUSAURUS_CODE_TABS-->

The transport configuration contains the information needed to call the meshObject API.

<!--snippet:mesh.identityconnector.ldap.transport#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let TransportConfiguration = { apiUser : ApiUser, chunkSize : Natural }
```
<!--END_DOCUSAURUS_CODE_TABS-->


The above configuration models are combined as follows to create the complete configuration.
<!--snippet:mesh.identityconnector.ldap.#type-->


<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let LdapConfiguration =
        ConnectionConfiguration
      ⩓ { collector : CollectorConfiguration
        , transform :
            { mesh-user-ldap-dn : Text
            , mesh-customer-group-members : Text
            , transformations : List TransformationConfiguration
            }
        , transport : TransportConfiguration
        }
```
<!--END_DOCUSAURUS_CODE_TABS-->
