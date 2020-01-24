import React from 'react';

import './SightingForm.scss';
// import authData from '../../../helpers/data/authData';
import snakelingsData from '../../../helpers/data/snakelingsData';
import statesData from '../../../helpers/data/statesData';

class SightingForm extends React.Component {
  state = {
    dateFound: '',
    stateId: '',
    county: '',
    identified: false,
    snakeId: '',
    imageUrl: '',
    description: '',
    snakes: [],
    states: [],
  }

  getStates = () => {
    statesData.getAllStates()
      .then((states) => {
        states.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        this.setState({ states });
      })
      .catch((error) => console.error('error from get states', error));
  }

  getSnakes = () => {
    snakelingsData.getAllSnakes()
      .then((snakes) => {
        snakes.sort((a, b) => {
          if (a.commonName < b.commonName) return -1;
          if (a.commonName > b.commonName) return 1;
          return 0;
        });
        this.setState({ snakes });
      })
      .catch((error) => console.error('error from get snakes', error));
  }

  componentDidMount() {
    this.getSnakes();
    this.getStates();
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ dateFound: e.target.value });
  }

  stateChange = (e) => {
    e.preventDefault();
    this.setState({ stateId: e.target.value });
  }

  snakeChange = (e) => {
    e.preventDefault();
    this.setState({ snakeId: e.target.value });
  }

  countyChange = (e) => {
    e.preventDefault();
    this.setState({ county: e.target.value });
  }

  render() {
    const {
      dateFound,
      county,
      // identified,
      // snakeId,
      // imageUrl,
      // description,
      snakes,
      states,
    } = this.state;

    return (
      <div className="SightingForm">
        <form>
        <div className="form-group">
        <label htmlFor="date-found">Date Found</label>
          <input
            type="date"
            className="form-control col-2 m-auto"
            id="date-found"
            value={dateFound}
            onChange={this.dateChange}
            >
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="state-name m-3">Select State</label>
          <select
            type="select"
            className="custom-select col-4 m-2"
            id="state-name"
            onChange={this.stateChange}
            >
              {states.map((singleState) => (<option key={singleState.id} value={singleState.id}>{singleState.name}</option>))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="county-name">County</label>
          <input
          type="text"
          className="form-control col-4 m-auto"
          id="county-name"
          placeholder="Enter County"
          value={county}
          onChange={this.countyChange}
          >
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="snake-name">Select Snake</label>
          <select
            type="select"
            className="custom-select col-4 m-2"
            id="snake-name"
            onChange={this.snakeChange}
            >
              {snakes.map((snake) => (<option key={snake.id} value={snake.id}>{snake.commonName}</option>))}
          </select>
        </div>
        </form>
      </div>
    );
  }
}

export default SightingForm;
