---
id: meshstack.aws.aad-as-idp
title: AAD as Identity Provider
---
### Configure AAD as IdP for AWS SSO

You can trigger everything that is needed for using AAD as an IdP for AWS SSO from within Azure.

### Create an Enterprise Registration

Search for `aws` and choose `AWS Single Sign-on` as the enterprise registration type

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_01.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_01.png)

Follow the steps in AAD under Getting Started (Pick SAML for the single sign on.)

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_02.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_02.png)

### Configure AWS for AAD integration

Choose `AWS Single Sign-on`

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_03.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_03.png)


Configure the identity source by clicking on `Choose your identity source`

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_04.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_04.png)

We have to change the `Identity source`

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_05.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_05.png)

Select `External identity provider`

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_06.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_06.png)

### Metadata

Download `AWS SSO SAML metadata` from AWS and then you should upload it into `Single sing-on` page on Azure with the `Upload metadata file` button.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_07.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_07.png)

Also check the following image to download `IdP SAML metadata` file from Azure, you can find it in the same page as `Federation Metadata XML`

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_08.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_08.png)

After downloading the `Federation Metadata XML` from Azure you have to upload this file into your AWS SSO Identity Source under `IdP SAML metadata`

## Provisioning

Before the automatic provisioning is enabled, you can click `enable automatic provisioning` on Azure to get the Tenant URL and Access Token to configure SCIM for provisioning on AAD side.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_09.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_09.png)

### euid not usable

In AWS SSO lookup of users is only possible via userName, not via email (see [https://docs.aws.amazon.com/singlesignon/latest/developerguide/listusers.html](https://docs.aws.amazon.com/singlesignon/latest/developerguide/listusers.html)). Sadly we can't set userName in AWS SSO to the user's email address as this mapping cannot be changed for the automatic SCIM provisioning in AAD.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_10.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_10.png)

You can also disable the Group sync here, as usually only groups managed by meshStack will be used and they will be created by meshStack anyway.

When clicking on the directory users mapping, you will see, that the userprincipalname to userName mapping cannot be deleted.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_11.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_11.png)

It would be possible if only meshStack is used for SCIM auto provisioning of users, because for this auto-provisioning we can decide which value to set as userName and we'd use the euid.

In AWS SSO it would also be possible to set username in SAML claims to `user.mail`, so login via AWS SSO would work.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_12.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_12.png)

These users will be replicated with Provisioning Settings. You should also configure that so you can see your Users in your AWS SSO directory.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_13.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_13.png)

Once you configure that Provisioning, you should click that `Start provisioning` button and it will replicate your Users and Groups into the AWS SSO. After this point this service will replicate the users every 40 minutes however you can always use `Provision on demand` or `Restart provisioning` buttons to run that replication.

![assets/aad_as_idp_for_aws/aad_as_idp_for_aws_14.png](assets/aad_as_idp_for_aws/aad_as_idp_for_aws_14.png)
