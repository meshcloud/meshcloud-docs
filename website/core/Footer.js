/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('meshcloud.index.html')}>
              User Documentation
            </a>
            <a href={this.docUrl('meshstack.index.html')}>
              Administrator Documentation
            </a>
            <a href={this.docUrl('faq.html')}>
              Security FAQ
            </a>
          </div>
          <div>
            <h5>Get in Touch</h5>
            <a
                href="https://support.meshcloud.io"
                target="_blank"
                rel="noreferrer noopener">
              Support
            </a>
            <a
                href="https://meshcloud.io"
                target="_blank"
                rel="noreferrer noopener">
              Website
            </a>
            <a
                href="https://www.linkedin.com/company/meshcloud"
                target="_blank"
                rel="noreferrer noopener">
              LinkedIn
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + 'blog'}>Release Notes</a>
            <a href="https://github.com/meshcloud">GitHub</a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
