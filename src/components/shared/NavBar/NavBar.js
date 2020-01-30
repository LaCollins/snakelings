import React from 'react';
import './NavBar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import authData from '../../../helpers/data/authData';

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
      <Navbar.Brand><Link to="/"><img id="snakeLogo" src={snakeLogo} alt="snakelings logo" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Link to="/snakes" className="nav-link">Snakes</Link>
            <Link to="/sightings" className="nav-link">Sightings</Link>
            { authed
              ? (<Link to="/user/profile" className="nav-link">
              <i className="fas fa-user-circle userProfileIcon"></i>
              </Link>)
              : ('') }
            { authed
              ? (<Button variant="dark" onClick={this.logMeOut} className="logOutButton">Log Out</Button>)
              : (<Auth />) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

export default NavBar;
