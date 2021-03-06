import React from 'react';
import { Link } from 'react-router-dom';


class ProjectMenuItem extends React.Component {

  render() {
    return (
      <div className="item">
        <Link className="wells" to={`/projects/${this.props.project.project}`}>
          {this.props.project.project}
        </Link>
      </div>
    );
  }
}

export default ProjectMenuItem;
