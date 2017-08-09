import React from 'react';
import Reflux from 'reflux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const tablesInfo = {
  projectMetrics: [
    {
      key: 'projectName',
      label: 'Project Name'
    },
    {
      key: 'topics',
      label: 'Topics'
    },
    {
      key: 'subscriptions',
      label: 'Subscriptions'
    }
  ],
  userMetrics: [
    {
      key: 'userName',
      label: 'User Name'
    },
    {
      key: 'topics',
      label: 'Topics'
    },
    {
      key: 'subscriptions',
      label: 'Subscriptions'
    }
  ],
  topicMetrics: [
    {
      key: 'topicName',
      label: 'Topic Name'
    },
    {
      key: 'subscriptions',
      label: 'Subscriptions'
    },
    {
      key: 'messages',
      label: 'Messages'
    },
    {
      key: 'bytes',
      label: 'Bytes'
    }
  ],
  subscriptionMetrics: [
    {
      key: 'subscriptionName',
      label: 'Subscription Name'
    },
    {
      key: 'messages',
      label: 'Messages'
    },
    {
      key: 'bytes',
      label: 'Bytes'
    }
  ]
};


class Table extends Reflux.Component {

  renderCol(col) {
    return (
      <TableHeaderColumn dataField={col.key}>{col.label}</TableHeaderColumn>
    );
  }

  render() {
    return (
      <BootstrapTable data={ this.props.data } search pagination keyField={tablesInfo[this.props.tableType][0].key}>
        {
          tablesInfo[this.props.tableType].map((col) => {
            return this.renderCol(col);
          })
        }
      </BootstrapTable>
  )}
}

export default Table;
