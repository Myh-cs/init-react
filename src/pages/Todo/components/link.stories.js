import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Link from './link.jsx';

storiesOf('pages/Todo/components', module).add('link', () => {
    const props = {
        selected: boolean("selected", true),
        children: text('children', 'All'),
        setVisibilityFilter: action('setVisibilityFilter'),
    }
    return <Link {...props} />
});


