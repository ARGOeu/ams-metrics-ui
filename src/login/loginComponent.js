import React from 'react'
import { FormControl, Button, Form, Alert } from 'react-bootstrap';
import loginActions from './loginActions.js';
import loginStore from './loginStore.js';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';

class Login extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = loginStore;
    this.handleDismiss = this.handleDismiss.bind(this);
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

  handleDismiss() {
    return this.setState({ show: false });
  }

  renderShowError() {
    if (this.state.show) {
      setTimeout(function() { this.setState({show: false}); }.bind(this), 3000);
      return (
        <div>
          <Alert variant="danger" onDismiss={this.handleDismiss}>
            <strong>Login Failed: </strong>You have not provided a valid token
          </Alert>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  renderForm() {
    return (
      <div>
        <div className="error-position">
          { (this.state.error) ? this.renderShowError() : '' }
        </div>
        <div className="content-position">
          <Form inline onSubmit={event => this.submitInputValue(event)}>
            <FormControl variant="large" type="text" placeholder="Enter token" value={this.state.value} onChange={event => this.updateInputValue(event)}></FormControl>
            <Button variant="large" variant="primary" type="submit" value="Submit">Login</Button>
          </Form>
        </div>
      </div>
    );
  }

  render() {
    const loggedIn = (this.state.user && 'name' in this.state.user && this.state.value) ? true : false;
    return (
      <div className='layout'>
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
