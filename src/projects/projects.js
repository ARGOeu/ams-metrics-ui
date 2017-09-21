import React from 'react';
import loginStore from '../login/loginStore.js';
import Reflux from 'reflux';
import ProjectMenuItem from './projectMenuItem.js';
import request from 'superagent';


class ProjectsTab extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  componentDidMount() {
    const projects = 'https://messaging-devel.argo.grnet.gr/v1/projects';
    let user = this.state.user;
    let token = this.state.user.token;

    if (user.service_roles[0] === 'service_admin') {
      this.getProjects(user, token, projects);
    }
  }

  getProjects(user, token, projects) {
    request
      .get(projects)
      .set('Content-Type', 'application/json')
      .query({ key: token })
      .end((err, res) => {
        if(err) throw err;
        const projects = ('projects' in res.body) ? res.body.projects : [];
        projects.map((project) => {
          project['project']=project['name'];
          delete project['name'];
          project['roles']=['service_admin'];
          return project;
        });

        user["projects"] = projects;
        this.setState({ user });
      });
  }

  renderProjects() {
    let tabs = [];
    this.state.user.projects.forEach((project) => {
      tabs.push(<ProjectMenuItem project={project} />);
    });
    return tabs;
  }

  render() {

    return (
      <div className="group">
        { this.renderProjects() }
      </div>
    );
  }
}

export default ProjectsTab;
