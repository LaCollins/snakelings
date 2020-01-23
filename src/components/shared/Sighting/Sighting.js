import React from 'react';
import sightingShape from '../../../helpers/propz/sightingShape';
import snakelingsData from '../../../helpers/data/snakelingsData';

import './Sighting.scss';

class Sighting extends React.Component {
  state = {
    reportedSnake: {},
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

  componentDidMount() {
    this.getSnakeData();
  }

  render() {
    const { sighting } = this.props;
    const { reportedSnake } = this.state;

    return (
      <div className="Sighting">
        <div className="card h-100">
          <div className="card-body">
            <div className="row">
            <img className="card-img col-4" src={sighting.imageUrl} alt={sighting.date}/>
            <h5 className="col-4 card-title">{reportedSnake.commonName}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sighting;
