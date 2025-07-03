---
id: administration.building-blocks
title: "Building Blocks"
---

Building Blocks are a useful tool to make the journey to successful cloud projects even faster and more automated.
For use cases where you roll out or offer pieces of cloud infrastructure & configuration repetitively, meshStack's
Building Blocks can help you take work out of your hands.

Building Blocks can be added on-demand by your users in self-service in the tenant control plane, or when
your users create a new meshProject or meshTenant.

Building Blocks are instantiated from so-called Definitions. These Building Block Definitions are created and maintained
in the Admin Area by the Platform Team. Read more below on how you can create and deploy a new Building Block
Definition.

## meshStack Hub

[meshStack Hub](https://hub.meshcloud.io) serves as a central hub for building block modules.
We invite you to explore and take advantage of the existing modules, or even contribute your own if you have created any.
Our modules are conveniently organized by cloud providers, making it easy for you to quickly find what you need in the respective folders.

## Creating a new Building Block Definition

In the Admin Area, click on the "Building Block" item in the sidebar under "Platforms". On this page, click
"Create new Definition". A wizard opens that guides you through the creation of the entire Building Block Definition.

> meshStack supports Terraform up to version 1.5.5 and supports OpenTofu versions starting with 1.6.0.

## Building Block Types

There are currently two options for a building block type.  
**Important:** This decision is crucial and **cannot be changed later**.

### Workspace Building Block

A workspace building block is created under a workspace and is globally available to the entire workspace to all projects.  
Use this type when the service does **not need to be tied to a specific cloud tenant**—for example, project tooling or a central identity service.
Workspace building blocks don't have prerequisites such as platform type, platform, landing zone or a tenant. They have an individual
life cycle. Furthermore, their consumption can be restricted via policies.

### Tenant Building Block

A tenant building block is tied directly to a specific cloud tenant, such as a virtual network or database within an AWS Account or Azure Subscription.  
When the tenant is deleted, the building block **must also be deleted**. Tenant building blocks can have a price setup for them that is added to 
the tenant usage report and chargeback statement. Furthermore, they can be restricted via policies.


### General Building Block Definition Information

On the first page, you simply have to put in:

- A name that distinguishes your Building Block.
- A description where you can further explain what the Building Block is.
- A symbol of the Building Block that will be visible to you and your customers. This can be useful when you provide
  a service that already has a logo.

### Implementation Details

Next, you have to enter how the implementation of the Building Block works.

First of all, pick for which platform type(s) the Building Block is supported. Usually this is just one platform type
but you could have one that works for multiple clouds or maybe it is even a cloud-agnostic block.

Next, you have to decide how often the Building Block definition can be added for a meshTenant:

- Multiple: there is no limit to how often you add a building block of this definition to a meshTenant.
- Once: there can only be one Building Block of this definition added to a meshTenant.
  This is useful for core Building Block, e.g. a virtual network for connecting to a central hub network.

Next up is an important decision: the implementation type. As of now these are only two, but we hope to add a lot more
in the future and even let you develop your own implementation types for Building Blocks. Now, you can either pick:

- Manual: this means the Building Block is fully managed manually. Ideally you always automate your Building Blocks
  but manual Building Blocks can be a good start to get familiar with the concept and give a clear ordering flow
  to your customers. It can also be an easy option to evaluate if a need for a new building block definition exists.
  You just create a manual block and observe how many application teams use the definition.
  You can switch the definition to an automated building block in the future.
- Terraform: this is the option to automate your Building Block. You only need a Terraform module and meshStack will
  run this configuration everytime a user adds a new Building Block to a meshTenant.
  In a later step you can setup Inputs for your
  Terraform script. There is also a [section](#developing--deploying-a-terraform-building-block)
  below with further tips for developing Terraform Building Blocks.

If you pick Terraform you have to enter a few further values:

- Terraform Version: the version your Terraform modules shall be executed with.
- Git Repository URL: the URL of the Git repository where your Terraform module resides.
- (Optional) Git Repository Path: the specific directory in the repository where your Terraform module resides.
- (Optional) Private SSH Key: This is needed and the only option to access private repositories.
  Upload an SSH key that has access to the provided Git repository.

Lastly, you have to decide what the behavior of the Building Block is when it is deleted by the customer user. This can be

- Purge in meshStack: (this is the only option if you have a manual Building Block) The Building Block is deleted
  in meshStack, but no underlying resources (e.g. in a cloud platform) are deleted. You have to do this yourself.
- Delete Resources: this option also cleans up the underlying resources. The workings depend on the implementation
  type, but e.g. for Terraform meshStack will call `terraform destroy` on the Terraform module.

### Dependencies

> Please note that the use of dependencies is completely optional and this step can be skipped.

In some cases you might find that you have multiple Building Block definitions, and one depends on the other.
For example, you might have a Virtual Network, which is a prerequisite for a Virtual Machine.

You can model and enforce such dependencies in meshStack using the Building Blocks feature.

In the wizard, on the "Dependencies" page, you have to select the Building Block(s) definitions
that the _about to be created_ Building Block depends on. So in the example above you would have to do the following:

1. Create the Virtual Network Building Block without any dependencies.
2. Create the Virtual Machine Building Block and select the Virtual Network as a dependency.

> For Terraform users: you can provide the output of the Virtual Network Building Block as input for the Virtual
> Machine Building Block.
> It is also possible that Building Blocks definitions of different implementation types can be dependent on each other
> and share inputs & outputs.

### Building Block Inputs

As with a lot of configuration, input is required. Building Blocks in meshStack can collect as much input as you want,
in many ways possible.

There are different kinds of inputs, with different behavior, which can be decided under the "Source" section. You can
read in the meshPanel what each kind of input does and how it behaves.

The inputs' behavior can be further decided:

- Provide as: you can decide whether the input is regularly provided as an input variable or as an environment variable.
  (only applies to Terraform Building Blocks)
- Sensitivity: you can decide that an input is sensitive (e.g. a secret). It will then be encrypted in meshStack and not
  shown to any users. Also meshStack only has very limited access to this secret. Only once Terraform gets executed,
  the secret is decrypted.

#### Input Types

We support the following types of inputs:

- String
- Number
- Boolean
- Single Select
- File (this will place a file in the working directory of Terraform. The name of the input will be used as the filename. Usually you can use a relative path to access the provided file like ./FILENAME.)

In the future we also plan to have more complex types such as LIST and MAP as well.

#### User Permissions

On top of all the input types described above there is also a special kind of input where you receive all assigned project users & roles.
This input is called "User Permissions" and it has to be selected under "Source -> User Permissions". This can be useful to provide users with access to certain resources in a 
platform. It provides a list of objects to the Building Block, with a JSON structure that looks like this:

```json
[
  {
    meshIdentifier: 'identifier1',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@test.com',
    euid: 'johndoe',
    roles: ['reader']
  },
  {
    meshIdentifier: 'identifier2',
    username: 'lisaluck',
    firstName: 'Lisa',
    lastName: 'Luck',
    email: 'lisaluck@test.com',
    euid: 'lisaluck',
    roles: ['admin', 'reader', 'user']
  }
]
```

### Building Block Outputs

You can also extract the Terraform outputs into meshStack. This is useful in two scenarios:

1. You want to provide an output variable to a dependent Building Block. As the example that was mentioned above, if
   you have a virtual machine that depends on the VNET ID of a virtual network, you can output the
   variable and provide it as an input to the dependent virtual machine Building Block.
2. You want the customer user to be able to see the output result. This might be useful if there is an output that is
   important to the customer user. They will be able to read the value in their tenant control plane.

Last but not least, save your Building Block definition, and it is be ready to be consumed by your application teams!

## Developing & Deploying a Terraform Building Block

For Terraform blocks, meshStack will run the required Terraform in the background.

### State Storage Recommendations

Storing state is a crucial aspect of Terraform. We have the following recommendations regarding state storage when
using Terraform-based Building Blocks in meshStack:

1. Use a remote backend to store your state like Amazon S3, Azure Storage or Google Cloud Storage.
2. Use a single storage per Building Block Definition. meshStack organizes the storage on a per workspace/project basis.
   By using a single storage per Building Block Definition you keep a clear separation of your state.
3. Apply backup best practices to your remote backend so you can restore your state in case you run into an issue.

### Configure remote backend

1. Copy one of these examples into a file named `backend.tf` and adopt the parameters.
2. Either put this backend.tf file inside your terraform module folder or upload it as a static file input along with the other inputs inside your Building Block definition. 
3. Make sure to include the necessary credentials required for accessing the storage account. For instance, for a storage account in Azure, you can add "ARM_CLIENT_ID" and "ARM_CLIENT_SECRET" of the Service Principal as an Environment Variable.

**Important:** When making use of an input parameter of type "File," it's important to note that the "Name" you assign to the input parameter will be used as the filename for the uploaded file. For example, if your Terraform code references a credential file as "key.json" in your terraform code, you should use the exact same name in your input "Name" field.

#### AWS S3 Bucket

```hcl
terraform {
  backend "s3" {
    bucket = "<bucket name>"
    key    = "<Prefix of the state file name>"
    region = "<Location name>"
  }
}
```

#### Azure storage account

```hcl
terraform {
  backend "azurerm" {
    tenant_id            = "<Tenant ID>"
    subscription_id      = "<Subscription ID>"
    resource_group_name  = "<Name of the resource group holding the state file>"
    storage_account_name = "<Name of the Storage account holding the state file>"
    container_name       = "<Name of the Container holding the state file>"
    key                  = "<Prefix of the state file name>"
  }
}
```

#### GCS Bucket

```hcl
terraform {
  backend "gcs" {
    bucket  = "<Name of the bucket holding the state file>"
    credentials = Local path to Google Cloud Platform account credentials in JSON format
    prefix  = "<Prefix of the state file name>"
  }
}
```

### How to debug

You can view the logs of meshStack running the Terraform files. To do so, go to the Tenant Overview in the Admin Area
and look for a meshTenant that has added the Building Block. In there you will be able to find the Building Block
and read the logs that were written while executing the Terraform.

## Editing Building Block Definitions

It is possible to edit existing Building Block Definitions, but you will be required to create a new **version**. This way
any users of your "old" Building Block Definitions will not experience any impact. 

To properly make changes to your Building Block Definition and also upgrade the existing Building Blocks, do the following:

1. Open the Building Block Definition.
2. On the right-hand side there is a version dropdown. Click the button "Create Draft" next to it and confirm the creation.
3. Your Building Block Definition is now in draft state. While in draft state, you can make any changes that you like
   such as removing inputs, adding inputs, or changing the Git commit hash.
4. When you are happy with your changes, publish the new version. On the right-hand side, next to the version dropdown, click on "Publish".
5. The new version is now published! This also means that any workspace users that create new Building Blocks will use that version by default

At this point, any existing Building Blocks still use the old version. To make sure that these are also upgraded to the latest version do the following:

1. On the left-hand side open up the list of all Building Blocks.
2. In the list, search for all Building Blocks of the recently upgraded Building Block Definition.
3. Tick all Building Blocks that you want to upgrade and click on the right-hand side on "Actions > Upgrade".
4. Confirm the upgrade, enter any missing input (if applicable) and run the upgrade.
5. That's it! The Building Block is now upgraded! A new run has also started in the meantime so that any changes to the
   Terraform are applied as soon as possible.

## Updating a Building Block Definition

As an admin or owner of the Building Block Definition, you can select one or more Building Blocks and click “Actions -> Update” at the top of the screen to update to the newest version. Application teams do not have permission to update Building Block Definitions.
