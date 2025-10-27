import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import apiSidebar from './docs/api/sidebar';
import meteringApiSidebar from './docs/metering-api/sidebar';

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
        'getting-started/key-concepts-guide',
        'getting-started/building-aws-quickstart-guide',
        'getting-started/building-azure-quickstart-guide',
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
        'concepts/identity-and-access-management'
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
            'guides/core/how-to-launch-a-new-opentofu-building-block',
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
            'guides/developer-portal/how-to-manage-osb',
            'guides/developer-portal/how-to-provide-security-contact',
            'guides/developer-portal/how-to-copilot',
            'guides/developer-portal/how-to-discover-services',
            'guides/developer-portal/how-to-generate-building-block-documentation',
            'guides/developer-portal/how-to-email-branding'
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
            'integrations/aws/index',
            'integrations/aws/how-to-integrate',
            'integrations/aws/landing-zones',
            'integrations/aws/metering',
            'integrations/aws/sso-setup',
            'integrations/aws/reserved-instance-guide',
            'integrations/aws/permission-delegation'
          ],
        },
        {
          type: 'category',
          label: 'Microsoft Azure',
          items: [
            'integrations/azure/index',
            'integrations/azure/how-to-integrate',
            'integrations/azure/how-to-integrate-administrative-units',
            'integrations/azure/landing-zones',
            'integrations/azure/metering',
          ],
        },
        {
          type: 'category',
          label: 'Google Cloud Platform',
          items: [
            'integrations/gcp/index',
            'integrations/gcp/how-to-integrate',
            'integrations/gcp/landing-zones',
            'integrations/gcp/metering',
          ],
        },
        {
          type: 'category',
          label: 'Cloud Foundry',
          items: [
            'integrations/cloud-foundry/index',
            'integrations/cloud-foundry/metering',
          ],
        },
        {
          type: 'category',
          label: 'Kubernetes',
          items: [
            'integrations/kubernetes/index',
            'integrations/kubernetes/landing-zones',
            'integrations/kubernetes/metering',
          ],
        },
        {
          type: 'category',
          label: 'GitHub',
          items: [
            'integrations/github/github-actions'
          ],
        },
        {
          type: 'category',
          label: 'OpenShift',
          items: [
            'integrations/openshift/index',
            'integrations/openshift/landing-zones',
            'integrations/openshift/metering',
          ],
        },
        {
          type: 'category',
          label: 'OpenStack',
          items: [
            'integrations/openstack/index',
            'integrations/openstack/metering',
          ],
        },
        {
          type: 'category',
          label: 'OSB Services',
          items: [
            'integrations/osb/index',
            'integrations/osb/metering',
            'integrations/osb/api-profile',
            'integrations/osb/tenant-services',
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
        'operations/managed-service',
        'operations/email',
        'operations/logging',
        'operations/monitoring',
        'operations/backup',
        'operations/security-faq',
        'operations/dns',
        'operations/product-feedback-collection'
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
  api: [
    'api/introduction',
    {
      type: 'category',
      label: 'Authentication',
      items: [
        'api/authentication/api-keys',
        'api/authentication/basic-auth'
      ]
    },
    'api/technical-specifications',
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: apiSidebar
    },
    {
      type: 'category',
      label: 'Metering API',
      collapsed: false,
      items: meteringApiSidebar
    },
    'api/deprecated-resources'
  ]
};

export default sidebars;
