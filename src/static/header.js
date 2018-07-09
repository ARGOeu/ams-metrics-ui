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
                <Col md={1} mdPush={2} lg={1} lgPush={1} xsHidden smHidden >
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
