import React from 'react';
import './NavBar.scss';
import snakeLogo from './images/SnakelingsLogo3.png';

class NavBar extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
          <div className="navbar-brand"><img id="logo" src={snakeLogo} alt="snakelings logo" /></div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
