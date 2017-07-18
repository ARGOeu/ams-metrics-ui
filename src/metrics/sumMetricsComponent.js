//users component
import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import Reflux from 'reflux';

class SumMetrics extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = sumMetricsStore;
  }

  componentDidMount() {
    sumMetricsActions.getUsers();
    sumMetricsActions.getProjects();
  }

  render() {
    return (
      <div>
        <div className="panel">Users { this.state.users }</div>
        <div className="panel">Projects { this.state.projects }</div>
      </div> 
    );
  }
}

export default SumMetrics;