import React from 'react'
import { FormControl, Button, Form} from 'react-bootstrap';
import loginActions from './loginActions.js';
import loginStore from './loginStore.js';
import Reflux from 'reflux';


class Login extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.store = loginStore;
  }


  render() {
    return (
      <div className="height">
        <Form inline className="centered" onSubmit={event => this.submitInputValue(event)}>
          <FormControl bsSize="large" type="text" placeholder="Enter token" value={this.state.value} onChange={event => this.updateInputValue(event)}></FormControl>
          <Button bsSize="large" bsStyle="primary" type="submit" value="Submit">Login</Button>
        </Form>
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
