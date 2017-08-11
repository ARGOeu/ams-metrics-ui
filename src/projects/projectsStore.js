import projectsActions from './projectsActions.js';
import Reflux from 'reflux';
import request from 'superagent';
import { groupBy, chain, find } from 'lodash';

class ProjectsStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [projectsActions];
    this.state = {
      projectMetric: {},
      defaultMetrics: {},
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

      request
        .get(metrics)
        .set('Content-Type', 'application/json')
        .query({ key: token })
        .end((err, res) => {
          if(err) throw err;

            //group metrics by resource type (currently project and project.user)
            let groups = groupBy(res.body.metrics, (metric) => { return metric.resource_type; });

            //project
            let projectMetric = { name: projectName };
            //generate project metrics data dunamically (currently topics and subscriptions)
            groups.project.forEach((metric) => {
              projectMetric[metric.metric.split(metric.resource_type + '.')[1]] = (metric.timeseries.length > 0) ? metric.timeseries[0].value : 0;
            })

            //remove project in order to iterate the rest of metrics
            delete groups['project'];

            let defaultMetrics = {};
            //iterate metrics
            Object.keys(groups).map((group) => {
              //store each table row inside usersMetric
              let usersMetric = [];
              //group users by resource name field
              const users = groupBy(groups[group], (metric) => {
                return metric.resource_name.split(projectName + '.')[1];
              })

              //get all available metrics (table columns)
              const available_metrics = chain(groups[group])
                .map((metric) => {
                  return metric.metric.split(metric.resource_type + '.')[1];
                })
                .uniq()
                .value();

              //generate user metrics table rows dynamically
              Object.keys(users).forEach((username) => {
                let user_row = {};
                user_row['username'] = username;

                available_metrics.forEach((metric_type) => {
                  //if found, take metric value or 0
                  const found = users[username].find((metric) => { return (metric.metric.split(metric.resource_type + '.')[1] === metric_type)});
                  if(found) {
                    user_row[metric_type] = (found.timeseries.length > 0) ? found.timeseries[0].value : 0;
                  } else {
                    user_row[metric_type] = 0;
                  }
                });
                usersMetric.push(user_row);
              })
              defaultMetrics[group] = usersMetric;
            })

            this.setState({ projectMetric, defaultMetrics });
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
          res.body.topics.forEach((topic) => {
            let topicsName = topic.name;
            this.getTopicMetrics(token, role, topicsName);
          })
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
          res.body.subscriptions.forEach((subscription) => {
            let subscriptionsName = subscription.name;
            this.getSubscriptionsMetrics(token, role, subscriptionsName);
          })
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
