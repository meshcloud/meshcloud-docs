---
id: copilot-preview
title: meshStack Copilot Preview
---
meshStack Copilot is an AI-powered assistant that helps application teams discover and understand relevant platform services. It enables platform teams to generate consistent, customizable guidance and documentation for their services, improving clarity around responsibilities and compliance. By analyzing user conversations, Copilot also provides insights for ongoing improvement of platform offerings and support.
Copilot is not yet generally available, however, meshcloud is offering a public preview of Copilot to all meshStack customers. This document provides information about the preview.

## What does Copilot do? 
Copilot helps you get work done faster by answering questions and generating content based on your meshStack setup. For example, Copilot can:
- **Generate documentation** for Building Blocks definitions
- **Guide you through workflows**, such as setting up a new project or assigning roles
- **Explain meshStack concepts**, helping new team members onboard quickly
  
## How to use Copilot?
Copilot appears as a chat assistant in the meshPanel UI and is available on every screen. You can find the Copilot sheep icon at the top right corner of your screen. 

You can ask questions in natural language—just like you would with a colleague. Copilot responds instantly with relevant information based on your meshStack data. 
Whenever there is the opportunity for Copilot to help you directly in context of the task you are trying to fulfil click the “Get help” icon to have Copilot suggest questions you could ask to speed up your work.


## How does Copilot work?
Copilot works by analyzing the user’s question and feeds the question and any relevant meshStack data that the user has access to into a large language model to produce an answer. Platform teams can configure and customize the prompts that Copilot uses to answer questions. 
meshStack can enrich user queries by providing additional context data like building block definitions to the model. All conversations made with Copilot, including all data provided to the model, will be recorded and stored locally in your meshStack and can be reviewed by the platform team for evaluation and auditing.
You can restrict user’s access to meshStack Copilot in Admin Area → Settings → Copilot. 

# Which AI model providers are used for Copilot?
Copilot currently uses Google Gemini models hosted by Google Cloud. This means your queries are being processed by Google Cloud as a subprocessor of meshcloud, as we have made transparent in our suprocessor list. 
We are curious to hear from you if you’d like to see “bring your own model” (or API key) support so you can utilise Copilot with models under your own contract.

# What data does Copilot have access to?
Copilot is designed to be a context-aware assistant that can help users with tasks like understanding your platform or generating documentation. To do this well, it needs access to the same data and knowledge a human colleague would reference.

| **Data Category** | **Why Copilot needs it** |
| -- | -- |
| **User info (name, email)** | Personalizes responses and only gives access to permitted data |
| **Marketplace Catalog metadata** | Answers questions about platform services |

This list will be extended when we add new capabilities to meshStack Copilot.
All conversations made with Copilot, including all data provided to the model, will be recorded and stored locally in your meshStack and can be reviewed by the platform team to audit transmitted data.

# Will the data shared with Copilot be used for training models?
During the beta phase you agree to sharing conversation transcripts with meshcloud for the purpose of evaluating meshStack Copilot performance. Any data shared with meshcloud during the Beta phase will not be retained by meshcloud once Copilot becomes generally available. Please see “Who has access to Copilot conversation transcripts?” for more information below.
Any data that you share with Copilot will not be used for training models or evaluating model performance by our subprocessors. 
Of course we’re always happy if you can share individual conversations with us to help us improve Copilot. If you want to share a conversation with us where Copilot did not meet your expectations yet, you can share it with us via the usual support process.

## Does Copilot process any Personal Identifiable Information (PII)?
Copilot interacts with data from your meshStack. As such, it may get access to *First Names*, *Last Names*, and *Email Addresses* of users.
Additionally, Copilot gets access to what's shared by the user in the chat. This may include PII.

## How is my data protected?
Google Gemini uses the submitted data to process your requests and sends back a result, it doesn’t store any information. Your data doesn’t leave the European Union, we use Google Gemini servers in the EU. meshcloud uses data that is already available in your meshStack to answer your queries, this process follows our GDPR guidelines.
We take your data privacy seriously and are happy to answer any compliance-related questions.

## Who has access to Copilot conversation transcripts?
Users with the [Organiziation Admin role](https://docs.meshcloud.io/docs/administration.index.html) have access to the transcipts of their organization. 
During the Beta phase, members of our engineering team will have access to the conversation data. This ensures that we can improve Copilot. Data will only be used to improve Copilot code and system prompts.
**We recommend to share this documentation with anyone that has Copilot enabled in their meshStack.** 

## How long are conversation transcripts retained?
All conversations made with Copilot, including all data provided to the model, will be recorded and stored locally in your meshStack. No dedicated retention period applies. 
Note: a feature that allows admins to delete conversations is planned.

# How to participate?
In the Admin Area Settings, you are able to activate Copilot for your organization. Your meshStack's Organization Admins select either the whole organization or individual users who can use Copilot. The meshStack panel only changes for selected users.

# What are the limitations of the Beta version?
When using Copilot, keep in mind that
- Copilot is a Beta feature—responses may sometimes be inaccurate or incomplete
- Copilot results are suggestions, not final answers
- We're constantly improving it, and your feedback is valuable. So please reach out to us if you have feedback
