import React from 'react';
import Snake from '../../shared/Snake/Snake';
import StateMap from '../StateMap/StateMap';
import SnakeForm from '../SnakeForm/SnakeForm';
import './Snakes.scss';
import snakelingsData from '../../../helpers/data/snakelingsData';
import stateSnakesData from '../../../helpers/data/stateSnakesData';


class Snakes extends React.Component {
  state = {
    snakes: [],
    showMap: false,
    showForm: false,
  }

  setShowForm = (e) => {
    e.preventDefault();
    this.setState({ showForm: true });
  }

  setCloseForm = (e) => {
    e.preventDefault();
    this.setState({ showForm: false });
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

  setShowMap = (e) => {
    e.preventDefault();
    this.getSnakes();
    this.setState({ showMap: true });
  }

  closeMap = (e) => {
    e.preventDefault();
    this.setState({ showMap: false });
  }


  setMapState = (stateId) => {
    const { snakes } = this.state;
    const snakesByState = [];
    stateSnakesData.getSnakesByState(stateId)
      .then((response) => {
        response.forEach((state) => {
          for (let i = 0; i < snakes.length; i += 1) {
            if (snakes[i].id === state.snakeId) {
              snakesByState.push(snakes[i]);
            }
          }
        });
        snakesByState.sort((a, b) => {
          if (a.commonName < b.commonName) return -1;
          if (a.commonName > b.commonName) return 1;
          return 0;
        });
        this.setState({ snakes: snakesByState });
        this.setState({ showMap: false });
      })
      .catch((error) => console.error('from set map state', error));
  }

  filterHeadShape = (selectedHeadOption) => {
    const { snakes } = this.state;
    const filteredSnakes = [];
    if (selectedHeadOption !== 'null') {
      for (let i = 0; i < snakes.length; i += 1) {
        if (snakes[i].headShape === selectedHeadOption) {
          filteredSnakes.push(snakes[i]);
        }
      }
      this.setState({ snakes: filteredSnakes });
    }
  }


  render() {
    return (
      <div className="Snakes">
        <h1>Snakes of North America</h1>
        <div className="container">
          <form className="row justify-content-center">
            <div className="form-group">
              <div className="form-inline">
                <input
                type="text"
                className="form-control m-1"
                id="search-bar"
                placeholder="Search...">
                </input>
                <label htmlFor="search-bar" className="col-form-label"><button className="btn btn-outline-secondary searchButton"><i className="fas fa-search"></i></button></label>
              </div>
            </div>
          </form>
        </div>
        <button className="btn btn-dark mb-3 mr-3 mt-0" onClick={this.getSnakes}>View All</button>
        <button className="btn btn-dark mb-3 mt-0" onClick={this.setShowMap}>Filter By State</button>
        { this.state.showMap && <StateMap closeMap={this.closeMap} setMapState={this.setMapState} />}
        <button className="btn btn-dark mb-3 ml-3 mt-0" onClick={this.setShowForm}>Filter By Appearance</button>
        { this.state.showForm && <SnakeForm setCloseForm={this.setCloseForm} filterHeadShape={this.filterHeadShape}/>}
        <div className="snakeContainer container d-flex flex-wrap">
          {this.state.snakes.map((snake) => <Snake key={snake.id} snake={snake} />)}
        </div>
      </div>
    );
  }
}

export default Snakes;
