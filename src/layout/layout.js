//layout component
import React from 'react';
import SumMetrics from '../metrics/sumMetricsComponent.js';
import Stats from '../statistics/statsComponent.js';
import Projects from '../projects/projectsComponent.js';
import { Col } from 'react-bootstrap';

class Layout extends React.Component {

  render() {
    return (
		  <div>
				<div className="container">

					<div className="row">
						<SumMetrics />
					</div>

					<div className="row">
						<Col xs={12} md={6}>
							<Projects />
						</Col>

						<Col xs={12} md={6}>
							<Stats />
						</Col>
					</div>

				</div>
			</div>
    );
  }
}

export default Layout;