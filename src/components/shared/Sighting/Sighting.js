import React from 'react';
import { Link } from 'react-router-dom';
import sightingShape from '../../../helpers/propz/sightingShape';
import snakelingsData from '../../../helpers/data/snakelingsData';
import statesData from '../../../helpers/data/statesData';

import './Sighting.scss';

class Sighting extends React.Component {
  state = {
    reportedSnake: {},
    stateData: {},
  }

  static propTypes = {
    sighting: sightingShape.sightingShape,
  }

  getSnakeData = () => {
    const { sighting } = this.props;
    snakelingsData.getSingleSnake(sighting.snakeId)
      .then((reportedSnake) => this.setState({ reportedSnake: reportedSnake.data }))
      .catch((error) => console.error('err from sighting', error));
  }

  getStateData = () => {
    const { sighting } = this.props;
    statesData.getStateById(sighting.stateId)
      .then((stateData) => this.setState({ stateData: stateData.data }))
      .catch((error) => console.error('error from get state', error));
  }

  checkIdentifid = () => {
    const { sighting } = this.props;
    const unidentified = {
      commonName: 'Unidentified',
    };

    if (sighting.identified === true) {
      this.getSnakeData();
    } else {
      this.setState({ reportedSnake: unidentified });
    }
  }

  componentDidMount() {
    this.checkIdentifid();
    this.getStateData();
  }

  render() {
    const { sighting } = this.props;
    const { reportedSnake } = this.state;
    const { stateData } = this.state;
    const { userId } = this.props;

    return (
      <div className="Sighting">
          <div className="row m-2 h-100 wrap">
              <div className="col mt-3">
                  <div className="card reportedSnakeCard">
                      <div className="card-horizontal">
                          <div className="img-square-wrapper">
                              <img className="reportedImage" src={sighting.imageUrl} alt={sighting.date} />
                          </div>
                          <div className="card-body reportCard">
                              <h4 className="card-title text-left">{reportedSnake.commonName}</h4>
                              <p className="card-text text-left">Location Found: {sighting.county} county, {stateData.name}</p>
                              <p className="card-text text-left">Date: {sighting.dateFound}</p>
                              <p className="card-text text-left">Description: {sighting.description}</p>
                          </div>
                          {
                            userId
                              ? (<div className="card-footer col">
                                <Link className="btn btn-dark" to={`/sightings/${sighting.id}/edit`}><i class="fas fa-edit"></i></Link>
                                <button className="btn btn-dark mt-3"><i class="fas fa-trash-alt"></i></button>
                              </div>)
                              : ('')
                          }
                      </div>
                  </div>
              </div>
          </div>
       </div>
    );
  }
}

export default Sighting;
