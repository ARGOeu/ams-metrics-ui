import React from 'react';
import { Link } from 'react-router-dom';


class ProjectMenuItem extends React.Component {

  render() {
    return (
      <div>
        <Link className='dropdown-item' to={`/projects/${this.props.project.project}`}>
          {this.props.project.project}
        </Link>
      </div>
    );
  }
}

export default ProjectMenuItem;
