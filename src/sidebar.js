import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Stats from './statistics/statsComponent.js';
import Projects from './projects/projectsComponent.js';
import Topics from './topics/topicsComponent.js';
import Users from './users/usersComponent.js';
import { Col, Row, Button } from 'react-bootstrap';


const Sidebar = () => (
  <Router>
    <div>
      <div style={{ width: '15%', background: '#f0f0f0' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <Button block bsStyle="warning"><Link to="/projects" className='button-link' style={{ textDecoration: 'none', display: 'block' }}>Projects</Link></Button>
          <Button block bsStyle="warning"><Link to="/topics" className='button-link' style={{ textDecoration: 'none', display: 'block' }}>Topics</Link></Button>
          <Button block bsStyle="warning"><Link to="/statistics" className='button-link' style={{ textDecoration: 'none', display: 'block' }}>Operational Statistics</Link></Button>
          <Button block bsStyle="warning"><Link to="/users" className='button-link' style={{ textDecoration: 'none', display: 'block' }}>Users</Link></Button>
        </ul>
      </div>
        <div className="container height">
          <Row>
            <Col xs={12} md={12}>
              <Route exact path="/projects" component={Projects}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Route exact path="/statistics" component={Stats}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Route exact path="/topics" component={Topics}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <Route exact path="/users" component={Users}/>
            </Col>
          </Row>
        </div>
    </div>
  </Router>
)

export default Sidebar