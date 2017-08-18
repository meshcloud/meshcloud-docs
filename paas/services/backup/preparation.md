# Preparing Backup

To use the Backup Service for Databases, Document Stores and other content related services you need to configure the Meshcloud Platform accordingly.

## Configure a Service User

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

## Configure a Swift Container

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

6. You have not successfully created a Swift Container



