---
id: communication
title: Communications
---

> **Note:**  
> Communications are available in the Communication Center Light with the meshStack module **Developer Portal** and the **Developer Engagement** module.

Communications in meshStack provide a structured way to manage and deliver messages to users across different platforms and workspaces. Communications can be sent out by administrators via the admin area and platform engineers via the platform builder.

## Communication Center

The communication center is the central place for creating and managing communications to application teams within meshStack. It allows administrators and platform engineers to get in touch with application teams at scale and track progress.

### Module Capability Comparison

| Feature | Developer Portal "Light Version" | Developer Engagement "Full Version"|
|---|:---:|:---:|
| Communication Type Notification | ☑️ | ☑️ |
| Communication Type "Action Required" with due date and reminder | ⬜ | ☑️ |
| Communications Targeting a Workspace by name or Platform | ☑️ | ☑️ |
| Communications Targeting Workspaces by tag, Tenants and Building Blocks | ⬜ | ☑️ |
| Create communications via meshObject API | ⬜ | ☑️ |
| Message of the Day | ☑️ | ☑️ |
| Email Notifications about new Communications | ☑️ | ☑️ |
| Communication Section in Platform Builder | ☑️ (limited) | ☑️ |
| Communication Center in Admin Area | ☑️ | ☑️ |

## Communication Types

There are two main types of communications in meshStack:

1. **Notification**: Enables broadcasting of messages such as maintenance windows and new functionality. Notifications can be delivered through UI and email, and tailored to specific roles or application teams for maximum relevance and reduced noise.

2. **Action Required**: Automates assignment of actionable tasks including security reviews, access validation, and metadata accuracy checks. These tasks ensure compliance and accountability by embedding ownership directly into workflows, providing stakeholders with real-time visibility into progress and reducing manual tracking overhead. You can also assign a due date to the action required communication to ensure timely completion.

## Creating Communications

When creating a communication in meshStack, you have several options to configure how it's delivered to recipients.

### Skip Email Notifications

A checkbox option labeled "Skip email notifications to recipients" is available in the general information section when creating a communication. This feature allows you to control whether email notifications are sent to recipients.

**Default Behavior (Checkbox Unchecked)**
- Communications are created and visible in the panel
- Email notifications are sent to all recipients

**Skip Email Notifications (Checkbox Checked)**
- Communications are created and visible in the panel
- No email notifications are sent to recipients

**When to Use This Feature**

Skip email notifications when you want to:
- Create communications that are only visible in the panel
- Avoid sending additional email notifications when recipients may already be aware through other channels
- Manage communication visibility without generating email traffic

## Related Resources

- [How to Maintain Security Contacts with meshStack](../guides/developer-engagement/how-to-provide-security-contact.md)
- [How to Customize Emails in meshStack](../guides/developer-engagement/how-to-email-branding.md)
