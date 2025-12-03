---
id: backup
title: Backup
---

meshcloud will operate your meshStack installation as a managed service for you. This includes the facilitation of backups for the data stored in your environment.

## Standard Backup Configuration

Backup frequency is set to once per day, with a retention period of 30 days. Storage location is dependent on the cloud platform hosting meshStack;
files are placed in the cloud provider's object storage (e.g., AWS S3 or GCP Cloud Storage) and protected via the provider's standard data encryption methods (e.g., key-based encryption).

> If custom backup frequency and retention or the export of backups to a specific destination is required, please reach out to support@meshcloud.io.
