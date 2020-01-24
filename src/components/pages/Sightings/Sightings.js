import React from 'react';
import { Link } from 'react-router-dom';
import Sighting from '../../shared/Sighting/Sighting';
import sightingsData from '../../../helpers/data/sightingsData';

import './Sightings.scss';

class Sightings extends React.Component {
  state = {
    sightings: [],
  }

  getSightings = () => {
    sightingsData.getAllSightings()
      .then((sightings) => this.setState({ sightings }))
      .catch((error) => console.error('error from sightings', error));
  }

  componentDidMount() {
    this.getSightings();
  }

  render() {
    return (
      <div className="Sightings">
        <h1>Reported Sightings</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} />)}
        </div>
        <Link className="btn btn-dark" to="/sightings/user/:userId">Manage</Link>
        <Link className="btn btn-dark" to="/sightings/new">New</Link>
        <Link className="btn btn-dark" to="/sightings/:sightingId/edit">Edit</Link>
      </div>
    );
  }
}

export default Sightings;
