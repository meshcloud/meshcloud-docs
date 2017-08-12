# Backup Services

For all data services like Database, Document Stores and other content related services we offer a basic Backup and Restore integration. For Services like MariaDB for example we rely on `mysqldump.`

We chose to take this approach to enable customers an easy integration with existing Backup and Restore methods they know from general interaction with their Database and Document Store.

## Availability

The Backup Feature is included in **all Services **independent of the level of Services.

_We may restrict this in future release depending on the load, but our Backup Features architecture enables a cloud-native scalability._

## Terminology

### File Endpoint {#file-endpoint}

A File Endpoint is a Swift Container, which needs to be configured in the IaaS section of our application. Please see [Preparation](/paas/services/backup/preparation.md) how to setup your Swift Container for your File Endpoint. You can reuse this File Endpoint in all Backup Plans/Backup Jobs of the specific service.

### Backup Plan {#backup-plan}

A Backup Plan configures a the backup schedule for your Service. The Backup Service offers multiple options to configure your backup schedule based on number of files, retention based on days, weeks and months. As all backups a stored in your Swift Container, you have full control over your costs the all files being created by the Backup Service.

### Backup Job {#backup-job}

A Backup Job is an executed backup of your Service. The Backup Job contains all essential information regarding the backup task like start time, execution time, File Endpoint and possible error/success messages.

