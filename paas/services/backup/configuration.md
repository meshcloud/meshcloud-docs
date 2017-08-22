# Configuration of Backup for Services

## Checklist

To configure Backup for Services you should have completed the following steps:

1. Created a Service User \(find documentation at: [Preparation](/paas/services/backup/preparation.md)\)
2. Created a Swift Container \(find documentation at: [Preparation](/paas/services/backup/preparation.md)\)
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

## General

After you have successfully completed the steps above you need to access the Dashboard URL.

1. The Dashboard page is loading after you have entered the Dashboard URL 
2. When you are logged in, you will be directly redirected to the Dashboard Overview. If you are not logged in, you will be redirected to the Meshfed SSO Login. To login, please read [Logging in via Meshfed SSO](/profile.md)
3. After a successful login and the **first** access of the Dashboard URL you will be asked to authorize the access of the Service. Click on **Authorize** to proceed
4. When you have completed the steps above, you are all set and you can continue to create the Service File Endpoint and Backup Plan Configuration

## Configure a File Endpoint

First we need to create a File Endpoint \(if you want to know what a File Endpoint is, please continue to read here: [Backup](/paas/services/backup.md)\). To create a File Endpoint, please follow the steps below:

1. In the Dashboard Overview, you should see the following sections: File Endpoints, Backup Plans, Backup Jobs
2. To create a File Endpoint click on the `Create File Endpoint`button and fill presented form with the Credentials of the Service User you created beforehand.

3. Click on `Validate`if the system can authenticate the systems prompts you an `Submit`button to save the File Endpoint. If an error is presented please check the  your input and try again.

## Configure a Backup Plan

To create a regular backup you can configure multiple Backup Plans. To create a Backup Plan folly the steps below:

1. If you haven't already done so create a File Endpoint first.

2. In the Backup Overview click on the `Create Backup Plan`button in the **Backup Plan** section.

3. Fill in the presented form.

   1. Frequeny: When should the backup be executed? You must provide an cron type string with 6 fields.   
      For example `* * */5 * * *` every 5-hours

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



