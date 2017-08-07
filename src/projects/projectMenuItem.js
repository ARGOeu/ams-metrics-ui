import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem, Col, Row} from 'react-bootstrap';


class ProjectMenuItem extends React.Component {

  render() {
    return (
      <div className="container height centered">
        <Row>
          <Col xs={12} md={12}>
            <ListGroup>
              <ListGroupItem href="#">{this.props.project.project}</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
       </div>
    );
  }
}

export default ProjectMenuItem;
