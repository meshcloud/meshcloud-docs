---
id: faq
title: Security FAQ
---

The following FAQ regarding Data Protection and Information Security for the various meshStack offerings answers
the most frequently asked questions from organizations' cybersecurity departments.

## Information Security

### How does meshcloud GmbH ensure us a secure experience with meshStack?

meshcloud GmbH is an [ISO 27001 certified](https://www.meshcloud.io/2021/10/28/meshcloud-is-iso-27001-certified/) company. The scope of the certification covers the design, development, implementation, operation, and support of multi-cloud management and governance solutions for public and private cloud platforms.

The design, development, implementation, and maintenance process of the meshStack follows the secure development lifecycle.

meshStack is hosted by default hosted in GCP, a leading cloud provider. The geolocation is primarily within the EU but can be changed upon the customer’s requirement. This includes also the storage for backups. meshStack leverages different services of the cloud to provide security in terms of data encryption, protection against DoS attacks, access control, etc.

Additionally, meshcloud GmbH has its own incident response team. The team is responsible for handling reported incidents along with informing the customers about major changes in their Information Security Management.

### How is my data secured within meshStack?

The cloud components used by meshStack are configured according to best practices.

Hard disk encryption or container services with encrypted storage are used for different operations. Cloud storage such as AWS S3 is used to store & backup encrypted customer data and databases. The cloud components are also configured to encrypt the data in transit.

- [**AWS data encryption whitepaper**](https://docs.aws.amazon.com/whitepapers/latest/introduction-aws-security/data-encryption.html)
- [**GCP encryption at rest whitepaper**](https://cloud.google.com/docs/security/encryption/default-encryption)
- [**GCP encryption in transit whitepaper**](https://cloud.google.com/docs/security/encryption-in-transit)
- [**Azure encryption overview**](https://docs.microsoft.com/en-us/azure/security/fundamentals/encryption-overview)

### How does meshStack securely handle my cloud platform credentials?

In order to connect to the cloud platforms and execute replication steps or metering credentials to the cloud platform have to be provided to meshStack. Asymmetric encryption is used for these secrets. The service that actually stores newly entered secrets encrypts them with a public key. Only the replicator and metering services can read their according secrets with their private key to actually connect to the cloud platforms.

### How does meshcloud GmbH secure the Infrastructure for my meshStack?

The various cloud components used by meshStack, such as Virtual Cloud Network, Network Load Balancers, and Ingress Controller (Kubernetes) are configured according to best practices.

Kubernetes nodes are secured by a shared responsibility model. meshcloud GmbH uses best-practice configurations & network policies to secure the nodes for your meshStack. Access to these Kubernetes nodes is possible through the project/role assignment of the respective cloud provider.

- [AWS EKS security overview](https://docs.aws.amazon.com/eks/latest/userguide/security.html)
- [GCP GKE security overview](https://cloud.google.com/kubernetes-engine/docs/concepts/security-overview)
- [Azure AKS security overview](https://docs.microsoft.com/en-us/azure/aks/concepts-security)

Technical safeguards are implemented such as detecting and responding to Distributed Denial-of-Service (DDoS) attacks, data encryption, etc by leveraging cloud provider services.

A dedicated Virtual Cloud Network is provided for the meshStack. This network is completely encapsulated from other meshStack and their dedicated customer networks. The network configuration also includes the usage of Security Groups to strictly configure communication in the network.

### Does meshStack support Single sign-on (SSO) and Multi-Factor-Authentication (MFA)?

Yes, meshStack supports SSO and MFA.

Activating SSO requires the integration between your own Enterprise Identity Provider (IDP) (e.g. Azure AD) with your respective meshStack.

MFA must be activated in the Enterprise IDP which is integrated with your meshStack.

### Are we allowed to security test meshStack on our own?

Yes, you can perform security tests like Penetration Tests on meshStack but this always requires prior information and getting signed approval from meshcloud GmbH.

### Can meshcloud GmbH employees (aka meshis) access our organizational data?

No, meshis (employee at meshcloud) do not primarily have any access to your organizational data. Though, in certain scenarios such as for support cases if you would like to give the access or permission to your cloud environment then you can assign it to any of our relevant meshi's.

## Data Protection

### Does meshStack process any Personal Identifiable Information (PII)?

meshStack stores your *First Name*, *Last Name*, *Email Address*, and *Last Login Date*. All these are stored in our database for user management (which is also managed via “a locally managed instance of ***[Keycloak](https://www.keycloak.org/)”***).

The External User Identifier (EUID), usually the email address, is replicated to the respective integrated cloud platforms, e.g. AWS, GCP, Azure, etc.

### Is meshStack GDPR-compliant?

Yes, meshStack is compliant with the official terms of the General Data Protection Regulation (GDPR). The official definitions are explained in the GDPR requirements as follows:

- Art. 24 - [Responsibility of the controller](https://gdpr-info.eu/art-24-gdpr/)
- Art. 25 - [Data protection by design and by default](https://gdpr-info.eu/art-25-gdpr/)
- Art. 26 - [Joint controllers](https://gdpr-info.eu/art-26-gdpr/)
- Art. 27 - [Representatives of controllers or processors not established in the Union](https://gdpr-info.eu/art-27-gdpr/)
- Art. 28 - [Processor](https://gdpr-info.eu/art-28-gdpr/)

### Does meshStack provide a compliant way to delete my PII and organizational data?

Yes, meshStack deletes your data at your request, if the data is not collected by any legal archiving obligation. If the archiving obligation applies, we archive your data.

### Where will my data be located?

a. **Data used and generated by meshStack**

meshStack uses different cloud providers such as AWS, GCP, Azure, etc. in order to store and backup data. These data can be located in the data centers of the respective cloud providers mainly in the EU region. The geolocation can be configured differently if requested.

Data center locations of leading cloud providers:

- [GCP Locations](https://cloud.google.com/about/locations)

Alternative:

- [AWS Locations](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)
- [Azure Locations](https://docs.microsoft.com/en-us/azure/availability-zones/az-overview)

b. **Additional 3rd party services used by meshcloud GmbH**

**Google Workspace:** This is used for office applications and digital storage e.g. Office Software. Google Workspace is configured to store data within the EU region for meshcloud GmbH.

```text
Google Workspace security overview: https://workspace.google.com/learn-more/security/security-whitepaper/page-1.html
Address: 1600 Amphitheatre Pkwy,
         Mountain View, California 94043, United States
```

**ClickUp:** ClickUp is used as a project management, support management & ticketing tool for meshcloud GmbH. ClickUp stores data according to the AICPA SOC2, GDPR & HIPAA compliances in different data centers worldwide (Germany & Ireland in Europe) hosted by AWS.

```text
ClickUp security overview: https://clickup.com/security
Address: Rechenzentren in den USA
         363 Fifth Ave. Suite 300
         San Diego, California 92101, United States
```

**Slack:** meshcloud GmbH uses Slack messaging software for interacting within the workplace. By default, Slack encrypts data at rest and data in transit for all of its customers. The security program at Slack protects its customer's data at every layer and has the following compliance certifications and attestations:

**[ISO/IEC 27001](https://a.slack-edge.com/f2814e1/marketing/downloads/security/Slack-27001-1105886-5.pdf), [ISO/IEC 27017](https://a.slack-edge.com/f2814e1/marketing/downloads/security/Slack-27017-1105886-4.pdf), [ISO/IEC 27018](https://a.slack-edge.com/f2814e1/marketing/downloads/security/Slack-27018-1105886-4.pdf), [ISO/IEC 27701](https://a.slack-edge.com/5ff60/marketing/downloads/security/Slack-27001-1105886-4.pdf), SOC 2, [SOC 3](https://a.slack-edge.com/31222cc/marketing/downloads/security/Slack_SOC_3_2021_Report.pdf), [APEC for Processors Certification](https://a.slack-edge.com/a0dbd8f/marketing/downloads/security/Slack_APEC_Processor_246.pdf), [APEC for Controllers Certification](https://a.slack-edge.com/9fefd45/marketing/downloads/security/Slack_APEC_Controller_247.pdf), CSA**

```text
Slack security overview: https://slack.com/trust/security
Address: 500 Howard Street,
         San Francisco,
         California 94105, United States
```

**GitHub**: meshcloud GmbH uses the GitHub repository for product and open source development purposes. GitHub creates a secure platform and products through developer training, the creation of components that form a secure foundation to build on, automated code analysis, in-depth threat modeling, and security code review and testing, we prevent vulnerabilities as early as possible in the development lifecycle.

```text
GitHub privacy policies: https://docs.github.com/en/site-policy/privacy-policies
Address: 88 Colin P Kelly Jr Street,
         San Francisco,
         California 94107, United States
```

(optional) [**Canny**](http://Canny.io): meshcloud GmbH uses Canny.io for collecting the customer’s feedback. Canny is SOC 2 certified. (Customers are optional participating in Canny.io)

```text
Canny security overview: https://canny.io/security
Address: San Francisco,
         California 94114, United States
```
