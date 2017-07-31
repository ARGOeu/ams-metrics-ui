import React from 'react';
import SumMetrics from '../metrics/sumMetricsComponent.js';
import { Row } from 'react-bootstrap';
import Sidebar from '../sidebar.js';


class Layout extends React.Component {

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

export default Layout;
