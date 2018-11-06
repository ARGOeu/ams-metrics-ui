import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import Reflux from 'reflux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


const { SearchBar } = Search;
const columns = [
  {
    dataField: 'username',
    text: 'Username',
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
      <ToolkitProvider
        keyField="username"
        data={ this.state.userMetrics }
        columns={ columns }
        striped
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
    );
  }
}

export default Users;

