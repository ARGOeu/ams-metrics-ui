import React from 'react';
import ProjectsTab from '../projects/projects.js';
import ProjectsItem from '../projects/projectsItem.js';
import loginStore from '../login/loginStore.js';
import Login from '../login/loginComponent.js';
import Reflux from 'reflux';
import { Switch, Route, Redirect } from 'react-router-dom';

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
    return (this.state.user && this.state.user.token);
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {
          (this.userLogged()) ?
            <div>
              <Route exact path="/projects" component={ProjectsTab} />
              <Route path="/projects/:project_name" component={ProjectsItem} />
            </div> : ''
        }
        <Route component={NoMatch}/>
      </Switch>
    );
  }
}

export default Layout;
