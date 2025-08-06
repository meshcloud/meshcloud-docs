import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'meshStack Documentation',
  tagline: 'We { Platform }, You { Product }',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.meshcloud.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Enable trailing slashes in URLs, i.e. generating docs as mydocspage/index.html and alwas link to mydocspage/
  // This matches the default behavior of AWS Amplify hosting, which we use for deployment.
  // See https://docusaurus.io/docs/next/advanced/routing#routes-become-html-files
  // And https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html#trailing-slashes-and-clean-urls
  // However, it seems that documentation by AWS is incorrect. I could not get the configuration
  // /about => returnes /about.html to work with trailingSlash: false, amplify always returned a 404 for this page
  // This is why we use trailingSlash: true here as thats the only other configuration that works consistently
  trailingSlash: false,

  staticDirectories: ['static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'meshcloud', // Usually your GitHub org/user name.
  projectName: 'meshcloud-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  scripts: [],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable markdown support
  markdown: {
    mermaid: true,
    format: 'detect'
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/meshcloud/meshcloud-docs/tree/develop',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      // Productive Algolia credentials.
      // It's fine to use these locally, it does not harm anything.
      // They are also not secrets so it's fine to put them in the code.
      apiKey: 'aa3b874dff5c832fe2e3ed42a8062160',
      appId: 'LDDGX81P02',
      indexName: 'meshcloud'
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'meshStack',
      logo: {
        alt: 'meshStack Logo',
        src: 'img/meshstack_logo.png',
        href: '/'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'meshcloud',
          position: 'right',
          label: 'User Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'meshstack',
          position: 'right',
          label: 'Administrator Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'new-docs',
          position: 'right',
          label: 'New Docs',
        },
        {
          type: 'doc',
          docId: 'apis.index',
          position: 'right',
          label: 'API Docs',
        },
        {
          href: 'https://registry.terraform.io/providers/meshcloud/meshstack/latest/docs',
          position: 'right',
          label: 'meshStack Terraform Docs'
        },
        {
          to: '/blog',
          label: 'Release Notes',
          position: 'right'
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Get in Touch',
          items: [
            {
              label: 'Support',
              href: 'mailto:support@meshcloud.io',
            },
            {
              label: 'Website',
              href: 'https://meshcloud.io',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/meshcloud/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Release Notes',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/meshcloud/meshcloud-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} meshcloud GmbH`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['dhall', 'json', 'yaml', 'bash', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

// For the production build we include the Plausible tracking script.
// We only use this for the master build. Not for develop builds or preview builds.
if (process.env.AWS_BRANCH === 'master') {
  config.scripts.push({
    src: '/js/script.js',
    defer: true,
    'data-domain': 'docs.meshcloud.io'
  });
}

export default config;
