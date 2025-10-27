---
id: email
title: Email
---
 
For all email based communication (e.g. for [workspace registration](../settings/self-service-onboarding.md#workspace-registration)
or [workspace user invitations](../settings/self-service-onboarding.md#workspace-user-invitations)) meshStack will use the configured SMTP server.

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

-}
  { enabled : Bool
  , username : Text
  , host : Text
  , port : Natural
  , sender : { address : Text, reply-to : Optional Text }
  , smtp :
      { ssl : { enable : Bool }, starttls : { enable : Bool }, auth : Bool }
  }
```
<!--END_DOCUSAURUS_CODE_TABS-->

## FAQ

### Which mails is meshStack sending out and to whom?

Application Team receive mails when

- Workspace created
- Workspace permissions created, updated or removed
- Project permissions created, updated or removed
- Project Payment Method Assignment missing
- Budget exceeded
- Executing Building Block succeeded

Platform engineers receive mails when

- Building Block requires input (Recipients are defined per Building Block definition)

Optionally meshStack sends out mails to fixed set of recipients configured in dhall when

- Tenant marked for deletion
- Tenant created
- Replication failed

### Can the style of the mails be influenced? For example via HTML?

Yes you can do this completely yourself via the Admin Area. To learn more read [How to Brand Emails sent by meshStack](../guides/developer-portal/how-to-email-branding.md).

### Can BCC be added

No. meshStack does not support adding addresses on BCC.
