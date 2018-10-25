//header component
import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
      <Navbar fixed="top">
          <Navbar.Brand>
            <Container>
              <Row className="show-grid">
                <Col md={1}>
                  <a href="/projects"><img src="../assets/argo-logo.png" alt="ARGO"/></a>
                </Col>
              </Row>
            </Container>
          </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
