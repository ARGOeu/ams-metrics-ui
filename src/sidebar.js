import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Stats from './statistics/statsComponent.js';

import { Col, Row, Button } from 'react-bootstrap';


const Sidebar = () => (
  <Router>
    <div>
      <div style={{ width: '15%'}}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <Button block><NavLink to="/statistics" style={{ display: 'block' }}>Operational Statistics</NavLink></Button>
        </ul>
      </div>
      <div className="container height">
        <Row>
          <Col xs={12} md={12}>
            <Route exact path="/statistics" component={Stats}/>
          </Col>
        </Row>
      </div>
    </div>
  </Router>
)

export default Sidebar
