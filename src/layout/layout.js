import React from 'react';
import ProjectsTab from '../projects/projectsTab.js';
import ProjectsItem from '../projects/projectsItem.js';
import Stats from '../statistics/statsComponent.js';
import Users from '../sumMetrics/usersComponent.js';
import loginStore from '../login/loginStore.js';
import loginActions from '../login/loginActions.js';
import Login from '../login/loginComponent.js';
import SumMetrics from '../sumMetrics/sumMetricsComponent.js';
import Reflux from 'reflux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { slide as Menu } from 'react-burger-menu'

const NoMatch = () => {
  return (
    <Redirect to='/login' />
  )
}

var t;

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
            <div onMouseMove={this.handleMouseMove.bind(this)} className='layout'>
                {
                  (this.isSuperAdmin()) ?
                    <Menu noOverlay width={ 250 }>
                      <Link to="/projects">
                        <ProjectsTab />
                      </Link>
                      <Link className="sidebar-tab" to="/statistics">
                        <Glyphicon glyph="stats" />Statistics
                      </Link>
                      <Link className="sidebar-tab" to="/users">
                        <Glyphicon glyph="user" />Users
                      </Link>
                      <Button onClick={this.userLogout} className="btn-logout">
                        <Glyphicon glyph="log-out" />Log out
                      </Button>
                    </Menu>
                    :
                    <Menu noOverlay width={ 250 }>
                      <Link to="/projects">
                        <ProjectsTab />
                      </Link>
                      <Button onClick={this.userLogout} className="btn-logout">
                        <Glyphicon glyph="log-out" />Log out
                      </Button>
                    </Menu>
                }
              <Grid>
              <Row className="show-grid content-position">
                <Col xs={12} md={10} mdPush={2}>
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
