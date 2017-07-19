import sumMetricsActions from './sumMetricsActions.js';
import Reflux from 'reflux';
import request from 'superagent';

const users = 'https://messaging-devel.argo.grnet.gr/v1/users';
const projects = 'https://messaging-devel.argo.grnet.gr/v1/projects';
const superAdmin = 'e2c920cd512a6aa4408f3a52013f0698ae6c6efd';


class SumMetricsStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [sumMetricsActions];
    this.state = {
      users: [],
      projects: [],
      projectName: [],
    }
  }

  onGetUsers() {
    request
    .get(users)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let users = 0;
      if(err) throw err;
      users = res.body.users;

      this.setState({ users: users })
    });
  }

  onGetProjects() {
    request
    .get(projects)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let projects = 0;
      let projectName = [];
      if(err) throw err;
      projects = res.body.projects;

      for (var key in projects) {
        if (projects.hasOwnProperty(key)) {
          projectName[key] = projects[key].name;
        }
      }

      this.setState({ projects: projects, projectName: projectName })
    });
  }
}

export default SumMetricsStore;