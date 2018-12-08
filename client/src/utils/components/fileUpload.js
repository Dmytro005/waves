import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import axios from 'utils/axios';

import FontAwesome from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false
    };
  }

  showUploadedImages(files) {}

  onDropHandler(files) {
    this.setState({ uploading: true });
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);

    axios.post('/api/users/upload-image', formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  }

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              multiple={false}
              onDrop={files => this.onDropHandler(files)}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesome icon={faPlusCircle} />
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: 'center',
                  paddingTop: '60px'
                }}
              >
                <CircularProgress />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
