import React from 'react';
import snakelingsData from '../../../helpers/data/snakelingsData';

import './SingleSnake.scss';

class SingleSnake extends React.Component {
  state = {
    snake: {},
  }

  componentDidMount() {
    const { snakeId } = this.props.match.params;

    snakelingsData.getSingleSnake(snakeId)
      .then((response) => {
        this.setState({ snake: response.data });
      })
      .catch((error) => console.error('error from single snake', error));
  }

  render() {
    const { snake } = this.state;
    // const { snakeId } = this.props.match.params;

    return (
      <div className="SingleSnake container">
        <h1>{snake.commonName}</h1>
        <h2><em>{snake.scientificName}</em></h2>
        <div className="row d-flex justify-content-center snakeInfo m-0">
          <div className="col-sm-6 m-auto">          <img src={snake.imageUrl} className="singleSnakeImage" alt={snake.commonName} /></div>
          <div className="col-sm-6 m-auto">
            <h5>{snake.description}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleSnake;
