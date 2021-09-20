---
id: meshcloud.policies
title: meshPolicies
---

## Introduction: what are meshPolicies?

A meshPolicy is a set of rule(s) between two [meshObjects](meshcloud.index.md#introduction) that are globally defined by your organization. Each rule describes what [tag](meshcloud.metadata-tags.md) values have to be present on both meshObjects, in order to comply with the meshPolicy. meshPolicies are enforced in various places when attaching meshObjects. How meshPolicies can be configured is described [here](administration.mesh-policies.md).

### meshPolicies for meshUsers/Groups

meshUsers and meshCustomerUserGroups are treated as one when it comes to meshPolicies. You can only define a policy for "meshUser/Group". Those policies will always apply to both meshObject types. It is not possible to define a policy that only matches meshUsers, but not meshCustomerUserGroups. The reason for that is, that you can assign both meshObject types (meshUsers and meshCustomerUserGroups) to meshCustomers and meshProjects. If you want to restrict this access to e.g. only allow access to production for certains users and groups, the policy always has to apply to both meshObject types. It wouldn't make sense to restrict only the assignment of groups, but you could still assign any user. Because of that, you can only select "meshUser/Group" as a policy subject in a meshPolicy.

meshUsers exist on a global level and are not related to a specific meshCustomer. If you want to define a meshPolicy to only provide certain meshUsers/Groups access to a e.g. production projects, the following aspects have to be considered:

1. If a user is globally defined to have access to any production project, you can add the production environment tag to that user, so this user gets access to all production projects in all meshCustomers.
2. If you want to maintain per meshCustomer who has access to production projects, you have to use [meshCustomerUserGroups](./meshcloud.customer.md#user-groups) for that. It is not possible to assign a single meshUser certain tags within a certain meshCustomer.
3. In order to provide easy access to "unrestricted" projects (e.g. those with environment "dev" and "qa") we provide [default tags](./meshstack.metadata-tags.md#tags-on-meshusers) for meshUsers. meshStack makes sure that these default tags are applied to all users.

### When am I impacted by meshPolicies?

> If your organization has no policies defined at all, the information below is not relevant.

Note that it depends if your organization uses policies and on which meshObjects they are applied. We will discuss all possible places here.
You may encounter policies in the meshPanel when doing any of the following actions:

1. Creating a new project
    1. When adding a meshPlatform with a meshLandingZone to a new project, all policies are evaluated between a 'meshProject' and a 'meshLandingZone'
    2. Upon saving a new project, all policies between 'meshCustomer' and 'meshProject' are evaluated.
2. Editing a project
    1. When adding a new meshTenant with a meshLandingZone all policies are evaluated between the 'meshProject' and the selected 'meshLandingZone'.
    2. When adding a new meshUser or meshCustomerUserGroup to a meshProject, all policies are evaluated between the 'meshProject' and the 'meshUser/Group'.
    3. When changing a tag value (e.g. changing the environment) of a project, **all** policies related to the meshProject are evaluated as it impacts many meshObjects. The following meshObjects will be evaluated on to the project:
        - the meshCustomer the project lives in
        - all assigned meshLandingZones
        - all assigned meshUsers
        - all attached meshCustomerUserGroups
3. Adding a meshUser or meshCustomerUserGroup to a meshCustomer. All policies between 'meshCustomer' and 'meshUser/Group' are evaluated on the given 'meshCustomer' and 'meshUser/Group'.

### What happens when I violate a meshPolicy?

It might happen, consciously or unconsciously, that you violate one or more policies. At every place in the meshPanel that is mentioned above this section, we prevent you from finalizing the violation and you will be prompted with an error message explaining which meshPolicy or policies you violated, and why.

Take this policy violation as an example (see the picture below), where we have a meshPolicy defined on 'meshCustomer' and 'meshProject', both on the `environment` tag.

![Example Policy Error Message](assets/mesh_policies/policies_example_error_message.png)

The project that is being created called 'my-example-project-prod' wants environment `prod` and the meshCustomer 'managed-customer' the project is being created in, has environments `dev`, `test` and `qa` defined. This means there is a mismatch as `<prod>` is not inside `<dev, test, qa>`. In order to solve this problem, we have to pick an environment that is defined on the meshCustomer, e.g. `dev`. After picking a valid environment value, we can save the project again, and (if we don't violate any further policies) the project is successfully created, including the right compliance for your organization! ✅

### Are there any other places where policies are enforced?

Besides end-users being impacted at the places above, there are also other places where policy violations could be caused. The diagram below describes all possible relationships between meshObjects and the behavior that is expected, depending on who is doing the change.

![Policy Relationships](assets/mesh_policies/policy_relationships.png)

The purple arrows describe an action done by administrators, and red arrows describe an action done by end-users (e.g. Customer Admins), which is what was discussed above this section.

The purple arrows indicate a 'soft' violation, meaning that the change will actually be accepted. These soft violations are only able to happen by administrators' changes, meaning the cloud foundation team of your organization. For example, if a member of the cloud foundation team decides to move a meshLandingZone from `dev` environment to `prod` environment, all projects attached to that meshLandingZone might end up in a 'non-compliant state' because of the violations that could occur. Partners and Customer Admins will be able to see what violation(s) are currently active on a per-customer basis and can attempt to resolve the violation(s).

### What are some examples?

> Note: the information below might be more relevant for administrators, but nevertheless it should give you a rough idea on how policies could be implemented.

Your organization is fully free to define policies across the entire meshStack. A few common use cases are:

1) Enforcing that a meshProject is used for an environment that is also defined on its meshCustomer.

    Imagine a meshCustomer with `environment=[sandbox, test]`. If there is a meshPolicy in place between meshCustomers and meshProjects on the environment tag, users cannot create new meshProjects that use an environment that is **not** available on the meshCustomer, for example `environment=[prod]`.

2) Enforcing that a meshProject only has meshUsers/Groups that are allowed access highly confidential projects or production projects.

3) Enforcing that a meshProject only has meshLandingZones assigned to it that are meant for the environment of the meshProject.

4) Enforcing that a meshProject only has meshLandingZones assigned to it that are meant for the given business unit of the meshProject.

### How are meshPolicies evaluated

As mentioned before, meshPolicies are built on top of meshStack's [tagging](./meshcloud.metadata-tags.md) system. This is done by evaluating two meshObjects on their tags. There is no "direction" in a meshPolicy: the meshObjects are evaluated bi-directionally. It does not matter if you have a meshPolicy for "meshCustomer & meshProject" or "meshProject & meshCustomer", the policy evaluation is equal.
If a policy is defined, the two meshObjects' tags will be evaluated on a so-called set intersection. This means that for either tags, at least one value must be present on both sides for a successful evaluation. If neither side have the given tag, the policy is also successful.
To make this more clear, the table below describes certain conditions and their behavior when policies are applied on tags.

In this example, we're looking at a meshPolicy between a meshProject's `environment` tag, and a meshCustomer's `environment` tag with the following allowed values: `dev`, `qa`, and `prod`.

| meshProject  | meshCustomer | Result | Explanation |
| ------------ | ------------ | ------ | ----------- |
| `prod`       | `prod`       | ✓      | Both tags contain the value `prod` |
| `prod`       | `dev`, `qa`  | ✖      | There is no overlapping value |
| < empty >    | `dev`        | ✖      | There is no overlapping value, the meshProject has no tag values at all |
| < empty >    | < empty >    | ✓      | Both tags have no values, which equates to a successful evaluation |
| `prod`, `qa` | `qa`, `dev`  | ✓      | Both tags contain at least one matching value: `qa` |

Keep in mind that some tags might be so-called "single-select" or "multi-select" values. For policy evaluations, all tags are treated as arrays: no matter if there are no values, a single value, or multiple values. This means you can also create a meshPolicy that evaluates a single-select value against a multi-select value.
