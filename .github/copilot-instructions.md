# Copilot Instructions for meshStack Documentation

This is a Docusaurus v3 project. Follow these guidelines when making changes.s

## Before Making Changes

**Read relevant instruction files** based on your task:

Always obey the following:
- [tone instructions](instructions/tone.instructions.md)
- [capitalization and wording instructions](instructions/capitalizationandwording.instructions.md)

The following applies to specific file types:
- Instructions for [writing guides](instructions/guide.instructions.md) 

NEVER commit changes to the blog/ directory, which is auto-generated from release notes. ALWAYS ignore all files in blog/.

## Before Committing

Always run these commands to validate your changes:

```bash
yarn lint    # Check for documentation errors
yarn build   # Ensure the site builds correctly
```

Do not commit if either command fails.

## Key Commands

- `yarn start` - Development server
- `yarn build` - Production build
- `yarn lint` - Run all linters
- `yarn typecheck` - TypeScript validation

## Project Structure

- `docs/` - Documentation as markdown files
- `blog/` - Blog posts with release notes, must be ignored!
- `static/` - Static assets
- `src/` - Source code
- `docusaurus.config.ts` - Main configuration
