---
id: meshstack.ldap-identity-import
title: LDAP Identity Import
---

meshStack supports importing users and groups into meshStack from a source that supports the LDAP protocol, for example, Microsoft Active Directory. The `Simple Paged Results Control` is used to do a paginated LDAP query to fetch the users and groups. Because of this, it is required that the LDAP server supports the `Simple Paged Results Control`. Other than importing users and groups, meshStack also has the capability to assign a [customer role](./meshcloud.customer.md#assign-meshcustomer-roles) to the imported group. The entities read via LDAP are imported to meshStack via the [meshObject import API](./meshstack.api.md#meshobject-api).
