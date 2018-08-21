import React from 'react';
import { NavLink } from 'react-router-dom';


class ProjectMenuItem extends React.Component {

  render() {
    return (
      <div>
        <NavLink className='dropdown-item' to={`/projects/${this.props.project.project}`}>
          {this.props.project.project}
        </NavLink>
      </div>
    );
  }
}

export default ProjectMenuItem;
