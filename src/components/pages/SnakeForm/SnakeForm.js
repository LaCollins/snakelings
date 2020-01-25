import React from 'react';
import USAMap from 'react-usa-map';
import PropTypes from 'prop-types';

import './SnakeForm.scss';

class SnakeForm extends React.Component {
  static propTypes = {
    closeMap: PropTypes.func,
    setMapState: PropTypes.func,
  }

  mapHandler = (e) => {
    this.props.setMapState(e.target.dataset.name);
  }


  render() {
    return (
      <div className="SnakeForm">
        <div className='popup'>
          <div className='inner'>
            <h1>Select A State</h1>
            <div className="d-flex justify-content-end">
              <button className="btn btn-danger close m-3 mapClose" onClick={this.props.closeMap}>X</button>
            </div>
          <USAMap onClick={this.mapHandler} />
          </div>
        </div>
      </div>
    );
  }
}

export default SnakeForm;
