---
id: copilot-preview
title: meshStack Copilot Preview
---

This page describes important terms and limitations for our meshStack Copilot preview.

meshStack Copilot isn't generally available yet; however, we're offering a public preview to all meshStack customers. This document provides information about the preview.

## How to use meshStack Copilot

For step-by-step instructions on how to enable and use meshStack Copilot, see our [How to use meshStack Copilot guide](meshstack.how-to.copilot.md).

## How does Copilot work?

meshStack Copilot works by analyzing your question and feeding it, along with any relevant meshStack data you have access to, into a large language model to provide an answer. Your platform team can configure and customize the prompts that meshStack Copilot uses.

meshStack Copilot automatically enriches your questions by providing additional context, like the users current workspace, available building block definitions and other context data to the model. All conversations with meshStack Copilot, including all data provided to the model, are recorded and stored locally in your meshStack. Your platform team can review them for evaluation and auditing.

## What are the limitations of the Preview?

When using meshStack Copilot, please keep in mind:

- It's a preview feature, so responses might sometimes be inaccurate or incomplete.
- The results are suggestions, not final answers.
- We might rate-limit requests per user to ensure fair usage and performance for everyone.
- We're constantly improving it and your feedback is valuable. Please reach out to us with any feedback!

The meshStack Copilot Preview is available in all meshStacks. If you're running a [meshStack SaaS on-prem](meshstack.managed-service.md#meshstack-saas-on-prem), you might need some extra configuration to enable it. Just reach out to our Customer Success team for more information.

Also, let us know if you're interested in "bring your own model" (or API key) support. This would let you use meshStack Copilot with models under your own contract.

## Which AI model providers do you use for Copilot?

meshStack Copilot currently uses Google Gemini models hosted by Google Cloud in the EU. This means your questions are processed by Google Cloud, acting as a subprocessor of meshcloud. For more details, see our official [subprocessor list in the Security FAQ](faq.md#subprocessors).

We're curious to hear if you’d like to see “bring your own model” (or API key) support so you can use meshStack Copilot with models under your own contract.

## What data does Copilot have access to?

meshStack Copilot is designed to be a context-aware assistant that helps you with tasks like understanding your platform or generating documentation. To do this well, it needs access to the same data and knowledge a human colleague would reference.

| **Data Category** | **Why meshStack Copilot needs it** |
| -- | -- |
| **User info (name, email)** | To personalize responses and only give you access to permitted data. |
| **Marketplace Catalog metadata** | To answer questions about platform services. |

We'll expand this list as we add new capabilities to meshStack Copilot.

Remember, all conversations are recorded and stored locally in your meshStack for your platform team to review and audit.

## Will my data be used for training models?

During the preview phase, you agree to share conversation transcripts with us so we can evaluate meshStack Copilot's performance. We won't keep any data shared with us during the preview after meshStack Copilot becomes generally available. For more details, see [Who has access to meshStack Copilot conversation transcripts?](#who-has-access-to-meshstack-copilot-conversation-transcripts) below.

We have contractual provisions with our subprocessors to ensure any data you share with meshStack Copilot will not be used for training models or evaluating model performance.

Of course, we’re always happy if you can share individual conversations with us to help us improve meshStack Copilot. If you have a conversation where meshStack Copilot didn't meet your expectations, you can share it with us through the usual support process.

## Does meshStack Copilot process any Personal Identifiable Information (PII)?

meshStack Copilot interacts with data from your meshStack, so it may access users' *First Names*, *Last Names*, and *Email Addresses*.

Additionally, meshStack Copilot gets access to what you share in the chat, which may include PII.

## Who has access to meshStack Copilot conversation transcripts?

Users with the [Organization Admin role](administration.index.md) can access the transcripts of their organization.

During the Beta phase, our engineering team will have access to conversation data to help us improve meshStack Copilot. We'll only use this data to improve the Copilot code and system prompts.

**We recommend sharing this documentation with anyone who has meshStack Copilot enabled in their meshStack.**

## How long are conversation transcripts retained?

All conversations with meshStack Copilot, including all data provided to the model, are recorded and stored locally in your meshStack. There's no specific retention period.

Note: We're planning a feature that will allow admins to delete conversations.
