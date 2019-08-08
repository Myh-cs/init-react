import React from 'react'
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'



export default class MyUpload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uploader = new FineUploaderTraditional({
      options: {
        autoUpload: false,
        chunking: {
          enabled: true
        },
        deleteFile: {
          enabled: true,
          endpoint: '/uploads'
        },
        request: {
          endpoint: '/uploads'
        },
        retry: {
          enableAuto: true
        }
      }
    })
  }
  onClick = () => {
    console.log(this.uploader.methods._handler);
    console.log(this.uploader);
    this.uploader.methods.uploadStoredFiles();
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick}>upload</button>
        <Gallery uploader={this.uploader} {...this.props} />
      </div>
    )
  }
}