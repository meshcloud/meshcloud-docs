---
id: meshstack.user-group-provisioning
title: User & Group SCIM Synchronisation
---

Provisioning users and groups to meshStack works based on the [SCIM 2.0](http://www.simplecloud.info/) standard.
We provide an SCIM API that enables external systems such as an Azure Active Directory (AAD) to directly
manage up-to-date user and group information within meshStack. `Provisioning` means changes about users and groups
in the external system are automatically mirrored to the provisioned equivalents in meshStack. For example, when
the members of a certain AAD group are changing and provisioning is set up, those changes will be reflected in the group within meshStack as well
without additional effort. That way we can model the complete lifecycle of users and groups automatically.

## Provisioning with SCIM

SCIM clients are the source for users and groups. They need to address users and groups in order to manage the creation,
updates and deletion. Because they cannot know user or group identifiers in advance they will attempt to find a user or
group by a unique attribute:
for users it selects the `userName`, for groups it uses the `displayName`. As a result these fields need to be unique.
To support a wider range of userName formats, meshStack will look up users by their username and uses the email
as a fallback.

**Attention** Each SCIM client handles requests a bit differently. The way the scope of the synchronization is specified plays a huge role when it comes to load and performance. Because of this we specify the officially supported amount of groups and users for each client for now. For the AAD SCIM client we support the synchronization of an unlimited amount of groups with a maximum of 250 users each at the moment. If you want to sync more users please reach out to us via support@meshcloud.io.

### Example

The AAD as an SCIM client looks up an existing user by calling:

```sh
GET .../api/scim/v2/Users?filter=userName+eq+"johndoe@company.com"
```

Let's assume there is a user with the username `johndoe@company.com`, then meshStack will then answer with an SCIM ListResponse containing
the matching UserResource, e.g. like this:

```json
{
  ...
  "Resources": [
    {
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ],
      "id": "54fbbbaa-c80c-49df-b13d-27133cb81740",
      "userName": "johndoe@company.com",
      ...
    }
  ],
  ...
}
```

From that response the AAD retrieves the user's id and can from now on refer to this user with the identifier `54fbbbaa-c80c-49df-b13d-27133cb81740`.
Let's further assume that the AAD wants to update the members of a group with the identifier `d90c1657-63b1-44be-8cdc-e3a8ffc5a7d1` and the aforementioned user
is the only member, then the AAD will send the following PatchOperation:

```sh
PATCH .../api/scim/v2/Groups/d90c1657-63b1-44be-8cdc-e3a8ffc5a7d1
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:PatchOp"
    ],
    "Operations": [
        {
            "op": "Add",
            "path": "members",
            "value": [
                {
                    "value": "54fbbbaa-c80c-49df-b13d-27133cb81740"
                }
            ]
        }
    ]
}
```

## SCIM API limitations

The SCIM standard introduces comprehensive functionality to work with user and group resources.
The implementation of meshStack's SCIM API does not support all features of SCIM. Here is a list of current limitations:

- SCIM endpoints on `/ResourceTypes` and `/Schemas` are not supported
- Filtering options to search resources are reduced:
  - For users: only simple equals filters on *one* of the following fields: `id`, `userName`, `externalId`
  - For groups: only simple equals filters on *one* of the following fields: `id`, `displayName`
- The parameter for excluded attributes in the search endpoints is limited:
  - For users to: `name`, `userName`, `emails`
  - For groups to: `members`, `displayName`

## Global Groups

The established concept of a group in meshStack is called a "meshCustomerUserGroup". Those are always related to a meshCustomer,
so they exist with a relation to one.  With the provisioning of users and groups to meshStack we introduce a new type of
groups called "global groups". Those are not owned by a meshCustomer but are rather available to all of them.
They cannot be modified manually or programmatically but are synced only via an external system, in this case an Azure AD.
Assignment of global groups to meshCustomers and meshProjects within the meshPanel works the same way as it does for meshCustomerUserGroups.

## AAD Configuration

The following guide shows how an AAD can be configured to enable SCIM user and group provisioning to meshStack. In order
to connect to meshStack you will need a Basic Authentication user with permissions to access the SCIM Api. Please refer
to the [Authentication](https://docs.meshcloud.io/api/index.html#authentication) section within the API Docs for the credentials configuration.

### General Setup Steps

To set up the provisioning on AAD side, have a look at [Microsoft's guideline](https://docs.microsoft.com/en-us/azure/active-directory/app-provisioning/configure-automatic-user-provisioning-portal) and please follow these steps:

1. Create a new non-gallery Enterprise Application (EA) in your AAD that is dedicated to the provisioning. A step-by-step guide is available [here](https://docs.microsoft.com/en-us/azure/active-directory/app-provisioning/use-scim-to-provision-users-and-groups#getting-started).
2. In the EA set up the meshStack endpoint as target API:
   1. Go to the "Provisioning" section and then to "Admin Credentials"-
   2. Use your meshStack's URL as endpoint: `<meshStack>/api/scim/v2/`.
   3. Set the Basic Auth Credentials as "Token" (without `Basic` prefix).
3. Decide on how to set up the scope of users / groups that should be provisioned. Therefore, go to the "Settings" menu within "Provisioning". You can either:
   1. Sync only users and groups that are assigned to your EA.
   2. Sync all users and groups from your AAD.
4. Limit the scope of users and groups. This is a very important step to make sure that not all users and groups from your directory are synced. Go to "Provisioning", then "Mappings" and then to "Users" / "Groups". For users and groups you can separately define Scoping Filters that apply filter rules to whitelist the users / groups to provision. Make sure to have a look at the [official guidelines](https://docs.microsoft.com/en-us/azure/active-directory/app-provisioning/define-conditional-rules-for-provisioning-user-accounts#create-scoping-filters) from Microsoft.
    - Add filter rules by navigating to the `Attribute Mapping`, then go to `Source Object Scope` and select `Add scoping filter`. This applies for both groups and users.
    ![assets/aad_provisioning_scim/scim_source_object_scope.png](assets/aad_provisioning_scim/scim_source_object_scope.png)

5. In the Mapping for Users make sure that you have the mappings configured as described in the [user mappings table](#user-mappings-table) and remove all other mappings. Note that the externalId attribute should be mapped to the AAD Attribute that is used as the euid in meshStack.
6. Start the provisioning process and regularly monitor the provisioning logs.

### User Mappings Table

| AAD Attribute                                                 | SCIM app attribute (meshStack)             |
|---------------------------------------------------------------|--------------------------------------------|
| userPrincipalName                                             | userName                                   |
| Switch([IsSoftDeleted], , "False", "True", "True", "False")   | active                                     |
| displayName                                                   | displayName                                |
| mail                                                          | emails[type eq "work"].value               |
| givenName                                                     | name.givenName                             |
| surname                                                       | name.familyName                            |
| Join(" ", [givenName], [surname])                             | name.formatted                             |
| Attribute which is used as euid in your meshStack             | externalId                                 |
