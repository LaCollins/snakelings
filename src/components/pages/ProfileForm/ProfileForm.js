import React from 'react';
import './ProfileForm.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class ProfileForm extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    edit: PropTypes.bool,
  }

  render() {
    const { show, handleClose, edit } = this.props;

    return (
      <div className="ProfileForm">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {
              edit
                ? (<Modal.Title>Edit Profile</Modal.Title>)
                : (<Modal.Title>Create Profile</Modal.Title>)
            }
          </Modal.Header>
          <Modal.Body className="formModal">Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ProfileForm;
