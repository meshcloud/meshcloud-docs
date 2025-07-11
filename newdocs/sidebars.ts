import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  meshcloud: [
    {
      type: 'category',
      label: 'meshStack',
      items: [
        'meshcloud.index',
        'meshcloud.workspace',
        'meshcloud.project',
        'meshcloud.tenant',
        'meshcloud.tenant-quota',
        'meshcloud.landing-zones',
        'meshcloud.profile',
        'meshcloud.platforms',
        'meshcloud.cost-management',
        'meshcloud.chargeback-v2',
        'meshcloud.payment-methods',
        'meshcloud.budget-alerts',
        'meshcloud.metadata-tags',
        'meshcloud.policies',
      ],
    },
    {
      type: 'category',
      label: 'Marketplace',
      items: [
        'marketplace.index',
        'marketplace.service-management-area',
        'marketplace.service-instances',
        'marketplace.service-brokers-vs-building-blocks',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'meshstack.how-to.onboard',
        'meshstack.how-to.onboard-team-to-workspace',
        'meshstack.how-to.create-project',
        'meshstack.how-to.onboard-team-to-project',
        'meshstack.how-to.change-workspace-owner',
        'meshstack.how-to.add-platformservice',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: ['faq.projects'],
    },
  ],

  meshstack: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'meshstack.how-to.get-started-with-meshstack',
        'meshstack.building-aws-quickstart-guide',
        'meshstack.aks-platform-quickstart-guide',
        'meshstack.aks-developer-platform-quickstart-guide',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'meshstack.index',
        'administration.index',
        'meshstack.onboarding',
        'administration.workspaces',
        'administration.projects',
        'administration.tenants',
        'meshstack.replication-configuration',
        'administration.delete-tenants',
        'administration.users',
        'administration.platforms',
        'administration.landing-zones',
        'administration.building-blocks',
        'administration.service-brokers',
        'administration.emergency-users',
        'meshstack.metadata-tags',
        'administration.policies',
        'administration.unmanaged-tenants',
        'administration.meshstack-settings',
        'administration.workspace-services',
        'administration.apiusers',
        'administration.dns',
        'meshstack.customizing',
        'administration.product-feedback-collection',
      ],
    },
    {
      type: 'category',
      label: 'Identity & Access',
      items: [
        'meshstack.identity-federation',
        'meshstack.identity-provider',
        'meshstack.identity-lookup',
        'meshstack.authorization',
        'meshstack.workspace-group-sync',
        'meshstack.user-group-provisioning',
      ],
    },
    {
      type: 'category',
      label: 'Building Blocks',
      items: [
        'administration.building-blocks',
        'meshstack.building-blocks.private-runners',
        'meshstack.building-blocks.meshStack-http-backend',
        'meshstack.building-blocks.permission-delegation-aws',
        'meshstack.building-pipeline-integration',
      ],
    },
    {
      type: 'category',
      label: 'Metering & Billing',
      items: [
        'meshstack.billing',
        'meshstack.billing-configuration',
      ],
    },
    {
      type: 'category',
      label: 'Amazon Web Services',
      items: [
        'meshstack.aws.index',
        'meshstack.aws.landing-zones',
        'meshstack.aws.metering',
        'meshstack.aws.sso-setup',
        'meshstack.aws.reserved-instance-guide',
      ],
    },
    {
      type: 'category',
      label: 'Microsoft Azure',
      items: [
        'meshstack.azure.index',
        'meshstack.azure.landing-zones',
        'meshstack.azure.metering',
      ],
    },
    {
      type: 'category',
      label: 'Google Cloud Platform',
      items: [
        'meshstack.gcp.index',
        'meshstack.gcp.landing-zones',
        'meshstack.gcp.metering',
      ],
    },
    {
      type: 'category',
      label: 'Cloud Foundry',
      items: [
        'meshstack.cloudfoundry.index',
        'meshstack.cloudfoundry.metering',
      ],
    },
    {
      type: 'category',
      label: 'Kubernetes',
      items: [
        'meshstack.kubernetes.index',
        'meshstack.kubernetes.landing-zones',
        'meshstack.kubernetes.metering',
      ],
    },
    {
      type: 'category',
      label: 'GitHub',
      items: [
        'meshstack.github.pipeline-automation',
        'meshstack.github.repository-provisioning',
      ],
    },
    {
      type: 'category',
      label: 'OpenShift',
      items: [
        'meshstack.openshift.index',
        'meshstack.openshift.landing-zones',
        'meshstack.openshift.metering',
      ],
    },
    {
      type: 'category',
      label: 'OpenStack',
      items: [
        'meshstack.openstack.index',
        'meshstack.openstack.metering',
      ],
    },
    {
      type: 'category',
      label: 'OSB Services',
      items: [
        'meshstack.meshmarketplace.index',
        'meshstack.meshmarketplace.metering',
        'meshstack.meshmarketplace.profile',
        'meshstack.meshmarketplace.tenant-services',
        'meshstack.meshmarketplace.broker-tutorial'
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'meshstack.managed-service',
        'meshstack.email',
        'meshstack.logging',
        'meshstack.monitoring',
        'meshstack.backup',
        'faq',
        'copilot-preview',
      ],
    },
    {
      type: 'category',
      label: 'Guides (Advanced)',
      items: [
        'meshstack.how-to.integrate-meshplatform',
        'meshstack.how-to.integrate-meshplatform-aws-manually',
        'meshstack.how-to.integrate-meshplatform-azure-manually',
        'meshstack.how-to.integrate-meshplatform-gcp-manually',
        'meshstack.how-to.create-your-own-platform',
        'meshstack.how-to.manage-partner-level-permissions',
        'meshstack.how-to-API-keys',
        'meshstack.how-to.get-started-building-blocks',
      ],
    },
  ],
};

export default sidebars;
