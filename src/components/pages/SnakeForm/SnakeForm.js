import React from 'react';
import PropTypes from 'prop-types';
import arrowHead from './images/arrowHead.gif';
import roundHead from './images/roundHead.gif';
import slender from './images/slender.PNG';
import medium from './images/medium.PNG';
import stocky from './images/Stocky.PNG';

import './SnakeForm.scss';

class SnakeForm extends React.Component {
  static propTypes = {
    setCloseForm: PropTypes.func,
    filterHeadShape: PropTypes.func,
    filterBodyShape: PropTypes.func,
  }

  state = {
    selectionHeadOption: 'null',
    selectedBodyOption: 'null',
    headShape: true,
    bodyShape: false,
  }

  headOptionChange = (e) => {
    this.setState({ selectionHeadOption: e.target.value });
  }

  bodyOptionChange = (e) => {
    this.setState({ selectedBodyOption: e.target.value });
  }


  filterBodyShapeEvent = (e) => {
    e.preventDefault();
    this.props.filterBodyShape(this.state.selectedBodyOption);
    this.setState({ bodyShape: false });
  }

  filterHeadShapeEvent = (e) => {
    e.preventDefault();
    this.props.filterHeadShape(this.state.selectionHeadOption);
    this.setState({ headShape: false });
    this.setState({ bodyShape: true });
  }

  showBodyShape = () => (
    <div className="bodyShape">
      <h5>Select a bodyShape</h5>
      <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption1"
      value="slender"
      checked={ this.state.selectedBodyOption === 'slender'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption1"><img className="bodyOptionImg" src={`${slender}`} alt="slender"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption2"
      value="medium"
      checked={ this.state.selectedBodyOption === 'medium'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption2"><img className="bodyOptionImg" src={`${medium}`} alt="medium"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption3"
      value="stocky"
      checked={ this.state.selectedBodyOption === 'stocky'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption3"><img className="bodyOptionImg" src={`${stocky}`} alt="stocky"/></label>
    </div>
    <div className="form-check form-check-inline m-5">
      <input
      className="form-check-input"
      type="radio"
      name="bodyOptions"
      id="bodyOption4"
      value="null"
      checked={ this.state.selectedBodyOption === 'null'}
      onChange={this.bodyOptionChange}></input>
      <label className="form-check-label" htmlFor="bodyOption4">Unknown</label>
    </div>
    <div className="row justify-content-around">
    <button className="btn btn-dark" onClick={this.filterBodyShapeEvent}>Next</button>
    </div>
    </div>
  )

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
            {this.state.headShape && this.showHeadShape()}
            {this.state.bodyShape && this.showBodyShape()}
          </div>
        </div>
      </div>
    );
  }
}

export default SnakeForm;
