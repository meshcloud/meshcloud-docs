---
id: meshstack.user-revocation
title: User Revocation
---

When using a company-wide Identity Provider as the authorative authentication provider for meshStack, an automated user revocation for users who left the company is a useful feature. An automated Job can be configured in meshStack, that regularly checks a company-specific system for users that are no longer available in the company. The basic implementation for this is available in meshStack. Only the small connector to your company-specific system, that can provide the revocation information must be implemented individually. meshStack itself will only ask this system for users, who did not log in to meshStack for a configured amount of time (e.g. 30 days).
