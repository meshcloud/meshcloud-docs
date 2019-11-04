---
id: meshstack.configuration
title: Configuration
---

meshcloud will typically operate your meshStack installation as a [managed service](./meshstack.managed-service.md) for you. As a managed service, all configuration and validation is done by meshcloud. Nonetheless, we make references to configuration options in the documentation so that operators get a better understanding of meshStack's capabilities. The configuration references also simplify examples and communicating the exact parameters that may need to be supplied by platform operators (e.g. Service Principal credentials).

meshcloud configures your meshStack installation using a [dhall](https://dhall-lang.org/) configuration model. As part of meshcloud's managed service, customers get access to their configuration in a git repository. This is also useful for communicating about configuration options.

The configuration documentation will occasionally also make references to [YAML](https://en.wikipedia.org/wiki/YAML) configuration options. These will be replaced with `dhall` models in the next releases.

## Global Configuration Options

### Identifiers

meshStack can restrict legal identifiers for [meshCustomers](./meshcloud.customer.md) and [meshProjects](./meshcloud.project.md). This is useful to ensure projects can be identifiers are compatible with all connected cloud platforms and don't require additional name mangling to comply with cloud specific naming rules.

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

### Customer Invite Link for Administrators

The link can be enabled or disabled by setting this config key. For more invormation about this invite link see [invite links](administration.customers.md#invite-customer-via-link).

```yaml
web:
  register:
    allow-partner-invite-links: true
```


