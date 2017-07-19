//layout component
import React from 'react';
import SumMetrics from '../metrics/sumMetricsComponent.js';
import Stats from '../statistics/statsComponent.js';
import { Grid, Col } from 'react-bootstrap';

class Layout extends React.Component {

  render() {
    return (
		  <div>
				<div className="container">
					<SumMetrics />

					<div className="row">
						<Col xs={12} md={12}>
							<Stats />
						</Col>
					</div>
				</div>
			</div>
    );
  }
}

export default Layout;