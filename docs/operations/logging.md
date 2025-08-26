---
id: logging
title: Logging & Auditing
---

meshStack consists of different components. On the one hand there are first
party components, like meshfed and kraken. Additionally, there are services like
Keycloak (used for authentication and authorization) and databases. In order to
provide central access to the log files for meshcloud operators, a central
logging system build around Loki and Grafana is used to collect logs and make
them available for error analysis.

meshStack keeps track of events for auditing and monitoring purposes. You can find these events in the Event Logs page under the Compliance section in the Admin Area. These logs help answer questions like:

- Who created a Project? (by typing the Project name under the Event table and selecting 'created' in the Type column)
- Who granted or revoked access in a Workspace for a user? (by typing the user's name or email in the Change column, the Workspace name in the Workspace column, and selecting 'remove' in the Type column)
- What changes were made to Landing Zone settings? (by typing 'Landing Zone' in the Event column, selecting 'change' in the Type column, and the Landing Zone name in the Change column)"

and more

Application team could find Event logs for dedicated Workspaces under the Compliance section, specifically in the Event Logs subsection. This allows Workspace Owners and Managers to easily access and review relevant activity within their dedicated Workspace.

## Logging Actions on meshObjects and Users

Changes (add, change, delete) to data are logged to provide traceability.
Regarding logging of personal user data, meshStack only logs the Username or the
Keycloak Id of the user. No further personal information is logged.

| Event                                                                           | meshStack page (Where)                 |
| ------------------------------------------------------------------------------- | ---------------------------------------|
| Created / Changed / Deleted for Workspaces; Projects; Platforms                 | Event Logs (Admin Area & in Workspace) |
| Created / Deletion Requested / Deleted for Tenants                              | Event Logs (Admin Area & in Workspace) |
| Replication to cloud platform                                                   | Tenant Details (Admin Area)            |
| Created / Changed / Deleted for Landing Zones                                   | Event Logs (Admin Area)                |
| Added / Changed / Removed for Users in Workspaces and Projects                  | Event Logs (Admin Area & in Workspace) |
| Authentication ((invalid) Logins, Logout, Timeout of session, …)                | On request                             |
| Interactions with Service Brokers (create/update/delete instance & bindings)    | On request                             |

## Logging of Business-Related Administrative Access

Administrators have access rights, that exceed the normal user’s
capabilities. Therefore administrative actions require special control and
traceability.

| Event                                          | meshStack page / DB-Table (Where)                |
| ---------------------------------------------- | -------------------------------------------------|
| Assign yourself to a Workspace                 | Event Logs (Admin Area & in Workspace)           |
| Change Workspace and Platform quota            | Event Logs (Admin Area & in Workspace), mesh.log |
| Update financial information of a Project      | Event Logs (Admin Area & in Workspace), mesh.log |
| Send message to Workspace                      | mesh.log                                         |
| Deletion of a user                             | User table in deletedOn and deletedBy fields     |

## Security Relevant Events

This section overlaps in some parts with the previously mentioned log files, but
it summarizes all logs that are written for security related actions, like
giving and revoking access.

| Event (What?)                                                         | meshStack page / Log-File / DB-Table (Where)     |
| --------------------------------------------------------------------- | ---------------------------------------------    |
| Successful and denied login attempts, as well as logouts              | Keycloak Events, events.log                      |
| Created, changed, deleted Workspaces                                  | Event Logs (Admin Area & in Workspace), mesh.log |
| Password changes - Authorization via meshIdB                          | Keycloak Events, events.log, mesh.log            |
| Password changes - Authorization via federated IdP                    | Federated IdP                                    |
| Access Right changes (i.e. user rights)                               | Event Logs (Admin Area & in Workspace), mesh.log |
| Changes to logging configuration (especially deactivation of logging) | Can only be done by meshcloud, no logging atm    |
| Start and stop administrative processes (Batch-Jobs)                  | mesh.log                                         |

## Structure / Content, Format and Retention

### Structure

All log file entries always contain a formatted UTC timestamp and the log level.

### Keycloak Log

The Keycloak log only contains operational information. It is mainly used for
error analysis. Therefore only a few fields are provided in this log file.

- Class that wrote the log entry
- Name of current thread
- Message

### Keycloak Event Log

Keycloak writes all User and Admin Events into its database by default.
Additionally, those events can also be written to log files. In meshStack
writing to events.log is enabled. The log file contains the following
information:

- Name of current thread
- In which realm did the event occur
- Which keycloak client has been used
- Keycloak User Id of the user who triggered the event
- Client IP Address

Login Events:

- Event Type: LOGIN, LOGIN_ERROR, LOGOUT, …
- Event specific details, like identity provider used for login, or redirect_uri
  after logout

Admin Events:

- Operation Type: CREATE, UPDATE, DELETE
- Resource Path (which REST resource has been called)

### meshStack Service logs

The different meshStack services are all based on Spring Boot and write
structurally identical log files. The default Spring Boot log format is used.

- Process Id
- Name of current thread
- Class that wrote the log entry
- Message

It should be considered for the future to also log the userId, to correlate log
entries to user actions.

### Format

All log file entries always start with an UTC datetime. This is followed by the
log-level (DEBUG, INFO, WARN, ERROR, ...).

#### Log in Keycloak

`<timestamp> <log-level> [<class-name>] (<thread-name>) <message>`

Example:

`2018-10-23 05:42:34,357 WARN [org.keycloak.authentication.authenticators.browser.IdentityProviderAuthenticator] (default task-40) Provider not found or not enabled for realm`

#### Event Log in Keycloak

`<timestamp> <log-level> [<package-name>] (<thread-name>) type=<type>, realmId=<realmId>, clientId=<clientId>, userId=<userId>, custom-property=<custom-property>`

Dependent on the event type, multiple custom properties can be set.

Example Login Event:

`2018-08-30 16:18:29,916 DEBUG [org.keycloak.events] (default task-37) type=LOGIN, realmId=meshfed, clientId=meshfed-oidc, userId=4654c50d-2782-43c5-8be3-f89ee138b71e, ipAddress=10.2.28.155, identity_provider=cloudidp, redirect_uri=https://panel.meshcloud.io, consent=no_consent_required, identity_provider_identity=my-user-id, code_id=5b05b056-bc47-4a82-ab61-b5aa4968e4f3, username=my-user-id`

Example Admin Event:

`2018-08-30 16:36:26,889 DEBUG [org.keycloak.events] (default task-35) operationType=UPDATE, realmId=master, clientId=200c6050-d7d1-4430-914a-f45ab139e494, userId=e7a64cb7-b692-4af0-b965-f3efba739815, ipAddress=11.12.13.14, resourcePath=clients/f99f22d7-87d7-4f4e-8235-23e07f58974e/roles/my-workspace|my-project-noadmin`

#### Logs in meshStack services

`<timestamp> <log-level> <process-id> --- [<thread-name>] <class-name> : <message>`

Example:

`2018-10-23 10:36:49.771  INFO 47534 --- [ask-scheduler-8] d.c.web.project.ProjectDeletionService   : 0 project(s) have been deleted in the platforms`

## Retention Times

Log information must be available for as long as it is required for audit and
error analysis reasons. But also data privacy laws have to be considered. So
logs must be deleted after a certain amount of time. The following table shows
the recommended retention times for the different log types. The specific
retention times will be configured individually for a meshStack installation.

| Log-File / DB Entry         | Minimum Retention Time | Maximum Retention Time |
| --------------------------- | ---------------------- | ---------------------- |
| Keycloak Events in DB       | 2 month                | 12 month               |
| Keycloak Events in log file | 1 month                | 6 month                |
| Keycloak Logs               | 1 month                | 6 month                |
| meshStack component logs    | 1 month                | 6 month                |
| meshStack Events in DB      | 12 month               | 5 years                |

## Deletion Process of Log Files

As all components use logging frameworks, these frameworks are configured to
automatically delete log files after a configured period of time.

The retention time of Keycloak Events in the Keycloak Database is configured
within Keycloak. It is a configuration option of the tool.

meshStack events are deleted by a weekly job, that checks, whether events
exceeded the defined lifetime.

As the database is also backed up, deleted events will persist in the backup, as
long as the backup exists. Database backups of meshStack and Keycloak are
persisted for a configured amount of time (e.g. 24 days).

## Location of Log Files

All log files are stored locally in the VM, container or PaaS system, where the
component is running. For these instances user authentication is required (e.g.
via SSH with a private key) to access their logs.
