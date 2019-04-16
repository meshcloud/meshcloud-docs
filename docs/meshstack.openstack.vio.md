---
id: meshstack.openstack.vio
title: VMware Integrated OpenStack
---

## Integration

VWmare Integrated OpenStack (VIO) platforms can be integrated like regular OpenStack installations.
For newer versions of VIO (at least 5.1), some aspects can be configured using `viocli`, which is the process described here.

### VIO Cli

To configure basic identity federation with OpenStack we need to provide a mapping file.
Save the following content in a file (i.e. `mapping.json`) on the host where `viocli` is configured.

```json
[
  {
    "remote": [
      {
        "type": "OIDC-sub"
      },
      {
        "type": "OIDC-preferred_username"
      },
      {
        "type": "OIDC-MC_CUSTOMER"
      },
      {
        "blacklist": [
          "admins"
        ],
        "type": "OIDC-MC_PROJECTS"
      }
    ],
    "local": [
      {
        "user": {
          "domain": {
            "name": "{2}"
          },
          "id": "{0}",
          "name": "{1}"
        }
      },
      {
        "domain": {
          "name": "{2}"
        },
        "groups": "{3}"
      }
    ]
  }
]
```

User input for the initial configuration with `viocli` is displayed after the `:`, default values in square brackets:

```sh
viouser@localhost:~$ sudo viocli federation identity-provider add --type oidc
Identity provider type (Keystone, SAML2, vIDM, OpenID) [keystone]: OpenID
Identity provider name []: meshfed
Identity provider display name (for Horizon) []: meshfed
Description []:
Do you wish to use URL or local file for OpenID Connect Provider metadata, or enter the Provider details manually? (url, file, input) [url]: url
OpenID Connect Provider metadata URL []: https://sso.example.meshcloud.io/auth/realms/meshfed/.well-known/openid-configuration
Enter the response type for OpenID Connect [id_token]: id_token token
Enter the scope for OpenID Connect [openid email profile]:
Enter the client ID for OpenID Connect []: meshfed-oidc
Enter the client secret for OpenID Connect:
Do not verify certificates when establishing TLS/SSL connections [False]: False
Do you wish to use a static file or template file for mapping rules? (static, template) [static]:
Enter the local path of mapping rules file: /home/viouser/mapping.json
Do you wish to enable OAuth API workflow for this provider? [yes]: no
Do you wish to use a static file or template file for OAuth mapping rules? (static, template) [static]:
Enter the local path of OAuth mapping rules file: /home/viouser/mapping.json
Enter the name of the domain that federated users associate with [Default]:
Enter the name to the groups that federated users associate with (separated by commas ",") []: __federated__
```

Apply the configuration changes in the usual way:

```bash
viouser@localhost:~$ sudo viocli identity configure -p --verbose
```

Since OpenID integration is still very new to VIO, the automatic configuration is incomplete and requires additional steps to complete.


### Keystone

The following steps need to be taken on all hosts running Keystone.

Append these lines to `/etc/keystone/keystone.conf`:

```conf
[federation]
remote_id_attribute = OIDC-iss
```


### Keystone Apache

Keystone uses Apache to handle some aspects of the OpenID authentication, which is why we need to change the configuration in `/etc/apache2/sites-available/keystone.conf`. Please note, that we only change settings in the section beginning with `<IfModule auth_openidc_module>`.

```apache
<IfModule auth_openidc_module>
  # Preserve these settings from the original
  OIDCCacheType memcache
  OIDCMemCacheServers xxx.xxx.xxx.xxx:11211

  # Replace remaining settings in this section with these
  OIDCCryptoPassphrase "********"
  OIDCClaimPrefix "OIDC-"
  OIDCResponseType "id_token token"
  OIDCScope "openid email profile"
  OIDCProviderMetadataURL https://sso.example.meshcloud.io/auth/realms/meshfed/.well-known/openid-configuration
  OIDCClientID meshfed-oidc
  OIDCIDTokenIatSlack 3600
  OIDCOAuthIntrospectionTokenParamName access_token
  OIDCOAuthVerifyJwksUri https://sso.example.meshcloud.io/auth/realms/meshfed/protocol/openid-connect/certs

  OIDCRedirectURI /v3/OS-FEDERATION/identity_providers/meshfed/protocols/openid/auth/redirect
  <Location /v3/OS-FEDERATION/identity_providers/meshfed/protocols/openid/auth>
      AuthType oauth20
      Require valid-user
  </Location>

  OIDCRedirectURI /v3/auth/OS-FEDERATION/identity_providers/meshfed/protocols/openid/websso/redirect
  <Location /v3/auth/OS-FEDERATION/identity_providers/meshfed/protocols/openid/websso>
      AuthType openid-connect
      Require valid-user
  </Location>
</IfModule>
```

Apply these changes and restart Keystone/Apache.
