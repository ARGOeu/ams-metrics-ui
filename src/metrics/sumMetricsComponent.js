import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import Reflux from 'reflux';
import { Grid, Col } from 'react-bootstrap';

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
        <div className="row">
          <Col xs={12} md={3}>
            <div className="panel">Users { this.state.users.length }</div>
          </Col>
          <Col xs={12} md={3}>
            <div className="panel">Projects { this.state.projects.length }</div>
          </Col>
        </div>
      </div>
    );
  }
}

export default SumMetrics;