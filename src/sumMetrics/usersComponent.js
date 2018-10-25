import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import Reflux from 'reflux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


const columns = [
  {
    dataField: 'username',
    text: 'Username',
    sort: true,
    align: 'left',
  },
  {
    dataField: 'topics',
    text: 'Topics',
    align: 'left',
  },
  {
    dataField: 'subscriptions',
    text: 'Subscriptions',
    align: 'left',
  }
];

class Users extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = sumMetricsStore;
  }


  render() {
    return (
      <BootstrapTable data={ this.state.userMetrics } columns={ columns } keyField='username' striped pagination={ paginationFactory() } />
    );
  }
}

export default Users;
