import { loadAll } from '../src/stories/index.js';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);
addDecorator(withInfo);

function loadStories() {
  loadAll()
}
configure(loadStories, module);
