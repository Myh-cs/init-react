import React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from 'react-fine-uploader/file-input'
import 'react-fine-uploader/gallery/gallery.css'

import FineUploaderTraditional from 'fine-uploader-wrappers'





storiesOf('MyUpload', module).add('fileInput', () => {
  const uploader = new FineUploaderTraditional({
    options: {
      request: {
        endpoint: 'my/upload/endpoint'
      }
    }
  })
  return (
    <FileInput multiple accept='image/*' uploader={uploader}>
      <span className="icon test ion-upload">Choose Files</span>
    </FileInput>
  )
});