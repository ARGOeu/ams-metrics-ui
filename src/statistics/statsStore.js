import statsActions from './statsActions.js';
import Reflux from 'reflux';
import request from 'superagent';
import { chain } from 'lodash';
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
          let stat_row = {};
          let metrics = [];
          let statMetrics = res.body.metrics;
          const available_metrics = chain(statMetrics)
            .map((metric) => {
              return metric.metric.split(metric.resource_type + '.')[1];
            })
            .uniq()
            .value();
          //generate metrics table rows dynamically
          statMetrics.forEach((metric) => {
            stat_row.instanceName = metric.resource_name;
          });

          available_metrics.forEach((metric_type) => {
            const found = statMetrics.find((metric) => { return (metric.metric.split(metric.resource_type + '.')[1] === metric_type)});
            if(found) {
              stat_row[metric_type] = (found.timeseries.length > 0) ? found.timeseries[0].value : 0;
            } else {
              stat_row[metric_type] = 0;
            }
          });
          metrics.push(stat_row);
          this.setState({ metrics });
        });
  }
}

export default StatsStore;
