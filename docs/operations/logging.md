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

meshStack keeps track of events for auditing and monitoring purposes. You can
find these events in the Event Logs page under the Compliance section in the
Admin Area. These logs help answer questions like:

- Who created a Project? (by typing the Project name under the Event table and
  selecting 'created' in the Type column)
- Who granted or revoked access in a Workspace for a user? (by typing the user's
  name or email in the Change column, the Workspace name in the Workspace
  column, and selecting 'remove' in the Type column)
- What changes were made to Landing Zone settings? (by typing 'Landing Zone' in
  the Event column, selecting 'change' in the Type column, and the Landing Zone
  name in the Change column)"

and more.

Application teams can find Event logs for dedicated Workspaces under the
Compliance section, specifically in the Event Logs subsection. This allows
Workspace Owners and Managers to easily access and review relevant activity
within their dedicated Workspace. Administrators can access Event Logs for all
Workspaces via the Admin Area.

## meshStack Event Logs

Changes (add, change, delete) to key objects in meshStack are logged to provide
traceability. Events capture what happened, when it happened and who triggered
the event.

Workspace Owners and Managers can view events related to their specific
Workspaces in the "Compliance" tab in their workspace. Administrators and
users with the "Auditor" role have access to all events in the "Admin Area"
under "Compliance".

Events can also be exported via API. See the "Event Logs" section in our API
documentation for more details.

At the moment, the following objects are logged:

| Object                          | Events Logged                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Workspace                       | Created, updated, deleted                                                                                                |
| Project                         | Created, updated, deleted                                                                                                |
| ProjectRole                     | Created, updated, deleted                                                                                                |
| Landing Zone                    | Created, updated, deleted                                                                                                |
| Platform Instance               | Created, updated, deleted                                                                                                |
| Tenant                          | Created, updated, deleted                                                                                                |
| Tag Definition                  | Created, updated, deleted                                                                                                |
| User                            | Created, updated, deleted                                                                                                |
| Building Block                  | Created, updated, deleted, Runs requested                                                                                |
| Building Block Definition       | Created, updated, deleted                                                                                                |
| OSB Service Instance            | Created, updated, deleted                                                                                                |
| OSB Service Binding             | Created, updated, deleted                                                                                                |
| meshStack Copilot System Prompt | Created, updated, deleted                                                                                                |
| Payment Method                  | Created, updated, deleted                                                                                                |
| Policies                        | Created, updated, deleted                                                                                                |
| API Keys                        | Created, updated, deleted                                                                                                |
| API Users                       | Created, updated, deleted                                                                                                |
| Admin Settings                  | [Feature Request](https://feedback.meshcloud.io/feature-requests/p/event-logs-for-welcome-and-landing-page-and-settings) |

## API Access Logs

meshStack captures HTTP access logs for all API requests to provide
comprehensive audit trails for incident response and security monitoring. These
logs contain essential information about every request made to the meshStack
API.

### Log Format

API access logs follow this format:

```text
$remoteIP $HttpStatus "$method $fullPath" [$principal] $agent $accept ${duration}ms
```

Where:

- `$remoteIP`: The IP address of the client making the request
- `$HttpStatus`: The HTTP response status code (e.g., 200, 404, 500)
- `$method`: The HTTP method used (GET, POST, PUT, DELETE, etc.)
- `$fullPath`: The complete request path and query parameters
- `$principal`: The authenticated user or API key making the request
- `$agent`: The User-Agent header from the request
- `$accept`: The Accept header from the request
- `${duration}ms`: The request processing time in milliseconds

### Availability

API access logs are available for incident response and security analysis:

- **Managed meshStack**: Our support team can make these logs available upon
  request for incident response purposes. Contact support through your usual
  channels when you need access to these logs.
- **On-premise meshStack**: Customers using meshStack on-premise can arrange for
  custom solutions to ingest these logs into SIEM (Security Information and
  Event Management) systems for real-time monitoring and analysis.

## Authentication Logs

meshStack uses Keycloak as its identity and access management solution. Keycloak
logs capture authentication and authorization events, providing insights into
user activities and security-related events like login attempts.

## meshStack Component Logs

All meshStack components write internal logs to enable error analysis and
troubleshooting. These logs capture detailed information about the operation of
each component, including errors, warnings, and informational messages.

These logs do not contain personal identifiable information.

meshcloud support can access these logs to help troubleshoot issues in meshStack
SaaS instances. For on-premise installations, customers can grant meshcloud
operators access to these logs as needed.

## Personally Identifiable Information

meshStack logs can include usernames and ids of users. This data is required for
the legitimate purpose of providing auditing of user actions for security
incident analysis. This log data is not retained longer than necessary for these
purposes as documented below and is protected according to meshcloud's data
protection policies.

## Retention Times

Log information must be available for as long as it is required for audit and
error analysis reasons. But also data privacy laws have to be considered. So
logs must be deleted after a certain amount of time. The following table shows
the recommended retention times for the different log types. The specific
retention times will be configured individually for a meshStack installation.

| Log-File / DB Entry      | Minimum Retention Time | Maximum Retention Time  |
| ------------------------ | ---------------------- | ----------------------- |
| meshStack Events in DB   | 12 month               | 5 years (configurable)  |
| meshStack component logs | 1 month                | 6 month                 |
| Keycloak Events in DB    | 2 month                | 12 month (configurable) |
| Keycloak logs            | 1 month                | 6 month                 |

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
