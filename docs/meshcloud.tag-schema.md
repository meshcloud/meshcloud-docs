---
id: meshcloud.tag-schema
title: Metadata Tags
---

Organizations can configure meshStack to collect, attach and distribute organization-specific metadata
to objects in the [meshModel](meshcloud.index.md) like [meshCustomers](meshcloud.customer.md), [meshProjects](meshcloud.project.md) and [payment methods](./meshcloud.payment-methods.md).

This metadata can consist of arbitrary key-value pairs called **Tags**. meshStack Operators define available tags and their validation rules by [configuring tag-schemas](meshstack.tag-schema.md).


## Integration in meshPanel

meshPanel seamlessly integrates any tags that user can set in self-service on the relevant screens, e.g. the project create wizard and the project edit screen. From a users' point of view, there's no difference between properties defined in meshStack's meshModel or defined in a [tag-schema](meshstack.tag-schema.md).

## Tags restricted to Administrators

Operators can configure some tags so that only [Partner users](./administration.index.md) can edit them. These tags are called **restricted tags**. End-users can't view or edit restricted tags in meshPanel.

The [administration documentation](./administration.index.md) provides futher details how partner users can view and edit tags.

