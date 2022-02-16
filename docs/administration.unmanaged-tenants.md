---
id: administration.unmanaged-tenants
title: Unmanaged Tenants
---

## What is an unmanaged tenant?

Workload that is running indefinitely without anyone's awareness can be an easy way to burn through cloud budget. This is otherwise
known as 'Shadow IT'. To make it easier to spot this kind of workload, meshStack offers a table view of all tenants that are unmanaged.

The definition of an unmanaged tenant is a cloud tenant that is not related to any meshCustmer & meshProject. In other words, it does not
have any organizational metadata applied to it, and it is "unknown" who owns the tenant from a meshStack perspective.

> If you recently started using meshStack, you will most likely have a lot of unmanaged tenants. This is fine
> as you are still working on starting to manage these tenants via meshStack.

## Viewing unmanaged tenants

Viewing unmanaged tenants can be easily done within the administration area. In the sidebar on the left, navigate to 'Platforms' -> 'Unmanaged Tenants'.

A table will open up with all unmanaged tenants that are known to meshStack. This list is refreshed on a daily basis.

It is also recorded when the unmanaged tenant was last observed. If the last observed date is from longer than a few days ago, it has disappeared. This
probably means that it was deleted and it no longer exists in the cloud platform.

Tenants that are adopted into meshStack are removed from the unmanaged tenants list and shown in the tenants list instead.

> Adopting a tenant into meshStack can be done via the meshObject API.

The screenshot below depicts how the unmanaged tenant list could look like.

![Unmanaged Tenants](assets/unmanaged-tenants.png)
