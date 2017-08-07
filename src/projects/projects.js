import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import loginStore from '../login/loginStore.js';
import Reflux from 'reflux';
import ProjectMenuItem from './projectMenuItem.js';

class ProjectsTab extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  renderProjects() {
    let tabs = [];
    this.state.user.projects.forEach((project) => {
      tabs.push(<ProjectMenuItem project={project} />);
    });
    return tabs;
  }

  render() {
    return (
      <div>
        { this.renderProjects() }
      </div>
    );
  }
}

export default ProjectsTab;
