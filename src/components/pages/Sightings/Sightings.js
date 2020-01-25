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
    userId: '',
  }

  getSightings = () => {
    sightingsData.getAllSightings()
      .then((sightings) => {
        sightings.sort((a, b) => {
          if (a.stateId < b.stateId) return -1;
          if (a.stateId > b.stateId) return 1;
          return 0;
        });
        this.setState({ sightings });
      })
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
        this.setState({ userId: user.uid });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  forceLogin = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    const { authed, userId } = this.state;
    return (
      <div className="Sightings">
        <h1>Reported Sightings</h1>
        {
          authed
            ? (<Link className="btn btn-dark m-2" to={`/sightings/user/${userId}`}>Manage My Sightings</Link>)
            : ('')
        }
        {
          authed
            ? (<Link className="btn btn-dark m-2" to="/sightings/new">Report Sighting</Link>)
            : (<Link className="btn btn-dark m-2" to="/sightings/new" onClick={this.forceLogin}>Report Sighting</Link>)
        }
        <div className="wrap d-flex row justify-content-center">
          {this.state.sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} />)}
        </div>
      </div>
    );
  }
}

export default Sightings;
