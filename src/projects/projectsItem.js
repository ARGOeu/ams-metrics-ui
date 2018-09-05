import React from 'react';
import loginStore from '../login/loginStore.js';
import Reflux from 'reflux';
import ProjectTabItem from './projectTabItem.js';


class ProjectsItem extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  renderRoles() {
    let tabs = [];
    let projectName = this.props.location.pathname.split("/")[2]
    
    this.state.user.projects
    .filter((project) => {
        return (project.project === projectName);
    }).forEach((project) => {
      project.roles.forEach((role, index) => {
        tabs.push(<ProjectTabItem role={role} project={project} tabKey={index} key={index}/>);
      });
    });
    return tabs;
  }

  render() {
    return (
      <div>
        { this.renderRoles() }
      </div>
    );
  }
}

export default ProjectsItem;
