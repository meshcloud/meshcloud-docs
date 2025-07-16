---
id: new-concept-policies
title: Policies
---

In meshStack you can use policies to enforce existing complaiance and governance rules across your Internal Developer Platform (IDP).

In meshStack:

- A policy restricts relationships between two policy subjects.
- Policies are defined using tags on these subjects.
- Policies specify required tag values for compliance.
- Evaluation strategies determine how policy subjects are checked against each other.
- Policies are enforced when editing tags or changing relations (e.g., assigning users).
- In the meshPanel, non-compliant choices are disabled or excluded

### What can I achieve with policies?

**Workspaces Restrictions**
Based on your tags defined in the policies, you can

- restrict the configuration of project tags based on the workspace tags
- restrict the new _assignments_ of users/groups to workspaces
- restrict the new _assignments_ of landing zones to workspaces
- restrict the new _assignments_ of building blocks to workspaces

**Project  Restrictions**
Based on your tags defined in the policies, you can:

- restrict the new _assignments_ of users/groups to projects
- restrict the new _assignments_ of landing zones to projects
- restrict the new _assignments_ of building blocks to projects

**meshProjectRole Restrictions**
Based on your tags defined in the policies, you can:

- restrict the new _assignments_ of users/groups to meshProjectRoles

### What happens when a policy is violated?

Although meshStack enforces compliance in the UI it might happen that there are policy violations. This can happen when an admin makes changes that conflict with existing policies via admin area or API or changes an existing policy or tag.

Policy violations are shown in the admin area under policy violations. You can see the details of the violation and take action to resolve it. Policy violations can also be viewed by the application teams in the workspace manager area under compliance. When the tags are not restricted application teams can resolve the policy violations by changing the tags on the policy subjects.

### Policy Evaluation Strategy

A policy evaluation strategy describes how authoritative and affected policy
subjects shall be evaluated in the context of a policy. In that way, you can
decide in which form the tag values have to be present on both policy subjects
to comply with the policy. As mentioned before, policies are built on top of
meshStack's [tagging](meshcloud.metadata-tags) system. By that system, you
can allow your tag to only have one value or multiple values. For the
evaluation, all tags are treated as arrays: no matter if there are no values, a
single value, or multiple values. This means you can also create a policy that
evaluates a single-select tag against a multi-select tag.

> **Null sets rule**: If _neither_ subject has the tag defined in your policy,
> your policy subjects are evaluated as compliant with that policy. This allows
> introducing additional tags and policies over existing objects without making
> them incompliant.

There are two different selectable evaluation options `Subset` and
`Intersection`.

#### Subset

Describes an evaluation strategy that the tag values of the affected subject
**must be a non-empty subset** of the authoritative subject tag values. The
evaluation of a `Subset` is successful if the affected subject is only tagged
with values which are also present in the tag values of the authoritative
subject.

> The Subset evaluation strategy is useful for modeling "clearances" with tags.
> A common use case is clearing workspaces to allow access to certain
> environments/stages and landing zone types using a multi-select tag at the
> workspace level. Policies with a subset evaluation strategy ensure all
> projects, landing zones, building blocks, etc. stay within the bounds of that
> clearance.

**Example:** In this example, we're looking at a policy between a project's
`environment` tag, and a workspace's `environment` tag with the following
allowed values: `dev`, `qa`, and `prod`. The project is the affected subject and
the workspace is the authoritative subject.

| Workspace<br> _authoritative_ | Project<br> _affected_ | Result | Explanation                                                                 |
| ----------------------------- | ---------------------- | ------ | --------------------------------------------------------------------------- |
| `prod`                        | `prod`                 | ✓      | `prod` is present on both Project and Workspace                             |
| `dev`, `qa`                   | `prod`                 | ✖      | Project `prod` is not present on Workspace `qa`,`dev`                       |
| `dev`                         | < empty >              | ✖      | Project has no tag values, the subset is empty                              |
| < empty >                     | `dev`                  | ✖      | Workspace has no tag values, Project `dev` is not a subset                  |
| < empty >                     | < empty >              | ✓      | Null sets rule: Both subjects have no tag values, the policy passes         |
| `qa`, `dev`                   | `prod`, `qa`           | ✖      | Project `prod` is not present in Workspace `qa`,`dev`                       |
| `qa`, `dev`                   | `dev`, `qa`            | ✓      | `dev`, `qa` is present on both Project and Workspace, order does not matter |

#### Intersection

Describes an evaluation strategy that the tag values of the affected subject
**must have a non-empty intersection** with the tag values of the authoritative
subject tag values. The evaluation of an `Intersection` is successful if at
least one tag value is present on both policy subjects or if both sets are
empty.

> The Intersection evaluation strategy is useful for modeling "compatibilities"
> with tags. Common use cases are modeling access to landing zones/services or
> enforcing the use of specific "admin" principals/user groups for prod
> environments.

Example:

In this example, we're looking at a policy between a User/Group `environment`
tag, and a workspace's `environment` tag with the following allowed values:
`dev`, `qa`, and `prod`. The User/Group is the affected subject and the
workspace is the authoritative subject.

| Workspace<br> _authoritative_ | User/Group<br> _affected_ | Result | Explanation                                                         |
| ----------------------------- | ------------------------- | ------ | ------------------------------------------------------------------- |
| `prod`                        | `prod`                    | ✓      | `prod` is present on User/Group and Workspace                       |
| `dev`, `qa`                   | `prod`                    | ✖      | User/Group `prod` is not present on Workspace `qa`,`dev`            |
| `dev`                         | < empty >                 | ✖      | No overlapping value, the intersection is empty                     |
| < empty >                     | `dev`                     | ✖      | No overlapping value, the intersection is empty                     |
| < empty >                     | < empty >                 | ✓      | Null sets rule: Both subjects have no tag values, the policy passes |
| `qa`, `dev`                   | `prod`, `qa`              | ✓      | User/Group `qa` is present in Workspace `qa`,`dev`                  |
| `qa`, `dev`                   | `dev`, `qa`               | ✓      | `dev`, `qa` is present on User/Group and Workspace                  |

## Related Resources
