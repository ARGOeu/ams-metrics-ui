import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import Reflux from 'reflux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Users extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = sumMetricsStore;
  }


  render() {
    return (
      <BootstrapTable data={ this.state.userMetrics } striped={true} search pagination>
        <TableHeaderColumn dataField='username' dataSort={true} isKey={true} dataAlign='left'>Username</TableHeaderColumn>
        <TableHeaderColumn dataField='topics' dataAlign='left'>Topics</TableHeaderColumn>
        <TableHeaderColumn dataField='subscriptions' dataAlign='left'>Subscriptions</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Users;
