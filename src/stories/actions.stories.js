import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


storiesOf('Button', module).add('default view', () => (
  <div >
    <button onClick={action('button-click')}>Hello World!</button>
    more: <a href='https://github.com/storybookjs/storybook/tree/master/addons/actions'>github actions</a>
  </div>
));