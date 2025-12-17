---
id: workspace
title: Workspace
---

Workspaces can be used by:

- Application teams to manage one or more business applications and their teams via the workspace manager.
- Platform teams to provide platforms and building blocks for application teams via the platform builder, and to test and operate their services via the workspace manager.

Workspaces can be accessed via the top navigation bar. You only have access to workspaces you're a member of, and you can switch between them easily using the drop-down menu.

Workspace creation can be configured in two ways:

- **Self-service**: Users can create workspaces directly through meshPanel in self-service mode.
- **API-based**: If you use an ITSM solution such as ServiceNow, you can initiate workspace creation through an API, enabling integration with existing approval workflows. This approach allows the creation process to be externalized and automated according to your organization's requirements.

Each workspace includes a [Workspace Manager](./meshstack-areas.md) and [Platform Builder](./meshstack-areas.md).

---
Below is a visual example of how workspaces are structured in meshStack:

![Workspace concept diagram](/assets/new_concept/concept_workspace.png)

## Workspace Identifiers

Each workspace has a unique identifier that is used to reference the workspace in APIs, integrations, and platform resources.

**Default Restrictions:**
- Must be alphanumeric with hyphens allowed (but not leading, trailing, or consecutive hyphens)
- Maximum length of 16 characters
- Cannot be changed after workspace creation

These default restrictions can be configured differently upon request to accommodate your organization's needs.
The restrictions exist to ensure the combined `${workspaceIdentifier}.${projectIdentifier}` fits within cloud platform constraints (e.g., AWS account aliases: 64 chars, Kubernetes namespaces: 63 chars).

## Related Resources

### Concepts

- [meshStack Areas](./meshstack-areas.md)
- [Workspace Users and Permissions](./users-and-groups.md#workspace-users-and-permissions)

### Guides

- [How to Manage Workspaces](../guides/core/how-to-manage-a-workspace.md)
- [How to Onboard your Team to a Workspace](../guides/developer-portal/how-to-onboard-your-team.md)
- [How to Limit Workspace Resources](../guides/core/how-to-limit-workspace-resources.md)

