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
