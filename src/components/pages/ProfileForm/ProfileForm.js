import React from 'react';
import './ProfileForm.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import userProfilesData from '../../../helpers/data/userProfilesData';
import authData from '../../../helpers/data/authData';

class ProfileForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    location: '',
    imageUrl: '',
    userName: '',
    userNameExists: false,
  }

  static propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    edit: PropTypes.bool,
  }

  checkExistingUsername = (e) => {
    e.preventDefault();
    const { userName } = this.state;
    userProfilesData.getProfileByUserName(userName)
      .then((response) => {
        if (response.length > 0) {
          this.setState({ userNameExists: true });
        } else {
          this.saveUserProfileEvent();
        }
      })
      .catch((error) => console.error('err from check username', error));
  }

  saveUserProfileEvent = () => {
    const newProfile = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      userName: this.state.userName,
      uid: authData.getUid(),
    };
    userProfilesData.saveProfile(newProfile)
      .then(() => this.props.handleClose())
      .catch((error) => console.error('err from save profile', error));
  }

  firstNameChange = (e) => {
    e.preventDefault();
    this.setState({ firstName: e.target.value });
  }

  lastNameChange = (e) => {
    e.preventDefault();
    this.setState({ lastName: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ location: e.target.value });
  }

  urlChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  userNameChange = (e) => {
    e.preventDefault();
    this.setState({ userName: e.target.value });
  }

  render() {
    const { show, handleClose, edit } = this.props;
    const {
      firstName,
      lastName,
      location,
      imageUrl,
      userName,
      userNameExists,
    } = this.state;

    return (
      <div className="ProfileForm">
        <Modal show={show} onHide={handleClose} backdrop="static">
        <form className="formContainer" onSubmit={this.checkExistingUsername}>
          <Modal.Header closeButton>
            {
              edit
                ? (<Modal.Title>Edit Profile</Modal.Title>)
                : (<Modal.Title>Create Profile</Modal.Title>)
            }
          </Modal.Header>
          <Modal.Body className="formModal">
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="first-name" className="col-form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="first-name"
                    value={firstName}
                    onChange={this.firstNameChange}
                    placeholder="Enter First Name"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="last-name" className="col-form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="last-name"
                    value={lastName}
                    onChange={this.lastNameChange}
                    placeholder="Enter Last Name"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="location" className="col-form-label">City and State</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="location"
                    value={location}
                    onChange={this.locationChange}
                    placeholder="Enter City and State"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="image-url" className="col-form-label">Image Url</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="image-url"
                    value={imageUrl}
                    onChange={this.urlChange}
                    placeholder="Enter Image Url"
                    required>
                    </input>
                </div>
              </div>
              <div className="form-inline d-flex justify-content-center">
                <div className="form-group row justify-content-center">
                  <label htmlFor="user-name" className="col-form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control m-2"
                    id="uesr-name"
                    value={userName}
                    onChange={this.userNameChange}
                    placeholder="Create a User Name"
                    required>
                    </input>
                    {
                    userNameExists
                      ? (<label htmlFor="user-name" className="col-form-label existingName">Username Unavailable!</label>)
                      : ('')
                  }
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            {
              edit
                ? (<Button variant="dark" onClick={handleClose}>
              Close
            </Button>)
                : ('')
            }
            <Button variant="dark" type="submit">
              Save
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ProfileForm;
