import React from 'react';
import sumMetricsActions from './sumMetricsActions.js';
import sumMetricsStore from './sumMetricsStore.js';
import ProjectsTable from '../projects/projectsTable.js';
import Reflux from 'reflux';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { IconContext } from "react-icons";


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
        <Container>
          <Row>
            <Col md={3}>
              <div className="info-box">
                <Link to={`/users`}>
                  <IconContext.Provider value={{ className: "info-box-icon" }}>
                    <span><FaUsers /></span>
                  </IconContext.Provider>
                  <div className="info-box-content">
                    <span className="info-box-title">Users</span>
                    <span className="info-box-text"> { this.state.users.length } </span>
                  </div>
                </Link>
              </div>
            </Col>
            <Col md={3}>
              <div className="info-box">
                <Link to={`/projects`}>
                  <IconContext.Provider value={{ className: "info-box-icon" }}>
                    <span><FaBriefcase /></span>
                  </IconContext.Provider>
                  <div className="info-box-content">
                    <span className="info-box-title">Projects</span>
                    <span className="info-box-text"> { this.state.projects.length } </span>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProjectsTable />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SumMetrics;
