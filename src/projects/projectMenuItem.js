import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap';


class ProjectMenuItem extends React.Component {

  render() {
    return (
      <div className="container height centered">
        <Row>
          <Col xs={12} md={12}>
            <ListGroup>
              <ListGroupItem>
                <Link to={`/projects/${this.props.project.project}`}>
                  {this.props.project.project}
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
       </div>
    );
  }
}

export default ProjectMenuItem;
