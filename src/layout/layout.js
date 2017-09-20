import React from 'react';
import ProjectsTab from '../projects/projects.js';
import ProjectsItem from '../projects/projectsItem.js';
import loginStore from '../login/loginStore.js';
import loginActions from '../login/loginActions.js';
import Login from '../login/loginComponent.js';
import Reflux from 'reflux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

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

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {
          (this.userLogged()) ?
            <div className="container height centered">
              <Row>
                <Col xs={12} mdPush={6}>
                  <Button bsStyle="primary" onClick={this.userLogout}>Logout</Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Route exact path="/projects" component={ProjectsTab} />
                  <Route path="/projects/:project_name" component={ProjectsItem} />
                </Col>
              </Row>
            </div> : ''
        }
        <Route component={NoMatch}/>
      </Switch>
    );
  }
}

export default Layout;
