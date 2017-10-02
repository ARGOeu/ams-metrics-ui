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
      <BootstrapTable data={ this.state.userMetrics } search pagination>
        <TableHeaderColumn dataField='username' isKey={true} dataAlign='center'>Username</TableHeaderColumn>
        <TableHeaderColumn dataField='topics' dataAlign='center'>Topics</TableHeaderColumn>
        <TableHeaderColumn dataField='subscriptions' dataAlign='center'>Subscriptions</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Users;
