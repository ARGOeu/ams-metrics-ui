import React from 'react'
import { FormControl, Button, Form} from 'react-bootstrap';
import loginActions from './loginActions.js';
import loginStore from './loginStore.js';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';


class Login extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  getDestination() {
    return '/projects';
  }

  componentDidMount() {
    const token = sessionStorage.token || '';
    if(token.length > 0) {
      loginActions.getUserInfo(token);
    }
  }

  renderForm() {
    return (
      <div className="height">
        <Form inline className="centered" onSubmit={event => this.submitInputValue(event)}>
          <FormControl bsSize="large" type="text" placeholder="Enter token" value={this.state.value} onChange={event => this.updateInputValue(event)}></FormControl>
          <Button bsSize="large" bsStyle="primary" type="submit" value="Submit">Login</Button>
        </Form>
      </div>
    );
  }

  render() {
    const loggedIn = (this.state.user && 'name' in this.state.user && this.state.value) ? true : false;
    return (
      <div>
      { (loggedIn) ? <Redirect to={this.getDestination()} /> : this.renderForm() }
      </div>
    )
  }

  updateInputValue(event) {
    this.setState({ value: event.target.value });
  }

  submitInputValue(event) {
    loginActions.getUserInfo(this.state.value);
    event.preventDefault();
  }
}

export default Login
