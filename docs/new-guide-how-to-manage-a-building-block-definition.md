---
id: new-guide-how-to-manage-a-building-block-definition
title: How to Manage a Building Block Definition
---

This guide explains how to manage building block definitions in meshStack, including creating, updating, versioning, and deprecating building blocks for automation and standardization.

## What is a Building Block Definition?
A building block definition is a reusable template for automating resource provisioning. Platform teams create and manage these definitions in the platform builder. Building blocks can be workspace- or tenant-scoped and support various implementation types (manual, Terraform, GitHub Actions, GitLab CI/CD).

---

## Creating a Building Block Definition
1. **Navigate to Platform Builder**: In meshPanel, go to the Platform Builder area.
2. **Add New Building Block**: Click on "Add Building Block Definition" or similar.
3. **Configure Details**:
   - Name, description, and type (workspace or tenant).
   - Specify dependencies if needed.
   - Choose implementation type (manual, Terraform, GitHub Actions, GitLab CI/CD).
   - Provide scripts, modules, or workflow references as required.
4. **Save and Publish**: Save the definition. It becomes available for use in workspaces or tenants as configured.

---

## Updating and Versioning
- **Edit Existing Definitions**: Update scripts, modules, or documentation as requirements change.
- **Versioning**: Create new versions to introduce changes without disrupting existing building blocks. Maintain backward compatibility where possible.
- **Deprecation**: Mark outdated definitions as deprecated to prevent new usage while maintaining existing deployments.

---

## Managing Dependencies
- Define dependencies between building blocks to ensure correct provisioning order and configuration.
- Review and update dependencies as your automation landscape evolves.

---

## Best Practices
- Use clear naming and documentation for each building block definition.
- Regularly review and update definitions to reflect best practices and security requirements.
- Test new or updated building blocks in a non-production environment before rollout.

---

## Related Resources
- [Building Block Concept](./new-concept-buildingblock.md)
- [How to Manage a Platform](./new-guide-how-to-manage-a-platform.md)
- [meshStack Building Blocks Documentation](../administration.building-blocks.md)
