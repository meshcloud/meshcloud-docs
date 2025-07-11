---
id: new-guide-how-to-extract-data
title: How to Extract Data from meshStack
---

> **How to Extract Data from meshStack**
>
> This guide summarizes all available options for extracting data from meshStack, as described in the existing documentation. Use these methods to access billing, usage, resource, and configuration data for reporting, integration, or automation purposes.

## 1. meshStack APIs

- **REST API**: Use the meshStack REST API to programmatically access data about workspaces, projects, users, resources, and more. The API provides endpoints for querying billing data, resource metadata, and platform configurations.

## 2. Export Features in meshPanel

Project Export
If you need to get an overview of all projects or want to use them inside a spreadsheet application you can export all projects as a .csv file. This export contains one row for each Platform that is configured for a project. The configured billing addresses, project tags, local IDs of the project in the cloud platforms and more is available in this export.

To export projects, follow these steps:

Login to the meshPanel with your Administrator credentials.
Navigate to the Administration Area via the settings button on the top right.
Click on Workspaces.
In the upper right there is the button Project Export. By clicking it, the download of the Project .CSV file for all workspaces will start

