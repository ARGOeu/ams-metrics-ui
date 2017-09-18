import React from 'react';
import { Link } from 'react-router-dom';
import { Well, Col, Row } from 'react-bootstrap';


class ProjectMenuItem extends React.Component {

  render() {
    return (
      <div className="item">
        <Link className="button" to={`/projects/${this.props.project.project}`}>
          {this.props.project.project}
        </Link>
      </div>
    );
  }
}

export default ProjectMenuItem;
