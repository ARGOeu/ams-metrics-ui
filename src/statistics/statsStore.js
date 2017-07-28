import statsActions from './statsActions.js';
import Reflux from 'reflux';
import request from 'superagent';

const metrics = 'https://messaging-devel.argo.grnet.gr/v1/metrics';
const superAdmin = 'e2c920cd512a6aa4408f3a52013f0698ae6c6efd';


class StatsStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [statsActions];
    this.state = {
      metrics: []
    }
  }

  onGetStats() {
    let metricCPU = "ams_node.cpu_usage";
    let metricMemory = "ams_node.memory_usage";

      request
        .get(metrics)
        .set('Content-Type', 'application/json')
        .query({ key: superAdmin })
        .end((err, res) => {
          if(err) throw err;
          let stats = { 'instanceName': '', 'cpu': -0, 'memory': -0 };
          res.body.metrics.forEach(function(item) {
            if (item.metric === metricCPU) {
              stats.instanceName=item.resource_name;
              stats.cpu=item.timeseries[0].value;
            } else if (item.metric === metricMemory) {
              stats.memory=item.timeseries[0].value;
            }
          })
          let currentStats = this.state.metrics;
          currentStats.push(stats)
          this.setState({ metrics: currentStats })
        });
  }
}

export default StatsStore;
