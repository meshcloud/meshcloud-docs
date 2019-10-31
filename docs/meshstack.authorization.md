---
id: meshstack.authorization
title: Authorization
---

As described in [Identity Federation](meshstack.identity-federation.md) a SSO solution to access multiple cloud platforms is a central feature of meshStack. This section about **Authorization** describes in details on which level and how authorization is granted.

## User Groups

On top level there are two different types of meshCustomers available. On the one hand a [consumer meshCustomer](meshcloud.customer.md) who is responsible for his own projects. On the other hand a [partner meshCustomer](administration.index.md), who can manage multiple assigned meshCustomers.

For both meshCustomer types different groups can be assigned to the users. For **consumer meshCustomer** the available groups and the functionality they have access to is described [here](meshcloud.groups.md). For **partner meshCustomer** the overview of groups and what they have access to is available [here](administration.index.md).

Besides this access control on meshCustomer level, users also have to be assigned to the projects of a customer, which is described [here](meshcloud.project.md#manage-meshprojects).

### User Project Role Approval

In case you are required to implement a 4-eye-principle for user role assignment for compliance puposes you can configure the meshStack to do so. By setting:

```yml
web:
  user:
    rolerequest:
      min-approval-count: 2 # Number of approvals from customer admins
```

If this option is set to 2 or higher upon project user invitation a popup will ask the inviting user to enter some additional information like why this role is required and for how long. These information will be visible to customer administrators who then can accept or decline such a request.

<figure>
  <img src="assets/authorization.additional-role-info.png" style="width: 50%;" alt="Additional Information Role Request Popup">
  <figcaption>Popup requesting additional information for a project role assignment</figcaption>
</figure>

New project role assignments must be approved before the assignment takes effect. The customer admin making the role request registers an implict approval of the request. Each customer admin can only reqister a single approval for a role request. This ensures that a _different_ customer admin must register the 2nd approval before the assignment takes effect.

Customer admins will be notified by email about pending approvals. The affected user is also informed via mail about approved or rejected role requests.

When any customer admin declines the role request, the role request is immediately cancelled.

> Note: When a customer has less customer admins than the requested `min-approval-count`, role requests will get automatically approved when all customer admins have registered an approval. The Panel can be configured to display a warning in this case.

Its recommended to configure a warning to be shown to the user if this happens so another admin can be invited to the customer. To do so the config for the panel must include the following flag.

```json
{
  mesh: {
    dashboardNotification: {
      show4EyePrincipleWarning: true
    }
}
```

Removal of roles currently works without asking for permission.

## Authentication

The authentication of a user in meshStack and all Cloud Platforms is done via the meshIdB as described in [Identity Federation](meshstack.identity-federation.md).

## Authorization in Cloud Platforms

There are two different ways how to apply access rights to the Cloud Platforms. Some Platforms can use the rights that are set in the OIDC or SAML token provided by the [meshIdB](meshstack.identity-federation.md). This is the preferred solution, but not all cloud platforms support this approach. Therefore the second option is the replication of the ACLs during project replication to the Cloud Platforms.

### Authorization via OIDC

In order to provide users access to their cloud resources, all relevant authorization information about a meshUser is stored in the corresponding meshIdB user. To provide the authorization information in the token, the request for the token must be scoped to a specific customer of the user. The tokens provided by Keycloak contain the scoped customer and the according group on this customer as well as information about the projects he has access to.

The following claims in the OIDC token represent this information and can be used by the cloud platforms to apply the access rights.

```json
{
  ...
  "MC_PROJECTS": [
    "project1-noadmin",
    "project2-noadmin"
  ],
  "MC_CUSTOMER": "my-customer",
  "MC_GROUPS": [
    "Customer Admin"
  ],
  "preferred_username": "user@meshcloud.io",
  "email": "user@meshcloud.io",
  ...
}
```

The **MC_PROJECTS** claim contains all projects the user has access to in the scoped meshCustomer. The **MC_GROUPS** also contain only the Groups the user is assigned to in the current customer. This claim is currently defined as an array for future flexibility. Currently a user can only have one group assigned per meshCustomer.

#### OpenStack

As OpenStack has to scope authorization to a sepcific project, the token from the meshIdB is also scoped to a specific project in the request. The project information can then be read from the **MC_PROJECTS** claim in the token provided by the meshIdB. OpenStack maps this attribute to a local Group associated with the project, that contains the previously mentioned roles.

Project Users get the following OpenStack roles:

- _member_
- heat_stack_owner
- creator

The actual access rights associated with these roles are managed by the OpenStack instance and are not part of meshStack.

More details about the User Federation with OpenStack can be found [here](meshstack.openstack.index.md).

### Authorization via replication

For platforms that don't support the [Authorization via OIDC](#authorization-via-oidc), access rights are replicated during project replication. Cloud platforms provide their own ACL system and meshStack configures it as defined in the meshProject. E.g. this could be an assignment of certain roles for a certain project in the cloud platform.

#### Cloud Foundry

When users are replicated to the UAA of Cloud Foundry they always get the “Org User” and “Space Developer” role. With these roles, they are limited to managing resources in their assigned projects. Access management and creation of new projects is not possible with these roles. The actual access rights associated with these roles are managed by Cloud Foundry and are not part of meshStack.
Cloud Foundry uses the Identity broker only to authenticate users. Authorization is done as described before via roles set by meshStack.

#### AWS

The Project User Roles are mapped to [AWS IAM Roles](https://docs.aws.amazon.com/de_de/IAM/latest/UserGuide/access.html), which are the authorization roles in AWS. The access rights associated with these IAM roles is not part of meshStack.

## Service User

[Service Users](meshcloud.service-user.md) are technical users, that can be created per platform instance in a project. They are mainly used in CI/CD pipelines. They are local platform users and can therefore only be used to access a specific project in a specific cloud platform. The password of such a generated user is only downloaded once when a service user is created. It is a random generated, 24 characters long password generated with Java's SecureRandom class. meshStack does not store this password. It is the user’s responsibility to safely store it. If the password is somehow compromised, the service user can easily be deleted and replaced by a new service user.
Service Users are available for Cloud Foundry and OpenStack cloud platforms. Other cloud platforms supported by meshStack like AWS or Kubernetes offer superior “native” alternatives to service users (i.e. [IAM Policies](https://docs.aws.amazon.com/de_de/IAM/latest/UserGuide/access_policies_manage.html) & Credentials, ServiceAccounts).
A Service User can be created and deleted by all users assigned to the project. Information about the Service User creator is available in meshStack. The creator is responsible for the secure usage of theis Service User.

## User Revocation

User Revocation on [project](meshcloud.project.md#unassign-user-from-a-meshproject) and [customer](meshcloud.customer.md#remove-users-from-a-meshcustomer) level allow Customer Admins to always limit access to the meshCustomer and meshProjects to the users that actually need access. Users who no longer should have access can easily be revoked access. Administrators also have the possibility to revoke access of a user to all meshCustomers and meshProjects and deactivate this user completely in the complete meshStack via the [delete user](administration.users.md#delete-user) functionality.

Users who e.g. left the company, can automatically be revoked in meshStack as described [here](meshstack.user-revocation.md).
