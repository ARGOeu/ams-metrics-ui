import React from 'react';
import statsActions from './statsActions.js';
import statsStore from './statsStore.js';
import Reflux from 'reflux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


const columns = [
  {
    dataField: 'instanceName',
    text: 'Instances',
    sort: true,
    align: 'left',
  },
  {
    dataField: 'cpu_usage',
    text: 'CPU usage %',
    align: 'left',
  },
  {
    dataField: 'memory_usage',
    text: 'Memory usage %',
    align: 'left',
  }
];


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
      <BootstrapTable keyField='instanceName' data={ this.state.metrics } columns={ columns } striped pagination={ paginationFactory() }/>
    );
  }
}

export default Stats;
