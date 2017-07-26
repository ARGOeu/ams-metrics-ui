import React from 'react';
import sumMetricsActions from '../metrics/sumMetricsActions.js';
import sumMetricsStore from '../metrics/sumMetricsStore.js';
import Reflux from 'reflux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Projects extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = sumMetricsStore;
  }

  componentDidMount() {
    sumMetricsActions.getProjects();
  }


  render() {
    return (
      <BootstrapTable data={ this.state.projectMetrics } keyField='projectName' search>
        <TableHeaderColumn dataField='projectName'>Project Name</TableHeaderColumn>
        <TableHeaderColumn dataField='topics' dataAlign='center'>Topics</TableHeaderColumn>
        <TableHeaderColumn dataField='subscriptions'dataAlign='center'>Subscriptions</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Projects;