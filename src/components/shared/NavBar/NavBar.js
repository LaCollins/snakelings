import React from 'react';
import './NavBar.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import googleLogo from './images/GoogleLogo.png';
import snakeLogo from './images/SnakelingsLogo3.png';

class NavBar extends React.Component {
  render() {
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
            <Button variant="dark"><img src={googleLogo} id="googleLogo" alt="Google Logo" /> Log In</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

export default NavBar;
