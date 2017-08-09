import React from 'react';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import RoleInfo from './roleInfo.js';


class ProjectTabItem extends React.Component {

  render() {
    return (
      <div className="container height centered">
        <Row>
          <Col xs={12} md={12}>
            <Tabs id="role-tab">
              <Tab eventKey={1} title={this.props.role}><RoleInfo project={this.props.project} role={this.props.role}/></Tab>
            </Tabs>
          </Col>
        </Row>
       </div>
    );
  }
}

export default ProjectTabItem;
