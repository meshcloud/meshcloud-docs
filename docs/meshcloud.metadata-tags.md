---
id: meshcloud.metadata-tags
title: Metadata Tags
---

Organizations can configure meshStack to collect, attach and distribute organization-specific metadata
to objects in the [meshModel](meshcloud.index.md). Currently, [meshCustomers](meshcloud.customer.md), [meshProjects](meshcloud.project.md), [meshLandingZones](meshcloud.landing-zones.md) and [meshPaymentMethods](./meshcloud.payment-methods.md) support this metadata.

Metadata consists of key-value pairs called **Tags**. Administrators influence the available tags by [configuring organization tags](meshstack.metadata-tags.md) in the Administration area.

These tags are displayed in the meshPanel in their respective places and they can be recognized by green bubbles that display the name and value of the tag. Take these meshCustomers tags as an example, which are visible in the customer home screen:
![Example Tags](assets/metadata_tags/mesh_customer_example_tags.png)

As you can see with the **environment** tag (with **dev**, **test** and **qa** as values), it is also possible for tags to have multiple values.

## Integration in meshPanel

meshPanel seamlessly integrates any tags that can be set by allowing users to input the tag values in self-service on the relevant screens, e.g. the project creation wizard and the project edit screen. From a users' point of view, there's no difference between properties defined in meshStack's meshModel or defined in the [tag editor](meshstack.metadata-tags.md).

## Tags restricted to Administrators

Administrators can configure tags so that only [Partner users](./administration.index.md) can edit them. These tags are called **restricted tags**. End-users cannot edit restricted tags in meshPanel, but they can view them at anytime.

The [administration documentation](./administration.index.md) provides further details on how partner users can edit restricted tags.

## Enforce organizational policies using tags

Beside providing valuable metadata, tags can also be used to enforce organizational [policies](https://docs.meshcloud.io/docs/meshcloud.policies.html) in your meshstack. A common use case for this is enforcing that a meshCustomer can only create meshProjects for which it has one of the environment tag values set. If a meshCustomer has environment `dev` and `qa`, it is possible to enforce that users only create meshProjects for these environments but not for e.g. `prod` projects (until an adminstrator gives the meshCustomer a `prod` environment tag). The environment tag on the meshCustomer should also be a restricted tag in this case to ensure only partners can influence this behavior.

To learn more, read the [meshPolicies](./meshcloud.policies.md) page for other use cases and explanations.