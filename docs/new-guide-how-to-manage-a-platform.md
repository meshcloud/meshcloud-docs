---
id: new-guide-how-to-manage-a-platform
title: How to Manage a Platform
---

This guide explains how to manage platforms in meshStack, including registering new platforms, configuring platform settings, managing platform instances, and handling restricted platforms.

## What is a Platform?
A platform is a connected environment (e.g., Kubernetes, AWS, Azure, GCP, OpenStack, Cloud Foundry) that can be managed and integrated with meshStack. For more details, see the [Platform Concept](new-concept-platform).

---

## Registering a New Platform

1. **Navigate to Platform Builder**: In meshPanel, go to the Platform Builder area.
2. **Add Platform**: Click on "Add Platform" or a similar option.
3. **Select Platform Type**: Choose the platform type (e.g., AWS, Azure, GCP, OpenStack, Cloud Foundry).
4. **Configure Platform Details**: Enter required information such as credentials, endpoints, and display name.
5. **Save and Test**: Save the configuration and test the connection to ensure successful integration.

---

## Managing Platform Instances

- **Multiple Instances**: You can register multiple instances of the same platform type (e.g., several Azure tenants or OpenShift clusters) to represent different business units or environments.
- **Edit Platform Settings**: Update credentials, endpoints, or other configuration details as needed.
- **Monitor Platform Health**: Use meshPanel to monitor the status and health of each platform instance.

---

## Managing Restricted Platforms

- **Restricted Platforms**: Limit access to certain platform instances so only authorized workspaces or application teams can provision tenants.
- **Configure Restrictions**: In the platform settings, specify which workspaces are allowed to use the restricted platform.

---

## Platform Lifecycle Management

- **Update Platform Configuration**: Edit platform details as requirements change (e.g., rotate credentials, update endpoints).
- **Remove Platform**: Decommission a platform instance if it is no longer needed. Ensure all tenants are migrated or deleted before removal.

---

## Troubleshooting & Best Practices

- **Test Connections**: Always test platform connections after making changes.
- **Document Platform Ownership**: Assign clear ownership for each platform instance.
- **Review Access Regularly**: Periodically review which workspaces have access to restricted platforms.

---
