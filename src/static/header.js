//header component
import React from 'react';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Grid>
              <Row className="show-grid">
                <Col md={1} xsHidden>
                  <a href="/projects"><img src="../assets/argo-logo.png" alt="ARGO"/></a>
                </Col>
              </Row>
            </Grid>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
