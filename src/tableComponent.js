import React from 'react';
import Reflux from 'reflux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var numeral = require('numeral');

const tablesInfo = {
  projectMetrics: [
    {
      key: 'name',
      label: 'Project Name'
    },
    {
      key: 'number_of_topics',
      label: 'Topics'
    },
    {
      key: 'number_of_subscriptions',
      label: 'Subscriptions'
    }
  ],
  'project.user': [
    {
      key: 'username',
      label: 'User Name'
    },
    {
      key: 'number_of_topics',
      label: 'Topics'
    },
    {
      key: 'number_of_subscriptions',
      label: 'Subscriptions'
    }
  ],
  topicMetrics: [
    {
      key: 'topicName',
      label: 'Topic Name'
    },
    {
      key: 'number_of_subscriptions',
      label: 'Subscriptions'
    },
    {
      key: 'number_of_messages',
      label: 'Messages'
    },
    {
      key: 'number_of_bytes',
      label: 'Bytes'
    }
  ],
  subscriptionMetrics: [
    {
      key: 'subscriptionName',
      label: 'Subscription Name'
    },
    {
      key: 'number_of_messages',
      label: 'Messages'
    },
    {
      key: 'number_of_bytes',
      label: 'Bytes'
    }
  ]
};

function numberFormatter(cell, row) {
  Object.keys(row).forEach((key) => {
    if (key === 'number_of_messages') {
      row[key] = numeral(row[key]).format('0,0');
    } else if (key === 'number_of_bytes') {
      if (!isNaN(row[key])) {
      row[key] = numeral(row[key]).format('0.00b');
      }
    }
  });
  return cell;
}

class Table extends Reflux.Component {

  renderCol(col) {
    return (
      <TableHeaderColumn dataField={col.key} dataSort={true} dataAlign='left' dataFormat={ numberFormatter } key={col.key}>{col.label}</TableHeaderColumn>
    );
  }

  render() {
    const layout = (this.props.layout && this.props.layout === 'simple') ? false : true;
    return (
      <div style={{marginTop:'5%'}}>
        <BootstrapTable data={ this.props.data } striped={true} search={layout} pagination={layout} keyField={tablesInfo[this.props.tableType][0].key}>
          {
            tablesInfo[this.props.tableType].map((col) => {
              return this.renderCol(col);
            })
          }
        </BootstrapTable>
      </div>
  )}
}

export default Table;
