//footer component
import React from 'react';
import { Grid, Col } from 'react-bootstrap';

class Footer extends React.Component {

  render() {
    return (
    <footer id="footer" className="footer">
      <div className="footer_top">
        <div className="row ">
        </div>
        <div className="row ">
          <div className=" col-md-offset-1 col-md-3">
            <p><img src="./assets/argo-logo.png" alt="Argo"/></p>
            <p>ARGO is a lightweight service for Service Level Monitoring designed for medium and large sized e-Infrastructures. 
            Learn more: <a href='http://argoeu.github.io/' style={{color: 'white'}}>http://argoeu.github.io/</a></p>
          </div>
          <div className="col-md-offset-1 col-md-3">
            <h4>Contact Us</h4>
            <address>
            <strong>Email</strong><br/>
              <a href="mailto:argoeu-project@googlegroups.com" style={{color: 'white'}}>argoeu-project[AT]googlegroups.com</a>
            </address>
          </div>
          <div className="col-md-3">
            <h4>Open development </h4>
            <p> We follow an open development process. All the repositories of ARGO are hosted on Github under the ARGOeu organization.</p>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      
      <div className="footer_bottom_holder">
        <div className="footer_bottom">
          <div className="textwidget">
            <span>Copyright © 2014 - 2016 GRNET S.A. </span>
          </div>
          <div className="textwidget">
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