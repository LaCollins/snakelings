import React from 'react';
import PropTypes from 'prop-types';
import arrowHead from './images/arrowHead.gif';
import roundHead from './images/roundHead.gif';

import './SnakeForm.scss';

class SnakeForm extends React.Component {
  static propTypes = {
    setCloseForm: PropTypes.func,
    filterHeadShape: PropTypes.func,
  }

  state = {
    selectionHeadOption: 'null',
  }

  componentDidMount() {
    this.setState({ newSnakes: this.props.snakes });
  }


  headOptionChange = (e) => {
    this.setState({ selectionHeadOption: e.target.value });
  }

  filterHeadShapeEvent = (e) => {
    e.preventDefault();
    this.props.filterHeadShape(this.state.selectionHeadOption);
  }

  showHeadShape = () => (
  <div className="headShape">
    <h5>Select a Head Shape</h5>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="headOptions"
      id="headOption1"
      value="arrow"
      checked={ this.state.selectionHeadOption === 'arrow'}
      onChange={this.headOptionChange}></input>
      <label className="form-check-label" htmlFor="headOption1"><img src={`${arrowHead}`} alt="arrow"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="headOptions"
      id="headOption2"
      value="round"
      checked={ this.state.selectionHeadOption === 'round'}
      onChange={this.headOptionChange}></input>
      <label className="form-check-label" htmlFor="headOption2"><img src={`${roundHead}`} alt="round"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="headOptions"
      id="headOption3"
      value="null"
      checked={ this.state.selectionHeadOption === 'null'}
      onChange={this.headOptionChange}></input>
      <label className="form-check-label" htmlFor="headOption3">Unknown</label>
    </div>
    <div className="row justify-content-around">
    <button className="btn btn-dark" onClick={this.filterHeadShapeEvent}>Next</button>
    </div>
  </div>)


  render() {
    return (
      <div className="SnakeForm">
        <div className='popup'>
          <div className='inner'>
          <div className="d-flex justify-content-between">
            <h3 className="m-3">Select Snake Features</h3>
              <button className="btn btn-danger close m-3 formClose" onClick={this.props.setCloseForm}>X</button>
            </div>
            {this.showHeadShape()}
          </div>
        </div>
      </div>
    );
  }
}

export default SnakeForm;
