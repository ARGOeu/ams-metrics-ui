import React from 'react';
import statsActions from './statsActions.js';
import statsStore from './statsStore.js';
import Reflux from 'reflux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table-next';

class Stats extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = statsStore;
  }

  componentDidMount() {
    statsActions.getStats();
  }

  render() {
    return (
      <BootstrapTable data={ this.state.metrics } striped={true} search pagination>
        <TableHeaderColumn dataField='instanceName' dataSort={true} isKey={true} dataAlign='left'>Instances</TableHeaderColumn>
        <TableHeaderColumn dataField='cpu_usage' dataAlign='left'>CPU usage % </TableHeaderColumn>
        <TableHeaderColumn dataField='memory_usage' dataAlign='left'>Memory usage % </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Stats;
