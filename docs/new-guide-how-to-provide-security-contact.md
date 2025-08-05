---
id: new-guide-how-to-provide-security-contact
title: How to Maintain Security Contacts with meshStack
---

:::note What Is This Guide About?
This guide shows you how to maintain up-to-date security contact information in platforms using meshStack. You'll learn how to automate reminders and ensure your incident management process always reaches the right people.
:::

## Challenge

Maintaining accurate and up-to-date security contact information is critical for effective incident management and automated security responses. Security contacts are typically shared inboxes or ticketing systems rather than individual users, which means there is no direct mapping to meshStack users. Workspace owners need a reliable process to regularly review and update these contacts to ensure timely communication during security incidents.

## Prerequisites

- You have admin access to meshStack and permission to manage tags and communications.
- You have the Developer Portal and Developer Engagement module enabled.

## Step by Step Guide

:::tip
For a hands-on walkthrough, check out the interactive demo on Storylane: [View the Interactive Demo](https://app.storylane.io/share/hzzabrqbgthk).
:::

### 1. Tag Workspaces with Security Contact

- Create a custom tag (e.g., `SecurityContact`) in meshStack.
- Assign this tag to each workspace, using an email address or ticketing system inbox as the value.

### 2. Request Updates via Communication Center

- Use meshStack’s Communication Center to send an “Action Required” message to all workspace owners.
- Ask them to review and update the `SecurityContact` tag for their workspaces.
- Use the reporting features to track which workspaces have responded and updated their contact information.

### 3. Notifications

- Workspace owners receive automatic email notifications and see reminders in meshPanel.
- This ensures requests to update security contacts aren’t missed.

## Related Resources

### Concepts

- [Tag Concept](new-concept-tag)
- [Communication Center](new-concept-communication)

### Guides

- [How to Manage Tags](new-guide-how-to-manage-tags.md)
