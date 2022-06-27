/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [

];

const siteConfig = {
  title: 'meshcloud' /* title for your website */,
  tagline: 'we enable cloud-native organizations',
  url: 'https://docs.meshcloud.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'meshcloud-docs',
  organizationName: 'meshcloud',
  editUrl: 'https://github.com/meshcloud/meshcloud-docs/edit/develop/docs/',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'meshcloud.index', label: 'User Docs' },
    { doc: 'meshstack.index', label: 'Operator Docs' },
    { href: '/api', label: 'API Docs' },
    { blog: true, label: 'Release Notes' },
    { doc: 'faq', label: 'FAQ' },
    { page: 'help', label: 'Help' },
    { href: 'https://meshcloud.canny.io/documentation', label: 'Feedback' }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.png',
  footerIcon: 'img/meshcloud_white.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#7B89C3',
    secondaryColor: '#408FCD',
  },

  /* custom fonts for website */
  fonts: {
    headerFont: [
      "Montserrat",
      "sans-serif"
    ],
    // this needs to be before textFont, as docusaurus is variable string matching in a sequential order
    textFontBold: [
      "Roboto-Bold",
      "-apple-system",
      "system-ui"
    ],
    textFont: [
      "Roboto",
      "-apple-system",
      "system-ui"
    ],
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' meshcloud GmbH',

  // we prefer using prism.js for highlighting as it supports dhall (highlight.js does not)
  // use it for all languages so we enjoy consistent highlighting, fallback on highlight.js only if needed
  usePrism: ['dhall', 'json', 'yaml', 'bash', 'powershell', 'text'],

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'tomorrow-night-eighties',
  },

  stylesheets: [
    'https://fonts.googleapis.com/css?family=Montserrat|Roboto',
  ],

  // Add custom scripts here that would be placed in <script> tags
  scripts: [
    'https://buttons.github.io/buttons.js',
    // add "copy code" buttons to code block
    // see https://gist.github.com/yangshun/55db997ed0f8f4e6527571fc3bee4675
    '/js/clipboard.min.js', // from https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js but we want to avoid 3rd party CDN
    '/js/code-block-buttons.js',

    // add mermaid.js for diagrams
    // unfortunately it's not easy to make mermaid work during static site generation on docusaurus v1, so we will
    // include it as a runtime dependency for now. The benefits of having diagrams outweight the downsides of an 
    // additional dependency. References
    // - https://github.com/facebook/docusaurus/issues/1258
    // - https://github.com/mermaid-js/mermaid/issues/485
    'https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.11.2/mermaid.min.js',
  ],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: false,

  // Show documentation's last update time.
  enableUpdateTime: true,

  /* Open Graph and Twitter card images */
  ogImage: 'img/favicon.png',
  twitterImage: 'img/favicon.png',

  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },

  algolia: {
    apiKey: process.env.DOCSEARCH_APIKEY,
    indexName: process.env.DOCSEARCH_INDEXNAME
  },

  markdownPlugins: [ (md) => {
    md.renderer.rules.fence_custom.mermaid = (tokens, idx, options, env, instance) => {
        return `<div class="mermaid">${tokens[idx].content}</div>`;
    };
}],
};

// For the production build we include the Plausible tracking script.
// For more info, see the netlify.toml file.
if (process.env.CONTEXT === 'production') {
  siteConfig.scripts.push({
    src: '/js/script.js',
    defer: true,
    'data-domain': 'docs.meshcloud.io'
  });
}

module.exports = siteConfig;
