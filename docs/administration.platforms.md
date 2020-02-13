---
id: administration.platforms
title: Platform Operation
---

## Platform Notifications

Administrators can inform users about platform specific events (updates, new features, service disruptions, etc.) by creating platform
notifications:

- **Platforms**: Select the platforms relevant to your notification so they can be shown on the affected platform's dashboards. Users
  can also [subscribe](meshcloud.profile.md#profile) to notifications by platform and will receive new notifications via email.
- **Message**: The message that will be shown to all users.
- **Severity**: The type of message (info, warning, critical).
  - Info: for new features, upcoming services updates and general information that is not expected to disrupt platform operation
  - Warning: best used to inform about partial platform outages or problems that may occur for some users
  - Critical: appropriate in case of complete platform failures or impending platform downtimes
- **Show From**: The earliest time the message will be shown. You can use this to create messages that will only be shown on at a later date.
- **Show Until**: After this time the message will no longer be displayed.

## Restrict Platform Instances

Access to a specific platform can be restricted in the Administration Area via "Platforms" -> "Platform Instances". This feature is helpful
when a new meshPlatform shall be integrated, but initially only be visible to a few customers for integration testing.

To restrict the meshPlatform, go to the meshPlatform edit screen and search for the customers the platform shall be restricted to.
Add these customers via the *+* button.
