//users store
import usersActions from './usersActions.js';
import Reflux from 'reflux';
import request from 'superagent';

const users = 'https://messaging-devel.argo.grnet.gr/v1/users';
const superAdmin = 'e2c920cd512a6aa4408f3a52013f0698ae6c6efd';


class UsersStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = [usersActions];
    this.state = {
      users: []
    }
  }

  onGetUsers() {
    request
    .get(users)
    .set('Content-Type', 'application/json')
    .query({ key: superAdmin})
    .end((err, res) => {
      let usersSum = 0;
      if(err) throw err;
      usersSum = res.body.users.length;

      this.setState({ users: usersSum })
    });
  }
}

export default UsersStore;