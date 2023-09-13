---
id: meshstack.email
title: Email
---
 
For all email based communication (e.g. for [workspace registration](./meshstack.onboarding.md#workspace-registration)
or [workspace user invitations](./meshstack.onboarding.md#workspace-user-invitations)) meshStack will use the configured SMTP server.

> Tip for enterprise meshStacks: you can configure a custom e-mail footer by creating an object in the `messages` configuration below using mapKey `mail.footer`.
> Any valid HTML can be set as a value here. Contact your customer success team to get it set up.

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
        logo:
            href:
                Location of the logo file

            url:
                Url that the image links to

        button-color:
            Color hex code for buttons

        messages:
            List of mappings to configure template messages

-}
  { enabled : Bool
  , username : Text
  , host : Text
  , port : Natural
  , sender : { address : Text, reply-to : Optional Text }
  , smtp :
      { ssl : { enable : Bool }, starttls : { enable : Bool }, auth : Bool }
  , theme : { logo : { href : Text, url : Text }, button-color : Text }
  , messages : List { mapKey : Text, mapValue : Text }
  }
```
<!--END_DOCUSAURUS_CODE_TABS-->
