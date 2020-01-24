import React from 'react';
import { Link } from 'react-router-dom';
import Snake from '../../shared/Snake/Snake';

import './Snakes.scss';
import snakelingsData from '../../../helpers/data/snakelingsData';

class Snakes extends React.Component {
  state = {
    snakes: [],
  }

  getSnakes = () => {
    snakelingsData.getAllSnakes()
      .then((snakeArray) => {
        snakeArray.sort((a, b) => {
          if (a.commonName < b.commonName) return -1;
          if (a.commonName > b.commonName) return 1;
          return 0;
        });
        this.setState({ snakes: snakeArray });
      })
      .catch((error) => console.error('error from snakes', error));
  }

  componentDidMount() {
    this.getSnakes();
  }

  render() {
    return (
      <div className="Snakes">
        <h1>Snakes of North America</h1>
        <div className="snakeContainer container d-flex flex-wrap">
          {this.state.snakes.map((snake) => <Snake key={snake.id} snake={snake} />)}
        </div>

        <Link className="btn btn-dark" to="/identify">Identify</Link>
      </div>
    );
  }
}

export default Snakes;
