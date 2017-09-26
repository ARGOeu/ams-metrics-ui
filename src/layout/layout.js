import React from 'react';
import ProjectsTab from '../projects/projects.js';
import ProjectsItem from '../projects/projectsItem.js';
import Stats from '../statistics/statsComponent.js';
import Users from '../sumMetrics/usersComponent.js';
import loginStore from '../login/loginStore.js';
import loginActions from '../login/loginActions.js';
import Login from '../login/loginComponent.js';
import SumMetrics from '../sumMetrics/sumMetricsComponent.js';
import Reflux from 'reflux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Button, Col, Row, Navbar, Nav, NavItem } from 'react-bootstrap';

const NoMatch = () => {
  return (
    <Redirect to='/login' />
  )
}

class Layout extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  userLogged() {
    return (this.state.user && this.state.user.token) ? true : false;
  }

  userLogout() {
    loginActions.logout();
  }

  isSuperAdmin() {
    return (this.state.user.service_roles[0] === 'service_admin') ? true : false;
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {
          (this.userLogged()) ?
            <div>
              <div>
                <Navbar collapseOnSelect>
                  <Navbar.Collapse>
                  {
                    (this.isSuperAdmin()) ?
                      <Nav className="link">
                        <NavItem><NavLink className="link" to="/projects">Projects</NavLink></NavItem>
                        <NavItem><NavLink className="link" to="/statistics">Operational Statistics</NavLink></NavItem>
                        <NavItem><NavLink className="link" to="/users">Users</NavLink></NavItem>
                      </Nav> : ''
                  }
                    <Nav pullRight>
                      <NavItem><Button onClick={this.userLogout}>Logout</Button></NavItem>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>

                {(this.isSuperAdmin()) ? <SumMetrics /> : ''}
                <div className="height container centered">
                  <Row>
                    <Col xs={12} md={12}>
                      <Route exact path="/projects" component={ProjectsTab}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12}>
                      <Route exact path="/projects/:project_name" component={ProjectsItem}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={10}>
                      <Route exact path="/statistics" component={Stats}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={10}>
                      <Route exact path="/users" component={Users}/>
                    </Col>
                  </Row>
                </div>
              </div>
            </div> : ''
        }
        <Route component={NoMatch}/>
      </Switch>
    );
  }
}

export default Layout;
