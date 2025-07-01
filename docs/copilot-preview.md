---
id: copilot-preview
title: meshStack Copilot Preview
---

This page describes important terms and limitations for enabling meshStack Copilot preview in your meshStack.

meshStack Copilot is not yet generally available, however, meshcloud is offering a public preview of meshStack Copilot to all meshStack customers. This document provides information about the preview.

## How to use meshStack Copilot

For step-by-step instructions on enabling and using meshStack Copilot, see the [How to use meshStack Copilot guide](./how-to.copilot.md).

## How does Copilot work?

meshStack Copilot works by analyzing the user’s question and feeds the question and any relevant meshStack data that the user has access to into a large language model to produce an answer. Platform teams can configure and customize the prompts that meshStack Copilot uses to answer questions. 
meshStack can enrich user queries by providing additional context data like building block definitions to the model. All conversations made with meshStack Copilot, including all data provided to the model, will be recorded and stored locally in your meshStack and can be reviewed by the platform team for evaluation and auditing.
You can restrict user’s access to meshStack Copilot in Admin Area → Settings → meshStack Copilot. 


## What are the limitations of the Preview?

When using meshStack Copilot, keep in mind that

- meshStack Copilot is a preview feature and responses may sometimes be inaccurate or incomplete
- meshStack Copilot results are suggestions, not final answers
- We may rate-limit the number of requests per user to ensure fair usage and performance for all users
- We're constantly improving it, and your feedback is valuable. So please reach out to us if you have feedback

meshStack Copilot Preview is available in all meshStacks. If you are running a [meshStack SaaS on-prem](./meshstack.managed-service.md#meshstack-saas-on-prem), enabling meshStack Copilot may require additional configuration. Please reach out to our Customer Success team for more information. Please also let us know if you are interested in "bring your own model" (or API key) support so you can utilise meshStack Copilot with models under your own contract.

## Which AI model providers are used for Copilot?

meshStack Copilot currently uses Google Gemini models hosted by Google Cloud. This means your queries are being processed by Google Cloud as a subprocessor of meshcloud, as we have made transparent in our subprocessor list. 
We are curious to hear from you if you’d like to see “bring your own model” (or API key) support so you can utilise meshStack Copilot with models under your own contract.

## What data does Copilot have access to?

meshStack Copilot is designed to be a context-aware assistant that can help users with tasks like understanding your platform or generating documentation. To do this well, it needs access to the same data and knowledge a human colleague would reference.

| **Data Category** | **Why meshStack Copilot needs it** |
| -- | -- |
| **User info (name, email)** | Personalizes responses and only gives access to permitted data |
| **Marketplace Catalog metadata** | Answers questions about platform services |


This list will be extended when we add new capabilities to meshStack Copilot.
All conversations made with meshStack Copilot, including all data provided to the model, will be recorded and stored locally in your meshStack and can be reviewed by the platform team to audit transmitted data.


## Will the data shared with meshStack Copilot be used for training models?

During the beta phase you agree to sharing conversation transcripts with meshcloud for the purpose of evaluating meshStack Copilot performance. Any data shared with meshcloud during the Beta phase will not be retained by meshcloud once meshStack Copilot becomes generally available. Please see “Who has access to meshStack Copilot conversation transcripts?” for more information below.
Any data that you share with meshStack Copilot will not be used for training models or evaluating model performance by our subprocessors. 
Of course we’re always happy if you can share individual conversations with us to help us improve meshStack Copilot. If you want to share a conversation with us where meshStack Copilot did not meet your expectations yet, you can share it with us via the usual support process.

## Does meshStack Copilot process any Personal Identifiable Information (PII)?

meshStack Copilot interacts with data from your meshStack. As such, it may get access to *First Names*, *Last Names*, and *Email Addresses* of users.
Additionally, meshStack Copilot gets access to what's shared by the user in the chat. This may include PII.

## How is my data protected?

Google Gemini uses the submitted data to process your requests and sends back a result, it doesn’t store any information. Your data doesn’t leave the European Union, we use Google Gemini servers in the EU. meshcloud uses data that is already available in your meshStack to answer your queries, this process follows our GDPR guidelines.
We take your data privacy seriously and are happy to answer any compliance-related questions.

## Who has access to meshStack Copilot conversation transcripts?

Users with the [Organization Admin role](https://docs.meshcloud.io/docs/administration.index.html) have access to the transcripts of their organization. 
During the Beta phase, members of our engineering team will have access to the conversation data. This ensures that we can improve meshStack Copilot. Data will only be used to improve meshStack Copilot code and system prompts.
**We recommend to share this documentation with anyone that has meshStack Copilot enabled in their meshStack.** 

## How long are conversation transcripts retained?

All conversations made with meshStack Copilot, including all data provided to the model, will be recorded and stored locally in your meshStack. No dedicated retention period applies. 
Note: a feature that allows admins to delete conversations is planned.
