import statsActions from './statsActions.js';
import Reflux from 'reflux';
import request from 'superagent';
import { chain, groupBy, forOwn } from 'lodash';
import { myConfig } from '../config.js';

const metrics = `${myConfig.metricsUrl}`;


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
    .query({ key: myConfig.superAdmin })
    .end((err, res) => {
      if(err) throw err;
      let metrics = [];
      let statMetrics = res.body.metrics;
      // returns the object passed in forOwn and not the metric object
      chain(statMetrics)
      .groupBy(
	(item) => {
	  return item.resource_name;
	}
      )
      .forOwn(
	(value, key) => {
	  let  metric = { instanceName: key };
	  value.forEach((item) => {
	    metric[item.metric.split('.')[1]] = (item.timeseries.length > 0) ? item.timeseries[0].value : 0;
	  });
	  metrics.push(metric);
	  return metric;
	}
      )
      .value();
      this.setState({ metrics });
    });
  }
}

export default StatsStore;
