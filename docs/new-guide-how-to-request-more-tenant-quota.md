---
id: new-guide-how-to-request-more-tenant-quota
title: How to Request More Tenant Quota
---

This guide explains how to request additional quota for a tenant in meshStack-managed private cloud platforms.

## What is Tenant Quota?

Tenant quotas control the amount of resources (CPU, memory, storage, etc.) a tenant can consume within a platform. Quotas help ensure fair usage and prevent resource exhaustion.

For more details, see the [Tenant Concept](./new-concept-tenant.md#tenant-quota-private-cloud).

---

## When to Request More Quota

- Your tenant needs more resources than currently allocated (e.g., for new workloads or scaling up).
- You receive quota limit errors when deploying or operating workloads.
- Your organization is planning a project that requires additional capacity.

---

## How to Request More Tenant Quota

1. **Identify the Tenant**
   - Navigate to the relevant workspace and project in meshPanel.
   - Select the tenant for which you need more quota.

2. **Review Current Quota**
   - On the tenant details page, review the current quota allocations (CPU, memory, storage, etc.).

3. **Initiate a Quota Increase Request**
   - If your meshStack instance supports self-service quota requests, look for an option such as "Request More Quota" or "Adjust Quota" on the tenant details page.
   - Fill in the required information, specifying the new quota values and the reason for the request.
   - Submit the request. It may require approval from platform engineers or administrators.

   **If self-service is not available:**
   - Contact your platform engineer or meshStack support (e.g., via support@meshcloud.io) with the tenant name, current quota, requested new quota, and justification.

4. **Approval and Implementation**
   - Platform engineers will review the request and adjust the quota as appropriate.
   - meshStack will replicate and enforce the new quota as part of the tenant's desired state.

---

## After the Quota Change
- The new quota will be visible on the tenant details page once applied.
- meshStack will ensure the tenant remains within the new limits.
- If you encounter issues, contact support or your platform engineer.

---

## Troubleshooting & Best Practices
- **Plan Ahead**: Anticipate resource needs and request quota increases in advance.
- **Provide Justification**: Clearly explain why more quota is needed to speed up approval.
- **Monitor Usage**: Regularly review tenant usage to avoid unexpected limits.

---

## Related Resources

- [Tenant Concept](./new-concept-tenant.md#tenant-quota-private-cloud)
- [How to Manage a Tenant](./new-guide-how-to-manage-a-tenant.md)
- [meshStack Tenant Quota Documentation](./meshcloud.tenant-quota.md)
- [Contact Support](mailto:support@meshcloud.io)
