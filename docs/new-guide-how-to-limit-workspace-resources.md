---
id: new-guide-how-to-limit-workspace-resources
title: How to Limit Workspace Resources
---

:::note What is this guide about?

This guide explains how to set limits (quotas) for projects and API keys within a workspace in meshStack.

:::

## Project Quotas

Project quotas restrict the number of projects that can be created within a workspace.

- **How it works:**
  - Administrators can set a maximum number of projects per workspace.
  - When the limit is reached, users cannot create new projects until existing ones are deleted or the quota is increased.
- **Typical use cases:**
  - Limit the number of environments (e.g., dev, test, prod) per team.
  - Prevent accidental or excessive project creation.

## API Key Quotas

API key quotas control how many API keys can be created and used within a workspace. This helps secure access and reduces the risk of key sprawl.

- **How it works:**
  - Administrators can set a maximum number of API keys per workspace via the admin area.
  - A default API key limit for all new workspaces can be defined under the admin settings menu. 
  - When the quota is reached, no additional API keys can be generated until some are deleted or the quota is raised.
- **Typical use cases:**
  - Limit the number of integrations or automations per workspace.
  - Enforce security best practices by reducing unused or forgotten API keys.
