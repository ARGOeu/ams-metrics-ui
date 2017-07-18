//users store
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
      projects: []
    }
  }

  onGetUsers() {
    request
    .get(users)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let usersSum = 0;
      if(err) throw err;
      usersSum = res.body.users.length;

      this.setState({ users: usersSum })
    });
  }

  onGetProjects() {
    request
    .get(projects)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let projectsSum = 0;
      if(err) throw err;
      projectsSum = res.body.projects.length;

      this.setState({ projects: projectsSum })
    });
  }
}

export default SumMetricsStore;