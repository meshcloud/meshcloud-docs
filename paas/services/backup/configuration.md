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

## Configure a File Endpoint
When you have completed the checklist successfully the next steps involve the creation of a File Endpoint. To create a new File Endpoint, please use the URL above from `cf service yourServiceName` and open it in a Browser. 

1. The Dashboard page is loading after you have entered the Dashboard URL. 
2. When you are logged in, you will directly be redirected to the Dashboard Overview. If you are not logged in, you will be redirected to the Meshfed SSO Login. To login, please read 


## Configure a Backup Plan



