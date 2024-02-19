---
id: platforms.cloudfoundry
title: Cloud Foundry
---

## Supported Services

The meshPanel contains a convenient user interface for the most common Cloud Foundry operations. The panel talks directly
to the Cloud Foundry API, which thus needs to allow CORS.

- Space Summary (start, stop, scale apps, review bindings)
- Service Marketplace (browse available services and create instances)

## Quota Management

Partners can enforce detailed per-project quotas for Cloud Foundry via meshStack.

## CLI Access

meshPanel generates Cloud Foundry CLI login instructions that enable users to quickly authenticate the CLI
for working with their Cloud Foundry space.
