import projectsActions from './projectsActions.js';
import Reflux from 'reflux';
import request from 'superagent';


class ProjectsStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [projectsActions];
    this.state = {
      projectMetrics: [],
      userMetrics: [],
      topicMetrics: [],
      subscriptionMetrics: []
    }
  }

  onGetRoleInfo(token, role, projectName, user) {
    if (role === "project_admin") {
      this.getProjectMetrics(token, role, projectName);
      this.getTopics(token, role, projectName);
      this.getSubscriptions(token, role, projectName);
    } else if (role === "publisher") {
      this.getPublisherTopics(token, role, projectName, user);
    } else if (role === "consumer") {
      this.getConsumerSubscriptions(token, role, projectName, user);
    }
  }

  getProjectMetrics(token, role, projectName, user) {
    let metrics = `https://messaging-devel.argo.grnet.gr/v1/projects/${projectName}:metrics`;

    let metricTopics = "project.number_of_topics";
    let metricSubscriptions = "project.number_of_subscriptions";
    let userMetricSubscriptions = "project.user.number_of_subscriptions";
    let userMetricTopics = "project.user.number_of_topics";

      request
        .get(metrics)
        .set('Content-Type', 'application/json')
        .query({ key: token })
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
  }

  getTopics(token, role, projectName) {
    let metricsUrl = `https://messaging-devel.argo.grnet.gr/v1/projects/${projectName}/topics`;

    request
      .get(metricsUrl)
      .set('Content-Type', 'application/json')
      .query({ key: token })
      .end((err, res) => {
        if(err) throw err;
        if (res.body.hasOwnProperty('topics')) {
          let topicsName = res.body.topics[0].name;
          this.getTopicMetrics(token, role, topicsName);
        }
      });
  }

  getTopicMetrics(token, role, topicsName) {
    let topicSubscriptions = "topic.number_of_subscriptions";
    let topicMessages = "topic.number_of_messages";
    let topicBytes = "topic.number_of_bytes";
      
     let topicsUrl = `https://messaging-devel.argo.grnet.gr/v1/${topicsName}:metrics`;

      request
        .get(topicsUrl)
        .set('Content-Type', 'application/json')
        .query({ key: token })
        .end((err, res) => {
          if(err) throw err;
          let metricsPerTopic = { topicName: '', subscriptions: 0, messages: 0, bytes: 0 };
          res.body.metrics.forEach(function(item) {
            if (item.metric === topicSubscriptions) {
              metricsPerTopic.topicName=item.resource_name;
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

  getSubscriptions(token, role, projectName) {
    let metricsUrl = `https://messaging-devel.argo.grnet.gr/v1/projects/${projectName}/subscriptions`;

    request
      .get(metricsUrl)
      .set('Content-Type', 'application/json')
      .query({ key: token })
      .end((err, res) => {
        if(err) throw err;
        if (res.body.hasOwnProperty('subscriptions')) {
          let subscriptionsName = res.body.subscriptions[0].name;
          this.getSubscriptionsMetrics(token, role, subscriptionsName);
        }
      });
  }

  getSubscriptionsMetrics(token, role, subscriptionsName) {
    let subscriptionMessages = "subscription.number_of_messages";
    let subscriptionBytes = "subscription.number_of_bytes";
      
     let subscriptionsUrl = `https://messaging-devel.argo.grnet.gr/v1/${subscriptionsName}:metrics`;

      request
        .get(subscriptionsUrl)
        .set('Content-Type', 'application/json')
        .query({ key: token })
        .end((err, res) => {
          if(err) throw err;
          let metricsPerSubscription = { subscriptionName: '', messages: 0, bytes: 0 };
          res.body.metrics.forEach(function(item) {
            if (item.metric === subscriptionMessages) {
              metricsPerSubscription.subscriptionName=item.resource_name;
              metricsPerSubscription.messages=item.timeseries[0].value;
            } else if (item.metric === subscriptionBytes) {
              metricsPerSubscription.bytes=item.timeseries[0].value;
            }
          })
          let { subscriptionMetrics } = this.state;
          subscriptionMetrics.push(metricsPerSubscription);
          this.setState({ subscriptionMetrics });
        });
  }

  getPublisherTopics(token, role, projectName, user) {
    let topicSubscriptions = "topic.number_of_subscriptions";
    let topicMessages = "topic.number_of_messages";
    let topicBytes = "topic.number_of_bytes";

    user.projects
    .filter((project) => {
        return (project.project === projectName);
    }).forEach((project) => {
      project.topics.forEach((topicName) => {
        let topicsUrl = `https://messaging-devel.argo.grnet.gr/v1/projects/${projectName}/topics/${topicName}:metrics`;

        request
        .get(topicsUrl)
        .set('Content-Type', 'application/json')
        .query({ key: token })
        .end((err, res) => {
          if(err) throw err;
          let metricsPerTopic = { topicName: '', subscriptions: 0, messages: 0, bytes: 0 };
          res.body.metrics.forEach(function(item) {
            if (item.metric === topicSubscriptions) {
              metricsPerTopic.topicName=item.resource_name;
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
      });
    });
  }

  getConsumerSubscriptions(token, role, projectName, user) {
    let subscriptionMessages = "subscription.number_of_messages";
    let subscriptionBytes = "subscription.number_of_bytes";

    user.projects
    .filter((project) => {
        return (project.project === projectName);
    }).forEach((project) => {
      project.subscriptions.forEach((subscriptionName) => {
        let subscriptionsUrl = `https://messaging-devel.argo.grnet.gr/v1/projects/${projectName}/subscriptions/${subscriptionName}:metrics`;

        request
          .get(subscriptionsUrl)
          .set('Content-Type', 'application/json')
          .query({ key: token })
          .end((err, res) => {
            if(err) throw err;
            let metricsPerSubscription = { subscriptionName: '', messages: 0, bytes: 0 };
            res.body.metrics.forEach(function(item) {
              if (item.metric === subscriptionMessages) {
                metricsPerSubscription.subscriptionName=item.resource_name;
                metricsPerSubscription.messages=item.timeseries[0].value;
              } else if (item.metric === subscriptionBytes) {
                metricsPerSubscription.bytes=item.timeseries[0].value;
              }
            })
            let { subscriptionMetrics } = this.state;
            subscriptionMetrics.push(metricsPerSubscription);
            this.setState({ subscriptionMetrics });
          });
      });
    });
  }
}

export default ProjectsStore;
