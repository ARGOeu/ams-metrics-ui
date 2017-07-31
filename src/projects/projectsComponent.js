import React from 'react';
import sumMetricsStore from '../metrics/sumMetricsStore.js';
import Reflux from 'reflux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Projects extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = sumMetricsStore;
  }


  render() {
    return (
      <BootstrapTable data={ this.state.projectMetrics } keyField='projectName' search pagination>
        <TableHeaderColumn dataField='projectName'>Project Name</TableHeaderColumn>
        <TableHeaderColumn dataField='topics' dataAlign='center'>Topics</TableHeaderColumn>
        <TableHeaderColumn dataField='subscriptions' dataAlign='center'>Subscriptions</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Projects;
