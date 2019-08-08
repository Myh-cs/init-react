import React from 'react';
import Gallery from 'react-fine-uploader'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';
import 'react-fine-uploader/gallery/gallery.css'


storiesOf('components/MyUpload', module).add('default view', () => {

  const props = {
    'cancelButton-children': text('cancelButton', 'Close'),
    'deleteButton-children': text('deleteButton', 'Del'),
    'dropzone-disabled': boolean('dropzone', false),
    'dropzone-dropActiveClassName': text('dropzone-dropActiveClassName', 'dropzone-dropActiveClassName'),
    'dropzone-multiple': boolean("dropzone multiple", true),
    'fileInput-multiple': boolean('fileInput-multiple', true),
    'pauseResumeButton-pauseChildren': text('pauseChildren', 'pauseChildren'),
    'pauseResumeButton-resumeChildren': text('resumeChildren', 'resumeChildren'),
    'retryButton-children': text('retryButton', 'retryButton'),
    'thumbnail-maxSize': number('thumbnail-maxSize', 130)
  }
  const uploader = new FineUploaderTraditional({
    options: {
      // autoUpload: false,
      chunking: {
        concurrent: { enabled: true },
        enabled: true,
        success: { endpoint: 'http://10.205.20.23:8081/test/chunksdone' }
      },
      deleteFile: {
        enabled: true,
        endpoint: 'http://10.205.20.23:8081/test/chunksdone'
      },
      request: {
        endpoint: 'http://10.205.20.23:8081/test/uploads'
      },
      retry: {
        enableAuto: true
      },
      // extraButtons: {
      //   folders: true
      // }
    }
  })
  const onClick = () => {
    console.log(uploader.methods._handler);
    console.log(uploader);
    uploader.methods.uploadStoredFiles();
  }
  return (
    <div>
      <button onClick={onClick}>upload</button>
      <Gallery uploader={uploader} {...props} />
    </div>
  )
});