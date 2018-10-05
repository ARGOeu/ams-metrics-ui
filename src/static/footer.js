import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Footer extends React.Component {

  render() {
    return (
    <footer className="footer">
      <div className="footer-top">
        <Grid>
        <Row className="show-grid">
          <Col mdPush={2} md={3}>
            <p><img src="../assets/argo-logo.png" alt="Argo"/></p>
            <p>ARGO is a lightweight service for Service Level Monitoring designed for medium and large sized e-Infrastructures. 
            Learn more: <a href='http://argoeu.github.io/' style={{color: 'white'}}>http://argoeu.github.io/</a></p>
          </Col>
          <Col mdPush={2} md={3}>
            <h4>ARGO AMS - Metrics</h4>
            <p>The ARGO Messaging Service (AMS) is a Publish/Subscribe Service, which implements the Google PubSub protocol. It provides an HTTP API that enables Users/Systems to implement message oriented service. This Services metrics on top of the AMS</p>
          </Col>
          <Col mdPush= {2} md={3}>
            <h4>Open development </h4>
            <p>We follow an open development process. All the repositories of ARGO are hosted on Github under the ARGOeu organization.</p>
            <h4>Contact Us</h4>
              <address>
              <strong>Email</strong><br/>
                <a href="mailto:argo@lists.grnet.gr" style={{color: 'white'}}>argo[AT]lists.grnet.gr</a>
              </address>
          </Col>
        </Row>
          </Grid>
      </div>

      <div className="footer-bottom">
        <div>
          <span>Copyright © 2014 - 2018 GRNET S.A. </span>
        </div>
        <div>
          <span>
            <a href="http://validator.w3.org/check?uri=referer" target="blank">
              <img src="../assets/validated.png" alt="HTML5 - CSS3 - W3C Validated" title="HTML5 - CSS3 - W3C Validated" height="30"/>
            </a>
          </span>
        </div>
      </div>
    </footer>
    );
  }
}

export default Footer;
