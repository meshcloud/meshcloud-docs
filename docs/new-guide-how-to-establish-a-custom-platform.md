---
id: new-guide-how-to-establish-a-custom-platform
title: How to Establish a Custom Platform
---

This guide explains how to establish and integrate a custom platform with meshStack, enabling your organization to manage non-standard or internally developed platforms alongside public and private cloud providers.

## When to Use a Custom Platform
- You have an internally developed platform or service that is not natively supported by meshStack.
- You want to provide a unified experience for managing tenants, access, and quotas across all platforms.

---

## Prerequisites
- Administrative access to meshStack (Platform Builder permissions).
- Documentation or API access for the custom platform you want to integrate.

---

## Steps to Establish a Custom Platform

1. **Define the Platform Type**
   - In meshStack, navigate to the Platform Builder area.
   - Choose the option to add a new platform.
   - Select "Custom" or "Other" as the platform type (if available). If not, contact meshStack support to enable custom platform integration.

2. **Configure Platform Details**
   - Enter a name and description for your custom platform.
   - Provide connection details, such as API endpoints, authentication credentials, and any required metadata.
   - Specify any custom fields or configuration options needed for your platform.

3. **Implement Integration Logic**
   - meshStack may require a connector or integration logic to communicate with your custom platform's API.
   - Work with your platform engineering team or meshStack support to develop and deploy the necessary integration (e.g., using meshStack's extension points or API connectors).

4. **Test the Integration**
   - After configuration, test the connection to ensure meshStack can communicate with the custom platform.
   - Validate that tenant provisioning, user management, and quota enforcement work as expected.

5. **Register Platform Instances**
   - If your custom platform supports multiple instances (e.g., different environments), register each instance with unique configuration details.

6. **Document and Train Users**
   - Provide documentation and training for application teams and platform engineers on how to use the custom platform within meshStack.

---

## Best Practices
- Collaborate closely with your platform engineering and security teams during integration.
- Use consistent naming and tagging conventions for custom platforms and tenants.
- Regularly review and update the integration as your custom platform evolves.

---

## Related Resources
- [Platform Concept](./new-concept-platform.md)
- [How to Manage a Platform](./new-guide-how-to-manage-a-platform.md)
- [meshStack API Documentation](../apis.index.md)
