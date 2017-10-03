import React from 'react';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import RoleInfo from './roleInfo.js';


class ProjectTabItem extends React.Component {

  render() {

    let roleLabel = "";
    if (this.props.role === "service_admin") {
      roleLabel = "Service Admin";
    } else if (this.props.role === "project_admin") {
      roleLabel = "Project Admin";
    } else if (this.props.role === "consumer") {
      roleLabel = "Consumer";
    } else if (this.props.role === "publisher") {
      roleLabel = "Publisher";
    }

    return (
      <div>
        <Row>
          <Col xs={12} md={12}>
            <Tabs id="role-tab">
              <Tab eventKey={1} title={roleLabel}><RoleInfo project={this.props.project} role={this.props.role}/></Tab>
            </Tabs>
          </Col>
        </Row>
       </div>
    );
  }
}

export default ProjectTabItem;
