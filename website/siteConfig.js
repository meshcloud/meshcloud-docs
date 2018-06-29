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
  title: 'Meshcloud Documentation Portal' /* title for your website */,
  tagline: 'User and Developer Documentation',
  url: 'https://docs.meshcloud.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'meshcloud-docs',
  organizationName: 'meshcloud',
  editUrl: 'https://github.com/meshcloud/meshcloud-docs/edit/master/docs/',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'meshcloud.index', label: 'meshcloud docs' },
    { doc: 'federation.index', label: 'meshcloud federation guide' },
    { doc: 'meshstack.index', label: 'meshstack docs' },
    { page: 'help', label: 'Help' },
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
    textFont: [
      "Roboto",
      "-apple-system",
      "system-ui"
    ]
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Meshcloud GmbH',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'atom-one-dark',
  },

  stylesheets: [
    'https://fonts.googleapis.com/css?family=Montserrat|Roboto'
  ],

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/favicon.png',
  twitterImage: 'img/favicon.png',

  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  }
};

module.exports = siteConfig;
