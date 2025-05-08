---
id: meshcloud.metadata-tags
title: Metadata Tags
---

Organizations can configure meshStack to collect, attach and distribute organization-specific metadata
to objects in the [meshModel](meshcloud.index.md). Currently, [meshWorkspaces](meshcloud.workspace.md), [meshProjects](meshcloud.project.md), [meshLandingZones](meshcloud.landing-zones.md) and [meshPaymentMethods](./meshcloud.payment-methods.md) support this metadata.

Depending on the configuration of the administrators, some of these tags will be applied directly on to the meshTenant(s) in the cloud platform.

Metadata consists of key-value pairs called **Tags**. Administrators influence the available tags by [configuring organization tags](meshstack.metadata-tags.md) in the Administration area.

These tags are displayed in the meshPanel in their respective places and they can be recognized by green bubbles that display the name and value of the tag. Take these meshWorkspaces tags as an example, which are visible in the workspace home screen:
![Example Tags](assets/metadata_tags/mesh_workspace_example_tags.png)

As you can see with the **environment** tag (with **dev**, **test** and **qa** as values), it is also possible for tags to have multiple values.

## Integration in meshPanel

meshPanel seamlessly integrates any tags that can be set by allowing users to input the tag values in self-service on the relevant screens, e.g. the project creation wizard and the project edit screen. From a users' point of view, there's no difference between properties defined in meshStack's meshModel or defined in the [tag editor](meshstack.metadata-tags.md).

## Tags restricted to Administrators

Administrators can configure tags so that only [Admin users](./administration.index.md) can edit them. These tags are called **restricted tags**. End-users cannot edit restricted tags in meshPanel, but they can view them at anytime. Admin users can view and edit restricted and unrestricted tags.

The [administration documentation](./administration.index.md) provides further details on how admin users can edit restricted tags.

## Immutable tags

Administrators can configure immutable tags. This means that we allow the selection of specific tag values only during the creation process of [meshWorkspaces](meshcloud.workspace.md), [meshProjects](meshcloud.project.md), [meshLandingZones](meshcloud.landing-zones.md) and [meshPaymentMethods](./meshcloud.payment-methods.md). Afterwards it is no longer possible to edit the selected values. Also administrators cannot change immutable tag values after creation.
For example if you create a meshProject with **environment** tag **dev** then you can't change the meshProject to **prod**. If you want a meshProject with **environment** tag **dev** then you need to create a new meshProject.

## Enforce organizational policies using tags

Beside providing valuable metadata, tags can also be used to enforce organizational [policies](meshcloud.policies.md) in your meshstack. A common use case for this is enforcing that a meshWorkspace can only create meshProjects for which it has one of the environment tag values set. If a meshWorkspace has environment `dev` and `qa`, it is possible to enforce that users only create meshProjects for these environments but not for e.g. `prod` projects (until an adminstrator gives the meshWorkspace a `prod` environment tag). The environment tag on the meshWorkspace should also be a restricted tag in this case to ensure only partners can influence this behavior.

To learn more, read the [policies](./meshcloud.policies.md) page for other use cases and explanations.
