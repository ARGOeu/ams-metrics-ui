import React, { Component } from 'react';
import './App.css';
import Header from './static/header.js';
import Footer from './static/footer.js';
import Login from './login/loginComponent.js';
import Layout from './layout/layout.js';
import Reflux from 'reflux';
import loginStore from './login/loginStore.js';

class App extends Reflux.Component {

  constructor(props) {
    super(props);
    this.store = loginStore;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Layout />
        <Footer />
      </div>
    );
  }
}

export default App;
