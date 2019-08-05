import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';

const stories = storiesOf('examples', module);


// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.

// Knobs for React props
stories.add('knobs with a button', () => (
  <button disabled={boolean('Disabled', false)} >
    {text('Label', 'Hello Storybook')}
  </button>
));

// Knobs as dynamic variables.
stories.add('knobs as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});
