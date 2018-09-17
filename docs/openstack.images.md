---
id: openstack.images
title: Images
---

Images are snapshots of virtual machines that can be used to create new compute instances.
Usually These snapshots have been configured to allow injection of user defined credentials (SSH key) during setup.

You can see an overview of images available to a project by selecting "Images" under the "Storage" section.

To upload a custom image select the "Create Image" button.
There you can chose an image file to upload and set a name.
Disk and container format must reflect the format of the image file you wish to upload (currently only raw images are supported).

The visibility options are:

* Public: Any user may read the image and it's presented as a default image to all users.
* Community: Any user may read the image but it's not presented as a default image.
* Shared: The image can be shared with others but only if they are added explicitly by the owner.
* Private: The image can only be accessed by the owner.

Note that your account might not have the rights to upload an image that is protected or has public or community visibility.

Further information on how to obtain images for cloud deployment is available at [OpenStack](https://docs.openstack.org/image-guide/obtain-images.html).
