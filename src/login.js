import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { FormControl, Col, Row, Button, Form} from 'react-bootstrap';
import Layout from './layout/layout.js';

const Auth = () => (
  <Router>
    <div className="height">
      <Form inline className="centered">
        <FormControl bsSize="large" type="text" placeholder="Enter token"></FormControl>
         <Button bsSize="large" bsStyle="primary" type="submit">Login</Button>
      </Form>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/layout" component={Layout}/>
    </div>
  </Router>
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends React.Component {

  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}


export default Auth
