---
id: openstack.object-storage
title: Object Storage
---

Object Storage enables application developers to store data as objects. It's efficient and safe as it is highly available and distributed. Each object is replicated 3 times and distributed on to different servers. With our Object Storage you can create containers and store BLOBS \(Binary Large OBjects\), such as images, audio or multimedia objects.


## Using the OpenStack CLI

If you would like to display information for your account, an object or a container, type:

```bash
swift stat
swift stat ACCOUNT
swift stat CONTAINER
swift stat OBJECT
```

For listing containers, type:

```bash
swift list
```

## Using the Meshpanel

### Uploading Files

The easiest way to upload files to OpenStack Swift is via meshPanel.

### Configure a Swift Container

1. Navigate to and login with your personal credentials.
2. On the Welcome Dashboard, please select the Location & Project where you want to create your Swift Container for the Backup Files.
3. After selecting a Location & Project choose in the Service Menu on the left **Storage &gt; Blobs**.
4. Enter the Name of the Swift Container and press the **+**.
5. You have now successfully created a Swift Container.

### Upload Files to your Swift Container

1. In the Meshpanel click on the container you created to get to the container detail page \(**Storage &gt; Blobs &gt; YourContainer**\).
2. You can either choose a file from your file system or drag and drop the file that you want to upload.
3. The files will appear in the upload queue on the right. Click the upload button to start your file upload.
4. Your files will appear in the Blobs list on the bottom of this page.
5. Congratulations. You successfully uploaded your files to your Swift Container.



