import React, { Component } from 'react';
import './App.css';
import Header from './static/header.js';
import Footer from './static/footer.js';
import Layout from './layout/layout.js';


class App extends Component {
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