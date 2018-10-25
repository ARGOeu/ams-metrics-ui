import React from 'react';
import loginStore from '../login/loginStore.js';
import Reflux from 'reflux';
import ProjectTabItem from './projectTabItem.js';
import { Col, Row, Tab, Nav } from 'react-bootstrap';


class ProjectsItem extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  renderRoles() {
    let tabs = [];
    let roles = [];
    let projectName = this.props.location.pathname.split("/")[2]
    
    this.state.user.projects
    .filter((project) => {
        return (project.project === projectName);
    }).forEach((project) => {
      project.roles.forEach((role, index) => {
        roles.push(role);
        tabs.push(<ProjectTabItem role={role} project={project} tabKey={index} key={index}/>);
      });
    });
    return { tabs, roles };
  }

  renderTabs(roles) {
    return roles.map((role, index) => {
      let roleLabel = "";
      if (role === "service_admin") {
        roleLabel = "Service Admin";
      } else if (role === "project_admin") {
        roleLabel = "Project Admin";
      } else if (role === "consumer") {
        roleLabel = "Consumer";
      } else if (role === "publisher") {
        roleLabel = "Publisher";
      }
      return(
        <Nav.Item>
          <Nav.Link eventKey={index} key={index}>{ roleLabel }</Nav.Link>
        </Nav.Item>
      )
    });
  }

  render() {
    const { tabs, roles } = this.renderRoles();
    return (
      <div>
        <Tab.Container defaultActiveKey={0} id="custom-tabs">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav variant="tabs">
                { this.renderTabs(roles) }
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation={false}>
               { tabs }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default ProjectsItem;
