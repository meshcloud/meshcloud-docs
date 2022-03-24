/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc) {
  return siteConfig.baseUrl + 'docs/' + doc;
}

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content: `Learn more using the [documentation on this site.](${docUrl(
          'meshcloud.index.html'
        )})`,
        title: 'Browse Docs',
      },
      {
        content: 'Visit our [Homepage](https://www.meshcloud.io) for more information.',
        title: 'More meshcloud',
      },
      {
        content: "Find more multi-cloud related posts in our [Blog](https://www.meshcloud.io/blog).",
        title: 'Visit our Blog',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <p>This project is maintained by <a href="https://www.meshcloud.io/en/impressum/">meshcloud GmbH</a>.
            </p>
            <p>Visit <a href="https://support.meshcloud.io">support.meshcloud.io</a> for direct support on your issues.</p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
