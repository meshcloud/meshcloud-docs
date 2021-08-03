---
id: meshstack.identifiers
title: Identifiers
---

Objects in meshcloud can have three kinds of properties used to refer to them.

- **ID**: An immutable id, unique in space and time, e.g. `123`.
- **Identifier**: An immutable id, unique in space. Drawn from a reduced character set, e.g. `my-project`.
- **Name/Display Name**: A mutable display string to be used for display purposes e.g. `My Project`

meshStack can restrict legal identifiers for [meshCustomers](./meshcloud.customer.md) and [meshProjects](./meshcloud.project.md). This is useful to ensure projects can be identifiers are compatible with all connected cloud platforms and don't require additional name mangling to comply with cloud specific naming rules. You can configure these options in `meshfed.web.restriction` as follows:

```dhall
{ customerIdentifierLength :
    Optional Natural
, projectIdentifierLength :
    Optional Natural
, projectIdentifierPrefix :
    Optional Text
, projectNamePrefix :
    Optional Text
, envIdentifier :
    Optional Text
}
```
