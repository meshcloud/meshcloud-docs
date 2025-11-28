terraform {
  backend "s3" {
    bucket = "docs-meshcloud-io-tf-state"
    key    = "amplify/teraform.tfstate"
    region = "eu-central-1"
  }

  // note: dynamodb locking etc. is not required complexity here, we deploy this manually and very rarely
}

provider "aws" {
  region              = "eu-central-1"
  allowed_account_ids = ["548876773848"]
}

locals {
  # These are redirects from old docs URLs to new docs URLs.
  # We can probably remove these after a year or so. (August 2026)
  redirects = [
    {
      source = "/meshcloud.index"
      target = "/"
    },
    {
      source = "/meshcloud.workspace"
      target = "/concepts/workspace"
    },
    {
      source = "/meshcloud.project"
      target = "/concepts/project"
    },
    {
      source = "/meshcloud.tenant"
      target = "/concepts/tenant"
    },
    {
      source = "/meshcloud.tenant-quota"
      target = "/guides/developer-portal/how-to-enforce-resource-quotas"
    },
    {
      source = "/meshcloud.landing-zones"
      target = "/concepts/landing-zone"
    },
    {
      source = "/meshcloud.platforms"
      target = "/concepts/platform"
    },
    {
      source = "/meshcloud.cost-management"
      target = "/concepts/cost-management"
    },
    {
      source = "/meshcloud.payment-methods"
      target = "concepts/payment-methods"
    },
    {
      source = "/meshcloud.budget-alerts"
      target = "/concepts/payment-methods/#budget-alerts"
    },
    {
      source = "/meshcloud.metadata-tags"
      target = "/concepts/tag"
    },
    {
      source = "/meshcloud.policies"
      target = "/concepts/policy"
    },
    {
      source = "/marketplace.index"
      target = "/concepts/marketplace"
    },
    {
      source = "/marketplace.platform-builder"
      target = "/concepts/meshstack-areas#the-platform-builder"
    },
    {
      source = "/marketplace.service-instances"
      target = "/concepts/osb-services"
    },
    {
      source = "/meshstack.how-to.create-project"
      target = "/guides/core/how-to-manage-a-project"
    },
    {
      source = "/meshstack.how-to.onboard-team-to-project"
      target = "/guides/core/how-to-manage-a-project/#project-user-management-as-an-application-team"
    },
    {
      source = "/meshstack.index"
      target = "/"
    },
    {
      source = "/administration.index"
      target = "/concepts/users-and-groups/#admin-area-users-and-permissions"
    },
    {
      source = "/meshstack.onboarding"
      target = "/settings/onboarding"
    },
    {
      source = "/administration.workspaces"
      target = "/concepts/workspace"
    },
    {
      source = "/administration.projects"
      target = "/concepts/project"
    },
    {
      source = "/administration.tenants"
      target = "/concepts/tenant"
    },
    {
      source = "/meshstack.replication-configuration"
      target = "/settings/replication-configuration"
    },
    {
      source = "/administration.delete-tenants"
      target = "/guides/core/how-to-manage-a-tenant#tenant-deletion-flow"
    },
    {
      source = "/administration.users"
      target = "/concepts/users-and-groups"
    },
    {
      source = "/administration.platforms"
      target = "/concepts/platform"
    },
    {
      source = "/administration.landing-zones"
      target = "/concepts/landing-zone"
    },
    {
      source = "/administration.building-blocks"
      target = "/concepts/building-block"
    },
    {
      source = "/administration.service-brokers"
      target = "/concepts/osb-services"
    },
    {
      source = "/administration.policies"
      target = "/concepts/policy"
    },
    {
      source = "/administration.unmanaged-tenants"
      target = "/concepts/tenant/#unmanaged-tenants"
    },
    {
      source = "/administration.meshstack-settings"
      target = "/settings/meshstack-settings"
    },
    {
      source = "/administration.workspace-services"
      target = "/guides/platform-ecosystem/how-to-enable-a-new-platform-team"
    },
    {
      source = "/administration.apiusers"
      target = "/concepts/users-and-groups/#api-users"
    },
    {
      source = "/administration.dns"
      target = "/operations/dns"
    },
    {
      source = "/meshstack.customizing"
      target = "/settings/meshstack-customizing"
    },
    {
      source = "/administration.product-feedback-collection"
      target = "/operations/product-feedback-collection"
    },
    {
      source = "/meshstack.identity-federation"
      target = "/concepts/identity-and-access-management"
    },
    {
      source = "/meshstack.identity-provider"
      target = "/settings/identity-provider"
    },
    {
      source = "/meshstack.identity-lookup"
      target = "/settings/identity-lookup"
    },
    {
      source = "/meshstack.authorization"
      target = "/guides/developer-portal/how-to-manage-4-eye-principle"
    },
    {
      source = "/meshstack.workspace-group-sync"
      target = "/settings/workspace-group-sync"
    },
    {
      source = "/meshstack.user-group-provisioning"
      target = "/settings/user-group-provisioning"
    },
    {
      source = "/meshstack.building-blocks.meshStack-http-backend"
      target = "/guides/core/how-to-launch-a-new-opentofu-building-block#meshstack-built-in-http-backend"
    },
    {
      source = "/meshstack.building-blocks.permission-delegation-aws"
      target = "/integrations/aws/permission-delegation"
    },
    {
      source = "/meshstack.building-pipeline-integration"
      target = "/integrations/github/github-actions"
    },
    {
      source = "/meshstack.billing"
      target = "/concepts/cost-management/"
    },
    {
      source = "/meshstack.billing-configuration"
      target = "/settings/billing-configuration"
    },
    {
      source = "/meshstack.aws.index"
      target = "/integrations/aws"
    },
    {
      source = "/meshstack.aws.landing-zones"
      target = "/integrations/aws/landing-zones"
    },
    {
      source = "/meshstack.aws.metering"
      target = "/integrations/aws/metering"
    },
    {
      source = "/meshstack.aws.sso-setup"
      target = "/integrations/aws/sso-setup"
    },
    {
      source = "/meshstack.aws.reserved-instance-guide"
      target = "/integrations/aws/reserved-instance-guide"
    },
    {
      source = "/meshstack.azure.index"
      target = "/integrations/azure"
    },
    {
      source = "/meshstack.azure.landing-zones"
      target = "/integrations/azure/landing-zones"
    },
    {
      source = "/meshstack.azure.metering"
      target = "/integrations/azure/metering"
    },
    {
      source = "/meshstack.gcp.index"
      target = "/integrations/gcp"
    },
    {
      source = "/meshstack.gcp.landing-zones"
      target = "/integrations/gcp/landing-zones"
    },
    {
      source = "/meshstack.gcp.metering"
      target = "/integrations/gcp/metering"
    },
    {
      source = "/meshstack.cloudfoundry.index"
      target = "/integrations/cloudfoundry"
    },
    {
      source = "/meshstack.cloudfoundry.metering"
      target = "/integrations/cloudfoundry/metering"
    },
    {
      source = "/meshstack.kubernetes.index"
      target = "/integrations/kubernetes"
    },
    {
      source = "/meshstack.kubernetes.landing-zones"
      target = "/integrations/kubernetes/landing-zones"
    },
    {
      source = "/meshstack.kubernetes.metering"
      target = "/integrations/kubernetes/metering"
    },
    {
      source = "/meshstack.github.pipeline-automation"
      target = "/integrations/github/github-actions"
    },
    {
      source = "/meshstack.openshift.index"
      target = "/integrations/openshift"
    },
    {
      source = "/meshstack.openshift.landing-zones"
      target = "/integrations/openshift/landing-zones"
    },
    {
      source = "/meshstack.openshift.metering"
      target = "/integrations/openshift/metering"
    },
    {
      source = "/meshstack.openstack.index"
      target = "/integrations/openstack"
    },
    {
      source = "/meshstack.openstack.metering"
      target = "/integrations/openstack/metering"
    },
    {
      source = "/meshstack.meshmarketplace.index"
      target = "/integrations/osb"
    },
    {
      source = "/meshstack.meshmarketplace.metering"
      target = "/integrations/osb/metering"
    },
    {
      source = "/meshstack.meshmarketplace.profile"
      target = "/integrations/osb/api-profile"
    },
    {
      source = "/meshstack.meshmarketplace.tenant-services"
      target = "/integrations/osb/tenant-services"
    },
    {
      source = "/meshstack.meshmarketplace.broker-tutorial"
      target = "/integrations/osb/how-to-implement-osb"
    },
    {
      source = "/meshstack.managed-service"
      target = "/operations/managed-service"
    },
    {
      source = "/meshstack.email"
      target = "/operations/email"
    },
    {
      source = "/meshstack.logging"
      target = "/operations/logging"
    },
    {
      source = "/meshstack.monitoring"
      target = "/operations/monitoring"
    },
    {
      source = "/meshstack.backup"
      target = "/operations/backup"
    },
    {
      source = "/security-faq"
      target = "/operations/security-faq"
    },
    {
      source = "/copilot-preview"
      target = "/concepts/copilot"
    },
    {
      source = "/meshstack.how-to.integrate-meshplatform"
      target = "/guides/developer-portal/how-to-manage-a-platform"
    },
    {
      source = "/meshstack.how-to.integrate-meshplatform-aws-manually"
      target = "/integrations/aws/how-to-integrate"
    },
    {
      source = "/meshstack.how-to.integrate-meshplatform-azure-manually"
      target = "/integrations/azure/how-to-integrate"
    },
    {
      source = "/meshstack.how-to.integrate-meshplatform-gcp-manually"
      target = "/integrations/gcp/how-to-integrate"
    },
    {
      source = "/meshstack.how-to.create-your-own-platform"
      target = "/guides/developer-portal/how-to-provide-your-own-platform"
    },
    {
      source = "/meshstack.how-to.manage-partner-level-permissions"
      target = "/concepts/users-and-groups/#admin-area-users-and-permissions"
    },
    {
      source = "/meshstack.how-to-API-keys"
      target = "/concepts/users-and-groups/#api-keys"
    },
    {
      source = "/meshstack.how-to.get-started-building-blocks"
      target = "/guides/core/how-to-launch-a-new-opentofu-building-block"
    },
    {
      source = "/administration.emergency-users"
      target = "/guides/core/how-to-get-emergency-workspace-access"
    },

    ## renames after the new docs launch
    {
      source = "/guides/core/how-to-launch-a-new-terraform-building-block"
      target = "/guides/core/how-to-launch-a-new-opentofu-building-block"
    }
  ]
}

import {
  to = aws_amplify_app.docs
  id = "d17q6gob2fx97d"
}

resource "aws_amplify_app" "docs" {
  name       = "meshcloud-docs"
  repository = "https://github.com/meshcloud/meshcloud-docs"

  build_spec = null # we use amplify.yml to host the build spec

  environment_variables = {
    # This is somehow set by Amplify. To keep the diff view happy we just add it for simplicity.
    "NODE_OPTIONS" = "--max_old_space_size=4096"
  }

  # note: rules here are processed top to bottom!

  ## Redirects required for bypassing adblockers with plausible.io
  custom_rule {
    source = "/js/script.js"
    target = "https://plausible.io/js/plausible.js"
    status = 200
  }

  custom_rule {
    source = "/api/event"
    target = "https://plausible.io/api/event"
    status = 200
  }

  // required for legacy links that are still out there
  custom_rule {
    source = "/docs/<*>"
    status = "301"
    target = "/<*>"
  }

  # The following rules are used to redirect our old links to the new docs.
  # As customers might have used .html, without trailing slash or with trailing slash we just match all three cases.
  dynamic "custom_rule" {
    for_each = local.redirects
    content {
      source = custom_rule.value.source
      target = custom_rule.value.target
      status = "301"
    }
  }

  dynamic "custom_rule" {
    for_each = local.redirects
    content {
      source = "${custom_rule.value.source}/"
      target = custom_rule.value.target
      status = "301"
    }
  }

  dynamic "custom_rule" {
    for_each = local.redirects
    content {
      source = "${custom_rule.value.source}.html"
      target = custom_rule.value.target
      status = "301"
    }
  }

  // redirect old RSS feed URL to new URL (changed with Docusaurus v3 upgrade)
  custom_rule {
    source = "/blog/feed.xml"
    status = "301"
    target = "/blog/rss.xml"
  }


  ## Redirect old API documentation to new OpenAPI-based docs
  custom_rule {
    source = "/apis.index"
    target = "/api/introduction/"
    status = "301"
  }

  custom_rule {
    source = "/api/index.html"
    target = "/api/introduction/"
    status = "301"
  }

  custom_rule {
    source = "/billing-api/index.html"
    target = "/metering-api/metering-api-root/"
    status = "301"
  }

  // some legacy links still use the format /mydocs instead of /mydocs/
  // for these links fallback to client side routing
  // https://docs.aws.amazon.com/amplify/latest/APIReference/API_CustomRule.html
  // "404-200" means "if the request 404s because the requested file does not exist, return index.html instead as a "rewrite"
  // note that the returned status code is _not_ 200, but still a 404(!). This behavior confuses crawlers but works fine for humans
  custom_rule {
    source = "<*>"
    target = "/index.html"
    status = "404-200"
  }
}

# # todo: needs to be renamed to main, but requires changes to release automation logic
resource "aws_amplify_branch" "master" {
  app_id      = aws_amplify_app.docs.id
  branch_name = "master"
  framework   = "Docusaurus"
  stage       = "PRODUCTION"
  tags        = {}

  enable_pull_request_preview = false

  environment_variables = {
    "DOCSEARCH_INDEXNAME" = "meshcloud"
    "DOCSEARCH_APIKEY"    = "aa3b874dff5c832fe2e3ed42a8062160"
    "DOCSEARCH_APP_ID"    = "LDDGX81P02"
  }
}

resource "aws_amplify_branch" "develop" {
  app_id      = aws_amplify_app.docs.id
  branch_name = "develop"
  framework   = "Docusaurus"
  stage       = "DEVELOPMENT"
  tags        = {}

  enable_pull_request_preview = true

  environment_variables = {
    "DOCSEARCH_INDEXNAME" = "meshcloud_dev"
    "DOCSEARCH_APIKEY"    = "97ab0f20a3d4208be89e9f23d2bc9787"
    "DOCSEARCH_APP_ID"    = "LUMRH2SV4Z"
  }
}

resource "aws_amplify_domain_association" "docs_meshcloud_io" {
  app_id      = aws_amplify_app.docs.id
  domain_name = "docs.meshcloud.io"

  sub_domain {
    branch_name = aws_amplify_branch.master.branch_name
    prefix      = ""
  }
}

resource "aws_amplify_domain_association" "docs_dev_meshcloud_io" {
  app_id      = aws_amplify_app.docs.id
  domain_name = "docs.dev.meshcloud.io"

  sub_domain {
    branch_name = aws_amplify_branch.develop.branch_name
    prefix      = ""
  }
}


output "domains" {
  value = [
    aws_amplify_domain_association.docs_meshcloud_io,
    aws_amplify_domain_association.docs_dev_meshcloud_io
  ]
}
