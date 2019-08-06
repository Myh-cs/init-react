import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';
import MyUpload from './MyUpload';


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
  return (
    <MyUpload {...props} />
  )
});