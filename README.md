# meshcloud Documentation

![CI Build](https://github.com/meshcloud/meshcloud-docs/workflows/CI%20Build/badge.svg?branch=develop)

Welcome to the meshcloud Platform documentation!

It's all built on [docusaurus](https://docusaurus.io/en/) and available on [GitHub](https://github.com/meshcloud/meshcloud-docs). We accept community contributions!

## Running Locally

To build and start the docs locally with live-reloading, simply run: 
 
```bash
cd website && yarn && yarn start
```

## Updating Snippets References (experimental)

``` bash
cd snippets && yarn start --src "pathToSource/**/*.dhall" --snips .cache --docs "pathToDocs/**/*.md"
```

## License

Like Docusaurus, the meshcloud documentation portal is open source and MIT licensed.

The contents of the documentation (e.g. the .md files in the /docs folder) is Creative Commons licensed.
