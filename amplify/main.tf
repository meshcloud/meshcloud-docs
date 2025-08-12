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
  redirects = [
    # {
    #   source = "/meshcloud.index"
    #   target = "/"
    # },
    # {
    #   source = "/meshcloud.workspace"
    #   target = "/new-concept-workspace"
    # },
    # {
    #   source = "/meshcloud.project"
    #   target = "/new-concept-project"
    # },
    # {
    #   source = "/meshcloud.tenant"
    #   target = "/new-concept-tenant"
    # },
    # {
    #   source = "/meshcloud.tenant-quota"
    #   target = "/new-guide-how-enforce-resource-quotas"
    # },
    # {
    #   source = "/meshcloud.landing-zones"
    #   target = "/new-concept-landingzone"
    # },
    # {
    #   source = "/meshcloud.profile"
    #   target = "we will delete this one"
    # },
    # {
    #   source = "/meshcloud.platforms"
    #   target = "/new-concept-platform"
    # },
    # {
    #   source = "/meshcloud.cost-management"
    #   target = "/new-concept-cost-management"
    # },
    # {
    #   source = "/meshcloud.chargeback-v2"
    #   target = "we can delete v2 is default now"
    # },
    # {
    #   source = "/meshcloud.payment-methods"
    #   target = "new-concept-payment-methods"
    # },
    # {
    #   source = "/meshcloud.budget-alerts"
    #   target = "/new-concept-payment-methods/#budget-alerts"
    # },
    # {
    #   source = "/meshcloud.metadata-tags"
    #   target = "/new-concept-tag"
    # },
    # {
    #   source = "/meshcloud.policies"
    #   target = "/new-concept-policy"
    # },
    # {
    #   source = "/marketplace.index"
    #   target = "/new-concept-marketplace"
    # },
    # {
    #   source = "/marketplace.platform-builder"
    #   target = "/new-concept-meshstackareas"
    # },
    # {
    #   source = "/marketplace.service-instances"
    #   target = "/new-concept-osb-services/"
    # },
    # {
    #   source = "/meshstack.how-to.create-project"
    #   target = "/new-guide-how-to-manage-a-project"
    # },
    # {
    #   source = "/meshstack.how-to.onboard-team-to-project"
    #   target = "/new-guide-how-to-manage-a-project/#project-user-management-as-an-application-team"
    # },
    # {
    #   source = "/meshstack.index"
    #   target = "/new-docs.index"
    # },
    # {
    #   source = "/administration.index"
    #   target = "/new-concept-users-and-groups/#admin-area-users-and-permissions"
    # },
    # {
    #   source = "/meshstack.onboarding"
    #   target = "TODO move to new Settings category"
    # },
    # {
    #   source = "/administration.workspaces"
    #   target = "/new-concept-workspace"
    # },
    # {
    #   source = "/administration.projects"
    #   target = "/new-concept-project"
    # },
    # {
    #   source = "/administration.tenants"
    #   target = "/new-concept-tenant"
    # },
    # {
    #   source = "/meshstack.replication-configuration"
    #   target = "TODO needs to be moved. update link"
    # },
    # {
    #   source = "/administration.delete-tenants"
    #   target = "TODO needs to be moved. update link"
    # },
    # {
    #   source = "/administration.users"
    #   target = "/new-concept-users-and-groups"
    # },
    # {
    #   source = "/administration.platforms"
    #   target = "/new-concept-platform"
    # },
    # {
    #   source = "/administration.landing-zones"
    #   target = "/new-concept-landingzone"
    # },
    # {
    #   source = "/administration.building-blocks"
    #   target = "/new-concept-buildingblock"
    # },
    # {
    #   source = "/administration.service-brokers"
    #   target = "/new-concept-osb-services"
    # },
    # {
    #   source = "/administration.policies"
    #   target = "/new-concept-policy"
    # },
    # {
    #   source = "/administration.unmanaged-tenants"
    #   target = "/new-concept-tenant/#unmanaged-tenants"
    # },
    # {
    #   source = "/administration.meshstack-settings"
    #   target = "TODO very specific. could maybe make a return as more self-service config"
    # },
    # {
    #   source = "/administration.workspace-services"
    #   target = "/new-guide-how-to-enable-a-new-platform-team"
    # },
    # {
    #   source = "/administration.apiusers"
    #   target = "/new-concept-users-and-groups/#api-users"
    # },
    # {
    #   source = "/administration.dns"
    #   target = "TODO was copied but needs updated link"
    # },
    # {
    #   source = "/meshstack.customizing"
    #   target = "todo should also move to meshstack settings"
    # },
    # {
    #   source = "/administration.product-feedback-collection"
    #   target = "todo stays the same. maybe changes with new folder structure"
    # },
    # {
    #   source = "/meshstack.identity-federation"
    #   target = "todo ask someone smart like JR to move this"
    # },
    # {
    #   source = "/meshstack.identity-provider"
    #   target = "todo this one looks good we can use it 1:1 i would say"
    # },
    # {
    #   source = "/meshstack.identity-lookup"
    #   target = "todo planned to be deprecated. can we ditch it?"
    # },
    # {
    #   source = "/meshstack.authorization"
    #   target = "/new-guide-how-to-manage-4-eye-principle"
    # },
    # {
    #   source = "/meshstack.workspace-group-sync"
    #   target = "todo should be moved"
    # },
    # {
    #   source = "/meshstack.user-group-provisioning"
    #   target = "todo should be moved"
    # },
    # {
    #   source = "/meshstack.building-blocks.private-runners"
    #   target = "todo should be moved. there is a self-hosted runner one which is better"
    # },
    # {
    #   source = "/meshstack.building-blocks.meshStack-http-backend"
    #   target = "todo should be moved. we should have a Integrations > Terraform > Building Blocks with this"
    # },
    # {
    #   source = "/meshstack.building-blocks.permission-delegation-aws"
    #   target = "todo there should be some AWS x Building Blocks guide"
    # },
    # {
    #   source = "/meshstack.building-pipeline-integration"
    #   target = "todo should be specific guides for github & gitlab"
    # },
    # {
    #   source = "/meshstack.billing"
    #   target = "/new-concept-cost-management/"
    # },
    # {
    #   source = "/meshstack.billing-configuration"
    #   target = "todo should be moved probably?"
    # },
    # NOTE: the following below were all 1:1 migrated by copy-paste.
    # {
    #   source = "/meshstack.aws.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.aws.landing-zones"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.aws.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.aws.sso-setup"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.aws.reserved-instance-guide"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.azure.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.azure.landing-zones"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.azure.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.gcp.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.gcp.landing-zones"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.gcp.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.cloudfoundry.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.cloudfoundry.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.kubernetes.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.kubernetes.landing-zones"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.kubernetes.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.github.pipeline-automation"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.openshift.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.openshift.landing-zones"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.openshift.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.openstack.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.openstack.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.meshmarketplace.index"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.meshmarketplace.metering"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.meshmarketplace.profile"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.meshmarketplace.tenant-services"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.meshmarketplace.broker-tutorial"
    #   target = ""
    # },
    # NOTE: The following below were all 1:1 migrated by copy-paste.
    # {
    #   source = "/meshstack.managed-service"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.email"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.logging"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.monitoring"
    #   target = ""
    # },
    # {
    #   source = "/meshstack.backup"
    #   target = ""
    # },
    # {
    #   source = "/security-faq"
    #   target = "/security-faq"
    # },
    # {
    #   source = "/copilot-preview"
    #   target = "todo this one is not linked in the sidebar"
    # },
    # {
    #   source = "/meshstack.how-to.integrate-meshplatform"
    #   target = "/new-concept-platform"
    # },
    # {
    #   source = "/meshstack.how-to.integrate-meshplatform-aws-manually"
    #   target = "/new-integration-how-to-integrate-aws/"
    # },
    # {
    #   source = "/meshstack.how-to.integrate-meshplatform-azure-manually"
    #   target = "/new-integration-how-to-integrate-azure/"
    # },
    # {
    #   source = "/meshstack.how-to.integrate-meshplatform-gcp-manually"
    #   target = "/new-guide-how-to-integrate-gcp/"
    # },
    # {
    #   source = "/meshstack.how-to.create-your-own-platform"
    #   target = "/new-guide-how-to-provide-your-own-platform/"
    # },
    # {
    #   source = "/meshstack.how-to.manage-partner-level-permissions"
    #   target = "/new-concept-users-and-groups/#admin-area-users-and-permissions"
    # },
    # {
    #   source = "/meshstack.how-to-API-keys"
    #   target = "/new-concept-users-and-groups/#api-keys"
    # },
    # {
    #   source = "/meshstack.how-to.get-started-building-blocks"
    #   target = "TODO we should migrate this one. can be useful for tech people"
    # }
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

  // some legacy links still use the format /mydocs instead of /mydocs/
  // for these lnks fallback to client side routing
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
