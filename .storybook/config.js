const { loadAll } = require('../src/stories/index.js');
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
const { withPropsTable } = require('storybook-addon-react-docgen');

addDecorator(withKnobs);
addDecorator(withInfo);
addDecorator(withPropsTable({ propTablesExclude: ['Story'] }));

function loadStories() {
  loadAll()
}

configure(loadStories, module);
