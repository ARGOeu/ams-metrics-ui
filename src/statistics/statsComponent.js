import React from 'react';
import statsActions from './statsActions.js';
import statsStore from './statsStore.js';
import Reflux from 'reflux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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
      <BootstrapTable data={ this.state.metrics } search pagination>
        <TableHeaderColumn dataField='instanceName'isKey={true} dataAlign='center'>Instances</TableHeaderColumn>
        <TableHeaderColumn dataField='cpu' dataAlign='center'>CPU usage % </TableHeaderColumn>
        <TableHeaderColumn dataField='memory'dataAlign='center'>Memory usage % </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Stats;