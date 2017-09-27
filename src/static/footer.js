import React from 'react';
import { Col, Row } from 'react-bootstrap';

class Footer extends React.Component {

  render() {
    return (
    <footer className="footer">
      <div className="footer_top">
        <Row>
          <Col mdOffset={1} md={3}>
            <p><img src="../assets/argo-logo.png" alt="Argo"/></p>
            <p>ARGO is a lightweight service for Service Level Monitoring designed for medium and large sized e-Infrastructures. 
            Learn more: <a href='http://argoeu.github.io/' style={{color: 'white'}}>http://argoeu.github.io/</a></p>
          </Col>
          <Col mdOffset={1} md={3}>
            <h4>Contact Us</h4>
            <address>
            <strong>Email</strong><br/>
              <a href="mailto:argoeu-project@googlegroups.com" style={{color: 'white'}}>argoeu-project[AT]googlegroups.com</a>
            </address>
          </Col>
          <Col md={3}>
            <h4>Open development </h4>
            <p> We follow an open development process. All the repositories of ARGO are hosted on Github under the ARGOeu organization.</p>
          </Col>
        </Row>
      </div>

      <div className="footer_bottom_holder">
        <div className="footer_bottom">
          <div>
            <span>Copyright © 2014 - 2016 GRNET S.A. </span>
          </div>
          <div>
            <span>
              <a href="http://validator.w3.org/check?uri=referer" target="blank">
                <img src="./assets/validated.png" alt="HTML5 - CSS3 - W3C Validated" title="HTML5 - CSS3 - W3C Validated" height="30"/>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
    );
  }
}

export default Footer;
