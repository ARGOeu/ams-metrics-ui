import React from 'react'
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import projectsStore from './projectsStore';
import loginStore from '../login/loginStore';
import projectsActions from './projectsActions.js';
import Reflux from 'reflux';
import Table from '../tableComponent.js';


class RoleInfo extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [projectsStore, loginStore];
  }

  componentDidMount() {
    let user = this.state.user;
    let token = this.state.user.token;
    let role = this.props.role; 
    let projectName = this.props.project.project;
    projectsActions.getRoleInfo(token, role, projectName, user);
  }

  renderTable() {
    let role = this.props.role;
    let content;

    if (role === "project_admin") {
      content = (
        <div>
          <Table tableType='projectMetrics' data={this.state.projectMetrics}/>
          <Table tableType='userMetrics' data={this.state.userMetrics}/>
          <Table tableType='topicMetrics' data={this.state.topicMetrics}/>
          <Table tableType='subscriptionMetrics' data={this.state.subscriptionMetrics}/>
        </div>
      )
    } else if (role === "publisher") {
      content = (
        <Table tableType='topicMetrics' data={this.state.topicMetrics}/>
      )
    } else if (role === "consumer") {
      content = (
        <Table tableType='subscriptionMetrics' data={this.state.subscriptionMetrics}/>
      )
    }
    return content;
  }


  render() {
    return (
      <div style={{marginTop:'5%'}}>
        { this.renderTable() }
      </div>
    );
  }
}

export default RoleInfo;
