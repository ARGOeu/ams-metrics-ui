//users component
import React from 'react';
import usersActions from './usersActions.js';
import usersStore from './usersStore.js';
import Reflux from 'reflux';

class Users extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = usersStore;
  }

  componentDidMount() {
    usersActions.getUsers();
  }

  render() {
    return (
      <div className="panel">Users { this.state.users }</div>
    );
  }
}

export default Users;