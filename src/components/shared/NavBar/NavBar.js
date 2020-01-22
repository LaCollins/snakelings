import React from 'react';
import './NavBar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../../pages/Auth/Auth';
import snakeLogo from './images/SnakelingsLogo3.png';

class NavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;

    return (
  <div className="NavBar">
    <Navbar bg="dark" expand="lg" variant="dark" className="fixed-top">
      <Navbar.Brand href="#home"><img id="snakeLogo" src={snakeLogo} alt="snakelings logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Snakes</Nav.Link>
            <Nav.Link href="#link">Sightings</Nav.Link>
            <Nav.Link href="#link">FAQ</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            { authed
              ? (<Button variant="dark" onClick={this.logMeOut}>Log Out</Button>)
              : (<Auth />) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

export default NavBar;
