import React from 'react';
import Reflux from 'reflux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
var numeral = require('numeral');

const tablesInfo = {
  projectMetrics: [
    {
      dataField: 'name',
      textlabel: 'Project Name',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_topics',
      text: 'Topics',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_subscriptions',
      text: 'Subscriptions',
      sort: true,
      align: 'left',
    }
  ],
  'project.user': [
    {
      dataField: 'username',
      text: 'User Name',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_topics',
      text: 'Topics',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_subscriptions',
      text: 'Subscriptions',
      sort: true,
      align: 'left',
    }
  ],
  topicMetrics: [
    {
      dataField: 'topicName',
      text: 'Topic Name',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_subscriptions',
      text: 'Subscriptions',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_messages',
      text: 'Messages',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_bytes',
      text: 'Bytes',
      sort: true,
      align: 'left',
    }
  ],
  subscriptionMetrics: [
    {
      dataField: 'subscriptionName',
      text: 'Subscription Name',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_messages',
      text: 'Messages',
      sort: true,
      align: 'left',
    },
    {
      dataField: 'number_of_bytes',
      text: 'Bytes',
      sort: true,
      align: 'left',
    }
  ]
};

class Table extends Reflux.Component {
  render() {
    let columns = tablesInfo[this.props.tableType];
    return (
      <BootstrapTable data={ this.props.data } columns={ columns } keyField='number_of_messages' pagination={ paginationFactory() }/>
  )}
}

export default Table;
