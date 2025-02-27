---
id: meshstack.building-blocks.meshStack-http-backend
title: Terraform/OpenTofu state managed by meshStack
---

> Please make sure to properly read and understand the [limitations](#limitations) before using the state management of meshStack.

Terraform and OpenTofu use state files to store infrastructure configuration details and access those information every time there are configuration changes. Please refer to the respective docs here:\
[OpenTofu](https://opentofu.org/docs/language/settings/backends/http/) \
[Terraform](https://developer.hashicorp.com/terraform/language/backend/http)


meshStack accesses building block state with every new run or on deletion. With a remote http backend, you can store the state file within meshStack. This means it won't be necessary to configure an extra backend within your Terraform/OpenTofu sources. In this case meshStack automatically takes care of the state of the building block.
It is of course possible to also access and manipulate the state with [API Keys](./meshstack.how-to-API-keys.md). 

## Automatically use the meshStack http backend for a Building Block

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

> In case the building block sources contain an explicitly defined backend configuration, the option described above will not take effect.

## API key access to the state

You can create API keys with permissions to access the state of a specific building block. The permissions you need to add to the API key are grouped under the headline `Terraform/OpenTofu Backend`.
Once you got a Bearer Token with your API key, the state of a building block can be accessed via\
(`GET` / `POST` / `DELETE`) `/api/terraform/state/workspace/{workspaceIdenfifier}/buildingblock/{buildingBlockUuid}`.

## Limitations

There are currently a few limitations around meshStack's http backend:

1. Locking of the state is not yet supported, meaning you cannot configure a lock- or unlock - URL can need to avoid parallel write access to the state.
2. The backend detection within meshStack is currently limited to hcl syntax. This means meshStack does not detect an existing backend configuration in case you are using JSON with Terraform.
3. meshStack will not perform a state transfer in case you run a building block first with the automatically configured http backend and later with an explicitly defined backend.