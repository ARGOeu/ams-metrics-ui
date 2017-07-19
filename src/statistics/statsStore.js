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
    request
    .get(metrics)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let stats=[{}];
      if(err) throw err;
      stats[0][1] = 1;
      stats[0][2] = res.body.metrics[0].timeseries[0].value;
      stats[0][3] = res.body.metrics[1].timeseries[0].value;
      this.setState({ metrics: stats});
    });
  }
}

export default StatsStore;