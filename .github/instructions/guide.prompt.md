---
applyTo: '**/new-guide-*.md'
title: Guide Writing Prompt
---

# Guide Writing Prompt for meshStack Documentation

When writing a guide for meshStack, follow this structure to ensure consistency, clarity, and a user-centric experience. Use the example from `new-guide-how-to-kickstart-your-IDP.md` as a template.

## Structure

1. **Frontmatter**
   - `id`: Unique identifier for the guide.
   - `title`: Clear, concise title describing the guide's purpose.

2. **Introduction**
   - Use a `:::note` block titled "What is this guide about?".
   - Briefly explain the guide's purpose and what users will achieve.

3. **Challenge**
    - If there is a clear business challenge or problem that the guide addresses, describe it here.

4. **Prerequisites**
   - List any requirements, permissions, or setup steps needed before starting.

5. **Step by Step Guide**
   - Provide clear, numbered steps for the user to follow.
   - Use subheadings for major steps if needed.
   - Include tips, best practices, or warnings in callout blocks (`:::tip`, `:::warning`, etc.).

6. **Related Resources**
   - Link to relevant concepts, other guides, or documentation for further learning.
   - Split this in two sections: "Concepts" and "Guides".

## Tone and Style

- Follow the meshStack tone instructions
- Focus on benefits and actionable steps.
- Avoid filler words and keep instructions efficient.

## Example Template

```markdown
---
id: new-guide-example
title: How to [Action/Feature]
---

:::note What is this guide about?
Briefly describe the guide's purpose and what users will achieve.
:::

## Prerequisites

- List requirements here.

## Step by Step Guide

1. Step one.
2. Step two.
3. ...

## Related Resources

- [Relevant Concept](concept-id)
- [Related Guide](guide-id)
```

---

Use this prompt as a checklist and template whenever you create or update a guide in