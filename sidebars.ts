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
            'guides/core/how-to-manage-a-workspace',
            'guides/core/how-to-limit-workspace-resources',
            'guides/core/how-to-manage-a-project',
            'guides/core/how-to-customize-project-roles',
            'guides/core/how-to-manage-a-tenant',
            'guides/core/how-to-reflect-organizational-changes',
            'guides/core/how-to-manage-api-keys',
            'guides/core/how-to-manage-api-users',
            'guides/core/how-to-kickstart-your-IDP',
            'guides/core/how-to-manage-tags',
            'guides/core/how-to-provide-organization-context',
            'guides/core/how-to-manage-a-building-block-definition',
            'guides/core/how-to-launch-a-new-manual-building-block',
            'guides/core/how-to-launch-a-new-terraform-building-block',
            'guides/core/how-to-extract-data'
          ],
        },
        {
          type: 'category',
          label: 'Developer Portal',
          items: [
            'guides/developer-portal/how-to-onboard-your-team',
            'guides/developer-portal/how-to-protect-admin-roles',
            'guides/developer-portal/how-to-manage-4-eye-principle',
            'guides/developer-portal/how-to-provide-your-own-platform',
            'guides/developer-portal/how-to-manage-a-platform',
            'guides/developer-portal/how-to-restrict-platform-access',
            'guides/developer-portal/how-to-enforce-resource-quotas',
            'guides/developer-portal/how-to-ensure-compliant-deletion-of-tenants',
            'guides/developer-portal/how-to-manage-landing-zones',
            'guides/developer-portal/how-to-manage-policies',
            'guides/developer-portal/how-to-manage-osb'
          ],
        },
        {
          type: 'category',
          label: 'FinOps',
          items: [
            'guides/finops/how-to-manage-payment-methods',
            'guides/finops/how-to-integrate-external-approval-processes',
            'guides/finops/how-to-set-up-prices',
            'guides/finops/how-to-set-up-currency-conversion',
            'guides/finops/how-to-create-customized-bills',
            'guides/finops/how-to-discover-shadow-it',
            'guides/finops/how-to-budget-alerts'
          ],
        },
        {
          type: 'category',
          label: 'Platform Ecosystem',
          items: [
            'guides/platform-ecosystem/how-to-enable-a-new-platform-team',
          ],
        },
        {
          type: 'category',
          label: 'Developer Engagement',
          items: [
            'guides/developer-engagement/how-to-provide-security-contact',
            'guides/developer-engagement/how-to-copilot',
            'guides/developer-engagement/how-to-discover-services',
            'guides/developer-engagement/how-to-generate-building-block-documentation',
            'guides/developer-engagement/how-to-email-branding'
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
            'new-integration-how-to-integrate-gcp',
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
            'integrations/osb/how-to-implement-osb'
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
