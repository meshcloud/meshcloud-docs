---
id: meshstack.email
title: Email
---
 
For all email based communication (e.g. for [customer registration](./meshstack.configuration.md#customer-registration) or [customer user invitations](./meshstack.configuration.md#customer-user-invitations)) meshStack will use the configured SMTP server.

<!--snippet:mesh.meshfed.mail-->

The following configuration options are available at `mesh.meshfed.mail`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{-
    The configured smtp mail server is used by meshfed to
    send out notifications.

    enabled:
        If True, meshfed will send out mails.

    username:
        Username meshfed uses to log in at SMTP server.

    password:
        Password meshfed uses to log in at SMTP server.

    host:
        SMTP server address that meshfed connects to.

    port:
        The port that the SMTP server listens on.

    sender:
        address:
            Address that is shown as "sender"
        reply-to:
            Address that is shown as "replyTo"

    smtp:
        ssl:
            If True, enables SSL encryption (must be supported by SMTP server)

        starttls:
            If True, enables STARTTLS encryption (must be supported by SMTP server)

        auth:
            If True, enables authentication (must be supported by SMTP server)

    theme:
        show-social:
            If True, adds configured social icons to email messages

        logo:
            href:
                Location of the logo file

            url:
                Url that the image links to

        bg-color:
            Color hex code for background

        div-color:
            Color hex code for div-containers

        messages:
            List of mappings to configure template messages

-}
  { enabled : Bool
  , username : Text
  , password : Secret
  , host : Text
  , port : Natural
  , sender : { address : Text, reply-to : Optional Text }
  , smtp :
      { ssl : { enable : Bool }, starttls : { enable : Bool }, auth : Bool }
  , theme :
      { show-social : Bool
      , logo : { href : Text, url : Text }
      , bg-color : Text
      , div-color : Text
      }
  , messages : List { mapKey : Text, mapValue : Text }
  }
```
<!--END_DOCUSAURUS_CODE_TABS-->
