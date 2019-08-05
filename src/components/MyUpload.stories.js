import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MyUpload from './MyUpload';


storiesOf('MyUpload', module).add('default view', () => (
  <MyUpload />
));