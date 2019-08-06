import React from 'react'
import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderTraditional({
  options: {
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

export default class MyUpload extends React.PureComponent {

  render() {
    return (
      <Gallery uploader={uploader} {...this.props} />
    )
  }
}