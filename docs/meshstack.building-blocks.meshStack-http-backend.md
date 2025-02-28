---
id: meshstack.building-blocks.meshStack-http-backend
title: Terraform/OpenTofu state managed by meshStack
---

Terraform and OpenTofu use state files to store infrastructure configuration details and access this information every time there are configuration changes. Please refer to the respective docs here:

- [OpenTofu](https://opentofu.org/docs/language/settings/backends/configuration)
- [Terraform](https://developer.hashicorp.com/terraform/language/backend)


meshStack accesses building block state with every new run or on deletion. With the built-in http backend, you can store the state file within meshStack. This means it won't be necessary to configure an extra backend within your Terraform/OpenTofu sources. In this case meshStack automatically takes care of the state of the building block.
It is of course possible to also access and manipulate the state with [API Keys](./meshstack.how-to-API-keys.md). 

## Enabling the meshStack http backend for a Building Block

> In case your building block sources contain an explicitly defined backend configuration, this will always take precedence.
> This means that meshStack won't use its built-in http backend, even if enabled, in case it finds a backend configuration within
> the Terraform/OpenTofu code.

When creating a building block definition you can specify to use the built-in http backend for all building blocks of this definition by enabling the `Use meshStack's Http backend` - option within the `Implementation` part of the configuration.
The component running the building block will now configure Terraform/OpenTofu to use meshStack's http backend, but only in case no other backend configuration was found in the building block sources.
The generated backend configuration is equivalent to a Terraform/OpenTofu configuration that looks as follows:

```hcl
terraform {
  backend "http" {
    address = "https://your-meshstack.url/api/terraform/state/workspace/{workspaceIdentifier}/buildingblock/{buildingBlockUuid}
    // [...]
  }
}
```

Please note that including a configuration for meshStack's http backend in your source as shown above will not work, because we do not support the configuration of basic authentication values here. 

## API key access to the state

You can create API keys with permissions to access the state of a specific building block. The permissions you need to add to the API key are grouped under the headline `Terraform/OpenTofu Backend`.
Once you got a Bearer Token with your API key, the state of a building block can be accessed via\
(`GET` / `POST` / `DELETE`) `/api/terraform/state/workspace/{workspaceIdenfifier}/buildingblock/{buildingBlockUuid}`.

## Limitations

There are currently two main limitations around meshStack's http backend:

1. Locking of the state is not yet supported, meaning you cannot configure a lock- or unlock - URL. Please make sure to avoid parallel write access to the state. Parallel access won't happen within meshStack but only in case you want to manipulate the state while a building block run is in progress.
2. meshStack will not perform a state transfer in case you run a building block first with the automatically configured http backend and later with an explicitly defined backend. State migration from a previous backend towards meshStack is currently not possible. If you want to migrate the state from meshStack towards a new remote backend, this can be achieved by following these steps:

   1) Create the infrastructure for your new backend
   2) Retrieve the current state from meshStack with help of an API key
   3) Update your Terraform/OpenTofu code to use the new backend
   4) Run Terraform/OpenTofu manually once and use the `-migrate-state` flag during [init with OpenTofu](https://opentofu.org/docs/cli/commands/init/) or [init with Terraform](https://developer.hashicorp.com/terraform/cli/commands/init)
   5) Update the respective building block definition
   6) Upgrade all building blocks for the definition