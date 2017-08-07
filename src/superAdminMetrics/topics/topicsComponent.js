import React from 'react';
import sumMetricsStore from '../../metrics/sumMetricsStore.js';
import Reflux from 'reflux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Topics extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = sumMetricsStore;
  }


  render() {
    return (
      <BootstrapTable data={ this.state.topicMetrics } keyField='projectName' search pagination>
        <TableHeaderColumn dataField='topictName'>Topic Name</TableHeaderColumn>
        <TableHeaderColumn dataField='subscriptions' dataAlign='center'>Subscriptions</TableHeaderColumn>
        <TableHeaderColumn dataField='messages' dataAlign='center'>Messages</TableHeaderColumn>
        <TableHeaderColumn dataField='bytes' dataAlign='center'>Bytes</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Topics;
