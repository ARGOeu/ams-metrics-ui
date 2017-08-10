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
      topicMetrics: [],
      userMetrics: []
    }
  }

  onGetUsers() {
    request
      .get(users)
      .set('Content-Type', 'application/json')
      .query({ key: superAdmin })
      .end((err, res) => {
        if(err) throw err;
        const users = ('users' in res.body) ? res.body.users : [];
        this.setState({ users });
      });
  }

  onGetProjects() {
    request
      .get(projects)
      .set('Content-Type', 'application/json')
      .query({ key: superAdmin })
      .end((err, res) => {
        if(err) throw err;
        const projects = ('projects' in res.body) ? res.body.projects : [];
        this.setState({ projects });

        this.getProjectMetrics(projects);
        this.getTopics(projects);
        
      });
  }

  getProjectMetrics(projects) {
    let metricsUrl = [];
    let metricTopics = "project.number_of_topics";
    let metricSubscriptions = "project.number_of_subscriptions";
    let userMetricSubscriptions = "project.user.number_of_subscriptions";
    let userMetricTopics = "project.user.number_of_topics";


    projects
      .filter((project) => {
        return ('name' in project);
      })
      .forEach((project, key) => {
        metricsUrl[key] = `https://messaging-devel.argo.grnet.gr/v1/projects/${projects[key].name}:metrics`;

        request
          .get(metricsUrl[key])
          .set('Content-Type', 'application/json')
          .query({ key: superAdmin })
          .end((err, res) => {
            if(err) throw err;
            let metricsPerProject = { projectName: '', topics: 0, subscriptions: 0 };
            let metricsPerUser = { projectName: '', topics: 0, subscriptions: 0 };
            res.body.metrics.forEach(function(item) {
              if (item.metric === metricTopics) {
                metricsPerProject.projectName=item.resource_name;
                metricsPerProject.topics=item.timeseries[0].value;
              } else if (item.metric === metricSubscriptions) {
                metricsPerProject.subscriptions=item.timeseries[0].value;
              } else if (item.metric === userMetricSubscriptions) {
                metricsPerUser.userName=item.resource_name;
                metricsPerUser.subscriptions=item.timeseries[0].value;
              } else if (item.metric === userMetricTopics) {
                metricsPerUser.userName=item.resource_name;
                metricsPerUser.topics=item.timeseries[0].value;
              }
            })
            let { projectMetrics } = this.state;
            projectMetrics.push(metricsPerProject);
            this.setState({ projectMetrics });

            let { userMetrics } = this.state;
            if (metricsPerUser.hasOwnProperty('userName')) {
              userMetrics.push(metricsPerUser);
            }
            this.setState({ userMetrics });
          });
      });
  }

  getTopics(projects) {
    let metricsUrl = [];

    projects
      .filter((project) => {
        return ('name' in project);
      })
      .forEach((project, key) => {
        metricsUrl[key] = `https://messaging-devel.argo.grnet.gr/v1/projects/${projects[key].name}/topics`;

        request
          .get(metricsUrl[key])
          .set('Content-Type', 'application/json')
          .query({ key: superAdmin })
          .end((err, res) => {
            if(err) throw err;
            if (res.body.hasOwnProperty('topics')) {
              res.body.topics.forEach((topic) => {
                let topicsName = topic.name;
                this.getTopicMetrics(topicsName);
              })
            }
          });
      });
  }

  getTopicMetrics(topicsName) {
    let topicSubscriptions = "topic.number_of_subscriptions";
    let topicMessages = "topic.number_of_messages";
    let topicBytes = "topic.number_of_bytes";
      
     let topicsUrl = `https://messaging-devel.argo.grnet.gr/v1/${topicsName}:metrics`;

      request
        .get(topicsUrl)
        .set('Content-Type', 'application/json')
        .query({ key: superAdmin })
        .end((err, res) => {
          if(err) throw err;
          let metricsPerTopic = { topictName: '', subscriptions: 0, messages: 0, bytes: 0 };
          res.body.metrics.forEach(function(item) {
            if (item.metric === topicSubscriptions) {
              metricsPerTopic.topictName=item.resource_name;
              metricsPerTopic.subscriptions=item.timeseries[0].value;
            } else if (item.metric === topicMessages) {
              metricsPerTopic.messages=item.timeseries[0].value;
            } else if (item.metric === topicBytes) {
              metricsPerTopic.bytes=item.timeseries[0].value;
            }
          })
          let { topicMetrics } = this.state;
          topicMetrics.push(metricsPerTopic);
          this.setState({ topicMetrics });
        });
  }
}

export default SumMetricsStore;
