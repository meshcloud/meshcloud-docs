| EoL Date | meshObject | Deprecation Notice |
|---|---|---|
| 2025-03-01 | `meshCustomer.v1` | Replace all uses of the `meshCustomer` object with `meshWorkspace`. |
| 2025-03-01 | `meshCustomerUserBinding.v1` | Please upgrade to `meshWorkspaceUserBinding.v2`, which targets a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-03-01 | `meshCustomerUserGroup.v1` | Replace all uses of `meshCustomerUserGroup` object with `meshWorkspaceUserGroup`. |
| 2025-03-01 | `meshCustomerGroupBinding.v1` | Please upgrade to `meshWorkspaceGroupBinding.v2`, which targets a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-07-01 | `meshUser.v1` | Please upgrade to `meshUser.v2`, which features an updated set of `_links` reflecting the renaming of `meshCustomer` to `meshWorkspace`. |
| 2025-07-01 | `meshPaymentMethod.v1` | Please upgrade to `meshPaymentMethod.v2`, which is owned by a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-07-01 | `meshProject.v1` | Please use `meshProject.v2`, which is owned by a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-07-01 | `meshProjectUserBinding.v1` | Please upgrade to `meshProjectUserBinding.v3`. The new version has a `metadata.name` field and the `subjects` field has been replaced with a single `subject`. |
| 2025-07-01 | `meshProjectGroupBinding.v1` | Please upgrade to `meshProjectGroupBinding.v3`. The new version has a `metadata.name` field and the `subjects` field has been replaced with a single `subject`. |
| 2025-07-01 | `meshTenant.v1` | Please upgrade to `meshTenant.v3`, which is owned by a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-07-01 | `meshTenant.v2` | Please upgrade to `meshTenant.v3`, which is owned by a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-07-01 | `meshServiceInstance.v1` | Please upgrade to `meshServiceInstance.v2`, which is owned by a `meshWorkspace` instead of a `meshCustomer`. |
| 2025-07-01 | `meshWorkspaceGroupBinding.v1` | Please upgrade to `meshWorkspaceGroupBinding.v2`. The new version has a `metadata.name` field and the `subjects` field has been replaced with a single `subject`. |
|  | `meshWorkspace.v1` | Please update to `meshWorkspace.v2` at your earliest convenience. |
|  | `meshWorkspaceUserBinding.v1` | Please upgrade to `meshWorkspaceUserBinding.v2`. The new version has a `metadata.name` field and the `subjects` field has been replaced with a single `subject`. |
|  | `meshProjectUserBinding.v2` | Please upgrade to `meshProjectUserBinding.v3`. The new version has a `metadata.name` field and the `subjects` field has been replaced with a single `subject`. |
|  | `meshProjectGroupBinding.v2` | Please upgrade to `meshProjectGroupBinding.v3`. The new version has a `metadata.name` field and the `subjects` field has been replaced with a single `subject`. |
|  | `meshTenant.v3` | Please consider upgrading to `meshTenant.v4`, which uses a UUID to identify a meshTenant. |
