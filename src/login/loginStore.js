import loginActions from './loginActions.js';
import Reflux from 'reflux';
import request from 'superagent';

const superAdmin = 'e2c920cd512a6aa4408f3a52013f0698ae6c6efd';


class StatsStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [loginActions];
    this.state = {
      userInfo: [],
    }
  }

  onGetUserInfo(value) {
    let userRole = `https://messaging-devel.argo.grnet.gr/v1/users:byToken/${value}`;

      request
        .get(userRole)
        .set('Content-Type', 'application/json')
        .query({ key: superAdmin })
        .end((err, res) => {
          if(err) throw err;
          let user = [];

          if(res.body.service_roles.length == 0) {
            res.body.projects.forEach(function(item) {
              user.push(item);
            })
          }

          let { userInfo } = this.state;
          userInfo.push(user);
          this.setState({ userInfo });
        });
  }
}

export default StatsStore;
