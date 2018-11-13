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
            <Col md={4}>
              <div className="info-box">
                  <IconContext.Provider value={{ className: "info-box-icon" }}>
                    <Link to={`/users`}><FaUsers /></Link>
                  </IconContext.Provider>
                  <div className="info-box-content">
                    <p className="info-box-title">Users</p>
                    <p className="info-box-text"> { this.state.users.length } </p>
                  </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="info-box">
                  <IconContext.Provider value={{ className: "info-box-icon" }}>
                    <Link to={`/projects`}><FaBriefcase /></Link>
                  </IconContext.Provider>
                  <div className="info-box-content">
                    <p className="info-box-title">Projects</p>
                    <p className="info-box-text"> { this.state.projects.length } </p>
                  </div>
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
