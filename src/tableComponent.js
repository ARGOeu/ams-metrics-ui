import React from 'react';
import Reflux from 'reflux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
var numeral = require('numeral');

const { SearchBar } = Search;
const tablesInfo = {
  projectMetrics: [
    {
      dataField: 'name',
      text: 'Project Name',
    },
    {
      dataField: 'number_of_topics',
      text: 'Topics',
    },
    {
      dataField: 'number_of_subscriptions',
      text: 'Subscriptions',
    }
  ],
  'project.user': [
    {
      dataField: 'username',
      text: 'User Name',
      align: 'left',
    },
    {
      dataField: 'number_of_topics',
      text: 'Topics',
      align: 'left',
    },
    {
      dataField: 'number_of_subscriptions',
      text: 'Subscriptions',
      align: 'left',
    }
  ],
  topicMetrics: [
    {
      dataField: 'topicName',
      text: 'Topic Name',
      align: 'left',
    },
    {
      dataField: 'number_of_subscriptions',
      text: 'Subscriptions',
      align: 'left',
    },
    {
      dataField: 'number_of_messages',
      text: 'Messages',
      align: 'left',
      formatter: numberFormatter
    },
    {
      dataField: 'number_of_bytes',
      text: 'Bytes',
      align: 'left',
      formatter: byteFormatter
    }
  ],
  subscriptionMetrics: [
    {
      dataField: 'subscriptionName',
      text: 'Subscription Name',
      align: 'left',
    },
    {
      dataField: 'number_of_messages',
      text: 'Messages',
      align: 'left',
      formatter: numberFormatter
    },
    {
      dataField: 'number_of_bytes',
      text: 'Bytes',
      align: 'left',
      formatter: byteFormatter
    }
  ]
};

function numberFormatter(cell, row) {
  return numeral(cell).format('0,0');
}

function byteFormatter(cell, row) {
  if (!isNaN(cell)) {
    cell = numeral(cell).format('0.00b');
  }
  return cell;
}

class Table extends Reflux.Component {
  render() {
    let columns = tablesInfo[this.props.tableType];
    const { tableType } = this.props;
    return (
      <div>
      {
        (tableType ===  'projectMetrics') ?
        <BootstrapTable data={ this.props.data } columns={ columns } keyField='number_of_messages' bordered={ false }/> :
        <ToolkitProvider
          keyField="number_of_metrics"
          data={ this.props.data }
          columns={ columns }
          search
        >
          {
            props => (
              <div>
                <SearchBar { ...props.searchProps } />
                <hr />
                <BootstrapTable
                  { ...props.baseProps }
                  pagination={ paginationFactory() }
                />
              </div>
            )
          }
        </ToolkitProvider>
      }
      </div>
    )}
}

export default Table;
