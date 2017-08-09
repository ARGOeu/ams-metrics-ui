import React from 'react';
import { Row } from 'react-bootstrap';
import SumMetrics from './metrics/sumMetricsComponent.js';
import Sidebar from './sidebar.js';

class Admin extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <SumMetrics />
          <Sidebar />
        </Row>
      </div>
    );
  }
}

export default Admin;
