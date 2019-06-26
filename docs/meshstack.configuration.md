---
id: meshstack.configuration
title: Configuration
---

Here you can find an overview of the possible configuration values in order to customize your meshStack installation.

The configuration is done via a [YAML file](https://en.wikipedia.org/wiki/YAML) which is provided when the app starts.

## Registration

### Customer Invite Link for Administrators

The link can be enabled or disabled by setting this config key. For more invormation about this invite link see [the documentation](administration.customers.md#invite-customer-via-link).

```yaml
web:
  register:
    allow-partner-invite-links: true
```


