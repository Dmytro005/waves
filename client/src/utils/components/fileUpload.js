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

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }
    return null;
  }

  showUploadedImages() {
    return this.state.uploadedFiles.map(image => (
      <div
        className="dropzone_box"
        key={image.public_id}
        onClick={() => this.onRemoveHandler(image.public_id)}
      >
        <div
          className="wrap"
          style={{
            background: `url(${image.url}) no-repeat `
          }}
        />
      </div>
    ));
  }

  async onRemoveHandler(public_id) {
    await axios.delete('/api/users/image/unlink', {
      data: { public_id }
    });

    const images = this.state.uploadedFiles.filter(
      image => image.public_id !== public_id
    );

    this.setState(
      {
        uploadedFiles: images
      },
      () => {
        this.props.imagesHandler(images);
      }
    );
  }

  onDropHandler(files) {
    this.setState({ uploading: true });
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);

    axios.post('/api/users/image/upload', formData, config).then(response => {
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
