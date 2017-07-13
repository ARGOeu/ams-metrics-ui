//header component
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
		  <nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container">
					<div className="navbar-header">
					  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					    <span className="sr-only">Toggle navigation</span>
					    <span className="icon-bar"></span>
					    <span className="icon-bar"></span>
					    <span className="icon-bar"></span>
					  </button>
					  <a className="navbar-brand" href="http://argoeu.github.io/index.html"><img src="./assets/argo-logo.png" alt="ARGO"/></a>
					</div>

					<div id="navbar" className="navbar-collapse collapse">
					  <ul className="nav navbar-nav navbar-right">
					  	<li><a href="http://argoeu.github.io/"> Main Site</a></li>
					  </ul>
					</div>
				</div>
			</nav>
    );
  }
}

export default Header;