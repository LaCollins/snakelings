import React from 'react';
import Sighting from '../../shared/Sighting/Sighting';
import sightingsData from '../../../helpers/data/sightingsData';

import './UserSightings.scss';

class UserSightings extends React.Component {
  state = {
    sightings: [],
  }

  getUserSightings = () => {
    const userId = this.props.match.params;
    sightingsData.getSightingsByUid(userId.userId)
      .then((response) => {
        this.setState({ sightings: response });
      })
      .catch((error) => console.error('err from get user sightings', error));
  }

  componentDidMount() {
    this.getUserSightings();
  }

  render() {
    const userId = this.props.match.params;

    return (
      <div className="UserSightings">
        <h1>My Sightings</h1>
        <div className="wrap d-flex row justify-content-center">
          {this.state.sightings.map((sighting) => <Sighting key={sighting.id} sighting={sighting} userId={userId.userId} />)}
        </div>
      </div>
    );
  }
}

export default UserSightings;
