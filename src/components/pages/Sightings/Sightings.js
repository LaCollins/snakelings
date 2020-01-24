import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import Sighting from '../../shared/Sighting/Sighting';
import sightingsData from '../../../helpers/data/sightingsData';
import 'firebase/auth';

import './Sightings.scss';

class Sightings extends React.Component {
  state = {
    sightings: [],
    authed: false,
  }

  getSightings = () => {
    sightingsData.getAllSightings()
      .then((sightings) => this.setState({ sightings }))
      .catch((error) => console.error('error from sightings', error));
  }

  componentDidMount() {
    this.getSightings();
    this.checkUser();
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="Sightings">
        <h1>Reported Sightings</h1>
        {
          authed
            ? (<Link className="btn btn-dark m-2" to="/sightings/user/:userId">Manage My Sightings</Link>)
            : ('')
        }
        <Link className="btn btn-dark m-2" to="/sightings/new">Report Sighting</Link>
        <div className="d-flex flex-wrap justify-content-center">
          {this.state.sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} />)}
        </div>
      </div>
    );
  }
}

export default Sightings;
