import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import Reflux from 'reflux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <Link className="panel" to={`/users`}>Users { this.state.users.length }</Link>
        <Link className="panel" to={`/projects`}>Projects { this.state.projects.length }</Link>
      </div>
    );
  }
}

export default SumMetrics;
