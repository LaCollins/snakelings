import React from 'react';
import { Link } from 'react-router-dom';

import './Snakes.scss';

class Snakes extends React.Component {
  render() {
    return (
      <div className="Snakes">
        <h1>Snakes</h1>
        <Link className="btn btn-dark" to="/snakes/:snakeId">Single</Link>

        <Link className="btn btn-dark" to="/identify">Identify</Link>
      </div>
    );
  }
}

export default Snakes;
