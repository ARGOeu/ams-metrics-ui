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
      projectMetrics: [],
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

      this.setState({ users: users });
    });
  }

  onGetProjects() {
    request
    .get(projects)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let projects = 0;
      if(err) throw err;
      projects = res.body.projects;

      this.getProjectMetrics(projects);
      this.setState({ projects: projects});
    });
  }

  getProjectMetrics(projects) {
    let metricsUrl = [];
    let metricTopics = "project.number_of_topics";
    let metricSubscriptions = "project.number_of_subscriptions";

    for (var key in projects) {
      if (projects.hasOwnProperty(key)) {
        metricsUrl[key] = `https://messaging-devel.argo.grnet.gr/v1/projects/${projects[key].name}:metrics`;

      request
        .get(metricsUrl[key])
        .set('Content-Type', 'application/json')
        .query({ key: superAdmin})
        .end((err, res) => {
          if(err) throw err;
          let metricsPerProject = {'projectName': '', 'topics': -0, 'subscriptions': -0};
          res.body.metrics.forEach(function(item) {
            if (item.metric === metricTopics) {
              metricsPerProject.projectName=item.resource_name;
              metricsPerProject.topics=item.timeseries[0].value;
            } else if (item.metric === metricSubscriptions) {
              metricsPerProject.subscriptions=item.timeseries[0].value;
            }
          })
          let currentProjects = this.state.projectMetrics;
          currentProjects.push(metricsPerProject)
          this.setState({ projectMetrics: currentProjects })
        });
      }
    }
  }
}

export default SumMetricsStore;