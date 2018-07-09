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
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu'

const NoMatch = () => {
  return (
    <Redirect to='/login' />
  )
}

var t;

var styles = {
  bmMenuWrap: {
    width: '180px',
    borderTop: '1px solid white',
    borderRight: '1px solid white'
  }
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
    window.location = '/login';
  }

  isSuperAdmin() {
    return (this.state.user.service_roles[0] === 'service_admin') ? true : false;
  }

  resetTimer() {
    if(t)
      clearTimeout(t);
    t = setTimeout(this.userLogout, 1800 * 1000); //set timeout to 30 minutes
  }

  componentDidMount() {
    this.resetTimer();
  }

  handleMouseMove(e) {
    this.resetTimer();
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {
          (this.userLogged()) ?
            <div onMouseMove={this.handleMouseMove.bind(this)}>
                {
                  (this.isSuperAdmin()) ?
                    <Menu noOverlay styles={ styles }>
                      <NavLink className="link" to="/projects">
                        <Glyphicon glyph="briefcase" />Projects
                      </NavLink>
                      <NavLink className="link" to="/statistics">
                        <Glyphicon glyph="stats" />Statistics
                      </NavLink>
                      <NavLink className="link" to="/users">
                        <Glyphicon glyph="user" />Users
                      </NavLink>
                      <Button onClick={this.userLogout} className="btn-logout">
                        <Glyphicon glyph="log-out" />Log out
                      </Button>
                    </Menu>
                    :
                    <Menu noOverlay styles={ styles }>
                      <NavLink className="link" to="/projects">
                        <Glyphicon glyph="briefcase" />Projects
                      </NavLink>
                      <Button onClick={this.userLogout} className="btn-logout">
                        <Glyphicon glyph="log-out" />Log out
                      </Button>
                    </Menu>
                }
              <Grid>
              <Row className="show-grid centered">
                <Col xs={12} md={10} mdPush={2}>
                  <Route exact path="/projects" component={ProjectsTab}/>
                  <Route exact path="/projects/:project_name" component={ProjectsItem}/>
                  <Route exact path="/statistics" component={Stats}/>
                  <Route exact path="/users" component={Users}/>
                </Col>
              </Row>
              </Grid>
            </div> : ''
        }
        <Route component={NoMatch}/>
      </Switch>
    );
  }
}

export default Layout;
