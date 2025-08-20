---
id: new-guide-how-to-branding
title: How to Branding
---

> This guide is also available as an [interactive demo](https://app.storylane.io/share/5jjhgbmxckib).

:::note What Is This Guide About?
This guide explains how to customize email notifications in meshStack to reflect your organization’s brand identity. Custom branding helps establish trust and recognition with your users.
:::

## Challenge

Your organization is launching an Internal Developer Platform (IDP) using meshStack. To encourage adoption and maintain a consistent, professional image, the platform team needs all email notifications to reflect the organization’s unique brand identity.

## Prerequisites

- Access to meshPanel with admin permissions.

## Step-by-Step Guide

1. **Navigate to Email Branding Settings**
   - In **meshPanel**, go to **Settings → Appearance → Email**.

2. **Configure Email Identity**
   - Set **Internal Name** to `Likvid Developer Platform`.  
     _This will appear as the "From" name in emails._
   - Enable **Prefix internal name to all email subjects**.  
     _All emails will start with “Likvid Developer Platform” for consistency._
   - Set **Sender Email Address** to `likvid-developer-platform@likvidbank.com`.
   - Set **Reply-To Email Address** to `likvid-developer-platform@likvidbank.com`.

3. **Apply Brand Visuals**
   - Set the **Email Header Logo** to:  
     ![Likvid Logo](https://raw.githubusercontent.com/likvid-bank/likvid-cloudfoundation/1e5d5e9b99c105060d10bc604c0cf8f1aafef414/kit/foundation/meshstack/guides/likvid_logo.png)
   - Set the **Button Color** to **Likvid Bank Blue** (`#0072C6`).
   - Set the **Button Text** to `Open Likvid Developer Platform`.

4. **Set Email Signature**
   - Use the following signature:
     ```
     Best regards,
     The Likvid Developer Platform Team

     Need help? Reach us at <a href="mailto:likvid-developer-platform@likvidbank.com">likvid-developer-platform@likvidbank.com</a>
     ```

5. **Preview and Save**
   - Preview the email template on the right side of the screen.
   - Click **Save** to apply your changes.

## Related Resources

- [Communications](new-concept-communication.md)