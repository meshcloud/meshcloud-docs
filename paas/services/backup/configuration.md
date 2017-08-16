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
2. When you are logged in, you will be directly redirected to the Dashboard Overview. If you are not logged in, you will be redirected to the Meshfed SSO Login. To login, please read [Logging in via MeshFed SSO](/profile.md)
3. After a successful login and the **first** access of the Dashboard URL you will be asked to authorize the access of the Service. Click on **Authorize** to proceed
4. When you have completed the steps above, you are all set and you can continue to create the Service File Endpoint and Backup Plan Configuration

## Configure a File Endpoint
First we need to create a File Endpoint (if you want to know what a File Endpoint is, please continue to read here: [Backup](/paas/services/backup.md)). To create a File Endpoint, please follow the steps below:

1. In the Dashboard Overview, you should see the following sections: File Endpoints, Backup Plans, Backup Jobs
2. 


## Configure a Backup Plan



