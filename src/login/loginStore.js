import loginActions from './loginActions.js';
import Reflux from 'reflux';
import request from 'superagent';
import { myConfig } from '../config.js';


class LoginStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [loginActions];
    this.state = {
      value: '',
      userInfo: [],
      user: {},
      isNotAdmin: false,
      error: false,
      show: true,
    }
  }

  onGetUserInfo(value) {
    this.setState({ value });

    let userRole = `${myConfig.usersUrl}:byToken/${value}`;

      request
        .get(userRole)
        .set('Content-Type', 'application/json')
        .query({ key: myConfig.superAdmin })
        .end((err, res) => {
          if(err && err.status === 404) {
	    this.setState({ error : true });
	    this.setState({ value : '' });
	    this.setState({ show : true });
	    throw err;
	  }
          this.setState({ user: res.body });
          sessionStorage.setItem('token', value);
          this.setState({ userInfo: ('projects' in res.body) ? res.body.projects : [] });
          if(res.body.service_roles.length === 0) {
            this.setState({ isNotAdmin : true });
          }
        });
  }

  onLogout() {
    this.setState({ user: {}, value: '' });
    sessionStorage.removeItem('token');
  }
}

export default LoginStore;
