---
id: administration.building-blocks
title: "Building Blocks"
---

Building Blocks are a useful tool to make the journey to successful cloud projects even faster and more automated.
For use cases where you roll out or offer pieces of cloud infrastructure & configuration repetitively, meshStack's
building blocks can help you take work out of your hands.

Building Blocks can be booked on-demand by your meshCustomers in self-service in the tenant control plane, or when
your meshCustomers create a new meshProject or meshTenant.

Building Blocks are instantiated from so-called Definitions. These Building Block Definitions are created and maintained
in the Admin Area by the Cloud Foundation Team. Read more below on how you can create and deploy a new Building Block
Definition.

## Creating a new Building Block Definition

In the Admin Area, click on the "Building Block" item in the sidebar under "Platforms". On this page, click
"Create new Definition". A wizard will open that will guide you through the creation of the entire building block.
On the first page, you will simply have to put in:

- A name that distinguishes your building block.
- A description where you can further explain what the building block is.
- A symbol of the building block that will be visible to you and your customers. This can be useful when you provide
  a service that already has a logo.

### Implementation Details

Next, you will have to enter how the implementation of the building block will work.

First of all, pick for which platform type(s) the building block is supported. Usually this is just one platform
but you could have one that works for multiple clouds or maybe it is even a cloud-agnostic block.

Next, you have to decide how often the building block can be booked for a meshTenant:

- Multiple: there is no limit to how many building blocks can exist for the meshTenant.
- Once: there can only be one building block for a single meshTenant. This is useful for core building blocks, e.g. a
  virtual network for a cloud tenant.

Next up is an important decision: the implementation type. As of now these are only two but we hope to add a lot more
in the future and even let you develop your own implementation types for building blocks. Now, you can either pick:

- Manual: this means the building block is fully managed manually. Ideally you always automate your building blocks
  but manual building blocks can be a good start to get familiar with the concept and give a clear ordering flow
  to your customers. It could also be an option to automate the building block in the future.
- Terraform: this is the option to automate your building block. You will only need a Terraform file and meshStack will
  run this configuration everytime a user books a new building block. In a later step you can setup Inputs for your
  Terraform script. There is also a [section](#developing--deploying-a-terraform-building-block)
  below with further tips for developing Terraform building blocks.

If you pick Terraform you have to enter a few further values:

- Terraform Version: the version your Terraform files are based on.
- Git Repository URL: the URL of the Git repository where your Terraform files reside.
- (Optional) Git Repository Path: the specific directory in the repository where the Terraform files reside.
- (Optional) Private SSH Key: upload an SSH key that has access to the provided Git repository.

Lastly, you have to decide what the behavior of the building block is when it is deleted by the customer user. This can be

- Purge in meshStack: (this is the only option if you have a manual building block) The building block will be deleted
  in meshStack, but no underlying resources (e.g. in a cloud platform) will be deleted. You have to do this yourself.
- Delete Resources: this option will also clean up the underlying resources. The workings depend on the implementation
  type, but e.g. for Terraform meshStack will call `terraform destroy` on the configuration files.

### Dependencies

> Please note that this the use of dependencies is completely optional and this step can be skipped.

In some cases you might find that you have a multiple building block definitions, and one depends on the other.
For example, you might have a Virtual Network, which is a prerequisite for a Virtual Machine.

You can model and enforce such dependencies in meshStack using the Building Blocks feature.

In the wizard, on the "Dependencies" page, you have to select the building block(s) that the _about to be created_
building block depends on. So in the example above you would have to do the following:

1. Create the Virtual Network Building Block without any dependencies.
2. Create the Virtual Machine Building Block and select the Virtual Network as a dependency.

> For Terraform users: you can provide the output of the Virtual Network Building Block as input for the Virtual
> Machine building block.

### Building Block Inputs

As with a lot of configuration, input is required. Building Blocks in meshStack can collect as much input as you want,
in many ways possible.

There are different kinds of inputs, with different behavior, which can be decided under the "Source" section. You can
read in the meshPanel what each kind of input does and how it behaves.

The inputs' behavior can be further decided:

- Provide as: you can decide whether the input is regularly provided or as an environment variable.
  (only applies to Terraform Building Blocks)
- Sensitivity: you can decide that an input is sensitive (e.g. a secret). It will then be encrypted in meshStack and not
  shown to any users.

### Building Block Outputs (Terraform-only)

You can also extract the Terraform outputs into meshStack. This is useful in two scenarios:

1. You want to provide an output variable to a dependent building block. As the example that was mentioned above, if
   you have a virtual machine that depends on the IP Address (? - check) of a virtual network, you can output the
   variable and provide it as an input to the dependent virtual machine building block.
2. You want the customer user to be able to see the output result. This might be useful if there is an output that is
   important to the customer user. They will be able to read the value in their tenant control plane.

Last but not least, save your building block definition, and it will be ready to be consumed by your customer users!

## Developing & Deploying a Terraform Building Block

For Terraform blocks, meshStack will run the required Terraform in the background.

### How to debug

You can view the logs of meshStack running the Terraform files. To do so, go to the Tenant Overview in the Admin Area
and look for a meshTenant that has booked the building block. In there you will be able to find the building block
and read the logs that were written while executing the Terraform.

## Editing Building Blocks

You can edit existing building block definitions, but not all properties are currently editable. Please also read the
descriptions in the meshPanel as the behavior of editing a property of a building block definition depends.

In a future release of meshStack, we will introduce the concept of versioning and make modifications to
building block definitions a more confident and streamlined process.
