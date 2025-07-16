---
id: meshstack.customizing
title: Customizing
---

meshStack allows Partners to customise the user experience according to the needs of their organisation.

## Message of the Day

Partners can configure an optional "message of the day" to be displayed in meshPanel.
This is useful to communicate important information such as newly available cloud platforms or known issues to every user visiting meshPanel.

Note that platform engineers can also use [platform notifications](administration.platforms#platform-notifications) as an alternative to target messages only at users that consume a specific cloud platform.

<!--snippet:mesh.panel.environment.motd-->

The following configuration options are available at `mesh.panel.environment.motd`:
<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
let MessageOfTheDay =
    {-
        message:
            The "message of the day" message you want to display. This can also include html tags.
            The "message of the day" message is shown on the home screen of meshPanel for anonymous as well
            as authenticated users.

        startTime:
            The date and time after which to begin showing the message.
            Must be a JavaScript Date.parse() compatible string.

        endTime:
            The date and time after which to stop showing the message.
            Must be a JavaScript Date.parse() compatible string.
    -}
      { message : Text, startTime : Text, endTime : Text }
```
<!--Example-->
```dhall
let example
    : Optional MessageOfTheDay
    = Some
        { message =
            "The Likvid Bank Cloud Foundation Team wishes you a meshi <a href=\"https://en.wikipedia.org/wiki/Christmas\">Christmas</a>."
        , startTime = "2019-12-23 00:00"
        , endTime = "2019-12-27 00:00"
        }

let exampleNoMessage
    : Optional MessageOfTheDay
    = None MessageOfTheDay
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Customizable Payment Method Validation

As every organization has its unique accounting and cost allocation processes, it is possible to alter several aspects of the payment method functionality. For payment methods that are of the type 'COST_CENTER', the configuration below provides customization for this type of payment method (configuration is stored under `panel.ui.costCenter`)

<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{
    {- An alias for the definition 'cost center' that your organization might use. }
    alias : Text

    {- A custom RegEx pattern that validates the user's input. }
  , validationPattern : Text

    {- The error message that should be displayed when the user's input does not match the validationPattern. }
  , validationErrorMsg : Text
}
```
<!--Example-->
```dhall
{
    alias = "ACME Center"
  , validationPattern = "\\d{6}"
  , validationErrorMsg = "You entered an invalid ACME Center number, this should be exactly six digits."
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

Additionally, there is the configuration for the payment methods of type 'COST_LIMITATION'. This can be found under `panel.ui.costLimitation`

<!--DOCUSAURUS_CODE_TABS-->
<!--Dhall Type-->
```dhall
{
    {- Alias(es) for the list of payment method settings that are stored as key-value pairs. This is useful for
       creating more human readable text values of certain payment method settings inside the meshPanel. }
    aliases : List { mapKey : Text, mapValue : Text }
}
```
<!--Example-->
```dhall
{
    aliases =
    [ { mapKey = "costCenter", mapValue = "ACME Cost Center" }
    , { mapKey = "anotherValue", mapValue = "Some custom value" }
    ]
}
```
<!--END_DOCUSAURUS_CODE_TABS-->


## Customizable Descriptions

Depending on your meshStack implementation, it may be helpful for you to customize error descriptions to guide
end-users towards resolving common problems in self-service. meshStack therefore provides the following configuration
options in `panel.ui`.

> Note: You can use sanitized HTML in all of these settings. This is useful to create links and apply minimal formatting.

```dhall
{
    {- Generic error message displayed when meshPanel can't connect to backend services. Configure this if users need to e.g. use a certain VPN or browser with CAs pre-installed.-}
    connectivityError : Text
    {- Displayed when users are required to sign in before registering in self-service. Configure this to explain users which IDP/Credential they need to provide -}
  , idpRegister : Optional Text

    {- Displayed when users are required to sign in before accepting an invite. Configure this to explain users which IDP/Credential they need to provide -}
  , idpAcceptCustomerUserRoleRequest : Optional Text
    {- Displayed in when users provide a cost center that's already used by another meshStack workspace. Configure this e.g. to encourage users to register only one meshWorkspace per cost center. -}
  , duplicateCostCenter : Optional Text
    {- Display a configurable confidentiality label in the meshPanel navbar, e.g. "internal" or "secret". -}
  , confidentialityLevel : Optional Text
    {- Display a notification that users accept platform ToS when they create a meshProject. Configure this if you need to inform end-users about custom ToS that apply to cloud platforms available in your meshStack implementation.. -}
  , platformTermsNote : Optional Text
}
```
