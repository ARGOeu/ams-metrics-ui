//header component
import React from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect fixedTop bsStyle="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/projects"><img src="../assets/argo-logo.png" alt="ARGO"/></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
