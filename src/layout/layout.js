//layout component
import React from 'react';
import SumMetrics from '../metrics/sumMetricsComponent.js';
import Stats from '../statistics/statsComponent.js';
import Projects from '../projects/projectsComponent.js';
import Topics from '../topics/topicsComponent.js';
import { Col, Row } from 'react-bootstrap';

class Layout extends React.Component {

  render() {
    return (
      <div>
        <div className="container height">

          <Row>
            <SumMetrics />
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <Projects />
            </Col>

            <Col xs={12} md={6}>
              <Stats />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
              <Topics />
            </Col>
           </Row>

        </div> {/*end of container*/}
      </div>
    );
  }
}

export default Layout;
