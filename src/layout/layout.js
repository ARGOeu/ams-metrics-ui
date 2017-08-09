import React from 'react';
import ProjectsTab from '../projects/projects.js';
import ProjectsItem from '../projects/projectsItem.js';
import loginStore from '../login/loginStore.js';
import Login from '../login/loginComponent.js';
import Reflux from 'reflux';
import { Switch, Route } from 'react-router-dom';
import Admin from '../admin.js';


class Layout extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/projects" component={ProjectsTab} />
        <Route path="/projects/:project_name" component={ProjectsItem} />
        <Route path="/admin" component={Admin} />
      </Switch>
    );
  }
}

export default Layout;
