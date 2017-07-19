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
      <BootstrapTable data={ this.state.metrics } bordered={ false }>
        <TableHeaderColumn dataField='1'isKey={true} dataAlign='center'>Instances</TableHeaderColumn>
        <TableHeaderColumn dataField='2' dataAlign='center'>CPU usage % </TableHeaderColumn>
        <TableHeaderColumn dataField='3'dataAlign='center'>Memory usage % </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default Stats;