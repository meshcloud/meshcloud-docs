/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const LearnHow = props => (
  <Block background="light" layout="twoColumn">
    {[
      {
        title: `[User Documentation](${docUrl('meshcloud.index.html', props.language)})`,
        content: 'Documentation for DevOps Teams and IT Managers using a meshcloud installation as end-users.',
      },
      {
        title: `[Operator Documentation](${docUrl('meshstack.index.html', props.language)})`,
        content: 'Documentation for multi-cloud management and cloud operation teams operating a meshcloud installation and connected cloud platforms.',
      }
    ]}
  </Block>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <LearnHow />
          <div className="testimonials">
            <Container padding={['bottom', 'top']}>
              <GridBlock
                align="center"
                contents={[
                  {
                    content: 
                      `DevOps Teams use meshcloud to setup and [configure a team](${docUrl('meshcloud.customer.html', language)}),
                       [create projects](${docUrl('meshcloud.project.html', language)}) and provision managed cloud environments using [Landing Zones](${docUrl('meshcloud.landing-zones.html', language)}).
                       Once setup you can [manage resources](${docUrl('meshcloud.project-resources.html', language)}), [review costs](${docUrl('meshcloud.project-metering.html', language)})
                       and [consume marketplace services](${docUrl('marketplace.index.html', language)}).`,
                    image: `${imgUrl('persona_devops.png')}`,
                    imageAlign: 'top',
                    imageAlt: 'DevOps Teams',
                    title:
                      'DevOps Teams <br/><font size="2">Product Owners & Developers</font>',
                  },
                  {
                    content:
                    `Multi-cloud management teams use meshcloud to provide [managed cloud environments](${docUrl('administration.landing-zones.html', language)}) to internal [customers](${docUrl('administration.customers.html', language)}) and their [projects](${docUrl('administration.projects.html', language)}).
                    They set the standards for cloud usage and ensure that teams can move to the cloud quickly and safely while [staying in control](${docUrl('administration.analytics.html', language)}).
                    `,
                    image: `${imgUrl('persona_governance.png')}`,
                    imageAlign: 'top',
                    imageAlt: 'IT Governance',
                    title:
                      'IT Governance <br/><font size="2">IAM & Compliance Management</font>',
                  },
                  {
                    content:
                      `Platform operators are responsible for [configuring and maintaining cloud platforms](${docUrl('meshstack.index.html', language)}) like AWS, Azure or OpenShift clusters. 
                      As experts for the cloud platforms they [integrate platforms](${docUrl('meshstack.index.html#integrations', language)}) with meshcloud, provide Landing Zone implementations and governance automation.`,
                    image: `${imgUrl('persona_platformops.png')}`,
                    imageAlign: 'top',
                    imageAlt: 'Platform Operators ',
                    title:
                      'Platform Operators <br/><font size="2">Cloud Platform Experts</font>',
                  },

                  {
                    content:
                      `Service Owners provide application services like managed databases, on-prem connectivity, firewall automation and email services to DevOps teams. 
                      Service Owners can offer their services on the [meshMarketplace](${docUrl('meshstack.meshmarketplace.index.html', language)}) 
                      and use meshcloud to [develop and manage](${docUrl('meshstack.meshmarketplace.development.html', language)}) their service offerings.`,
                    image: `${imgUrl('persona_serviceowner.png')}`,
                    imageAlign: 'top',
                    imageAlt: 'Service Owners ',
                    title:
                      'Service Owners <br/><font size="2">Network & Application Services</font>',
                  },
                  {
                    content:
                      `IT Controllers use meshcloud to automate [metering and chargeback](${docUrl('meshstack.billing.html', language)})
                      for all cloud platforms. Controllers can set product catalogs and pricing for private cloud platforms and
                      [review cost and charges](${docUrl('administration.usage.html', language)}) for private & public clouds from a single pane of glass.
                      
                      `,
                    image: `${imgUrl('persona_controlling.png')}`,
                    imageAlign: 'top',
                    imageAlt: 'IT Controlling',
                    title:
                      'IT Controlling <br/><font size="2">Managing Cost & Chargeback</font>',
                  },
                ]}
                layout="threeColumn"
              />
            </Container>
          </div>
        </div>
      </div >
    );
  }
}

module.exports = Index;
