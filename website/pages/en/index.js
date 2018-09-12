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

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('meshcloud.index.html', language)}>meshcloud User Docs</Button>
            <Button href={docUrl('federation.index.html', language)}>Federation User Guide</Button>
            <Button href={docUrl('meshstack.index.html', language)}>meshstack Technology Guide</Button>
          </PromoSection>
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

const Features = props => (
  <Block layout="threeColumn">
    {[
      {
        title: `[**mesh**cloud](${docUrl('cloudfoundry.index.html', props.language)})`,
        content: 'User documentation',
      },
      {
        title: `[**mesh**cloud Federation](${docUrl('cloudfoundry.index.html', props.language)})`,
        content: 'our public cloud offering',
      },
      {
        title: `[**mesh**stack](${docUrl('cloudfoundry.index.html', props.language)})`,
        content: 'Technology',
      },
    ]}
  </Block>
);

const FeatureCallout = props => (
  // <Container background='light'>
    <div
      className="productShowcaseSection paddingTop lightBackground"
      style={{ textAlign: 'center' }}>
      <h2><a href={docUrl('meshcloud.index.html', props.language)}>Supported Cloud Technologies</a></h2>
      <MarkdownBlock>Combine best-of-breed cloud technologies with meshcloud</MarkdownBlock>
    </div>
  
);

const LearnHow = props => (
  <Block background="light" layout="fourColumn">
    {[
      {
        content: 'Deploy Apps and Containers in no time',
        image: imgUrl('cloudfoundry.png'),
        imageAlign: 'top',
        title: `[Cloud Foundry](${docUrl('cloudfoundry.index.html', props.language)})`,
      },
      {
        content: 'Deploy virtual infrastructure on OpenStack',
        image: imgUrl('openstack.png'),
        imageAlign: 'top',
        title: `[OpenStack](${docUrl('openstack.index.html', props.language)})`,
      },
      {
        content: 'Manage Kubernetes Clusters',
        image: imgUrl('k8s.png'),
        imageAlign: 'top',
        title: `Kubernetes`,
      },
      {
        content: 'Open Service Broker API',
        image: imgUrl('osbapi.png'),
        imageAlign: 'top',
        title: `Open Service Broker API`,
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
