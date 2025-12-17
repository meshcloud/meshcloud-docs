---
id: project
title: Project
---

Projects enable clear separation of environments—such as development, testing, or production—within a workspace. Each project belongs to a workspace and can be managed by workspace users with Workspace Owner and Workspace Manager permissions.

Projects allow you to:

- Manage user access to the associated tenants and resources within each environment.
- Gain financial insights into the costs incurred by the project, supporting budgeting and cost control allocation.
- Provide organizational context via tags, which can be replicated to platform resources.

---

Below is a visual example of how projects are structured in meshStack:

![Project concept diagram](/assets/new_concept/concept_project.png)

## Project Names and Identifiers

Each project has both a display name and a unique identifier.

**Project Name (Display Name)**
- Maximum length of 30 characters
- Can contain any characters

**Project Identifier**
- Must contain only lowercase alphanumeric characters and hyphens (but not leading, trailing, or consecutive hyphens)
- Maximum length of 30 characters
- Cannot be changed after project creation

These default restrictions can be configured differently upon request to accommodate your organization's needs.
The restrictions exist to ensure the combined `${workspaceIdentifier}.${projectIdentifier}` fits within cloud platform constraints (e.g., AWS account aliases: 64 chars, Kubernetes namespaces: 63 chars).

## Related Resources

### Concepts

- [Workspace](./workspace.md)
- [Tenant](./tenant.md)
- [Users and Groups](./users-and-groups.md)

### Guides

- [How to Manage a Project](../guides/core/how-to-manage-a-project.md)
- [How to Customize Project Roles](../guides/core/how-to-customize-project-roles.md)
- [How to Reflect Organizational Changes](../guides/core/how-to-reflect-organizational-changes.md)
- [How to Customize Project Roles](../guides/core/how-to-customize-project-roles.md)
- [How to Manage Payment Methods](../guides/finops/how-to-manage-payment-methods.md)
