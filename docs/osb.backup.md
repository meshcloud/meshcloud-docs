---
id: osb.backup
title: Backup & Restore
---


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

## Preparing Automated Backup

To use the Backup Service for Databases, Document Stores and other content related services you need to configure the Meshcloud Platform accordingly.

### Configure a Service User

As you should never use your personal Account for the configuration of a File Endpoint it is highly recommend you create a Service User. The following steps describe how to create a Service User:

1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io)

2. If not logged in, please login with your personal credentials

3. On the Welcome Dashboard, please select the Location & Project where you want to create your Swift Container for the Backup Files

4. After selecting a Location & Project choose in the Menu Bar on the left **Tools &gt; Service Users**

5. On the form enter a description for the Service User, e.g. _PaaS Backup Service User _

6. In the Platform Section select OpenStack DARZ

7. Click on the ![](/assets/plus-sign.png) to add the Service User

8. Note down the password, as it won't be visible and/or recoverable anymore

9. You have now successfully created a Service User

### Configure a Swift Container

Doing backups in Cloud Environments is heavily dependent on Object File Stores like Swift. To successfully configure a File Endpoint for your Service it is necessary that you configure a Swift Container before. Follow the steps below to create a Swift Container.

```
Please be aware, that Service Users are per Location and Project. That means, you need to create the Swift Container 
on the same Location and Project as you did it for the Service User.
```

1. Navigate to [https://panel.meshcloud.io](https://panel.meshcloud.io)

2. If not logged in, please login with your personal credentials

3. On the Welcome Dashboard, please select the Location & Project where you want to create your Swift Container for the Backup Files

4. After selecting a Location & Project choose in the Menu Bar on the left **Storage &gt; Blobs**

5. Enter the Name of the Swift Container and press the ![](/assets/plus-sign.png)

6. You have now successfully created a Swift Container


## Configuration of Backup for Services

### Checklist

To configure Backup for Services you should have completed the following steps:

1. Created a Service User
2. Created a Swift Container
3. Created a Service via `cf marketplace`
4. Accessed the Service Dashboard via `cf service yourServiceName` picking the Dashboard URL. E.g. 
   ```bash
   Service instance: sample
   Service: Sample-DEV
   Bound apps: 
   Tags: 
   Plan: S
   Description: Sample Instances
   Documentation url: 
   Dashboard: https://example-dev.cf.eu-de-netde.msh.host/v2/dashboard/0f377a9a-7f4e-4965-b226-04c05d493db9
   ```

### General

After you have successfully completed the steps above you need to access the Dashboard URL.

1. The Dashboard page is loading after you have entered the Dashboard URL 
2. When you are logged in, you will be directly redirected to the Dashboard Overview. If you are not logged in, you will be redirected to the Meshfed SSO Login. To login, please read [Logging in via Meshfed SSO](/profile.md)
3. After a successful login and the **first** access of the Dashboard URL you will be asked to authorize the access of the Service. Click on **Authorize** to proceed
4. When you have completed the steps above, you are all set and you can continue to create the Service File Endpoint and Backup Plan Configuration

### Configure a File Endpoint

First we need to create a File Endpoint \(if you want to know what a File Endpoint is, please continue to read here: [Backup](/paas/services/backup.md)\). To create a File Endpoint, please follow the steps below:

1. In the Dashboard Overview, you should see the following sections: File Endpoints, Backup Plans, Backup Jobs
2. To create a File Endpoint click on the `Create File Endpoint`button and fill presented form with the Credentials of the Service User you created beforehand.

3. Click on `Validate`if the system can authenticate the systems prompts you an `Submit`button to save the File Endpoint. If an error is presented please check the  your input and try again.

### Configure a Backup Plan

To create a regular backup you can configure multiple Backup Plans. To create a Backup Plan folly the steps below:

1. If you haven't already done so create a File Endpoint first.

2. In the Backup Overview click on the `Create Backup Plan`button in the **Backup Plan** section.

3. Fill in the presented form.

   1. Frequency: When should the backup be executed? You must provide a cron type string with 6 fields.  
      Example: Each value is separated by a space. `* * 5 * * *` means everyday at 5 o'clock, while `* * */5 * * *`  means every 5 hours. 

      1. The first field represents for **seconds. **Valid values are 0-59

      2. The second field represents for** minutes. **Valid values are 0-59

      3. The third field represents **hours. **Valid values are 0-24

      4. The fourth field represents **the day of the month. **Valid values are 1-31

      5. The fifth field represents the **month.** Valid values are 1-12

      6. The sixth field represents the **day of the week. **Valid values are 0-6 with 0 being Sunday.

   2. Retention style and Retention Period define how may backup files should be stored.

      1. **ALL** keeps all files, ignores the Period.

      2. **FILES** keeps a number of backup files. The amount can specified via the period field.

      3. **HOURS **deletes all backup files older than the number of hours specified in the period field.

      4. **DAYS** deletes all backup files older than the number of days specified in the period field.

   3. Select the destination where the backups should be stored.



