import React from 'react';
import { storiesOf } from '@storybook/react';
import FileInput from 'react-fine-uploader/file-input'
import 'react-fine-uploader/gallery/gallery.css'
import './test.less'

import FineUploaderTraditional from 'fine-uploader-wrappers'





storiesOf('components/MyUpload', module).add('fileInput', () => {
  const uploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: true
      },
      request: {
        // endpoint: 'http://10.205.20.23:8081/test/uploads'
        endpoint: '/upload/useFileUtilsCopyInputStreamToFile2'
      }
    }
  })
  console.log(uploader);
  return (
    <FileInput multiple webkitdirectory="true" uploader={uploader}>
      <span className="icon test ion-upload">Choose Files</span>
    </FileInput>
  )
});