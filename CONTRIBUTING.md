# Contributions

Please create pull request against `develop` for your changes and additions and request a reviewer from the meshcloud team. The reviewer reads the article and checks if the style guidelines are met. If (s)he is satisfied (s)he merges and publishes the changes.

## Docusaurus

Check the [documentation](https://docusaurus.io) for how to use Docusaurus.

## Audience Personas

meshcloud offers different functionality to people with different roles. To make documentation clearer, we introduce different *audience personas* which helps to direct a feature or description to a defined target role. Authors of documentation or Release Notes should tailor their descriptions using these roles to communicate efficiently.

* A **User** is a person who uses the meshcloud panel to consume the meshcloud functionality, usually a developer or DevOps engineer. Users are focused on delivering value with their application deployments and use meshcloud to efficiently access, automate and administer the cloud technology they want to use. They want quick access to their deployment spaces and the resources they need. This means avoiding lenghty processes as much as possible, self-service and straight-through processing is key. Users usually work in teams which consists of colleagues of their own organizations or are mixed with external and internal specialists.
* A **Customer** is more a business-oriented role than a *user*. *Customers* have the responsibility for their users and projects in terms of data privacy, security, compliance, cost and capacity management (among others). Think of them as team leads or business managers/product owners with overall responsible for a business application.
* **Partners** are specialized operators who provide managed services to *customers* and, potentially, their *users*. Partners receive access to customer resources (recorded for auditing purposes) and are able to support deployment of resources or other administrative tasks. There is usually a contractual agreement between *partners* and *customers* that defines the obligations and rights of the *partner*.
* **Operators** are technical roles responsible for operating and providing cloud technology to *users* and who use meshcloud to easily distribute cloud services to their stakeholders. This includes monitoring of cloud operations, permission management, data privacy, compliance and cost control (some of these roles might be taken by different people than technical cloud operators, however we include them to the operator role for now as it is the intermediate role for providing this kind of information). Important KPIs for *operators* are e.g. availability, auditability, utilization, reliability, speed and cost.

Note that right now documentation is split between the "User/Operator" line as that split has proven more useful than a too-fine grained split. Customer and Partner docs are mostly part of the User section (because they interact with the system as "end users").

## Style Guide for meshcloud Documentation

### Language

* Primary documentation language is **English**.
* The tone is practical without personal opinions, viewpoints, rants etc. – it's a sober technical documentation.
* Write short, but precise sentences. Make sure you give complete information and to reveal implicit conclusions or implications which might not be obvious to a fresh reader ("We can't read your mind, only your text").
* Do not bloat your texts by getting anecdotic, stating too many details or providing too many alternatives to reach a certain goal.
* Use paragraphs and sub headings in a meaningful way to structure your text for quick scanning.

### Formatting

The following formatting should be applied for contribution to the meshcloud documentation.

* Navigation Items: When you name navigation items such as **menu labels** put them in double-star **bold** (\*\*menu-label\*\*) .
* For `buttons` use backticks (\`button\`).
* No quotation marks around item names (") please.
* Use the style as recommended by [markdownlint](https://github.com/markdownlint/markdownlint). For VSCode use the extensions `davidanson.vscode-markdownlint` to get inline linting.
* Whenever possible, prefer including code blocks with the help of the snippets tooling as explained in the [README](./README.md#snippets).

### Adding a new page

Create your new markdown file `docs/mynewpage.md`.
Link your markdown file in `website/sidebars.json`.
