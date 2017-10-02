import sumMetricsActions from './sumMetricsActions.js';
import Reflux from 'reflux';
import request from 'superagent';
import { myConfig } from '../config.js';

const users = `${myConfig.usersUrl}`;
const projects = `${myConfig.projectsUrl}`;


class SumMetricsStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [sumMetricsActions];
    this.state = {
      users: [],
      projects: [],
      userMetrics: []
    }
  }

  onGetUsers() {
    request
      .get(users)
      .set('Content-Type', 'application/json')
      .query({ key: myConfig.superAdmin })
      .end((err, res) => {
        if(err) throw err;
        let user_row = {};
        let userMetrics = [];
        const users = ('users' in res.body) ? res.body.users : [];

        users.forEach((user) => {
          user_row.username = user.name;
          user.projects.forEach((project) => {
            user_row.project = project.project;
            user_row.topics = project.topics.length;
            user_row.subscriptions = project.subscriptions.length;
            userMetrics.push(user_row);
            user_row = {};
          });
          if (user.projects.length === 0) {
            userMetrics.push({
              username: user.name,
              project: 'No available project',
              topics: 0,
              subscriptions: 0
            })
          }
        });
        this.setState({ users, userMetrics });
      });
  }

  onGetProjects() {
    request
      .get(projects)
      .set('Content-Type', 'application/json')
      .query({ key: myConfig.superAdmin })
      .end((err, res) => {
        if(err) throw err;
        const projects = ('projects' in res.body) ? res.body.projects : [];
        this.setState({ projects });
      });
  }
}

export default SumMetricsStore;
