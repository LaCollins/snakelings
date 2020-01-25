import React from 'react';

import './SightingForm.scss';
import authData from '../../../helpers/data/authData';
import snakelingsData from '../../../helpers/data/snakelingsData';
import statesData from '../../../helpers/data/statesData';
import sightingsData from '../../../helpers/data/sightingsData';

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
    singleSnake: {},
  }

  saveSightingEvent = (e) => {
    e.preventDefault();
    const newSighting = {
      identified: this.state.identified,
      snakeId: this.state.snakeId,
      stateId: this.state.stateId,
      county: this.state.county,
      imageUrl: this.state.imageUrl,
      uid: authData.getUid(),
      dateFound: this.state.dateFound,
      description: this.state.description,
    };
    sightingsData.saveSighting(newSighting)
      .then(() => this.props.history.push('/sightings'))
      .catch((error) => console.error('err from save sighting', error));
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
    const { snakeId } = this.props.match.params;
    const { sightingId } = this.props.match.params;
    this.getStates();
    if (snakeId) {
      snakelingsData.getSingleSnake(snakeId)
        .then((response) => {
          this.setState({ singleSnake: response.data });
          this.setState({ identified: true });
          this.setState({ snakeId });
        })
        .catch((error) => console.error('err from snakeForm', error));
    } else {
      this.getSnakes();
    }

    if (sightingId) {
      sightingsData.getSingleSighting(sightingId)
        .then((request) => {
          const sighting = request.data;
          this.setState({ identified: sighting.identified });
          this.setState({ snakeId: sighting.snakeId });
          this.setState({ stateId: sighting.stateId });
          this.setState({ county: sighting.county });
          this.setState({ imageUrl: sighting.imageUrl });
          this.setState({ dateFound: sighting.dateFound });
          this.setState({ description: sighting.description });
          snakelingsData.getSingleSnake(this.state.snakeId)
            .then((response) => {
              this.setState({ singleSnake: response.data });
            });
        })
        .catch((error) => console.error('err from edit mode', error));
    }
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

  urlChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  changeIdentified = (e) => {
    const checkedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ identified: checkedValue });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  render() {
    const {
      dateFound,
      county,
      identified,
      imageUrl,
      description,
      snakes,
      states,
      singleSnake,
    } = this.state;

    const { snakeId, sightingId } = this.props.match.params;

    return (
      <div className="SightingForm">
        <form className="formContainer">
          <div className="form-inline d-flex justify-content-center">
            <div className="form-group row justify-content-center">
              <label htmlFor="date-found col-form-label">Date Found</label>
              <input
                type="date"
                className="form-control m-2"
                id="date-found"
                value={dateFound}
                onChange={this.dateChange}
                >
              </input>
           </div>
          </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="state-name" className="col-form-label">Select State</label>
              <select
                type="select"
                className="custom-select m-2"
                id="state-name"
                onChange={this.stateChange}
                >
                  <option value=''>Select...</option>
                  {states.map((singleState) => (<option key={singleState.id} value={singleState.id}>{singleState.name}</option>))}
            </select>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="county-name" className="col-form-label">County</label>
            <input
            type="text"
            className="form-control m-2"
            id="county-name"
            placeholder="Enter County"
            value={county}
            onChange={this.countyChange}
            >
            </input>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-check">
            <input type="checkbox"
            className="form-check-input m-2"
            id="is-identified"
            checked={identified}
            onChange={this.changeIdentified}>
            </input>
            <label htmlFor="is-identified">Identified?</label>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="snake-name" className="col-form-label">Select Snake Species</label>
            <select
              type="select"
              className="custom-select m-2"
              id="snake-name"
              onChange={this.snakeChange}
              disabled={identified ? null : 'disabled'}
              >
                {
                  snakeId || sightingId
                    ? (<option value={snakeId}>{singleSnake.commonName}</option>)
                    : (<option value=''>Select...</option>)
                }
                {snakes.map((snake) => (<option key={snake.id} value={snake.id}>{snake.commonName}</option>))}
            </select>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="snake-image" className="col-form-label">Image Url:</label>
            <input
            type="text"
            className="form-control m-2"
            id="snake-image"
            placeholder="Enter Image Url"
            value={imageUrl}
            onChange={this.urlChange}
            >
            </input>
          </div>
        </div>
        <div className="form-inline d-flex justify-content-center">
          <div className="form-group row">
            <label htmlFor="sighting-description" className="col-form-label">Description of incident:</label>
            <textarea
            type="text"
            className="form-control m-2 col-12"
            id="sighting-description"
            placeholder="Enter description of events"
            value={description}
            onChange={this.descriptionChange}
            rows="3"
            >
            </textarea>
          </div>
        </div>
        <button className="btn btn-dark" onClick={this.saveSightingEvent}>Make Report</button>
        </form>
      </div>
    );
  }
}

export default SightingForm;
