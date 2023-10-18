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
in the Admin Area by the Cloud Foundation Team. Read more below on how you can create and deploy a new Building Block
Definition.

## Creating a new Building Block Definition

In the Admin Area, click on the "Building Block" item in the sidebar under "Platforms". On this page, click
"Create new Definition". A wizard opens that guides you through the creation of the entire Building Block.

> While our current support covers Terraform up to version 1.5.5, we're actively investigating the possibility of extending our support to upcoming Terraform versions. We're excited to share that we're also exploring the potential support for openTF. This initiative seeks to provide an open-source alternative to the official HashiCorp Terraform provider.

<!-- -->
> [**Building Blocks Repository**](https://github.com/meshcloud/building-blocks)
This repository serves as a central hub for building block modules, and we encourage you to explore and utilize the existing ones or even contribute your own modules if you've created any. Our modules are organized by cloud providers, making it easy to find what you need within the respective folders.
Additionally, in the [Wiki](https://github.com/meshcloud/building-blocks/wiki) you'll discover valuable resources on how to create Terraform modules, craft building blocks based on them, and access a multitude of examples to spark your inspiration. It exist to facilitate your Building Block journey and empower your infrastructure development.

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

### How to debug

You can view the logs of meshStack running the Terraform files. To do so, go to the Tenant Overview in the Admin Area
and look for a meshTenant that has added the Building Block. In there you will be able to find the Building Block
and read the logs that were written while executing the Terraform.

## Editing Building Block Definitions

You can edit existing Building Block definitions, but not all properties are currently editable. Please also read the
descriptions in the meshPanel as the behavior of editing a property of a Building Block definition depends.

In a future release of meshStack, we will introduce the concept of versioning and make modifications to
Building Block definitions a more confident and streamlined process.
