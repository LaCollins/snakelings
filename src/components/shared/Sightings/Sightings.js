import React from 'react';
import { Link } from 'react-router-dom';

import './Sightings.scss';

class Sightings extends React.Component {
  render() {
    return (
      <div className="Sightings">
        <h1>Sightings</h1>
        <Link className="btn btn-dark" to="/sightings/user/:userId">Manage</Link>
        <Link className="btn btn-dark" to="/sightings/new">New</Link>
        <Link className="btn btn-dark" to="/sightings/:sightingId/edit">Edit</Link>
      </div>
    );
  }
}

export default Sightings;
