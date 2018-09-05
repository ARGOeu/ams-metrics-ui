import React from 'react';
import {  Tab } from 'react-bootstrap';
import RoleInfo from './roleInfo.js';


class ProjectTabItem extends React.Component {

  render() {
    return (
      <Tab.Pane eventKey={this.props.tabKey}>
        <RoleInfo project={this.props.project} role={this.props.role}/>
      </Tab.Pane>
    );
  }
}

export default ProjectTabItem;
