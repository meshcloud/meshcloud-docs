---
id: meshstack.backup
title: Backup
---

meshcloud will operate your meshStack installation as a managed service for you. This includes the facilitation of backups for the data stored in your environment.

## Standard Backup Configuration

Backup are facilitated once a day. Backup files will be stored for 30 days. Depending on the cloud platform hosting the meshStack environment
the backup files will be stored in the available object storage of the cloud provider (e.g. AWS S3, GCP Cloud Storage) using an appropriate data encryption method supported by the provider (e.g. key based encryption).

> If you have deviating requirements regarding backup frequency and/or retention please contact support@meshcloud.io.
> It is also possible to provide you access to the object storage in order to transfer the files in a central backup solution within your organization.
