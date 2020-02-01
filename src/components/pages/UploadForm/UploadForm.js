import React from 'react';
import axios from 'axios';

import './UploadForm.scss';


class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }


  singleFileChangedHandler = (e) => {
    e.preventDefault();
    this.setState({ selectedFile: e.target.files[0] });
  }

  singleFileUploadHandler = (e) => {
    const data = new FormData();
    if (this.state.selectedFile) {
      data.append('snakeImage', this.state.selectedFile, this.state.selectedFile.name);
      axios.post('/img-upload', data, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data.boundary}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.error) {
              if (response.data.error.code === 'LIMIT_FILE_SIZE') {
                console.error(response.data);
              } else {
                console.error(response.data);
              }
            } else {
              // Success
              const fileName = response.data;
              console.error('filedata', fileName);
            }
          }
        }).catch((error) => {
          // If another error
          console.error(error);
        });
    } else {
      // if file not selected throw error
      this.ocShowAlert('Please upload file', 'red');
    }
  };


  render() {
    return (
      <div className="UploadForm">
        <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
          <div className="card-body">
              <input type="file" onChange={this.singleFileChangedHandler}/>
            <div className="mt-5">
              <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadForm;
