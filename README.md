# meshcloud Documentation

![CI Build](https://github.com/meshcloud/meshcloud-docs/workflows/CI%20Build/badge.svg?branch=develop)

Welcome to the meshcloud Platform documentation!

It's all built on [docusaurus](https://docusaurus.io/en/) and available on [GitHub](https://github.com/meshcloud/meshcloud-docs). We accept community contributions!

## Running Locally

To build and start the docs locally with live-reloading, simply run:

```bash
cd website && yarn && yarn start
```

## Snippets

### Defining Snippets for Documentation

Snippet definitions are currently restricted to a specific comment syntax supported by `dhall format`. These limitations
may be resolved in future versions of dhall, until then we use the follwoing syntax.

Define snippets using a wrapping let expression, followed by a single line comment defining the snippet id. The wrapping
let expression will not be contained in the rendered snippet blocks.

- Record types should describe their fields using a single multli-line comments
- Snippets should include types and may include one or more usage examples of actual values

```haskell
let Snippet =
  -- snippet:mesh.panel.environment.mesh.registration.type
  let Registration =
    {-
        field1:
            Long description

        field2:
            long description
    -}
      { field1 : Bool
      , field2 : Optional Text
      }

  let example =
        { field1 = True
        , field2 = Some "https://itsm.example.com/order/meshcloud"
        }
      : Registration

  in Registration
in Snippet
```

Ther are two "types" of snippets, which will be rendered differently in the documentation

- `x.y`: these snippets describe a configuration option and its location in the config model
- `x.y#type`: these snippets describe a common configuration data type

### Include Snippet References

Snippet references in markdown begin with a html comment referencing the snippet id and end with a
`END_DOCUSAURUS_CODE_TABS` comments.

```markdown
Your description of the snippet

<!--snippet:snippet.id-->
<!--END_DOCUSAURUS_CODE_TABS-->
```

### Updating Snippets References

The following command automatically updates rendered snippet references in code, assuming you have all required
source repositories checked out to your local machine.

``` bash
./hack/update-snippets
```

Have a look at the `update-snippets` in case you want more fine-grained control over snippet updates for further options.

## License

Like Docusaurus, the meshcloud documentation portal is open source and MIT licensed.

The contents of the documentation (e.g. the .md files in the /docs folder) is Creative Commons licensed.
