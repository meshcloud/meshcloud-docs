import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'doc',
      id: 'index',
    },
    {
      type: 'doc',
      id: 'meshStack',
    },
    {
      type: 'doc',
      id: 'meshkube',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/building-aws-quickstart-guide',
        'getting-started/aks-platform-quickstart-guide',
        'getting-started/aks-developer-platform-quickstart-guide',
      ]
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/meshstack-areas',
        'concepts/workspace',
        'concepts/project',
        'concepts/users-and-groups',
        'concepts/platform',
        'concepts/platform-location',
        'concepts/landing-zone',
        'concepts/tenant',
        'concepts/building-block',
        'concepts/meshstack-hub',
        'concepts/tag',
        'concepts/policy',
        'concepts/cost-management',
        'concepts/payment-methods',
        'concepts/communication',
        'concepts/marketplace',
        'concepts/osb-services',
        'concepts/copilot',
        'meshstack.identity-federation'
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'category',
          label: 'Core',
          items: [
            'new-guide-how-to-manage-a-workspace',
            'new-guide-how-to-limit-workspace-resources',
            'new-guide-how-to-manage-a-project',
            'new-guide-how-to-customize-project-roles',
            'new-guide-how-to-manage-a-tenant',
            'new-guide-how-to-reflect-organizational-changes',
            'new-guide-how-to-manage-api-keys',
            'new-guide-how-to-manage-api-users',
            'new-guide-how-to-provide-your-own-platform',
            'new-guide-how-to-kickstart-your-IDP',
            'new-guide-how-to-provide-your-own-platform',
            'new-guide-how-to-manage-tags',
            'new-guide-how-to-provide-organization-context',
            'new-guide-how-to-manage-a-building-block-definition',
            'new-guide-how-to-launch-a-new-manual-building-block',
            'new-guide-how-to-launch-a-new-terraform-building-block',
            'getting-started/building-aws-quickstart-guide',
            'meshstack.aks-platform-quickstart-guide',
            'meshstack.aks-developer-platform-quickstart-guide',
            'new-guide-how-to-email-branding',
            'new-guide-how-to-extract-data'
          ],
        },
        {
          type: 'category',
          label: 'Developer Portal',
          items: [
            'new-guide-how-to-onboard-your-team',
            'new-guide-how-to-protect-admin-roles',
            'new-guide-how-to-manage-4-eye-principle',
            'new-guide-how-to-provide-your-own-platform',
            'new-guide-how-to-manage-a-platform',
            'new-guide-how-to-restrict-platform-access',
            'new-guide-how-to-enforce-resource-quotas',
            'new-guide-how-to-ensure-compliant-deletion-of-tenants',
            'new-guide-how-to-manage-landing-zones',
            'new-guide-how-to-manage-policies',
            'new-guide-how-to-manage-osb'
          ],
        },
        {
          type: 'category',
          label: 'FinOps',
          items: [
            'new-guide-how-to-manage-payment-methods',
            'new-guide-how-to-integrate-external-approval-processes',,
            'new-guide-how-to-set-up-prices',
            'new-guide-how-to-set-up-currency-conversion',
            'new-guide-how-to-create-customized-bills',
            'new-guide-how-to-discover-shadow-it',
            'new-guide-how-to-budget-alerts'
          ],
        },
        {
          type: 'category',
          label: 'Platform Ecosystem',
          items: [
            'new-guide-how-to-enable-a-new-platform-team',
          ],
        },
        {
          type: 'category',
          label: 'Developer Engagement',
          items: [
            'new-guide-how-to-provide-security-contact',
            'new-guide-how-to-copilot',
            'new-guide-how-to-discover-services',
            'new-guide-how-to-generate-building-block-documentation',
            'new-guide-how-to-email-branding'
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Amazon Web Services',
          items: [
            'meshstack.aws.index',
            'new-integration-how-to-integrate-aws',
            'meshstack.aws.landing-zones',
            'meshstack.aws.metering',
            'meshstack.aws.sso-setup',
            'meshstack.aws.reserved-instance-guide',
            'meshstack.building-blocks.permission-delegation-aws'
          ],
        },
        {
          type: 'category',
          label: 'Microsoft Azure',
          items: [
            'meshstack.azure.index',
            'new-integration-how-to-integrate-azure',
            'new-integration-how-to-integrate-azure-administrative-units',
            'meshstack.azure.landing-zones',
            'meshstack.azure.metering',
          ],
        },
        {
          type: 'category',
          label: 'Google Cloud Platform',
          items: [
            'meshstack.gcp.index',
            'new-guide-how-to-integrate-gcp',
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
            'meshstack.github.pipeline-automation'
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
            'new-guide-how-to-implement-osb'
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsible: true,
      collapsed: true,
      items: [
        'meshstack.managed-service',
        'meshstack.email',
        'meshstack.logging',
        'meshstack.monitoring',
        'meshstack.backup',
        'security-faq',
        'administration.dns',
        'administration.product-feedback-collection'
      ],
    },
    {
      type: 'category',
      label: 'Settings',
      collapsible: true,
      collapsed: true,
      items: [
        'settings/self-service-onboarding',
        'settings/billing-configuration',
        'settings/user-group-provisioning',
        'settings/workspace-group-sync',
        'settings/identity-lookup',
        'settings/identity-provider',
        'settings/meshstack-settings',
        'settings/customizing',
        'settings/replication-configuration'
      ],
    },
  ],
};

export default sidebars;
