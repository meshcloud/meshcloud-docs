---
id: new-guide-how-to-manage-4-eye-principle
title: How to Manage 4 Eye Principle
---

:::note What is this guide about?
This guide explains how the 4 eye principle handles user binding requests in meshStack. This flow ensures that role assignments require explicit approval from at least two different workspace managers, providing transparency and compliance with the 4 eye principle.
:::

## Prerequisites

- The 4 eye principle must be enabled in your meshStack environment. If it is not enabled, please contact support at [support@meshcloud.io](mailto:support@meshcloud.io).

## Role Request Flow with 4 Eye Principle

1. **Initiating a Role Request**
    - A workspace manager starts a new project role request.
    - If the 4 eye principle is enabled, a popup prompts the inviting user to provide additional information (e.g., reason for the role and duration).
    - This information is attached to the request and visible to other workspace managers.

2. **Approval Process**
    - The workspace manager who initiates the request automatically registers the first approval.
    - Each workspace manager can only register one approval per request.
    - A second, different workspace manager must provide the additional approval for the request to proceed.
    - If a role request is made on behalf of another workspace manager, that user (or another workspace manager) must still approve or reject the request.

3. **Notifications**
    - Workspace managers receive email notifications about pending approvals.
    - The affected user is informed via email when their role request is approved or rejected.
    - For workspace user groups, all group members are notified.

4. **Request Outcome**
    - If any workspace manager declines the request, it is immediately cancelled.
    - If the number of workspace managers is less than the configured `minApprovalCount`, the request is automatically approved when all managers have registered their approval.
    - The meshPanel can be configured to display a warning in this scenario.

5. **Role Removal**
    - Removal of role bindings does not require approval and is effective immediately.
    - Approval requirements cannot be configured for role removals.

## Related Resources

### Concepts

- [Users and Groups](new-concept-users-and-groups.md)
